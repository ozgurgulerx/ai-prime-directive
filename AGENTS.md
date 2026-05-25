# Repository Instructions

## Purpose

This repository contains Özgür Güler's static personal technical website. The public site is now implemented as a lightweight Astro site in `site/`, with the previous MkDocs content preserved as source and archive material under `docs/`.

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
- claims that imply Özgür is trying to become a full-time investor
- hype language such as "visionary founders" unless quoting a public source
- "I invest in the future" style language

Do not make startup or investment content the homepage hero theme. A single public-safe
career-history sentence may mention selected technical advisory work for startups and VC
teams when it supports the bio rather than reads as fundraising or investment positioning.

## Current Public Positioning

The homepage is a simple personal front door, not a content mirror. It should stay inspired by the compact personal-homepage pattern of `https://yoheinakajima.com/`: a clear identity line, a short public bio, one compact career-history note, one strong speaking/workshop photo, and a small guide to the subpages.

Current public facts that may be used in homepage or about-page copy:

- Özgür is the MS Innovation Hub technical lead in Istanbul.
- Public technical focus: enterprise AI transformation, productionising AI agents, context engineering, data integration patterns, AI governance, AI infrastructure, LLM inference systems, EvalOps, and cloud architecture.
- Public career arc that may be used as supporting homepage/about-page context: service provider and telco networks at Cisco Systems UK; high-frequency trading infrastructure in London; startup cloud architecture at AWS; and production AI work at Microsoft.
- Side/public work: continual-learning AI book drafts, public build experiments, technical writing, talks/workshops, ENA.VC AI technology and technical diligence advisory, selected startup architecture work, and selected technical advisory work for startups and VC teams.

Do not duplicate the detailed contents of `/build-log/`, `/books/`, `/blog/`, `/talks/`, `/investments/`, or `/consulting/` on the homepage. The homepage should only guide visitors toward those sections.

Private positioning context may exist outside this repo, including the `litp2l-prep` project. Use it only to calibrate public-safe themes such as AI infrastructure, model serving, agents, governance, field deployment, and enterprise GTM. Never publish or mention private prep strategy, role-search context, compensation targets, target employers, or local filesystem paths.

### Technical Blog Entries

When adding a technical blog entry under `site/src/content/blog/`, include enough source metadata for the blog index to stay visually rich and attributable:

- If the post is mirrored from Medium, TDS, Microsoft Azure, or another public channel, set `sourceUrl` and the exact public `publication` label, such as `Microsoft Azure`, `TDS Archive`, or `Medium`.
- When the original article has a public title/hero image, add it as the blog thumbnail metadata and use a precise alt text. Prefer a stable local copy under `site/public/images/blog/` when practical; do not invent stock-like replacement art.
- Use the existing compact publisher/status UI to highlight publication channels. Do not create loud badges, logos, or marketing-style publisher blocks.
- Do not invent publication labels or imply a post appeared in a channel unless the public source confirms it.

### Page Titles, Thumbnails, and Logos

- Use title case / initial capital letters for public-facing page titles, section titles, card titles, workshop titles, book titles, project titles, and post titles. Preserve acronyms and established product casing such as `AI`, `LLM`, `RAG`, `EvalOps`, `ENA.VC`, and `.ai`.
- Do not force meta/UI labels into title case when the design system intentionally uses lowercase or uppercase monospace text, such as nav labels, buttons, eyebrows, status chips, and topic tags.
- For thumbnail logos, prefer real public logos only when they represent a real company, product, publication, sponsor, or project and the source is public-safe. Render them with the existing `.logo-mark` pattern, compactly and without "trusted by" styling.
- Do not use generated art as an official logo for an external company, publication, or product. Nano Banana Pro can be used for original thematic thumbnails, book covers, OG images, and owned-project visual marks when a concrete asset target exists and the local API key is already configured.

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
2. Build Log
3. Blog
4. Books
5. Talks
6. Consulting
7. Investments

The AI Agents and LLM Inference material should live as grouped sections under `/build-log/`, not as primary navigation items. The Startup Notes requirement is satisfied by the `/startup-notes/` page and startup/infrastructure sections linked from the Startup Work page. The AI Prime Directive content remains available as `/prime-directive/` and no longer dominates the homepage.

Keep `/agents/` and `/inference/` as lightweight legacy entry points that direct readers to `/build-log/#ai-agents` and `/build-log/#llm-inference`. Do not restore their old repo-grid pages unless explicitly requested.

## Build Log Structure

The `/build-log/` page should start with grouped sections, not individual GitHub repositories:

1. Personal projects / fun projects
2. AI agents
3. LLM inference
4. Recent build-log entries

It is acceptable to mention project families and what they demonstrate. Avoid turning the page into a raw repo directory.

## URL Routing

The canonical public site URL is `https://ozgurguler.org/`.

Astro is configured with `base: "/"` and `trailingSlash: "always"`. Keep internal links, generated routes, canonical URLs, and social URLs slash-terminated, for example `/books/`, `/build-log/`, `/blog/production-agent-workflows/`, and `/build-log/context-engineering/`. Direct non-slash variants such as `/books` are not the planned canonical routes.

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
