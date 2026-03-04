---
phase: 03-content-sections
plan: 02
subsystem: ui
tags: [react, animejs, intersection-observer, spotlightcard, tailwind]

# Dependency graph
requires:
  - phase: 03-content-sections/03-01
    provides: SpotlightCard component at src/components/reactbits/SpotlightCard.tsx
  - phase: 01-foundation
    provides: Crowe color tokens (tint-900, tint-500, crowe-indigo-dark) via @theme in globals.css
provides:
  - ExperienceSection named export at src/components/ExperienceSection.tsx
  - 6 SpotlightCards with amber spotlight and stagger entrance animation
  - Highlight helper component for amber-wash key term spans
affects: [03-04-page-assembly, 03-05-final-integration]

# Tech tracking
tech-stack:
  added: []
  patterns:
    - IntersectionObserver + Anime.js stagger — scroll-triggered card entrance (threshold 0.1, stagger 100ms)
    - Highlight helper component — wraps amber-wash span for key term emphasis
    - Initial opacity-0 set via animate(duration:0) before observer fires — prevents flash of visible content

key-files:
  created:
    - src/components/ExperienceSection.tsx
  modified: []

key-decisions:
  - "spotlightColor set to rgba(245,168,0,0.08) — slightly lower than SpotlightCard default 0.12, per user preference"
  - "IntersectionObserver chosen over Anime.js onScroll() — proven pattern in this codebase (Nav.tsx), avoids format string uncertainty"
  - "Highlight helper avoids JSX repetition — renders bg-[#fff8eb] font-semibold px-1 rounded-sm span"

patterns-established:
  - "Highlight pattern: <Highlight>term</Highlight> renders amber-wash span — reuse for other sections with key term emphasis"
  - "exp-card className on SpotlightCard props — querySelectorAll('.exp-card') target pattern for Anime.js stagger"

requirements-completed: [EXP-01, EXP-02, EXP-03, EXP-04, EXP-05, EXP-06]

# Metrics
duration: 1min
completed: 2026-03-04
---

# Phase 03 Plan 02: Experience Section Summary

**6 SpotlightCards with amber-wash key term highlights and IntersectionObserver + Anime.js stagger entrance for Crowe LLP experience content**

## Performance

- **Duration:** 1 min
- **Started:** 2026-03-04T15:28:04Z
- **Completed:** 2026-03-04T15:29:05Z
- **Tasks:** 1
- **Files modified:** 1

## Accomplishments

- Created ExperienceSection.tsx as a named-export 'use client' component
- 6 SpotlightCards (exp-card) each containing one experience bullet with amber spotlight on hover
- Amber-wash Highlight spans applied to: "AI enablement" (bullet 1), "governance-first" + "bias/fairness" (bullet 3), "Model Risk Management (MRM)" + "independent validation" (bullet 4)
- IntersectionObserver fires Anime.js stagger(100) animation — cards slide up from translateY 40 with 600ms duration
- prefers-reduced-motion guard + observer cleanup on unmount

## Task Commits

Each task was committed atomically:

1. **Task 1: Create ExperienceSection.tsx with 6 SpotlightCards and IntersectionObserver stagger** - `777acf4` (feat)

**Plan metadata:** (docs commit — see below)

## Files Created/Modified

- `src/components/ExperienceSection.tsx` - Named-export client component with 6 SpotlightCards, Highlight helper, and scroll-triggered stagger animation

## Decisions Made

- spotlightColor set to rgba(245,168,0,0.08) — slightly lower opacity than the SpotlightCard default (0.12), per prior user decision
- Used IntersectionObserver instead of Anime.js onScroll() — the proven pattern from Nav.tsx in this project; avoids uncertainty with onScroll enter format strings
- Initial animate(duration:0) call sets cards to opacity:0 / translateY:40 before observer fires, preventing flash of visible content before scroll trigger

## Deviations from Plan

None — plan executed exactly as written.

## Issues Encountered

None.

## User Setup Required

None — no external service configuration required.

## Next Phase Readiness

- ExperienceSection is ready for import into page.tsx (03-04 page assembly)
- Component exports `ExperienceSection` as named export, import path: `@/components/ExperienceSection`
- Section needs `id="experience"` wrapper and `scroll-mt-16` class in page.tsx for sticky nav anchor behavior

## Self-Check: PASSED

- `src/components/ExperienceSection.tsx` — FOUND
- Commit `777acf4` — FOUND

---

*Phase: 03-content-sections*
*Completed: 2026-03-04*
