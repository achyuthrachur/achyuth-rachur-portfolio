---
phase: 05-polish-deploy
plan: "01"
subsystem: animation-compliance
tags: [framer-motion, accessibility, reduced-motion, design-compliance]
dependency_graph:
  requires: [04-closing-sections/04-03]
  provides: [DSGN-01, DSGN-02, DSGN-03, DSGN-04, DSGN-05, DSGN-06]
  affects: [src/components, src/components/reactbits]
tech_stack:
  added: []
  patterns: [useReducedMotion conditional spread, controls.set early-return, conditional layoutId]
key_files:
  created: []
  modified:
    - src/components/AboutSection.tsx
    - src/components/EducationSection.tsx
    - src/components/ContactSection.tsx
    - src/components/HeroSection.tsx
    - src/components/Nav.tsx
    - src/components/reactbits/AnimatedList.tsx
    - src/components/reactbits/SplitText.tsx
    - src/components/reactbits/BlurText.tsx
    - src/components/Footer.tsx
decisions:
  - "useReducedMotion conditional spread pattern chosen for whileInView components — clean, zero-runtime cost when motion not needed"
  - "initial=false + duration:0 pattern for animate= components in HeroSection — ensures final state renders immediately without transition"
  - "controls.set('visible') early-return for SplitText/BlurText — jumps to visible state synchronously, no controls.start() call overhead"
  - "DSGN-02 globals.css hit is token definition (--crowe-black: #000000) not applied color — confirmed no component or page uses it"
metrics:
  duration: 8min
  completed: 2026-03-04
  tasks_completed: 2
  files_modified: 9
---

# Phase 05 Plan 01: Reduced Motion + Design Compliance Summary

**One-liner:** Framer Motion useReducedMotion guards on all 8 animated components using 4 distinct patterns, plus Footer border-t removal and DSGN-01 through DSGN-06 grep audit confirming full design compliance.

## Tasks Completed

| # | Task | Commit | Files |
|---|------|--------|-------|
| 1 | Add useReducedMotion guards to 7 Framer Motion components | 8639f69 | AboutSection, EducationSection, ContactSection, HeroSection, Nav, AnimatedList, SplitText, BlurText |
| 2 | Remove Footer border-t and run design compliance grep audit | 6ee68fa | Footer.tsx |

## Files Modified

### src/components/AboutSection.tsx
- Added `useReducedMotion` to import
- `const prefersReduced = useReducedMotion()` in function body
- Conditional spread on outer section wrapper motion.div (whileInView opacity/y)
- Conditional spread on amber underline motion.div (whileInView width)

### src/components/EducationSection.tsx
- Added `useReducedMotion` to import
- `const prefersReduced = useReducedMotion()` in function body
- Conditional spread on 4 motion.div elements: section heading wrapper, amber underline, degree card wrapper, each research card in .map

### src/components/ContactSection.tsx
- Added `useReducedMotion` to import
- `const prefersReduced = useReducedMotion()` in ContactIcon function body (separate hook call per rules)
- `const prefersReduced = useReducedMotion()` in ContactSection function body
- Conditional spread on outer ContactSection motion.div (whileInView)
- Conditional spread on each CONTACTS.map item motion.div (whileInView with stagger delay)
- `whileHover={prefersReduced ? undefined : { scale: 1.1 }}` in ContactIcon

### src/components/HeroSection.tsx
- Added `useReducedMotion` to import alongside useScroll, useTransform
- `const prefersReduced = useReducedMotion()` in function body
- Indigo underline motion.div: `initial={prefersReduced ? false : { width: 0 }}` + `transition={prefersReduced ? { duration: 0 } : ...}`
- Tagline motion.p: `initial={prefersReduced ? false : { opacity: 0, y: 10 }}` + `transition={prefersReduced ? { duration: 0 } : ...}`
- Anime.js scroll indicator useEffect left untouched — already has `window.matchMedia` guard

### src/components/Nav.tsx
- Added `useReducedMotion` to import
- `const prefersReduced = useReducedMotion()` in Nav function body
- Nav underline motion.div: `layoutId={prefersReduced ? undefined : 'nav-underline'}` + `transition={prefersReduced ? { duration: 0 } : { type: 'spring', stiffness: 380, damping: 30 }}`

### src/components/reactbits/AnimatedList.tsx
- Added `useReducedMotion` to import
- `const prefersReduced = useReducedMotion()` in function body
- Changed `animate={inView ? 'visible' : 'hidden'}` to `animate={prefersReduced || inView ? 'visible' : 'hidden'}`

### src/components/reactbits/SplitText.tsx
- Added `useReducedMotion` to import
- `const prefersReduced = useReducedMotion()` in function body
- useEffect early-return: `if (prefersReduced) { controls.set('visible'); return; }`
- Added `prefersReduced` to useEffect dependency array

### src/components/reactbits/BlurText.tsx
- Added `useReducedMotion` to import
- `const prefersReduced = useReducedMotion()` in function body
- useEffect early-return: `if (prefersReduced) { controls.set('visible'); return; }`
- Added `prefersReduced` to useEffect dependency array

### src/components/Footer.tsx
- Removed `border-t border-[rgba(248,250,252,0.08)]` from footer className
- Result: `<footer className="py-6 text-center">` — spacing only, no border

## Design Compliance Grep Audit

All checks run from project root against `src/` directory.

| Check | Pattern | Result | Status |
|-------|---------|--------|--------|
| DSGN-01: Pure white page bg | `bg-white` in `src/app/page.tsx` | No matches | PASS |
| DSGN-02: Pure black text | `text-black\|#000000\|color: black` in `src/components/` + `src/app/page.tsx` | No matches in components | PASS |
| DSGN-03: Hard card borders | `border border-[rgba` in `src/components/` | No matches | PASS |
| DSGN-04: Pure black shadows | `rgba(0,0,0` in `src/` | No matches | PASS |
| DSGN-05: useReducedMotion present | `useReducedMotion` in `src/components/` | 17 matches across 8 files | PASS |
| DSGN-06: Horizontal rules | `<hr` in `src/` | No matches | PASS |

**DSGN-02 note:** The broad grep `#000000` matched `globals.css` line 53: `--crowe-black: #000000;` — this is a CSS variable definition in the design token block, not an applied color. A targeted grep of `src/components/` and `src/app/page.tsx` returns no matches, confirming no pure black is applied to any element.

**useReducedMotion count:** 17 matches (import line + call in each function = 2 per component; ContactSection has 2 calls = 3 lines there, total 17 lines across 8 files).

## Build Status

Both tasks: `npm run build` exits 0. Next.js 16 Turbopack compiles successfully, static pages generated.

```
✓ Compiled successfully in 8.5s
✓ Generating static pages using 7 workers (4/4)
Route (app): / (Static)
```

## Deviations from Plan

None — plan executed exactly as written.

## Self-Check: PASSED

- [x] `src/components/AboutSection.tsx` — contains `useReducedMotion`
- [x] `src/components/EducationSection.tsx` — contains `useReducedMotion`
- [x] `src/components/ContactSection.tsx` — contains `useReducedMotion` (x2)
- [x] `src/components/HeroSection.tsx` — contains `useReducedMotion`
- [x] `src/components/Nav.tsx` — contains `useReducedMotion`
- [x] `src/components/reactbits/AnimatedList.tsx` — contains `useReducedMotion`
- [x] `src/components/reactbits/SplitText.tsx` — contains `useReducedMotion`
- [x] `src/components/reactbits/BlurText.tsx` — contains `useReducedMotion`
- [x] `src/components/Footer.tsx` — no `border-t`
- [x] Build commit 8639f69 exists
- [x] Build commit 6ee68fa exists
