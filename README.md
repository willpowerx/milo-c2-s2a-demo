# milo-c2-s2a

Standalone Milo C2 block demos with S2A design tokens, deployed on Vercel.

## What is this?

A lean extraction of [Adobe Milo](https://github.com/adobecom/milo)'s C2 block system, packaged for static hosting on Vercel. This proves that C2 blocks can render outside of AEM Edge Delivery — useful for demos, prototyping, and stakeholder reviews.

## Included blocks

| Block | Status | Description |
|---|---|---|
| `comparison-table-c2` | ✅ Live | 4-column Acrobat pricing table with expandable sections |
| `rich-content` | ✅ Live | Text/CTA content block |
| `section-metadata` | ✅ Live | Section styling (dark theme, spacing) |
| `marquee-c2` | 🔜 Coming | Hero marquee with router |
| `carousel-c2` | 🔜 Coming | Elastic carousel |

## Local development

```bash
npm run dev
# → http://localhost:3000
```

## Deploy to Vercel

```bash
# Via CLI
npx vercel

# Or connect the GitHub repo in Vercel dashboard
# Framework: Other
# Output directory: public
# Build command: (leave empty)
```

## Architecture

```
public/
├── index.html                    # Landing page
├── demos/
│   └── comparison-table/         # Demo pages
├── libs/
│   ├── scripts/scripts.js        # Patched Milo entry point
│   ├── utils/utils.js            # Full Milo runtime (block auto-loader)
│   ├── c2/blocks/                # C2 block JS/CSS
│   ├── c2/styles/                # S2A design tokens + grids
│   └── styles/                   # Base Milo styles
```

## How it works

The Milo runtime (`utils.js`) walks the DOM, finds blocks by CSS class name, and dynamically imports their JS/CSS from `/libs/c2/blocks/`. The `<meta name="foundation" content="c2">` tag tells it to use C2 block paths. No AEM or Edge Delivery is needed — the HTML is pre-baked and blocks self-initialize.

Non-critical features (analytics, geo-routing, personalization) fail silently since their dependencies aren't included.
