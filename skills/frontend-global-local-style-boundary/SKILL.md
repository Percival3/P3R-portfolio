# Frontend Global vs Local Style Boundary

## Purpose

This skill defines a strict boundary between:

- `src/styles/global.css`
- page-local or component-local CSS

Use it whenever editing or creating frontend pages, components, or styles in this repository.

## Core Rule

If a CSS block is duplicated in more than one place, extract it into `src/styles/global.css` as a shared class, utility-style class, or token-driven component style.

If a CSS block describes what one specific element looks like in one specific page context, keep it local to that page or component.

The goal is to keep global consistency and local flexibility without overlap or conflict.

## Decision Rules

### Put it in `src/styles/global.css` when:

- the same CSS appears in more than one file
- the style describes a reusable component
- the style defines shared visual language
- the style defines theme behavior for light/dark modes
- the style controls shared tokens such as color, border, shadow, radius, or hover behavior
- the style is likely to be reused by future pages

Typical global ownership:

- color tokens
- theme tokens
- shared card appearance
- button appearance
- chip and icon-button appearance
- shared hover/focus states
- shared navigation appearance

### Keep it local when:

- the CSS only belongs to one page or one component
- the CSS describes local composition
- the CSS controls that element's shape, size, spacing, or position inside that page
- the CSS arranges one-off layout structure
- the CSS is not intended to become a shared visual component

Typical local ownership:

- page-specific grid structure
- hero composition
- one-off image sizing
- section spacing
- element placement
- page-only alignment rules

## Conflict Prevention Rules

- Do not define the same visual responsibility in both global and local CSS.
- Do not let page-local CSS override an already established global component appearance unless the change is strictly layout-related.
- If a page needs a reusable variation, add a new global class or token instead of re-hardcoding the style locally.
- After extracting shared CSS into `global.css`, remove the duplicated local copies.

## Working Method

Before writing new CSS, always ask:

1. Is this already used elsewhere?
2. Will this likely appear again?
3. Is this about shared appearance or local layout?

Then decide:

- shared appearance -> `src/styles/global.css`
- local layout/composition -> local page/component CSS

## One-Line Summary

Global CSS owns consistency. Local CSS owns composition. Never let them describe the same thing twice.
