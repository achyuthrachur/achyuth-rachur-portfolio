---
phase: 02-hero-navigation
plan: 02
subsystem: ui
tags: [react, framer-motion, animejs, aurora, splittext, blurtext, iconsax, hero, animation]

# Dependency graph
requires:
  - phase: 01-foundation
    provides: React Bits components (SplitText, BlurText, Aurora), motion/react, animejs, iconsax-react, Crowe brand tokens in Tailwind v4

provides:
  - HeroSection component with full-viewport indigo hero, Aurora canvas, SplitText name, BlurText subtitle, amber underline, tagline, animated scroll indicator

affects:
  - 02-03-navigation (imports HeroSection into page.tsx)
  - page.tsx (will mount HeroSection as first section)

# Tech tracking
tech-stack:
  added: []
  patterns:
    - "useTransform(scrollY, [0,100], [1,0]) pattern for scroll-fade effects"
    - "Anime.js anim.cancel() wrapped in void block to satisfy EffectCallback return type"
    - "prefers-reduced-motion guard before Anime.js animation initialization"
    - "Color on SplitText/BlurText via className (no color prop) — enforced by component interface"
    - "Aurora colorStops override to indigo-only (removes default amber stop)"

key-files:
  created:
    - src/components/HeroSection.tsx
  modified: []

key-decisions:
  - "anim.cancel() wrapped in void block { anim.cancel(); } — JSAnimation return type is not void, TypeScript rejects arrow shorthand in EffectCallback"
  - "Aurora colorStops=['#011E41','#002E62','#003F9F'] — removes default amber stop that would clash with indigo-only hero"
  - "blend=0.3 on Aurora (not default 0.5) — lower opacity for atmospheric depth without overpowering dark background"

patterns-established:
  - "Pattern: SplitText requires splitBy='characters' (not 'chars') — prop type is 'characters'|'words'"
  - "Pattern: Color on ReactBits components passed via Tailwind className, not a color prop"
  - "Pattern: Anime.js cleanup in useEffect must return void — wrap cancel() in block statement"

requirements-completed: [HERO-01, HERO-02, HERO-03, HERO-04, HERO-05, HERO-06]

# Metrics
duration: 2min
completed: 2026-03-04
---

# Phase 2 Plan 02: Hero Section Summary

**Full-viewport indigo hero with Aurora canvas, SplitText character entrance, BlurText subtitle, amber underline brand moment, and Anime.js bouncing scroll indicator**

## Performance

- **Duration:** 2 min
- **Started:** 2026-03-04T04:00:17Z
- **Completed:** 2026-03-04T04:02:58Z
- **Tasks:** 1 of 1
- **Files modified:** 1

## Accomplishments

- Full-viewport hero section (`min-h-screen`, `bg-[#011E41]`, `id="hero"`) with `relative overflow-hidden` for Aurora canvas
- Aurora atmospheric canvas with indigo-only color stops (`['#011E41','#002E62','#003F9F']`), `blend=0.3` for depth without harshness
- SplitText character-by-character name entrance with `splitBy="characters"`, delay=50ms, color via className `text-[#f6f7fa]`
- Amber underline brand moment — `motion.div` expands 0 to 100% width at 0.8s delay, 0.8s duration
- BlurText word-by-word subtitle with `animateBy="words"`, `direction="top"`, muted white via className
- Tagline paragraph fades in from below at 0.6s delay
- ArrowDown scroll indicator with Anime.js infinite `translateY [0,8,0]` bounce, fades out on scroll via `useTransform(scrollY, [0,100],[1,0])`
- `prefers-reduced-motion` guard wraps the Anime.js initialization
- Proper `anim.cancel()` cleanup in useEffect return (prevents RAF leak on hot reload)

## Task Commits

1. **Task 1: Build HeroSection component with Aurora background and animation stack** - `b1b5e9c` (feat)

**Plan metadata:** (pending final docs commit)

## Files Created/Modified

- `src/components/HeroSection.tsx` — Full-viewport hero 'use client' component with Aurora, SplitText, BlurText, Anime.js scroll indicator, Framer Motion transitions

## Decisions Made

- `anim.cancel()` must be wrapped in a block statement (`{ anim.cancel(); }`) because Anime.js v4 `.cancel()` returns `JSAnimation`, not `void`, and React's `EffectCallback` requires the cleanup to return `void | Destructor`. Arrow shorthand (`() => anim.cancel()`) infers the `JSAnimation` return type and fails TypeScript's strict check.
- `Aurora colorStops={['#011E41','#002E62','#003F9F']}` override is mandatory — the default includes `#F5A800` (amber) which would produce orange waves on a dark indigo background, clashing with the hero's pure indigo aesthetic.
- `blend={0.3}` chosen over the Aurora default of `0.5` — atmospheric, subtle depth effect rather than dominant canvas fill.

## Deviations from Plan

### Auto-fixed Issues

**1. [Rule 1 - Bug] Fixed Anime.js cancel() return type for TypeScript EffectCallback**
- **Found during:** Task 1 (HeroSection component creation)
- **Issue:** `return () => anim.cancel()` — TypeScript rejects because `JSAnimation` is not assignable to `void | Destructor`. The plan's code spec used arrow shorthand which implicitly returns the `JSAnimation` object.
- **Fix:** Changed to `return () => { anim.cancel(); };` — block body discards return value, satisfies `EffectCallback` constraint.
- **Files modified:** `src/components/HeroSection.tsx`
- **Verification:** `npx tsc --noEmit` exits 0
- **Committed in:** `b1b5e9c` (Task 1 commit)

---

**Total deviations:** 1 auto-fixed (Rule 1 - type bug)
**Impact on plan:** Necessary for TypeScript correctness. No scope creep. Component behavior identical — `cancel()` is still called on cleanup.

## Issues Encountered

- `npm run typecheck` script does not exist in `package.json` — used `npx tsc --noEmit` directly as equivalent verification. No impact on outcome.

## User Setup Required

None - no external service configuration required.

## Next Phase Readiness

- `HeroSection` is exported and ready to import into `page.tsx` as the first section
- Aurora canvas requires `relative overflow-hidden` on the parent section (already applied)
- Content layer uses `relative z-10` — text renders above Aurora canvas
- Scroll indicator links to `#about` — About section must have `id="about"` when built

---
*Phase: 02-hero-navigation*
*Completed: 2026-03-04*
