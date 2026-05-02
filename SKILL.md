---
name: ai-native-resume
description: "This skill should be used when converting or tailoring a resume as an AI-native HTML resume. This includes PDF/DOCX resume uploads, 简历html化, HTML resume, resume to HTML, AI简历, resume-data.js, editable resume template, avatar upload, previewing in browser, exporting an A4 PDF, JD匹配, 岗位JD定制, targeted resume, resume tailoring, ATS-style keyword alignment, and generating a JD match report."
---

# AI-native Resume

## Overview

Convert an uploaded resume into a polished, editable, AI-friendly HTML resume using the bundled A4 template, or tailor an existing AI-native HTML resume to a target job description. Produce a local HTML project that can be opened in a browser, edited via structured data, customized for specific roles, and exported to PDF.

Keep the skill name `ai-native-resume`. Treat JD tailoring as a core workflow inside the same skill because it depends on the same structured data, HTML template, A4 fit loop, and PDF export pipeline.

Use the bundled template in `assets/template/` as the starting point:

- `index.html`
- `resume-data.js`
- `script.js`
- `styles.css`
- `avatar.jpeg`

For users who repeatedly tailor the same resume across many roles, optionally create or read a candidate material library using `references/candidate-material-library.md`. Load that reference only when the user asks to manage reusable projects, a base resume, or repeated JD-specific versions.

## Workflow Selection

Use the resume HTMLization workflow when the user provides a PDF/DOCX/raw resume and wants an AI-friendly HTML resume.

Use the JD tailoring workflow when the user provides:

- an existing AI-native HTML resume project or `resume-data.js`
- a target job description, JD, hiring post, or role requirements
- a request such as “根据这个岗位改简历”, “JD匹配简历”, “targeted resume”, “tailor my resume”, or “ATS优化”

If both a raw resume and a JD are provided, first convert the resume to the AI-native HTML structure, then run JD tailoring on the generated `resume-data.js`.

## Resume HTMLization Workflow

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

## JD Tailoring Workflow

1. Read the existing `resume-data.js` and inspect the rendered resume when useful.
   - If a candidate material library exists, also read `candidate-materials/self-profile.md`, `candidate-materials/resume-base.md`, and the relevant files under `candidate-materials/projects/`.
   - If no library exists, proceed from `resume-data.js`; do not require the user to set up a library for one-off tailoring.
2. Parse the JD into a role profile:
   - role title, level, domain, product/business direction
   - core responsibilities
   - required capabilities
   - preferred capabilities
   - tools, methods, and domain keywords
   - hidden evaluation signals such as ownership, data-driven work, cross-functional execution, AI literacy, growth, commercialization, or technical depth
3. Build a JD-to-resume evidence matrix before rewriting:
   - map every important JD requirement to one or more resume evidence points
   - classify each mapping as strong, partial, transferable, missing, or unsupported
   - identify which existing experiences deserve more visual and textual weight
   - identify unsupported JD requirements that must not be fabricated
4. Decide a tailoring strategy:
   - rewrite `basics.title`, `basics.intent`, and `basics.summary` to match the role honestly
   - reorder or rephrase `highlights` so the strongest JD-relevant capabilities appear first
   - prioritize internship/work achievements that prove the JD’s core requirements
   - compress less relevant experience instead of deleting meaningful evidence by default
   - preserve the A4 one-page constraint
5. Select and reframe experience:
   - choose the 2-4 strongest experiences or projects for this JD
   - explain important selected and excluded experiences in the match report
   - reframe the same project by role without changing facts, e.g. product, growth, engineering, operations, or commercialization
   - keep interview-style STAR detail in source notes or the report, not inside the one-page resume unless it compresses cleanly
6. Rewrite `resume-data.js` conservatively:
   - improve positioning, specificity, and keyword alignment
   - convert vague bullets into evidence-backed impact statements
   - keep every claim traceable to the original resume
   - avoid adding fake companies, fake metrics, fake tools, fake responsibilities, or inflated ownership
7. Validate JavaScript syntax, browser rendering, A4 fit, and PDF page count.
8. Produce a concise JD match report with:
   - overall match assessment
   - strongest aligned experiences
   - selected and excluded experiences with reasons
   - keyword/capability coverage
   - weak or missing evidence
   - unsupported claims intentionally avoided
   - files changed and export status

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

## JD Matching Rules

Treat JD tailoring as evidence-driven repositioning, not keyword stuffing.

Use this matching model:

| Match Type | Meaning | Action |
| --- | --- | --- |
| Strong | Resume contains direct evidence for the JD requirement | Move forward and sharpen wording |
| Partial | Resume contains related evidence but lacks exact scope or keywords | Rephrase with accurate transferable language |
| Transferable | Resume proves the underlying capability in another context | Connect the capability without pretending domain experience |
| Missing | No evidence exists in the resume | Leave out or ask for additional facts if essential |
| Unsupported | The JD asks for something the resume cannot support | Do not invent; mention as a gap in the report |

Apply role-specific emphasis:

- AI product roles: model capability understanding, user scenarios, prompt/agent/RAG/workflow literacy, evaluation, data feedback, productization
- growth product roles: metrics, funnel, conversion, retention, experiments, segmentation, growth loops
- platform/B2B product roles: requirements abstraction, workflow design, API/developer experience, enterprise scenarios, stakeholder alignment
- commercialization roles: revenue model, customer needs, pricing, conversion, sales/operations collaboration, business metrics
- technical roles: stack relevance, project depth, system design, measurable engineering output, code or deployment evidence

Keep the most JD-relevant proof in the first third of the resume whenever possible.

## Optional Candidate Material Library

Use a persistent material library when the user applies to many roles or has more source material than fits in one HTML resume.

Recommended local structure:

```text
candidate-materials/
├── self-profile.md
├── resume-base.md
└── projects/
```

Use `self-profile.md` for stable background, preferences, and differentiators. Use `resume-base.md` for the complete unsqueezed history. Use one project file per reusable project, with context, actions, results, raw materials, and capability tags.

When creating or updating the library:

- keep raw materials separate from final resume copy
- preserve complete source detail even if the A4 resume is compressed
- tag each project by capability, domain, tools, and ownership level
- do not load every project into context if the library becomes large; inspect filenames/tags first, then read likely matches

When tailoring from the library:

- select the strongest projects for the JD before rewriting
- state why selected projects were selected
- state why notable excluded projects were excluded
- use project raw material to improve specificity while preserving truthfulness

## Truthfulness and Risk Rules

Never fabricate:

- employment, internships, education, awards, certifications, or projects
- quantitative metrics not present or inferable from source material
- tools, programming languages, model frameworks, or platforms
- ownership level such as “led”, “owned”, “independently built”, or “managed” unless supported

Prefer safer verbs when evidence is limited:

- use “参与”, “协助”, “负责部分”, “支持”, “整理”, “推动” for partial ownership
- use “熟悉”, “了解”, “使用过” only when the original evidence supports it
- avoid turning interest or observation into work experience

If a JD-critical requirement is missing and the user may plausibly have it, ask for one focused clarification or list it in the match report as information to supplement.

## Versioning Rules for Tailored Resumes

When tailoring an existing resume, preserve the original by default unless the user explicitly asks to overwrite it.

Recommended output patterns:

- copy the existing resume project to a role-specific folder such as `resume-ai-product/`
- or create a role-specific data file such as `resume-data.ai-product.js` only if the template is adjusted to load it
- include a short `jd-match-report.md` when the task involves JD tailoring
- if a material library is used, keep it outside role-specific output folders so multiple tailored versions share one source of truth

If the user asks for a single final resume only, overwriting `resume-data.js` is acceptable after preserving enough context in the conversation or report.

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