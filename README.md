# FEGA — Portfolio

Personal portfolio of **Defri Fega Pratama** (Fega) — full-stack developer from Batam, Indonesia.

Live concept: *cinematic brand worlds* × *factory-grade business systems*, presented as a numbered-chapter "studio dossier".

## Stack

Deliberately **zero dependencies** — the same "a lot with a little" philosophy the portfolio describes:

- One `index.html`, one `styles.css`, one `main.js`. No framework, no build step, no npm.
- Google Fonts (Fraunces · Outfit · JetBrains Mono) is the only external resource.
- Hand-drawn animated SVG vignettes per project (no screenshots needed).
- Vanilla features: EN/ID language toggle, light/dark theme (both persisted), scroll-progress bar, chapter rail, IntersectionObserver reveals, animated counters, magnetic buttons, ambient particle canvas.
- `prefers-reduced-motion` honored everywhere; works without JavaScript (content stays visible).

## Run locally

Just open `index.html` in a browser, or serve the folder:

```bash
npx serve .
# or
python -m http.server 8080
```

## Deploy to GitHub Pages

```bash
git init
git add .
git commit -m "feat: portfolio v1"
gh repo create fega-portfolio --public --source=. --push
```

Then on GitHub: **Settings → Pages → Source: Deploy from a branch → `main` / `(root)` → Save.**
The site will be live at `https://<username>.github.io/fega-portfolio/` within a minute or two.

(Optional) custom domain: add a `CNAME` file containing your domain and point DNS at GitHub Pages.

## Editing content

- All copy lives in `index.html` (English) and in the `ID` dictionary at the top of `main.js` (Indonesian).
- Each project card is one `<article class="work">` with its accent color set inline via `--work-accent`.
- Contact email lives in two places: the `#copy-email` button's `data-email` and the visible line below it.
