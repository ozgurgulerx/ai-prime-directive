# AI Prime Directive — Living Document

This repository is a living knowledge base where I capture learnings, notes, and references about AI, systems, and engineering.

It is powered by MkDocs with the Material theme and mirrors the clean aesthetics I use in `openai-katas`.

## Local development

- Install dependencies: `pip install -r requirements.txt`
- Serve locally: `mkdocs serve` then open `http://127.0.0.1:8000/`

## Structure

- `mkdocs.yml` — site configuration and theme settings
- `docs/` — markdown content, assets (`stylesheets/`, `javascripts/`)

## Deploy

Push to `main` and GitHub Actions publishes to GitHub Pages. You can also build locally with `mkdocs build` to generate the static site into `site/`.
