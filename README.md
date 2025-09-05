# AI Prime Directive — MkDocs Material site

This repository hosts a marketing + docs site built with MkDocs Material and deployed to GitHub Pages.

## Goals

- Introduce Ozgur Guler (AI consultant)
- Keep the AI Prime Directive docs in their own section (not on the homepage)
- Promote writing, newsletter, speaking, and courses
- Convert traffic into consulting leads (CTA + Formspree form)

## Local development

1) Install Python 3.10+ and pip
2) Install dependencies:

```bash
pip install mkdocs-material mkdocs-rss-plugin mkdocs-git-revision-date-localized-plugin mkdocs-minify-plugin mkdocs-privacy
```

3) Serve locally:

```bash
mkdocs serve
```

Open http://127.0.0.1:8000 to preview.

## Configuration

Update the following placeholders across files:

- `mkdocs.yml` → `site_url`, `repo_url`
- `docs/consulting.md` → `YOUR_FORMSPREE_ID`, `CALENDLY_URL`
- `docs/courses.md` → `YOUR_FORMSPREE_ID`
- `docs/newsletter.md` and `overrides/home.html` → `SUBSTACK_URL`

Optional: add a `CNAME` file at the repo root for a custom domain. The workflow will detect and set it during deploy.

## GitHub Pages

The workflow in `.github/workflows/gh-pages.yml`:

- Installs MkDocs + plugins
- Builds the site with `mkdocs build`
- Deploys `site/` to the `gh-pages` branch using `peaceiris/actions-gh-pages@v3`
- Triggers on push to `main`

Enable GitHub Pages:

- Settings → Pages → Deploy from branch → `gh-pages` → root

## Formspree setup

1) Create a new form at https://formspree.io/
2) Copy the form ID and replace `YOUR_FORMSPREE_ID` in:
   - `docs/consulting.md`
   - `docs/courses.md`
3) Optionally set up email notifications and spam filters.

## Calendly

1) Create a public booking link at https://calendly.com/
2) Replace `CALENDLY_URL` in `docs/consulting.md` and `docs/speaking.md`.

## Open Graph & favicon

- Replace `images/og.png` with a real 1200×630 image.
- Update `images/logo.svg` or provide a PNG favicon via `extra.head` if desired.

## Notes

- Homepage is a marketing page only; docs live under `Prime Directive` in the nav.
- Accessibility: visible focus outlines, sufficient contrast, ARIA labels on form inputs.
- Privacy: newsletter embed loads Substack assets; a plain link is provided as an alternative.

