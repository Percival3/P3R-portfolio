# Frontend Global/Local Style Boundary

Enforce the global/local CSS boundary whenever editing website UI, CSS, Astro page styles, or React component styles.

## Trigger

Use this skill when:
- editing or reviewing any `.css`, `.astro`, or `.tsx`/`.jsx` file that contains styles
- a user asks to add, fix, or refactor frontend styles
- styles appear duplicated across pages or components
- a local page style is overriding a global component's appearance

## Core Rule

- Shared visual rules belong in `src/styles/global.css`.
- Page-local styles describe only page-specific layout and one-off composition.
- Global and local styles must never describe the same property on the same element.

If a CSS block is copied in more than one place, extract it into `global.css` as a shared token, utility, or component class.

If a CSS block describes what a single element looks like in one page context only, keep it in the page/component file.

## Decision Boundary

**Move to `global.css`** when it controls:
- theme colors, typography tokens, shared spacing scales, shared radii, shadows, reusable borders
- button, chip, card, tag, icon-button, input, panel, badge, nav, link styles
- repeated hover/focus/active states
- shared utility classes used in more than one file

**Keep local** when it controls:
- one page's grid layout or column split
- one hero block's width, height, or alignment
- one card's placement inside a specific page
- local aspect ratio, offset, transform, or stacking
- one-off responsive adjustments meaningful only in that page

## Non-Conflict Rule

Do not let local CSS override a global component's existing appearance rules.

If a global component already defines `background`, `color`, `border`, `shadow`, `border-radius`, `hover`, or `focus`, the page must not redefine those same properties — unless you are intentionally updating the global system itself.

The page may still adjust: `width`, `height`, `gap`, `margin`, `padding` (layout-only), `grid`/`flex` placement, `align`/`justify`, `order`, visibility at breakpoints.

## Workflow

1. Read the affected file and identify every CSS rule being added or changed.
2. Check whether the same rule already exists elsewhere in the codebase (use Grep).
3. If repeated, move the shared appearance into `global.css` and replace hardcoded duplicates with the shared class or token.
4. Leave page-specific geometry and composition in the local file.
5. Remove any local overrides that conflict with existing global component rules.
6. Confirm no global/local definitions now describe the same visual responsibility.

## Preferred Patterns

- CSS variables in `:root` and theme scopes for shared colors and component tokens.
- Semantic shared classes for reusable UI patterns.
- Page-local selectors scoped to layout wrappers and section containers.
- Extend the global system once rather than patching the same visual rule across multiple pages.

## Anti-Patterns

- Copying the same border, shadow, background, or hover styles across multiple pages.
- Redefining a shared button or card style differently inside each page.
- Adding local overrides for properties that already belong to a global component.
- Mixing global component appearance with page-local layout in the same selector.
- Leaving dead local styles after promoting a pattern to `global.css`.

## Examples

**Promote to `global.css`:**
- The same social icon button style appears on About and Home.
- The same day-theme badge style appears on Blog and Research.
- Multiple pages use the same card hover border and shadow treatment.

**Keep local:**
- The About page positions its social block lower on the page.
- The Home hero card needs a wider `max-width` than the default card.
- One gallery section needs a 3-column grid that collapses differently on mobile.

## Expected Output

After applying this skill:
- Shared UI looks consistent across the site.
- Theme behavior is centralized in `global.css`.
- Page files are focused on content and layout only.
- No overlapping global/local definitions exist for the same visual responsibility.
