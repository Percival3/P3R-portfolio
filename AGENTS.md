## Frontend Style Boundary
When doing frontend or webpage work in this repository, always apply `skills/frontend-global-local-style-boundary/SKILL.md`.

Mandatory rule:
- If a CSS block is duplicated in more than one place, extract it into `src/styles/global.css`.
- If a CSS block describes a page-local element's shape, size, spacing, or position, keep it local.
- Do not let global shared appearance and local page overrides overlap or conflict.
