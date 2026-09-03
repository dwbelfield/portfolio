# Design rules

Source of truth for the visual system. Every component follows these.

## Palette

| Token        | Hex       | Role                                   |
| ------------ | --------- | -------------------------------------- |
| graphite     | `#141516` | page background                        |
| cool white   | `#F5F6F7` | primary text                           |
| steel        | `#6E7681` | muted text, hairlines, grid            |
| panel black  | `#0B0D0F` | panels, cards, elevated surfaces       |
| amber        | `#E3A008` | accent (hover, focus, one highlight)   |
| amber deep   | `#B07A00` | accent pressed / on light surfaces     |

Defined once in `src/app/globals.css` as CSS variables and exposed to
Tailwind via `@theme`. Use semantic classes (`bg-bg`, `bg-panel`, `text-fg`,
`text-muted`, `text-accent`, `border-line`) rather than raw hex.

## Rules

1. **Mono only for labels and readouts.** Use `.label` (uppercase meta) and
   `.readout` (numbers, timestamps). Body copy and headings are always sans.
2. **No code motifs.** No terminal windows, no `>` prompts, no syntax
   highlighting, no `{ }` decoration, no cursor blinks as ornament.
3. **32px grid underlay.** `.grid-underlay` draws it. Spacing should land on
   multiples of 8 and section rhythm on multiples of 32 (`grid` spacing token).
4. **Amber under 5% of any page.** Accent is for one focal element per view,
   hover/focus states, and selection. Never for backgrounds or large fills.
5. **Respect `prefers-reduced-motion`.** CSS transitions collapse globally.
   JS animations must gate through `useReducedMotion()` / `prefersReducedMotion()`
   in `src/lib/motion.ts` and fall back to a static end state.

## Motion vocabulary

- **Micro** (Motion): hover lift, magnetic buttons, underline draw, tap scale.
  Durations 150–250ms, `--ease-out`.
- **Macro** (GSAP + ScrollTrigger): section reveals, pinned panels, text
  splitting, parallax. Durations 400–900ms, scrubbed where appropriate.
- Smooth scroll via Lenis, disabled when reduced motion is requested.
