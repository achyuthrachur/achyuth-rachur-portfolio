---
phase: 5
slug: polish-deploy
status: draft
nyquist_compliant: false
wave_0_complete: false
created: 2026-03-04
---

# Phase 5 — Validation Strategy

> Per-phase validation contract for feedback sampling during execution.

---

## Test Infrastructure

| Property | Value |
|----------|-------|
| **Framework** | No unit test framework — verification is grep/build/manual |
| **Config file** | none — no vitest/jest config exists |
| **Quick run command** | `npm run build` |
| **Full suite command** | `npm run build` + grep audit script + `npx serve out` manual check |
| **Estimated runtime** | ~30 seconds (build) + manual Lighthouse/responsive |

---

## Sampling Rate

- **After every task commit:** Run `npm run build` — confirms no TypeScript/compilation errors
- **After every plan wave:** Run full grep audit + build + `npx serve out` visual check
- **Before `/gsd:verify-work`:** All manual checkpoints (Lighthouse, responsive, Cloudflare live) confirmed

---

## Per-Task Verification Map

| Task ID | Plan | Wave | Requirement | Test Type | Automated Command | File Exists | Status |
|---------|------|------|-------------|-----------|-------------------|-------------|--------|
| 05-01-01 | 01 | 1 | DSGN-05 | code + build | `npm run build` | ✅ components exist | ⬜ pending |
| 05-01-02 | 01 | 1 | DSGN-01,02,03,04,06 | grep | `grep -rn "bg-white\|#FFFFFF" src/app/page.tsx` | ✅ | ⬜ pending |
| 05-02-01 | 02 | 2 | QUAL-04 | build | `npm run build && ls out/` | ✅ next.config.ts | ⬜ pending |
| 05-02-02 | 02 | 2 | QUAL-03 | manual | Browser console on `npx serve out` | manual-only | ⬜ pending |
| 05-02-03 | 02 | 2 | QUAL-02 | manual | Chrome Lighthouse on `npx serve out` | manual-only | ⬜ pending |
| 05-02-04 | 02 | 2 | QUAL-01 | manual | Chrome DevTools 375/768/1280px | manual-only | ⬜ pending |
| 05-03-01 | 03 | 3 | QUAL-05 | deploy | `git remote -v` confirms origin | ❌ Wave 0 — no remote | ⬜ pending |
| 05-03-02 | 03 | 3 | QUAL-06 | manual | Navigate to *.pages.dev URL | manual-only | ⬜ pending |

*Status: ⬜ pending · ✅ green · ❌ red · ⚠️ flaky*

---

## Wave 0 Requirements

- [ ] `git remote add origin https://github.com/achyuthrachur/achyuth-rachur-portfolio.git` — needed before QUAL-05 can be verified (executed manually or in deploy plan task)

*No test framework gaps — this phase has no unit-testable logic; all verification is grep/build/manual.*

---

## Manual-Only Verifications

| Behavior | Requirement | Why Manual | Test Instructions |
|----------|-------------|------------|-------------------|
| prefers-reduced-motion suppresses all animations | DSGN-05 | Requires OS-level motion preference set | Chrome DevTools → Rendering → Emulate prefers-reduced-motion: reduce → scroll all sections |
| Responsive layout at 375/768/1280px | QUAL-01 | Requires visual inspection per breakpoint | Chrome DevTools device toolbar, scroll each section |
| Lighthouse ≥ 90 Performance + Accessibility | QUAL-02 | Requires browser Lighthouse run | `npx serve out` → Chrome DevTools → Lighthouse → Navigate mode |
| No console errors in production build | QUAL-03 | Requires browser console inspection | `npx serve out` → open browser console → scroll all sections |
| Cloudflare Pages URL loads correctly | QUAL-06 | Requires external service UI flow | Navigate to generated *.pages.dev URL |

---

## Validation Sign-Off

- [ ] All tasks have `<automated>` verify or Wave 0 dependencies
- [ ] Sampling continuity: no 3 consecutive tasks without automated verify
- [ ] Wave 0 covers all MISSING references
- [ ] No watch-mode flags
- [ ] Feedback latency < 60s
- [ ] `nyquist_compliant: true` set in frontmatter

**Approval:** pending
