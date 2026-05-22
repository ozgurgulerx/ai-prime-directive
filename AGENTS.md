# Repository Instructions

## Purpose

This repository contains Ozgur Guler's static personal technical website. The public site is now implemented as a lightweight Astro site in `site/`, with the previous MkDocs content preserved as source and archive material under `docs/`.

Use `goal.md` as the product target and `plan.md` as the implementation guardrail.

## Core Constraints

- Keep the public site static.
- Use Astro as the active public website framework.
- Keep GitHub Pages as the default deployment target.
- Do not migrate this version to Azure App Service.
- Do not add a server runtime, backend API, auth, or database unless explicitly requested.
- Preserve custom domain behavior if a root `CNAME` file exists.
- Respect existing uncommitted work. Do not revert changes you did not make.
- Leave unrelated untracked files untouched.

## Content Guardrails

The site should feel like a high-signal technical record: simple, personal, technical, credible, and easy to scan.

Allowed public content themes:

- AI agents
- AI inference
- build logs
- technical blog posts
- books
- talks and workshops
- consulting formats
- startup and investment-adjacent records
- AI Prime Directive archive material
- AI infrastructure markets
- startup architecture
- technical diligence-style frameworks
- cloud GTM and deployment tradeoffs
- domain AI systems

Startup and investment-adjacent content must be sober and public-safe.

Do not publish:

- confidential deal or client details
- private founder details
- private investment memos
- confidential analysis
- hidden job-search strategy
- "London employer" language
- claims that imply Ozgur is trying to become a full-time investor
- hype language such as "visionary founders" unless quoting a public source
- "I invest in the future" style language

Do not put startup or investment content in the homepage hero.

## Design Guardrails

The full visual design system — typography stack, palette tokens, layout primitives, component rules, and motion budget — lives in `front-end.md`. Read it before any visual or structural change to pages under `site/src/`. The guardrails below are content/structure rules and remain in force; `front-end.md` is the source of truth for visual register.

Use:

- narrow essay width
- card grids for overview pages
- compact dated rows for blog and build log pages
- topic tags
- status labels
- short summaries
- "what it demonstrates" fields
- related artifact links where public-safe
- minimal JavaScript
- semantic HTML

Avoid:

- decorative gradients
- stock images
- animated hero sections
- giant portraits
- consulting slogans
- fake metrics
- exaggerated seniority
- "trusted by" logos unless real and public
- heavy JavaScript
- unnecessary external dependencies

## Navigation

The active Astro navigation should include:

1. Home
2. Agents
3. Inference
4. Build Log
5. Blog
6. Books
7. Talks
8. Consulting
9. Investments

The Startup Notes requirement is satisfied by the `/startup-notes/` page and startup/infrastructure sections linked from the Startup Work page. The AI Prime Directive content remains available as `/prime-directive/` and no longer dominates the homepage.

## Nano Banana Pro Assets

Use Nano Banana Pro through the Gemini API only when a local environment variable is already configured:

- `GEMINI_API_KEY`, or
- `GOOGLE_API_KEY`

Never hardcode or commit API keys, passwords, browser sessions, or account credentials. Do not automate login to `ozgur@graph-atlas.com`.

The default image model for professional website/book assets is:

```text
gemini-3-pro-image-preview
```

Prompt files live in `site/prompts/nano-banana/`. Generated assets, when created, live in `site/public/generated/`.

## Development Workflow

Before editing, inspect the current structure and related pages. Prefer small, scoped changes that match the Astro component and content collection patterns.

Use `rg` for search and `rg --files` for file discovery.

For manual edits, use patch-based edits. Do not rewrite unrelated files. Do not format or regenerate files that are not part of the task.

If content changes introduce a new public claim about advisory activity, startup ecosystems, employers, partners, or market activity, verify the claim is public-safe or keep it generic.

## Verification

Run before handoff:

```bash
cd site
npm run build
npm test
cd ..
git diff --check
```

Also inspect for prohibited public-facing language:

```bash
rg -n "future London employer|AI consultant London|London employer|invest in the future|visionary founders|trusted by|private deal|investment memo|founder names|/Users/" site README.md goal.md plan.md AGENTS.md
```

Matches are acceptable only when they appear as negative guardrails, environment variable names, or non-public developer documentation.

## Deployment

Use GitHub Pages. The official Pages workflow builds the Astro site from `site/`, uploads `site/dist`, and preserves a root `CNAME` file when present.

Azure Static Web Apps is only a future option if the site later adds serverless APIs, gated resources, form backends, preview environments, calculators, authentication, or explicit Azure architecture demo value.
