# Implementation Plan

## Summary

Implement the public website as a static Astro site in `site/`, preserving the existing MkDocs `docs/` tree as archive/source material. The finished site should be lean, attractive, personal, technical, and deployment-ready for GitHub Pages.

## Phase 1: Foundation

- Create and maintain `site/` as the active Astro app.
- Keep TypeScript enabled.
- Use plain global CSS and small Astro components.
- Avoid heavy UI frameworks, backend code, databases, auth, and unnecessary JavaScript.
- Keep the previous MkDocs content available under `docs/`.

Required scripts:

```bash
npm run dev
npm run build
npm run preview
npm run generate:images
npm test
```

## Phase 2: Information Architecture

Create the following public routes:

- `/`
- `/agents/`
- `/inference/`
- `/build-log/`
- `/blog/`
- `/books/`
- `/talks/`
- `/consulting/`
- `/investments/`
- `/startup-notes/`
- `/prime-directive/`
- `/about/`

`/agents/` and `/inference/` are retained as legacy entry points, but the active AI Agents and LLM Inference material now lives as grouped sections under `/build-log/`.

Use content collections for:

- `blog`
- `build-log`
- `books`
- `talks`
- `projects`
- `investments`

## Phase 3: Homepage

The homepage must contain, in order:

1. Crisp hero with Özgür Güler and the current "by day / by night" AI systems builder framing.
2. One real speaking/workshop photo.
3. A short "Start here" guidance index linking to Build Log, Books, Blog, Talks, Startups, and Consulting.
4. Contact links in the colophon/footer.

The homepage must stay simple, neat, and non-duplicative. Do not re-add book shelves, recent-post lists, startup cards, or detailed previews that repeat the subpages. Startup and investment content must not dominate the hero.

## Phase 4: Core Pages

### Build Log

The Build Log is now the public home for grouped project/work areas. It should start with:

1. Personal projects / fun projects.
2. AI agents.
3. LLM inference.
4. Recent build-log entries.

Do not list every GitHub repository here. Mention project families, systems themes, and what the work demonstrates.

### AI Agents Group

- agent memory
- long-running agents
- durable harnesses
- tool use and MCP
- evals and replay
- governance and observability
- enterprise deployment

### LLM Inference Group

Cover:

- serving stacks
- latency and throughput
- KV-cache and memory pressure
- batching and scheduling
- cost models
- GPU cloud and AI factory notes
- benchmarking methodology
- reliability and observability

## Phase 5: Supporting Pages

- Build Log: compact dated rows with tags and one-sentence summaries.
- Blog: clean technical blog index, not a raw list.
- Books: seven book cards with status, description, links where provided, and cover assets/placeholders.
- Talks: preserve My Talks and Book a Talk, with request details listed.
- Consulting: occasional, sober technical formats only.
- Startup Work: the public nav label is Startups, the route remains `/investments/`, and Enlighty.ai / Eachlabs.ai use public-safe relationship wording.
- Startup Notes: technical and market notes, not investment advice or a VC brand.
- AI Prime Directive: archive landing page, no longer homepage-dominant.
- About: concise technical background.

## Phase 6: Nano Banana Pro Assets

Create `site/prompts/nano-banana/` with prompt files for:

Book covers:

- `ai-inference-engineering.md`
- `ai-agents-in-production.md`
- `ai-data-integration-patterns.md`
- `ai-security.md`
- `modern-llms.md`
- `leveraging-technical-expertise.md`
- `leveraging-ai-expertise.md`

Website assets:

- `homepage-hero-abstract.md`
- `agents-section-visual.md`
- `inference-section-visual.md`
- `build-log-og-image.md`
- `blog-og-image.md`
- `talks-og-image.md`
- `startup-work-og-image.md`
- `consulting-og-image.md`
- `favicon-concept.md`

Social images:

- `og-home.md`
- `og-agents.md`
- `og-inference.md`
- `og-books.md`

Use Nano Banana Pro with Gemini through `site/scripts/generate-images.mjs` when either `GEMINI_API_KEY` or `GOOGLE_API_KEY` is present. Default model:

```text
gemini-3-pro-image-preview
```

Do not store credentials, browser sessions, or account login data. If API access is unavailable, keep prompt files and SVG/CSS placeholders.

## Phase 7: Deployment

- Use GitHub Pages as the default host.
- Build from `site/`.
- Upload `site/dist`.
- Preserve root `CNAME` if present.
- Do not use Azure App Service.
- Azure Static Web Apps remains a future option only for serverless APIs, gated resources, forms, preview environments, calculators, auth, or Azure architecture demo value.

## Test Procedure

From repo root:

```bash
cd site
npm install
npm run build
npm test
npm run preview
```

Confirm in the browser:

- `http://127.0.0.1:4321/`
- `http://127.0.0.1:4321/agents/`
- `http://127.0.0.1:4321/inference/`
- `http://127.0.0.1:4321/build-log/`
- `http://127.0.0.1:4321/blog/`
- `http://127.0.0.1:4321/books/`
- `http://127.0.0.1:4321/talks/`
- `http://127.0.0.1:4321/consulting/`
- `http://127.0.0.1:4321/investments/`
- `http://127.0.0.1:4321/startup-notes/`
- `http://127.0.0.1:4321/prime-directive/`
- `http://127.0.0.1:4321/about/`

Run guardrail checks:

```bash
git diff --check
rg -n "future London employer|AI consultant London|London employer|invest in the future|visionary founders|trusted by|private deal|investment memo|founder names|/Users/" site README.md goal.md plan.md AGENTS.md
```

Accept matches only in negative guardrails, environment variable names, or non-public developer documentation.

## Acceptance Criteria

- Astro static site builds successfully.
- Homepage feels simple, personal, technical, and credible.
- Homepage acts as a front door and does not duplicate the detailed subpages.
- AI Agents and LLM Inference are grouped under Build Log, while `/agents/` and `/inference/` remain lightweight legacy entry points.
- Blog and build-log lists are visually improved.
- Books page contains all seven books.
- Nano Banana Pro prompt files exist.
- Actual generated images are used if API access works; otherwise placeholders are used.
- Talks / Book a Talk is preserved and improved.
- Consulting page is visually consistent.
- Startup Work page includes Enlighty.ai and Eachlabs.ai with conservative wording.
- Startup Notes page exists and remains sober.
- AI Prime Directive archive exists.
- No credentials, fake metrics, hidden strategy, or confidential information are exposed.
