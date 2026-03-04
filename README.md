# LabPilot — Static Landing & Docs Page

This directory contains the **static marketing/documentation page** for the LabPilot (vibeCR) project.
It is a standalone HTML/CSS/JS site designed for GitHub Pages — no build step, no framework, no backend calls.

## What it covers

- **Hero** — Product name, tagline, animated stats strip
- **Quickstart** — 4-step workflow cards (Undermind import, Zotero import, Vibe Research, Vibe Coding)
- **Demo Projects** — 20 realistic research project cards with search, filter, and expand
- **Literature Workflow** — Undermind vs Zotero comparison, unified data model
- **Features** — 13 feature cards in 3 clusters (Literature, Execution, Reporting)
- **Docs** — Core objects, daily/weekly workflow, local web AI usage
- **FAQ** — 10 questions rendered from config
- **Footer** — GitHub link, license, credits

## File structure

```
page_site/
  index.html              <- Entry point (all sections)
  .nojekyll               <- Disables Jekyll on GitHub Pages
  config/
    site.config.json      <- Product name, tagline, stats, quickstart, features, FAQ
  assets/
    styles.css            <- Design tokens, layout, responsive, animations
    app.js                <- Interactivity: scroll reveal, counters, demo cards, TOC
    demo-data.json        <- 20 demo project cards (title, tags, metrics, steps, artifacts)
  screenshots/            <- Placeholder for app screenshots
  README.md               <- This file
```

## How to edit

### Product name & tagline
Edit `config/site.config.json`:
```json
{
  "productName": "LabPilot",
  "subtitle": "Literature-to-Execution Workspace",
  "tagline": "From papers to artifacts — one disciplined workflow."
}
```
The JS populates all `brand-name` and `brand-subtitle` elements, the hero title, and the page `<title>`.

### GitHub link
Edit `config/site.config.json`:
```json
{ "githubUrl": "https://github.com/Mr-Tieguigui/vibeCR" }
```
All elements with class `github-link` are updated automatically.

### Stats numbers
Edit `config/site.config.json`:
```json
{
  "stats": { "projects": 24, "papers": 1847, "steps": 312, "reports": 96 }
}
```
The count-up animation targets these values.

### Demo dataset
Edit `assets/demo-data.json`. Each entry:
```json
{
  "id": "unique-id",
  "title": "Project Title",
  "definition": "One-line description.",
  "tags": ["tag1", "tag2"],
  "status": "Active",
  "papers": 47,
  "steps": 18,
  "artifacts": 6,
  "vcProgress": 72,
  "vrProgress": 85,
  "lastUpdated": "2025-03-04",
  "exampleSteps": ["Step 1", "Step 2"],
  "exampleArtifacts": ["file1.py", "file2.json"]
}
```

### Quickstart steps
Edit `config/site.config.json` -> `quickstart` array. Each entry has `num`, `title`, `whatYouDo`, `whatYouGet`, and `code`.

### Features
Edit `config/site.config.json` -> `features` object with keys `literature`, `execution`, `reporting`. Each is an array of `{ icon, title, desc }`.

### FAQ
Edit `config/site.config.json` -> `faq` array of `{ q, a }` objects.

## Handoff interfaces

For future open-source release, these are the integration points:

| Interface | File | Purpose |
|-----------|------|---------|
| `productName`, `subtitle`, `tagline` | `config/site.config.json` | Branding text |
| `githubUrl` | `config/site.config.json` | Repository link |
| `stats` | `config/site.config.json` | Hero counter targets |
| `quickstart` | `config/site.config.json` | 4-step workflow content |
| `features` | `config/site.config.json` | Feature grid content |
| `faq` | `config/site.config.json` | FAQ content |
| Demo data schema | `assets/demo-data.json` | Project showcase cards |
| Section anchors | `index.html` | `#quickstart`, `#demo`, `#literature`, `#features`, `#docs`, `#faq` |
| Design tokens | `assets/styles.css` `:root` | Colors, spacing, radius, shadows, typography |
| TOC sidebar | `index.html` `.toc` | Desktop "On this page" navigation |

## Design tokens

All visual tokens are defined as CSS custom properties in `assets/styles.css` under `:root`.
Dark mode tokens are defined under `@media (prefers-color-scheme: dark)`.

## Accessibility

- Basic ARIA labels on nav, search, filter, FAQ toggles
- `prefers-reduced-motion` respected (all animations disabled)
- Semantic HTML: `nav`, `section`, `aside`, `footer`, `article`
- Mobile hamburger menu with keyboard support
