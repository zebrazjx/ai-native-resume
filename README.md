# AI Native Resume Skill

Turn a PDF/DOCX resume into an AI-native, editable, A4-perfect HTML resume.

This Verdent skill converts a user's resume into a structured `resume-data.js` file and renders it with a polished HTML template. The output can be opened in a browser, edited by AI, updated with a custom avatar, and exported as a one-page A4 PDF.

## What it does

- Parses a user-provided resume into structured data
- Fills an editable HTML resume template
- Keeps content AI-friendly via `resume-data.js`
- Supports avatar replacement from chat or browser upload
- Preserves A4 paper ratio: `210mm × 297mm`
- Iteratively adjusts layout until the page is full but not crowded
- Exports a one-page PDF with colors, borders, and section bars preserved

## Why this exists

Traditional PDF resumes are hard for AI to modify, personalize, and version. This skill turns a resume into a small web project:

```text
resume-data.js  -> structured career data
index.html      -> rendered resume
styles.css      -> A4 visual layout
script.js       -> rendering, copy, avatar upload, print
```

The result is easier for AI agents to edit, easier for humans to preview, and easier to export into polished PDF.

## Included template

The bundled template lives in:

```text
assets/template/
├── index.html
├── resume-data.js
├── script.js
├── styles.css
└── avatar.jpeg
```

The template is optimized for AI product manager resumes, but can be adapted to other roles.

## Usage in Verdent

Install or place this skill under Verdent's skill directory, then ask:

```text
帮我把这个 PDF 简历 HTML 化，并导出一页 A4 PDF
```

or:

```text
Convert this resume into an AI-native HTML resume using the A4 template.
```

The skill will:

1. inspect the uploaded resume,
2. copy the bundled template,
3. fill `resume-data.js`,
4. adjust layout for A4,
5. preview the HTML,
6. verify PDF export.

## Quality standards

The skill intentionally treats A4 layout as a hard acceptance criterion:

- exact A4 proportion: `210mm × 297mm`
- exactly one PDF page
- content fills the page well
- bottom whitespace target: roughly `12px-45px`
- internship/work experience gets the most visual weight
- personal info and other experience stay compact
- PDF must preserve background panels, blue section bars, borders, and avatar

If the page is too sparse or crowded, the skill must keep adjusting content length, font size, line-height, gaps, card padding, and avatar size until it passes.

## Manual PDF export

Use Chrome or Edge:

1. Open `index.html`
2. Click **打印 / 导出 PDF**
3. Select A4
4. Set margins to none
5. Enable background graphics
6. Save as PDF

## Built with Verdent

Built with [Verdent](https://www.verdent.ai) — an AI coding agent that handled the full workflow in a single conversation.
