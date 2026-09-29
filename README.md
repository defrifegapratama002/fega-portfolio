# Interactive Technology Portfolio — Defri Fega Pratama

> **I BUILD TECHNOLOGY TO SOLVE REAL PROBLEMS.**

Personal portfolio of **Defri Fega Pratama** — Software Engineer solving real problems with precise, creative, and modern solutions.

Built to the [Interactive Technology Portfolio Blueprint](./Interactive_Technology_Portfolio_Blueprint.md): not a CV, but a **living demonstration** of the skills it describes. *Don't just tell. Demonstrate.*

## What demonstrates what

| Skill | How the site proves it |
|---|---|
| Web / UI-UX | The site itself — responsive, accessible, reduced-motion aware |
| 3D | Real-time WebGL "Digital Core" hero (Three.js / R3F), camera moves on scroll |
| Motion | GSAP + ScrollTrigger storytelling (scrubbed pipelines, pinned "How I Think") |
| AI | In-browser "problem router" mini-demo (honestly labeled) |
| Computer Vision | Interactive Manga-OCR pipeline with real Web Speech TTS |
| Data | Interactive chart aggregating the real systems on the page (filter + hover) |
| Mobile | Interactive device replaying the AI tutor loop, pointer tilt |
| Automation | Manual → automated workflow switch |

## Stack

Next.js 15 (App Router, static export) · React 19 · TypeScript · Tailwind CSS 4 · Three.js / React Three Fiber · GSAP + ScrollTrigger · EN/ID bilingual (persisted toggle).

## Themes

Three themes, cycled by the dot in the nav and persisted in `localStorage` (`fega-theme`):

| Theme | Look |
|---|---|
| `merah` (default) | white ground, black ink, red accent, black co-accent |
| `ungu` | editorial poster: paper ground, purple accent, cyan co-accent |
| `hijau` | nature: washi-paper ground, matcha-green accent, vermilion co-accent, with a quiet Japanese *seigaiha* wave pattern and a kanji watermark in the background only |

Tokens live in `app/globals.css` under `:root[data-theme=...]`; the Japanese background is CSS-only and scoped to `hijau`.

## Structure

```
app/               layout (SEO), single-journey page, global styles
components/
  hero/            Hero + core statement
  3d/              DigitalCore (the one WebGL canvas on the site)
  navigation/      Floating nav + language toggle
  sections/        Tool → Ecosystem → AI/CV/Data/Web/Mobile/Automation →
                   HowIThink → ProblemToSolution → Projects → Knowledge →
                   About → VisionMission → Consult → Contact
  ui/              Section, Pipeline, ScrollFX (reveals), Magnetic
data/              projects.ts · technologies.ts · certificates.ts ·
                   vision.ts · consult.ts (data-driven)
lib/               i18n (EN/ID)
```

## Develop

```bash
npm install
npm run dev      # http://localhost:3000
npm run build    # static export → out/
```

## Deploy

- **GitHub Pages**: push to `main` — `.github/workflows/deploy.yml` builds with
  `NEXT_PUBLIC_BASE_PATH=/fega-portfolio` and publishes `out/`.
  (Repo Settings → Pages → Source: **GitHub Actions**.)
- **Vercel / custom domain**: import the repo, no basePath needed.

## Editing content

- Projects / case studies: `data/projects.ts` (every project answers problem → approach → technology → solution → result → lesson; keep status labels honest).
- Technology ecosystem: `data/technologies.ts`.
- Knowledge & certificates: `data/certificates.ts` — add real credentials with `credentialUrl` for the "Verify Credential" link. **Never invent credentials.**
- Vision & mission: `data/vision.ts`.
- Consult (visitor's problem → technology areas → case studies → first step → pre-filled email): `data/consult.ts`. `techKeys` reference `data/technologies.ts`, `projectSlugs` reference `data/projects.ts`.
- All copy is bilingual: `{ en: "...", id: "..." }`.
