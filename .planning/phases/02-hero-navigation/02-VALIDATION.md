---
phase: 2
slug: hero-navigation
status: draft
nyquist_compliant: false
wave_0_complete: false
created: 2026-03-04
---

# Phase 2 — Validation Strategy

> Per-phase validation contract for feedback sampling during execution.

---

## Test Infrastructure

| Property | Value |
|----------|-------|
| **Framework** | TypeScript compiler (`tsc --noEmit`) + Next.js build |
| **Config file** | `tsconfig.json` |
| **Quick run command** | `npm run typecheck` |
| **Full suite command** | `npm run build` |
| **Estimated runtime** | ~15 seconds (typecheck), ~45 seconds (build) |

> Phase 2 is UI-only — no business logic to unit test. Validation is TypeScript compilation + structural file checks + build verification. Visual/animation checks are manual.

---

## Sampling Rate

- **After every task commit:** `npm run typecheck`
- **After every plan wave:** `npm run build && test -d out && echo ok`
- **Before `/gsd:verify-work`:** Full build must be green and `/out` produced
- **Max feedback latency:** ~60 seconds

---

## Per-Task Verification Map

| Task ID | Plan | Wave | Requirement | Test Type | Automated Command | Status |
|---------|------|------|-------------|-----------|-------------------|--------|
| Nav component | 02-01 | 1 | NAV-01, NAV-02 | typecheck | `npm run typecheck && test -f src/components/Nav.tsx` | ⬜ pending |
| Nav scroll behavior | 02-01 | 1 | NAV-03, NAV-04, NAV-05 | typecheck | `npm run typecheck` | ⬜ pending |
| Hero section | 02-02 | 2 | HERO-01, HERO-02, HERO-03, HERO-04 | typecheck | `npm run typecheck && test -f src/components/Hero.tsx` | ⬜ pending |
| Hero animations | 02-02 | 2 | HERO-05, HERO-06 | typecheck + build | `npm run build && test -d out` | ⬜ pending |
| Page wiring | 02-03 | 3 | NAV-01–05, HERO-01–06 | build | `npm run build && test -f out/index.html` | ⬜ pending |

---

## Wave 0 Requirements

No new test files needed — validation is structural and build-based.

- [ ] `src/components/Nav.tsx` exists after Plan 02-01
- [ ] `src/components/Hero.tsx` exists after Plan 02-02
- [ ] `npm run typecheck` exits 0 after each plan

*No test framework installation needed — using existing TypeScript compiler.*

---

## Manual-Only Verifications

| Behavior | Requirement | Why Manual | Test Instructions |
|----------|-------------|------------|-------------------|
| Aurora renders atmospherically at 0.3 opacity | HERO-02 | Visual check | Open dev server, confirm Aurora is subtle (not overwhelming) in Indigo hero |
| SplitText name animates char-by-char | HERO-03 | Animation check | Reload page, confirm "Achyuth Rachur" chars stagger in at 50ms intervals |
| BlurText subtitle blurs in word-by-word | HERO-04 | Animation check | Confirm subtitle words animate from top with blur effect |
| Amber underline animates from 0→100% width | HERO-05 | Animation check | Confirm amber line draws left→right under name at 0.8s delay |
| ArrowDown bounces infinitely | HERO-06 | Animation check | Confirm bounce animation runs, clicking scrolls to #about |
| Nav active underline moves between sections | NAV-04 | Layout animation check | Scroll through sections, confirm amber underline animates between nav items |
| Nav opacity increases past hero | NAV-05 | Visual check | Scroll past hero, confirm nav bg becomes more opaque |
| Mobile hamburger opens nav links | NAV-01 | Responsive check | Resize to 375px, confirm hamburger appears, tap to open links |

---

## Validation Sign-Off

- [ ] All tasks have `<automated>` verify or Wave 0 dependencies
- [ ] Sampling continuity: no 3 consecutive tasks without automated verify
- [ ] Wave 0 covers all MISSING references
- [ ] No watch-mode flags
- [ ] Feedback latency < 60s
- [ ] `nyquist_compliant: true` set in frontmatter

**Approval:** pending
