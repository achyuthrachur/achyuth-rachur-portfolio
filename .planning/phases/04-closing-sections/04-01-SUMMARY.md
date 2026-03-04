---
phase: 04-closing-sections
plan: "01"
subsystem: education-section
tags: [education, react-bits, framer-motion, tilted-card, spotlight-card]
dependency_graph:
  requires: [src/components/reactbits/TiltedCard.tsx, src/components/reactbits/SpotlightCard.tsx]
  provides: [src/components/EducationSection.tsx]
  affects: [src/app/page.tsx]
tech_stack:
  added: []
  patterns: [whileInView-fade-in, TiltedCard-degree, SpotlightCard-research-papers]
key_files:
  created:
    - src/components/EducationSection.tsx
  modified: []
decisions:
  - "glareColor overridden to rgba(99,102,241,0.6) — indigo glow matches section palette, replaces default amber"
  - "spotlightColor set to rgba(99,102,241,0.08) — subtle indigo wash for research cards"
  - "ResearchPaper interface defined inline — co-located data pattern, avoids external data file for small static list"
  - "Papers mapped from array — eliminates duplication, same motion delay pattern (0.1 + index * 0.1)"
metrics:
  duration: "5min"
  completed_date: "2026-03-04"
  tasks_completed: 1
  files_changed: 1
---

# Phase 4 Plan 01: Education Section Summary

**One-liner:** Degree TiltedCard (Purdue BS Management and Data Analytics, Dec 2024) plus two research SpotlightCards with external links, all fading in via Framer Motion whileInView with indigo glare/spotlight overriding default amber.

## What Was Built

`src/components/EducationSection.tsx` — a named-export client component containing:

1. **Section heading block** — animated underline expand via whileInView, matching the AboutSection pattern
2. **Degree TiltedCard** — Purdue University, BS Management and Data Analytics, December 2024 with indigo glare override
3. **Research subsection** — static sub-heading with two SpotlightCards in a responsive grid (1-col mobile, 2-col md+)
4. **Two research papers** — linked to external PDFs with inline SVG external-link icon

## Decisions Made

| Decision | Choice | Reason |
|----------|--------|--------|
| glareColor | `rgba(99, 102, 241, 0.6)` | Indigo palette match; default amber clashes with degree card content |
| spotlightColor | `rgba(99, 102, 241, 0.08)` | Subtle indigo wash, consistent with section color scheme |
| Paper data | Hardcoded array in component | Static content, no external data source needed |
| Stagger delay | `0.1 + index * 0.1` | 100ms/200ms stagger from array map — clean pattern without explicit per-item code |

## Tasks Completed

| Task | Name | Commit | Files |
|------|------|--------|-------|
| 1 | Build EducationSection component | 0afea13 | src/components/EducationSection.tsx |

## Verification

- Build: `npm run build` passes with no TypeScript errors
- Named export `EducationSection` confirmed
- TiltedCard `glareColor="rgba(99, 102, 241, 0.6)"` (not default amber)
- All motion imports from `motion/react` (not `framer-motion`)
- Both paper URLs match CONTEXT.md verbatim

## Deviations from Plan

None — plan executed exactly as written.

## Self-Check: PASSED

- [x] `src/components/EducationSection.tsx` exists
- [x] Commit `0afea13` present in git log
- [x] `npm run build` exits 0 with no TypeScript errors
