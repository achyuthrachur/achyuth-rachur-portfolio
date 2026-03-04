---
phase: 4
slug: closing-sections
status: draft
nyquist_compliant: false
wave_0_complete: false
created: 2026-03-04
---

# Phase 4 — Validation Strategy

> Per-phase validation contract for feedback sampling during execution.

---

## Test Infrastructure

| Property | Value |
|----------|-------|
| **Framework** | None installed — no vitest/jest config detected |
| **Config file** | None |
| **Quick run command** | `npm run build` |
| **Full suite command** | `npm run build && npm run lint` |
| **Estimated runtime** | ~30 seconds |

---

## Sampling Rate

- **After every task commit:** Run `npm run build`
- **After every plan wave:** Run `npm run build && npm run lint`
- **Before `/gsd:verify-work`:** Full suite must be green
- **Max feedback latency:** 30 seconds

---

## Per-Task Verification Map

| Task ID | Plan | Wave | Requirement | Test Type | Automated Command | File Exists | Status |
|---------|------|------|-------------|-----------|-------------------|-------------|--------|
| 4-01-01 | 01 | 1 | EDU-01, EDU-02, EDU-04 | smoke | `npm run build` | ❌ W0 | ⬜ pending |
| 4-01-02 | 01 | 1 | EDU-03 | manual | Open browser, scroll to Education | N/A | ⬜ pending |
| 4-02-01 | 02 | 1 | CONT-01, CONT-02, CONT-03, CONT-04 | smoke | `npm run build` | ❌ W0 | ⬜ pending |
| 4-02-02 | 02 | 1 | CONT-05 | manual | Browser hover test on contact icons | N/A | ⬜ pending |
| 4-03-01 | 03 | 1 | FOOT-01, FOOT-02 | smoke | `npm run build` | ❌ W0 | ⬜ pending |
| 4-04-01 | 04 | 2 | all | smoke | `npm run build && npm run lint` | N/A | ⬜ pending |

*Status: ⬜ pending · ✅ green · ❌ red · ⚠️ flaky*

---

## Wave 0 Requirements

- Existing infrastructure covers all phase requirements — no test stubs to create. `npm run build` validates TypeScript correctness and static export success.

*Validation is build-based for this frontend-only phase.*

---

## Manual-Only Verifications

| Behavior | Requirement | Why Manual | Test Instructions |
|----------|-------------|------------|-------------------|
| Fade-in on scroll | EDU-03 | CSS/JS animation — not detectable at build time | Open browser, scroll to Education section, verify cards fade in |
| Icon hover color + scale | CONT-05 | Interactive hover state — not detectable at build time | Open browser, hover each contact icon, verify color shifts to indigo and icon scales up |

---

## Validation Sign-Off

- [ ] All tasks have `<automated>` verify or Wave 0 dependencies
- [ ] Sampling continuity: no 3 consecutive tasks without automated verify
- [ ] Wave 0 covers all MISSING references
- [ ] No watch-mode flags
- [ ] Feedback latency < 30s
- [ ] `nyquist_compliant: true` set in frontmatter

**Approval:** pending
