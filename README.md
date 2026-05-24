# Özgür Güler Personal Technical Website

This repository hosts a static Astro personal website deployed to GitHub Pages. The active site lives in `site/`; the earlier MkDocs content remains in `docs/` as archive/source material.

## Goals

- Make Özgür Güler's work legible through a simple personal landing page and focused subpages for build logs, technical writing, books, talks, consulting, selected startup work, and the AI Prime Directive archive.
- Keep the homepage as a clean front door: brief positioning, one speaking/workshop image, compact facts, and guidance links to the subpages.
- Keep AI Agents and LLM Inference material grouped under Build Log rather than as primary navigation sections.
- Keep the site static, fast, readable, and easy to operate.
- Keep startup and investment-adjacent material public-safe, sober, and technical.
- Preserve GitHub Pages as the default deployment target.

See `goal.md` for the product target, `plan.md` for implementation guardrails, and `AGENTS.md` for repo-local agent instructions.

## Local Development

Install dependencies:

```bash
cd site
npm install
```

Serve locally:

```bash
npm run dev
```

Open:

```text
http://127.0.0.1:4321/
```

Build and preview:

```bash
npm run build
npm run preview
```

## Image Assets

Nano Banana Pro prompt files live in:

```text
site/prompts/nano-banana/
```

Generated images, when available, go into:

```text
site/public/generated/
```

The generation script uses the Gemini API only when `GEMINI_API_KEY` or `GOOGLE_API_KEY` is already set locally:

```bash
cd site
npm run generate:images
```

No credentials are stored in the repository.

## GitHub Pages

The workflow in `.github/workflows/deploy-docs.yml`:

- installs Node dependencies from `site/package-lock.json`
- builds the Astro site with `npm run build`
- preserves a root `CNAME` file if present
- uploads `site/dist` to GitHub Pages
- triggers on push to `main` and manual workflow dispatch

Enable GitHub Pages from repository settings using the official GitHub Pages workflow.

## Verification

Run before handoff:

```bash
cd site
npm run build
npm test
cd ..
git diff --check
```

Guardrail scan:

```bash
rg -n "future London employer|AI consultant London|London employer|invest in the future|visionary founders|trusted by|private deal|investment memo|founder names|/Users/" site README.md goal.md plan.md AGENTS.md
```

Matches should only appear in negative guardrails, environment variable names, or non-public developer documentation.

## Hosting Policy

Default target: GitHub Pages at `https://ozgurguler.org/`.

Do not migrate this version to Azure App Service. Azure Static Web Apps is only a future option if the site adds serverless APIs, gated resources, form backends, preview environments, calculators, authentication, or explicit Azure architecture demo value.
