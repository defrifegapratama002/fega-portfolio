# Defri Fega Pratama — portfolio

Personal site of **Defri Fega Pratama**, problem solver and software engineer.
One static page: the work with its real status, the fields of work, five
scroll-driven "lab" chapters with small demos, tools, about, contact.

## Stack

Next.js 15 (App Router, static export) · React 19 · TypeScript · Tailwind CSS 4.
No animation library and no WebGL: the chapter scenes are hand-coded SVG driven
by a CSS variable that follows scroll position (`components/ui/ScrollBackdrop.tsx`).
Copy is bilingual (EN/ID, toggle persisted in `localStorage` as `fega-lang`).

## Themes

Four themes, all selectable from the picker in the nav, persisted as `fega-theme`:

| Theme | Look |
|---|---|
| `merah` (default) | white ground, black ink, red accent |
| `gelap` | near-black ground, off-white ink, red accent |
| `ungu` | paper ground, purple accent, blue co-accent |
| `hijau` | washi-paper ground, matcha accent, vermilion co-accent, *seigaiha* wave pattern and a kanji watermark in the background only |

Tokens live in `app/globals.css` under `:root[data-theme=...]`; the theme list is
in `lib/theme.tsx` and in the pre-hydration script in `app/layout.tsx`.

## Structure

```
app/               layout (fonts, SEO), the single page, global styles
components/
  hero/            Hero
  navigation/      Nav, ThemePicker
  sections/        Projects, WhatIBuild, Lab, AI/Vision/Data/Web/Mobile/Automation
                   demos, Experience (hidden until data exists), Stack, About,
                   Consult, Contact
  ui/              Section, Chapter + ChapterScene (scroll scenes), ScrollBackdrop,
                   Gonjong (brand mark)
data/              brand, projects, builds, chapters, consult, exploring,
                   experience, stack, technologies
lib/               i18n, theme, site, backdrops (file-system media discovery)
public/backdrops/  optional footage per chapter (see its README)
public/brand/      optional portrait.jpg
```

## Develop

```bash
npm install
npm run dev      # http://localhost:3000
npm run build    # static export → out/
```

Do not run `build` while `dev` is running; they share `.next/`.

## Deploy

- **GitHub Pages**: push to `main`; `.github/workflows/deploy.yml` builds with
  `NEXT_PUBLIC_BASE_PATH=/fega-portfolio` and publishes `out/`.
- **Custom domain / Vercel**: import the repo, no base path needed; set
  `NEXT_PUBLIC_SITE_URL` for canonical URLs.

## Editing content

- Identity, headline, intro, education, contacts: `data/brand.ts`.
  `whatsapp` / `linkedin` left as `null` are not shown.
- Projects: `data/projects.ts` (problem → approach → what was built → result;
  keep status labels true; `demoUrl` / `sourceUrl` only when they exist).
- Fields and the six working steps: `data/builds.ts`.
- Chapter scenes and their cases: `data/chapters.ts`, `components/ui/ChapterScene.tsx`.
- Consult answers: `data/consult.ts`.
- What is being studied: `data/exploring.ts` (draft, edit freely).
- Experience: `data/experience.ts` (section appears once it has entries).
- All copy is `{ en: "...", id: "..." }`. Nothing on the site is invented:
  no made-up clients, numbers or credentials.
