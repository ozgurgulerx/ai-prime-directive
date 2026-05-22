# Front-End Design System

Design language for the public site under `site/`. All visual and structural decisions on the homepage and supporting pages must defer to this document. Content rules and deployment constraints live in `AGENTS.md`.

The site is a public record for a senior AI systems builder. The register is **editorial × engineering**: warm paper background, refined serif display, monospace meta, hairline rhythm. It must read as quiet, confident, and high-value — never as a SaaS landing page or a documentation theme.

## Design Intent

| Property | Yes                                 | No                                    |
| -------- | ----------------------------------- | ------------------------------------- |
| Tone     | Quiet confidence, curated record    | Marketing energy, growth-hack landing |
| Weight   | Editorial, magazine-grade           | Default Tailwind / Material           |
| Density  | Generous whitespace, hairline rules | Dense card grids, boxy chrome         |
| Colour   | One restrained accent               | Brand gradients, multiple hues        |
| Motion   | Static, micro-hover only            | Hero animations, scroll-jacking       |
| Evidence | Real titles, dates, links           | Fake metrics, "trusted by", stock     |

## Typography

Three families, loaded once in `BaseLayout.astro` via Google Fonts.

| Role                       | Family                            | Notes                                                                                               |
| -------------------------- | --------------------------------- | --------------------------------------------------------------------------------------------------- |
| Display & emphasis         | **Newsreader** (variable, italic) | Used for `h1`, `h2`, `.brand`, book titles on the shelf, the `<em>` inside hero headings            |
| Body & UI                  | **Inter**                         | Default `--sans`. Weights 400/500/600/700                                                           |
| Meta, eyebrows, dates, nav | **JetBrains Mono**                | Lowercase, letter-spaced. Reserved for non-prose: eyebrows, dates, status chips, nav, button labels |

Custom properties: `--serif`, `--sans`, `--mono`. Never hard-code font names in component CSS.

### Type scale & rules

- `h1` — `clamp(2.6rem, 6.2vw, 5.4rem)`, serif, `font-weight: 400`, `letter-spacing: -0.02em`, `line-height: 1`. Always allow `<em>` inside `h1` for a single italic accent phrase in `--accent`.
- `h2` — `clamp(1.7rem, 3.2vw, 2.4rem)`, serif, `font-weight: 400`.
- `h3` — Inter, 600, 1.02rem. Exception: `h3` inside `.practice` and `.shelf-item` uses serif 400.
- Body — 16.5px, line-height 1.6.
- Lede — 1.18rem, `--ink-soft`, max 64ch.
- Eyebrow — mono, 0.72rem, 0.14em tracking, uppercase, `--muted`.
- Never use uppercase on serif text. Uppercase belongs to monospace meta only.

## Colour — Cambridge Press

Palette inspired by **Penguin Modern Classics** covers: warm cream paper, deep racing green, gilt rule. The register signals editorial weight, library-grade seriousness, and book-as-artefact.

| Token            | Value                    | Use                                                                                                              |
| ---------------- | ------------------------ | ---------------------------------------------------------------------------------------------------------------- |
| `--paper`        | `#f3efe5`                | Page background, card surface                                                                                    |
| `--paper-tint`   | `#ebe6d8`                | Empty-state surfaces                                                                                             |
| `--ink`          | `#14201a`                | Primary text, sticky-header brand (green-tinted near-black)                                                      |
| `--ink-soft`     | `#2c3a32`                | Lede, secondary body                                                                                             |
| `--muted`        | `#6b7570`                | Meta, dates, eyebrows, nav                                                                                       |
| `--line`         | `#ccd0c4`                | Hairline rules, card borders                                                                                     |
| `--line-strong`  | `#a9b0a1`                | Default link underline, cover shadow base                                                                        |
| `--accent`       | `#2f5b3c`                | One accent: italic emphasis, status, hover state, Roman numerals, cover bands                                    |
| `--accent-quiet` | `rgba(47, 91, 60, 0.08)` | Index/list hover wash only                                                                                       |
| `--gilt`         | `#b1924c`                | **Reserved**: only the `.cover-typo` 2px rule between band and centre. Never as a heading, body, or link colour. |

**Rules**

- The accent must appear sparingly: at most one accented italic phrase per heading; status labels; Roman numeral section markers; the hover state of index rows; the 2px left rule on `.card.accent`; the Penguin-style cover bands. Do not tint backgrounds with the accent.
- `--gilt` is a single-use token. It exists only to give cover bands their quiet luxury. If you find yourself reaching for it anywhere else, the answer is no — pick `--accent` or `--line-strong` instead.
- Do not introduce a dark mode unless requested. The cream paper is the brand surface.
- No gradients, no glassmorphism beyond the sticky-header's subtle `backdrop-filter` blur.
- Past palettes considered and discarded: Editorial Cream + Terracotta (too common among technical writers), Steel & Bone (cool blue is increasingly generic among dev-tools sites), Nocturne (fights the book metaphor), Tokyo Press (hanko reference borrowed). One-page previews of each remain at `/palettes.html` and `/palette-*-preview.html` at the repo root for reference.

## Layout

Container width `--max: 1100px`; reading measure `--measure: 64ch`.

### Vertical rhythm

- Page top padding: `88px` desktop, `48px` mobile.
- Section spacing: `.section { margin-top: 96px; padding-top: 28px; border-top: 1px solid var(--line); }`.
- Section heading + body gap: `32px`.
- The page should breathe. If two sections feel adjacent, increase spacing rather than adding a box.

### Section anatomy

```
.section
  .section-head
    .section-marker    ← serif italic Roman numeral (I, II, III…), accent at 55% opacity
    .eyebrow           ← mono uppercase
    h2                 ← serif 400, balanced
    p                  ← optional one-paragraph lead
    a.button           ← optional right-aligned text-link ("view all →")
  [content primitive]  ← one of: .index-list, .practice, .shelf, .split-lists, .grid
```

Every homepage section follows: marker → eyebrow → h2 → optional lead. Sub-pages may omit the Roman marker. No exceptions on the eyebrow + serif h2.

### Page-level frames

| Frame          | Use                                                                                                       |
| -------------- | --------------------------------------------------------------------------------------------------------- |
| `.masthead`    | Publication banner above the hero on the homepage. Mono uppercase: era · place/role · hairline · contact. |
| `.colophon`    | Editorial closer at the foot of the homepage. Serif italic mark + mono meta + mono lowercase reach grid.  |
| `.now-strip`   | Three-key dated focus strip directly under the hero (`Now` / `Building` / `Open to`).                     |
| `.site-header` | Sticky thin nav, present on every page.                                                                   |
| `.site-footer` | Single-line global trailing bar, present on every page (slimmed when colophon is present).                |

### Primitives

| Primitive                | Use for                              | Notes                                                                                                                                                                                                                            |
| ------------------------ | ------------------------------------ | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `.index-list`            | Curated, ranked artefacts            | Numbered `№ 01` mono marks, hairline rows, hover wash + 12px slide-in                                                                                                                                                            |
| `.dated-list`            | Time-ordered essays / build log      | Mono date column, two-line title + subtitle                                                                                                                                                                                      |
| `.practice`              | Two text-only columns with a divider | Used for Agents / Inference dual-track, startup work, anything that should not be a card                                                                                                                                         |
| `.shelf`                 | Books or visual artefacts            | Four-up grid; typographic CSS covers (`.cover-typo`) by default; serif title + mono status                                                                                                                                       |
| `.grid.two/.three/.four` | Card overview pages                  | Hairline-bordered grid; cards are flat, no shadows                                                                                                                                                                               |
| `.row-card`              | Cross-cutting items inside `.rows`   | 132px meta column + body                                                                                                                                                                                                         |
| `.cover-typo`            | Book covers without generated art    | Cream gradient surface, inset hairline frame, mono `Vol. N` series mark, serif italic title, mono author mark. Lifts 3px on hover. Use when book cover art is unavailable; never mix with photographic covers on the same shelf. |

Cards (`.card`) sit on `--paper`, divided by a 1px hairline grid. They never get rounded shadows, never get more than 8px radius, and never use coloured backgrounds. The accent variant uses a 2px left rule only.

## Motion

- 120–160ms ease on link colour, underline colour, and the index-list hover slide.
- No scroll animations. No fade-ins. No parallax. No carousels.
- `prefers-reduced-motion` is implicitly satisfied because the motion budget is already near zero.

## Components

When adding or modifying components in `site/src/components/`, follow these rules.

- `Header.astro` — sticky, hairline bottom border, serif italic brand on the left, monospace lowercase links on the right. Do not introduce a dropdown or hamburger; mobile collapses to a column.
- `Footer.astro` — single hairline top, one slim monospace line (`Ozgur Guler · MMXXIV — YYYY` on the left, `London · Built with Astro · No tracking` on the right). Deliberately tiny because the homepage carries the rich closer in `.colophon`. Do not re-introduce link rows here.
- `Section.astro` — keep the API `eyebrow / title / intro / href / linkLabel`. Always render the eyebrow above the title.
- `Card.astro` — keep API stable. Status renders as a mono uppercase mark in `--accent`. Chips render with a `· ` separator, not pill chrome.
- `BookCard.astro` and `.shelf-item` — cover gets a subtle dropshadow only on `.shelf`. Inline cards stay flat.
- `PostList.astro` — hairline rows, mono date, two-line title + summary.

## Iconography & Imagery

- Use a single arrow glyph (`→`) for text-link affordances. Do not introduce icon fonts.
- No emoji in headings, body, or UI labels. The brand voice is sober.
- Book covers and OG images come from `site/prompts/nano-banana/` per `plan.md`. When unavailable, the SVG placeholders in `/generated/placeholders/` are acceptable; do not improvise replacement art.

## Accessibility

- Maintain ≥ 4.5:1 contrast between `--ink-soft` on `--paper` and `--muted` on `--paper`. Verify if you change the palette.
- All interactive elements must be reachable without hover. The index-list hover wash is decorative; the row is fully clickable.
- All section headings carry `aria-labelledby`.

## Don't

- Don't add a hero photograph, animated gradient, or background pattern.
- Don't introduce a second accent colour. If a section needs differentiation, use mono eyebrows and hairline framing.
- Don't add cards to the homepage. The homepage uses indices and lists; cards live on sub-pages where overview density is genuinely needed.
- Don't write CTA copy. Buttons read as lowercase mono labels (`agents`, `inference`, `email`), not verbs.
- Don't add libraries. The site is plain global CSS and small Astro components, on purpose.

## When in doubt

Cut. The site's premium register comes from restraint. If a change makes the page louder, busier, or more colourful, it is wrong — even if the underlying intent is good. Land the same idea with typography, whitespace, and a single hairline instead.
