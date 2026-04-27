---
name: ai-native-resume
description: "This skill should be used when converting a user's resume into an AI-native HTML resume, including PDF/DOCX resume uploads, 简历html化, HTML resume, resume to HTML, AI简历, resume.json, editable resume template, avatar upload, previewing in browser, and exporting an A4 PDF."
---

# AI-native Resume

## Overview

Convert an uploaded resume into a polished, editable, AI-friendly HTML resume using the bundled A4 template. Produce a local HTML project that can be opened in a browser, edited via structured data, and exported to PDF.

Use the bundled template in `assets/template/` as the starting point:

- `index.html`
- `resume-data.js`
- `script.js`
- `styles.css`
- `avatar.jpeg`

## Workflow

1. Inspect the uploaded resume.
   - For PDF input, use PDF extraction and visual review when available.
   - For DOCX input, extract text and preserve section hierarchy.
   - Identify name, target role, education, contact info, internship/work experience, projects, skills, and other experience.
2. Copy `assets/template/` into the user's requested output directory, or into the current project when no output directory is specified.
3. Rewrite `resume-data.js` with the user's real structured content.
4. Keep `index.html`, `script.js`, and `styles.css` unless layout changes are needed.
5. Add or replace avatar:
   - If the user provides an avatar image in chat or as a file, copy it into the output directory and set `basics.avatar`.
   - If no avatar is provided, keep the bundled placeholder or allow browser upload via the built-in upload button.
6. Open or test the HTML in a browser when possible.
7. Measure A4 fit and iterate until the resume uses the page well.
8. Export or verify A4 PDF output when requested.

## Data Editing Rules

Edit content primarily in `resume-data.js`.

Required structure:

```js
window.resumeData = {
  basics: {
    name: "",
    title: "",
    intent: "",
    summary: "",
    socialId: "",
    undergraduate: "",
    graduate: "",
    graduationYear: "",
    email: "",
    phone: "",
    avatar: "avatar.jpeg"
  },
  highlights: [],
  internships: [],
  otherExperience: []
};
```

Prefer concise, impact-oriented bullets. For each internship, use:

- one short `summary`
- two strong `achievements`
- each achievement with `label` + `text`

Avoid stuffing too much content into one page. If the extracted resume is long, compress rather than shrink text too aggressively.

## Layout and Quality Rules

Optimize for one-page A4 first, then aesthetics. Treat A4 fit as a hard acceptance criterion, not a nice-to-have.

Follow these rules:

- Keep the resume body at exact A4 proportion: `210mm × 297mm`.
- Keep exported PDF to exactly one A4 page.
- Make the content visually fill the page without crowding. Target a bottom whitespace of roughly `12px-45px` in browser measurement; below `8px` is too crowded, above `60px` is too sparse.
- Prioritize internship/work experience; compress personal info and other experience when space is tight.
- Keep body text readable. Do not solve overflow only by making text tiny.
- Adjust content length, font size, line-height, section gaps, card padding, and avatar size together.
- Preserve bottom safety margin. Do not let the last card touch the page bottom.
- Ensure colored blocks and section bars appear in exported PDF.
- Use `print-color-adjust: exact` and avoid relying only on gradients for critical print colors.
- Keep avatar support both ways:
  - file-based avatar in `resume-data.js`
  - browser upload via the HTML control panel
- Validate print preview against browser preview; they should look materially the same.

Recommended balance for a student AI product manager resume:

- personal information: compact
- internship experience: largest section
- other experience: compact supporting section
- no more than 3 internship entries on one page
- no more than 2 achievements per internship

## A4 Fit Loop

Repeat layout adjustment until all conditions pass:

1. Open the HTML with Playwright/Chromium when available.
2. Measure `#resume` dimensions and section usage:

```js
const metrics = await page.locator("#resume").evaluate((el) => {
  const pageBox = el.getBoundingClientRect();
  const last = document.querySelector("#other-experience").getBoundingClientRect();
  return {
    width: pageBox.width,
    height: pageBox.height,
    ratio: pageBox.width / pageBox.height,
    scrollHeight: el.scrollHeight,
    clientHeight: el.clientHeight,
    bottomWhitespace: pageBox.height - (last.bottom - pageBox.top)
  };
});
```

3. Export a PDF and verify it has exactly one page.
4. Pass only when:
   - ratio is approximately `210 / 297`
   - PDF page count is `1`
   - content does not visually overflow
   - bottom whitespace is approximately `12px-45px`
   - internship/work experience remains the largest content section

If any condition fails, modify content and layout, then rerun the loop. Do not deliver a resume that is merely “close enough”.

## Avatar Handling

When an avatar is supplied:

1. Copy the image into the output directory.
2. Use a simple filename such as `avatar.jpeg`, `avatar.png`, or `avatar.webp`.
3. Set `basics.avatar` in `resume-data.js`.
4. Keep the browser upload UI enabled so the user can replace the avatar manually.

When no avatar is supplied:

- Keep the bundled `avatar.jpeg` placeholder if appropriate.
- Or set `basics.avatar` to an empty string and rely on the text fallback.

## PDF Export

Prefer browser-based PDF export with Chromium/Playwright when available:

```js
await page.pdf({
  path: "resume.pdf",
  format: "A4",
  printBackground: true,
  margin: { top: "0", right: "0", bottom: "0", left: "0" }
});
```

If instructing the user to export manually:

- Use Chrome or Edge.
- Select paper size A4.
- Select no margins.
- Enable background graphics.
- Confirm the final output is one page.

## Validation Checklist

Before delivering:

- `resume-data.js` passes JavaScript syntax check.
- HTML opens without console-breaking errors.
- Candidate name and target role render correctly.
- Avatar displays or upload fallback works.
- Information grid is visually balanced.
- Internship section has the most visual weight.
- Other experience does not dominate the page.
- A4 ratio is approximately `210 / 297`.
- A4 PDF export is one page.
- Bottom safety margin exists and is not excessive.
- Blue section bars, light background panels, and card borders appear in PDF.

## Common Fixes

If content overflows:

1. Shorten bullets and summaries first.
2. Reduce card padding and section gaps.
3. Compress personal info and other experience.
4. Only then reduce font size slightly.

If the page looks sparse:

1. Increase internship line-height and spacing.
2. Increase internship font size.
3. Add one concise achievement per major internship.
4. Avoid expanding personal info just to fill space.

If PDF misses colors:

1. Add `-webkit-print-color-adjust: exact` and `print-color-adjust: exact`.
2. Replace critical gradient-only backgrounds with solid colors or pseudo-elements.
3. Export with `printBackground: true` or enable browser background graphics.

If the user says preview and PDF differ:

1. Make the screen layout itself A4-sized.
2. Keep print CSS minimal; hide only the control panel.
3. Avoid separate screen and print dimensions.