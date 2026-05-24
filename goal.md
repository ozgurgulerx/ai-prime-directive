# Site Goal

## Objective

Build and maintain a lean Astro personal website for Özgür Güler that makes his work legible through AI agents, AI inference, build logs, technical writing, books, talks, consulting, selected startup work, and the AI Prime Directive archive.

The site should feel like a compact proof-of-work record for a technical builder, not a documentation index, VC brand, generic AI consultancy page, or job-search artifact.

## Success Criteria

- The active public site is an Astro static site under `site/`.
- The previous MkDocs content remains preserved as source/archive material under `docs/`.
- GitHub Pages remains the default deployment target.
- The homepage no longer looks like MkDocs or a raw blog index.
- The first viewport is crisp, personal, and technical, with no startup or investment content in the hero.
- Agents and Inference are the two most prominent homepage wedges.
- The top navigation is: Home, Agents, Inference, Build Log, Blog, Books, Talks, Consulting, Startups.
- The homepage includes:
  - crisp hero
  - AI Agents and AI Inference wedges
  - current/recent work cards
  - build-log preview
  - technical blog preview
  - books preview
  - talks/workshops preview
  - selected startup work preview
  - footer contact links
- `/agents/` explains memory, long-running workflows, harnesses, tool use/MCP, evals/replay, and enterprise deployment.
- `/inference/` explains serving, latency/throughput, KV-cache pressure, batching, cost models, GPU cloud, benchmarking, and observability.
- `/build-log/` renders compact dated entries with summaries and tags.
- `/blog/` renders technical posts as clean rows/cards with summaries and tags.
- `/books/` includes all seven listed book projects with status, description, links where provided, and cover placeholders or generated images.
- `/talks/` preserves and improves My Talks / Book a Talk content.
- `/consulting/` exists with sober, non-salesy formats.
- `/investments/` exists as Startup Work with Enlighty.ai and Eachlabs.ai using public-safe wording.
- `/startup-notes/` exists as a sober technical and market notes page for startup/infrastructure thinking.
- `/prime-directive/` preserves the AI Prime Directive as an archive entry point.
- Nano Banana Pro prompt files exist for all book covers and key website/social visuals.
- If a Gemini image API key is locally available, `npm run generate:images` can generate images into `site/public/generated/` without storing credentials.
- If image generation is unavailable, CSS/SVG placeholders remain attractive and the prompts are ready for manual generation.
- `npm run build` passes before handoff.
- `npm test` passes before handoff.
- `git diff --check` passes before handoff.

## Non-Goals

- Do not migrate this version to Azure App Service.
- Do not introduce a server runtime, database, auth, backend, or form handling unless explicitly requested later.
- Do not position Özgür as trying to become a full-time investor.
- Do not make the site look like a VC personal brand.
- Do not use hype language, fake metrics, decorative gradients, stock imagery, giant portraits, animated hero sections, or "trusted by" logos unless real and public.
- Do not expose hidden job-search strategy, private founder details, fund details, credentials, or non-public diligence analysis.
- Do not create heavy JavaScript or animation.

## Future Hosting Option

Azure Static Web Apps is acceptable only if the site later adds serverless APIs, gated resources, a form backend, preview environments, calculators, authentication, or explicit Azure architecture demo value.
