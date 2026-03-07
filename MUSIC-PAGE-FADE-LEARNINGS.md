# Music Page Fade Learnings

This note captures what worked for the `/music` image transition and why.

## Goal

Visual handoff between background sections:

1. First image fades to black at the bottom.
2. Small black spacer.
3. Second image fades in from black.

## Root Causes of the Old Overlap

1. The first single card was pulled up with a large hardcoded negative margin.
2. The singles background used a fragile stacking setup (`::before` on negative `z-index`).
3. There was no explicit transition zone between sections.

Result: when fade styles were adjusted, the second image appeared to overlap abruptly instead of transitioning.

## Working Pattern

Use a deterministic three-stage transition:

1. **Hero fade-out**: `.music-page-hero::after` adds a bottom gradient to black.
2. **Black bridge**: `.music-section-bridge` is an explicit spacer between sections.
3. **Singles fade-in**: `.music-singles::before` uses layered backgrounds:
   - top layer: black-to-transparent gradient
   - bottom layer: singles background image

This creates a stable black handoff and removes visual ambiguity.

## Current Control Knobs

All key values are CSS variables in `src/pages/MusicPage.css`:

- `--music-fade-height`: hero bottom fade height
- `--music-bridge-height`: black spacer height
- `--music-first-single-lift`: how far the first single card is lifted upward

This makes visual tuning quick without changing component logic.

## Why It Is Stable

1. Section layering is explicit (no accidental stacking side effects).
2. Decorative background layer is isolated from content (`isolation: isolate`, controlled `z-index`).
3. The transition is color-anchored (`#000`) before introducing the next image.

## Guardrails for Future Edits

1. Do not reintroduce large fixed negative offsets without a variable.
2. Avoid negative `z-index` background hacks for cross-section transitions.
3. Keep the handoff sequence intact: fade-out -> bridge -> fade-in.
4. Tune variables first before changing structure.
