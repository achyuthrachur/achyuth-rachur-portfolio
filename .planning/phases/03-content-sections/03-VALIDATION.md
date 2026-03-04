---
phase: 3
slug: content-sections
status: draft
nyquist_compliant: false
wave_0_complete: false
created: 2026-03-04
---

# Phase 3 — Validation Strategy

> Per-phase validation contract for feedback sampling during execution.

---

## Test Infrastructure

| Property | Value |
|----------|-------|
| **Framework** | TypeScript compiler (`npx tsc --noEmit`) + Next.js build |
| **Config file** | `tsconfig.json` |
| **Quick run command** | `npx tsc --noEmit` |
| **Full suite command** | `npm run build` |
| **Estimated runtime** | ~15 seconds (typecheck), ~45 seconds (build) |

> Phase 3 is UI content — no business logic to unit test. Validation is TypeScript compilation + structural checks + build verification. Visual/animation checks are manual.

---

## Sampling Rate

- **After every task commit:** `npx tsc --noEmit`
- **After every plan wave:** `npm run build && test -d out`
- **Before `/gsd:verify-work`:** Full build green, `/out` produced
- **Max feedback latency:** ~60 seconds

---

## Per-Task Verification Map

| Task ID | Plan | Wave | Requirement | Automated Command | Status |
|---------|------|------|-------------|-------------------|--------|
| AboutSection | 03-01 | 1 | ABOUT-01, ABOUT-02, ABOUT-03 | `npx tsc --noEmit && test -f src/components/AboutSection.tsx` | ⬜ pending |
| ExperienceSection | 03-02 | 1 | EXP-01–06 | `npx tsc --noEmit && test -f src/components/ExperienceSection.tsx` | ⬜ pending |
| SkillsSection | 03-03 | 1 | SKILL-01–05 | `npx tsc --noEmit && test -f src/components/SkillsSection.tsx` | ⬜ pending |
| Page wiring | 03-04 | 2 | All 15 | `npm run build && test -f out/index.html` | ⬜ pending |

---

## Wave 0 Requirements

No test framework installation needed — structural + build validation only.

- [ ] `src/components/AboutSection.tsx` exists after Plan 03-01
- [ ] `src/components/ExperienceSection.tsx` exists after Plan 03-02
- [ ] `src/components/SkillsSection.tsx` exists after Plan 03-03
- [ ] `npx tsc --noEmit` exits 0 after each plan
- [ ] `npm run build` produces `/out` after Plan 03-04

---

## Manual-Only Verifications

| Behavior | Requirement | Why Manual | Test Instructions |
|----------|-------------|------------|-------------------|
| About prose fades in on scroll | ABOUT-03 | Animation check | Scroll to About, confirm fade-in from y:30 |
| Experience cards stagger in | EXP-06 | Animation check | Scroll to Experience, confirm cards animate in with 100ms stagger |
| SpotlightCard amber glow on hover | EXP-03 | Visual check | Hover each card, confirm amber radial spotlight follows cursor |
| Key terms visually highlighted | EXP-05 | Visual check | Confirm amber-wash spans on key phrases in each card |
| Skills badge grid 2×2 layout | SKILL-02 | Responsive check | Verify 2-col on desktop, 1-col on mobile (375px) |
| Badge amber-glow hover + scale | SKILL-03 | Visual check | Hover each badge, confirm shadow-amber-glow + scale-[1.03] |
| AnimatedList badge stagger | SKILL-05 | Animation check | Scroll to Skills, confirm badges stagger in per group |

---

## Validation Sign-Off

- [ ] All tasks have `<automated>` verify or Wave 0 dependencies
- [ ] Sampling continuity: no 3 consecutive tasks without automated verify
- [ ] Wave 0 covers all MISSING references
- [ ] No watch-mode flags
- [ ] Feedback latency < 60s
- [ ] `nyquist_compliant: true` set in frontmatter

**Approval:** pending
