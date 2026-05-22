# Project Memory

Ozgur Guler's personal technical website. Static site built with Astro under `site/`, deployed to GitHub Pages. Previous MkDocs material is preserved under `docs/` as archive/source.

## Where to find the rules

| Concern                                                                    | File               |
| -------------------------------------------------------------------------- | ------------------ |
| Goal and success criteria                                                  | `goal.md`          |
| Implementation plan                                                        | `plan.md`          |
| Content, navigation, deployment, public-facing language                    | `AGENTS.md`        |
| **Visual design system (typography, palette, layout, components, motion)** | **`front-end.md`** |

Before any visual or structural change to pages under `site/src/`, read `front-end.md` and stay inside its register. The site is editorial × engineering — warm paper, serif display, monospace meta, hairline rhythm — never SaaS landing or documentation theme.

Before any content, navigation, or deployment change, read `AGENTS.md`.

## Quick commands

```bash
cd site
npm run dev       # local dev
npm run build     # static build
npm test          # smoke tests
```

Run `npm run build` and `npm test` before handoff. Inspect changes in the browser when the work is visual.
