# Phase 5: Polish + Deploy - Research

**Researched:** 2026-03-04
**Domain:** Design compliance audit, Framer Motion reduced-motion patching, Cloudflare Pages deployment, Lighthouse performance
**Confidence:** HIGH

---

<user_constraints>
## User Constraints (from CONTEXT.md)

### Locked Decisions
- GitHub repo: `achyuth-rachur-portfolio` — `github.com/achyuthrachur/achyuth-rachur-portfolio`, visibility public
- Push `master` branch as default; no rename needed
- Cloudflare Pages: existing account, manual UI flow only (no CLI). Human-verify checkpoint required with numbered step-by-step UI instructions
- Build command: `npm run build`, output directory: `out`
- No environment variables required for static export
- Branch to deploy: `master`
- Custom domain: deferred to V2-02
- Design audit order: automated grep first (DSGN-01 through DSGN-06), then manual visual pass
- Responsive breakpoints: 375px, 768px, 1280px in Chrome DevTools
- Lighthouse: run on `npx serve out` (static build), not dev server
- Framer Motion gap: CSS `prefers-reduced-motion` does NOT suppress `motion/react` inline JS animations — components with `motion.*` whileInView/animate must use `useReducedMotion()` from `motion/react`
- Components already guarded with `window.matchMedia`: HeroSection.tsx (Anime.js), ExperienceSection.tsx (Anime.js)

### Claude's Discretion
- Whether to install `serve` globally or use `npx serve out` for local Lighthouse run
- Exact grep patterns for the automated audit script
- Order of operations within the audit plan (automated first, then manual)

### Deferred Ideas (OUT OF SCOPE)
- Custom domain configuration (V2-02)
- Education content replacement with real university/degree/year (V2-01)
- GitHub Actions CI/CD pipeline — manual push + Cloudflare auto-deploy is sufficient
</user_constraints>

---

<phase_requirements>
## Phase Requirements

| ID | Description | Research Support |
|----|-------------|-----------------|
| DSGN-01 | No pure white (#FFFFFF) page backgrounds | Audit findings: bg-white found in EducationSection TiltedCard, SkillsSection badges, SpotlightCard base class — all are card-level not page-level; analysis below confirms these are compliant |
| DSGN-02 | No pure black (#000000) text — use #2d3142 | Audit findings: no violations found in tsx files — body text uses tint-900 (#0f172a) which is project's warm-dark substitute |
| DSGN-03 | No borders on cards — use layered indigo-tinted shadows | Audit findings: Footer has `border-t` (on dark bg, nearly invisible), Nav has `border-b` (glassmorphism nav separator); card elements have no hard borders |
| DSGN-04 | No rgba(0,0,0,*) shadows — use project-tinted shadows | Audit findings: no rgba(0,0,0 found in src tsx or css files — all shadows use rgba(15,23,42,*) slate-tinted |
| DSGN-05 | prefers-reduced-motion respected for all animations | Critical gap: useReducedMotion() hook missing from AboutSection, EducationSection, ContactSection, Nav, AnimatedList, SplitText, BlurText — must be added |
| DSGN-06 | No hr or horizontal rules between sections | Audit findings: no `<hr` tags found; section transitions are background color shifts only |
| QUAL-01 | Responsive layout: mobile (375px), tablet (768px), desktop (1280px) | Key areas to check: nav mobile menu, skills 2-col to 1-col, education card width, contact icons row wrap |
| QUAL-02 | Lighthouse score > 90 Performance and Accessibility | Run on `npx serve out`; common fixes: alt text, heading hierarchy, contrast |
| QUAL-03 | No console errors in production build | Verified against static `out` build — must check after `npm run build` |
| QUAL-04 | Static build outputs to /out without errors | next.config.ts confirms `output: 'export'` — currently passing from Phase 4 |
| QUAL-05 | GitHub repo created and pushed | git remote is empty — repo creation required before push |
| QUAL-06 | Cloudflare Pages deployment configured | Human-verify checkpoint needed; no CLI available |
</phase_requirements>

---

## Summary

Phase 5 is an audit-fix-deploy phase, not a feature-building phase. The codebase is complete from Phase 4 and the primary work is: (1) patching Framer Motion components to respect `prefers-reduced-motion`, (2) running a targeted design compliance grep audit and fixing any violations found, (3) verifying responsive layout and Lighthouse scores, and (4) creating the GitHub repo and connecting Cloudflare Pages.

The most important technical finding from code inspection is that `useReducedMotion()` from `motion/react` is not called anywhere in the codebase. Every component using `motion.div` with `whileInView`, `animate`, or `whileHover` will animate regardless of the user's OS accessibility setting. The CSS rule in globals.css (`animation-duration: 0.01ms`) handles CSS animations and transitions but has no effect on Framer Motion's inline JavaScript-driven transforms. This is the single largest compliance gap.

Design compliance audit reveals the codebase is largely clean: no rgba(0,0,0) shadows, no hr tags, no text-black, no pure-white page backgrounds. The `bg-white` occurrences are on card elements sitting atop off-white page backgrounds — a valid pattern — not on page/section backgrounds. The Footer has a `border-t` that is functionally invisible (white opacity 8% on a dark background) but is technically a border. The planner should decide whether this warrants removal.

**Primary recommendation:** Fix DSGN-05 (Framer Motion useReducedMotion) first, run automated grep audit, fix any violations, verify build, then proceed to responsive/Lighthouse checks and deploy.

---

## Standard Stack

### Core (already installed — no new installs needed)

| Library | Version | Purpose | Notes |
|---------|---------|---------|-------|
| `motion` | 12.34.5 | Framer Motion (React package) | Import path: `motion/react` |
| `animejs` | 4.3.6 | DOM-level animations (Anime.js v4) | Already guarded in Hero + Experience |
| `next` | 16.1.6 | Framework + static export | `output: 'export'` confirmed in next.config.ts |
| `npx serve` | via npx | Local static server for Lighthouse | No install needed — `npx serve out` |

### Supporting (for deployment)

| Tool | Use | How |
|------|-----|-----|
| `git` | Push to GitHub | Already initialized; remote not set |
| GitHub web UI | Repo creation | `gh` CLI is NOT available on this machine |
| Cloudflare Pages dashboard | Connect GitHub, configure build | Manual UI flow only |

### Key API: useReducedMotion (motion/react)

`useReducedMotion()` is a hook exported from `motion/react`. It returns `true` when the OS has `prefers-reduced-motion: reduce` set, `false` otherwise. When `true`, components must short-circuit their animations.

```typescript
// Source: motion/react official API
import { useReducedMotion } from 'motion/react';

export function SomeComponent() {
  const prefersReduced = useReducedMotion();

  // Pattern A: skip initial/whileInView entirely
  const motionProps = prefersReduced
    ? {}  // no animation props = element renders at final state instantly
    : {
        initial: { opacity: 0, y: 30 },
        whileInView: { opacity: 1, y: 0 },
        viewport: { once: true, margin: '-100px' },
        transition: { duration: 0.6, ease: [0.16, 1, 0.3, 1] },
      };

  return <motion.div {...motionProps}>{/* content */}</motion.div>;
}
```

---

## Architecture Patterns

### Framer Motion Reduced-Motion Pattern (DSGN-05 fix)

**What:** Call `useReducedMotion()` at the top of each component that uses `motion.*` with animation props. When true, spread empty object `{}` instead of animation props so the element renders at its final visible state immediately.

**Pattern A — Conditional spread (for whileInView/initial components):**
```typescript
// Used in: AboutSection, EducationSection, ContactSection
'use client';
import { motion, useReducedMotion } from 'motion/react';

export function AboutSection() {
  const prefersReduced = useReducedMotion();

  const fadeIn = prefersReduced
    ? {}
    : {
        initial: { opacity: 0, y: 30 },
        whileInView: { opacity: 1, y: 0 },
        viewport: { once: true, margin: '-100px' },
        transition: { duration: 0.6, ease: [0.16, 1, 0.3, 1] },
      };

  const underlineGrow = prefersReduced
    ? {}
    : {
        initial: { width: 0 },
        whileInView: { width: '3rem' },
        viewport: { once: true },
        transition: { delay: 0.2, duration: 0.5, ease: [0.16, 1, 0.3, 1] },
      };

  return (
    <div>
      <motion.div {...fadeIn}>
        <h2>About</h2>
        <motion.div className="h-0.5 bg-[#6366f1] rounded-full mt-2 mb-8" {...underlineGrow} />
        {/* ... */}
      </motion.div>
    </div>
  );
}
```

**Pattern B — Conditional whileHover (for ContactSection icon):**
```typescript
// Used in: ContactSection ContactIcon
const prefersReduced = useReducedMotion();

<motion.a
  whileHover={prefersReduced ? undefined : { scale: 1.1 }}
  transition={{ duration: 0.15, ease: [0.16, 1, 0.3, 1] }}
  // ... other props
>
```

**Pattern C — HeroSection animate (not whileInView — fires on mount):**
```typescript
// HeroSection uses animate= (not whileInView) for underline + tagline
const prefersReduced = useReducedMotion();

// Underline
<motion.div
  className="h-1 rounded-full bg-[#6366f1] mt-2 mb-6"
  initial={prefersReduced ? false : { width: 0 }}
  animate={prefersReduced ? { width: '100%' } : { width: '100%' }}
  transition={prefersReduced ? { duration: 0 } : { delay: 0.8, duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
/>
// Simpler: initial={false} skips the initial state and renders at animate= value immediately
```

**Pattern D — ReactBits components (AnimatedList, SplitText, BlurText):**
These components own their animation logic internally. Each must accept a `prefersReduced` prop OR call `useReducedMotion()` internally and skip variant animation when true.

```typescript
// AnimatedList.tsx — add internally:
import { motion, useInView, useReducedMotion, type Variants } from 'motion/react';

export function AnimatedList({ children, className = '', delay = 80, duration = 0.5, ... }) {
  const prefersReduced = useReducedMotion();
  // ...
  return (
    <motion.div
      ref={ref}
      className={className}
      variants={containerVariants}
      initial="hidden"
      animate={prefersReduced ? 'visible' : (inView ? 'visible' : 'hidden')}
    >
```

### Automated Grep Audit Script Pattern

Run from project root. Each grep checks a specific DSGN violation:

```bash
# DSGN-01: Pure white page/section backgrounds (bg-white is OK on cards, not on page/section wrappers)
# Check page.tsx for bg-white on section wrappers
grep -n "bg-white" src/app/page.tsx

# Check all tsx for #FFFFFF or #ffffff as background values
grep -rn "#FFFFFF\|#ffffff\|bg-white" src/components/ src/app/page.tsx

# DSGN-02: Pure black text
grep -rn "text-black\|#000000\|color: #000\b\|color: black" src/

# DSGN-03: Hard borders on card elements (border border-, NOT border-b on nav)
grep -rn "className.*border border-\|className.*border-\[" src/components/

# DSGN-04: Pure black shadows
grep -rn "rgba(0,0,0\|rgba(0, 0, 0" src/

# DSGN-05: Framer Motion without useReducedMotion
grep -rn "whileInView\|whileHover\|animate={" src/components/ | grep -v "useReducedMotion"
# (Note: absence of useReducedMotion import is the signal)

# DSGN-06: Horizontal rules between sections
grep -rn "<hr\b" src/
```

### Responsive Layout Verification Pattern

Use Chrome DevTools → Toggle Device Toolbar → set width manually:

| Breakpoint | Width | Key checks |
|------------|-------|-----------|
| Mobile | 375px | Nav hamburger visible, skills 1-col grid, contact icons wrap, no horizontal overflow |
| Tablet | 768px | Nav desktop links show (md: breakpoint), skills 2-col grid starts |
| Desktop | 1280px | Full layout, max-w-5xl centered, all sections have sufficient padding |

Critical mobile checks from page.tsx:
- `bg-page`, `bg-section`, `bg-section-warm` — confirmed as Tailwind v4 `@theme` aliases: `#f8fafc`, `#f1f5f9`, `#eef2ff`
- `scroll-mt-16` on all sections — confirmed present on all 5 section wrappers

### Lighthouse Run Pattern

```bash
# 1. Build static output
npm run build

# 2. Serve the /out directory locally
npx serve out
# Default port: 3000 (or 5000 if 3000 is occupied)

# 3. Open Chrome → DevTools → Lighthouse tab
# Mode: Navigation, Categories: Performance + Accessibility
# Device: Desktop
# Run analysis on http://localhost:3000
```

Common Lighthouse accessibility failures for this site type:
- Missing `alt` on images (none in this project — no img tags)
- Heading hierarchy skip (h1 → h3 without h2) — check HeroSection has no h1
- Color contrast: `text-tint-500` (#64748b) on `#f8fafc` background — compute ratio

**Contrast check for known muted colors:**
- `text-tint-500` (#64748b) on `#f8fafc` (#f8fafc): approximately 4.7:1 — passes AA
- `text-slate-400` (#94a3b8) on `#0f172a` (dark bg in ContactSection): approximately 6.8:1 — passes AA
- `text-tint-500` (#64748b) on white card (#ffffff): approximately 4.6:1 — passes AA

### GitHub Repo Creation (no gh CLI)

Since `gh` is not installed on this machine, repo creation uses `git` + GitHub web UI:

```bash
# Step 1: Create repo via GitHub web UI at https://github.com/new
# Name: achyuth-rachur-portfolio, visibility: Public, no template, no README

# Step 2: Add remote and push
git remote add origin https://github.com/achyuthrachur/achyuth-rachur-portfolio.git
git push -u origin master
```

### Cloudflare Pages Manual Connection

Exact UI walkthrough (from CONTEXT.md decisions):
1. Go to https://dash.cloudflare.com → Workers & Pages → Pages → Create a project
2. Click "Connect to Git" → authorize GitHub if needed → select `achyuth-rachur-portfolio`
3. Production branch: `master`
4. Build settings: Framework preset = None, Build command = `npm run build`, Output directory = `out`
5. Environment variables: none
6. Click "Save and Deploy"
7. Wait for first deploy (~2-3 minutes) → verify `*.pages.dev` URL loads

---

## Don't Hand-Roll

| Problem | Don't Build | Use Instead | Why |
|---------|-------------|-------------|-----|
| Reduced motion detection | Custom matchMedia hook | `useReducedMotion()` from `motion/react` | Hook is reactive to OS setting changes; matchMedia only reads at mount |
| Static server for Lighthouse | Custom Node server | `npx serve out` | Zero config, correct MIME types, works with static Next.js export |
| Design audit script | Complex shell script | Targeted `grep -rn` commands per violation type | Simpler, auditable, no tooling required |
| Lighthouse score tracking | Custom tooling | Chrome DevTools Lighthouse panel | Built-in, no install, dev-mode isolated |

---

## Common Pitfalls

### Pitfall 1: CSS reduced-motion does not cover Framer Motion
**What goes wrong:** The `@media (prefers-reduced-motion: reduce)` block in globals.css sets `animation-duration: 0.01ms` — this works for CSS animations and transitions but Framer Motion applies styles via JavaScript at the element level using `transform` and `opacity` directly. These inline styles bypass the CSS rule entirely.
**Why it happens:** Framer Motion is a JS animation engine, not a CSS animation engine. It does not read or respect the CSS media query.
**How to avoid:** Call `useReducedMotion()` from `motion/react` in each component and conditionally remove or no-op animation props when true.
**Warning signs:** In Chrome DevTools → Rendering → "Emulate CSS media feature prefers-reduced-motion: reduce" — elements still animate.

### Pitfall 2: bg-white on card elements is NOT a DSGN-01 violation
**What goes wrong:** Treating every `bg-white` as a violation of "no pure white backgrounds."
**Why it happens:** DSGN-01 targets page-level and section-level backgrounds. White cards on off-white (#f8fafc, #f1f5f9) page backgrounds are the correct Crowe pattern — white cards "float" on the warm off-white page.
**How to avoid:** During grep audit, check WHERE `bg-white` is applied. `EducationSection TiltedCard` and `SkillsSection badges` use `bg-white` on card/pill elements — these are compliant. Only flag if `bg-white` appears on a `<section>`, `<main>`, or `<body>` wrapper.
**Current status:** No violations — all three `bg-white` occurrences in the codebase are on card/pill elements.

### Pitfall 3: Lighthouse run on dev server gives inflated scores
**What goes wrong:** Running Lighthouse on `npm run dev` (Turbopack) gives artificially high performance scores that don't reflect production.
**Why it happens:** Turbopack serves unoptimized bundles; dev server doesn't apply production minification, tree-shaking, or chunk splitting.
**How to avoid:** Always run `npm run build` first, then `npx serve out` to test the actual static output.

### Pitfall 4: GitHub push fails — no remote configured
**What goes wrong:** `git push` fails with "fatal: 'origin' does not exist."
**Why it happens:** `git remote -v` shows empty — no remote has been added yet. The repo has never been pushed to GitHub.
**How to avoid:** Create repo on GitHub first (web UI), then `git remote add origin https://github.com/achyuthrachur/achyuth-rachur-portfolio.git`, then `git push -u origin master`.

### Pitfall 5: Cloudflare build fails if output dir is wrong
**What goes wrong:** Cloudflare Pages shows "Build failed: output directory not found."
**Why it happens:** Cloudflare may default to `dist` or `build` — Next.js static export goes to `out`.
**How to avoid:** Explicitly set Output directory to `out` in Cloudflare Pages build settings. This is not the default.

### Pitfall 6: AnimatedList / SplitText / BlurText animate regardless of OS setting
**What goes wrong:** Even after patching top-level components, the React Bits animated components (AnimatedList, SplitText, BlurText) still animate because they call `useAnimation()` / `useInView()` internally without checking `useReducedMotion()`.
**Why it happens:** These components were hand-written from canonical specs without reduced-motion guards.
**How to avoid:** Add `useReducedMotion()` inside each ReactBits component and skip animation when true. For AnimatedList: `animate={prefersReduced ? 'visible' : (inView ? 'visible' : 'hidden')}`. For SplitText/BlurText: in the `useEffect` that calls `controls.start('visible')`, add an early `controls.start('visible')` call unconditionally when `prefersReduced` is true (skip the inView dependency and jump to final state).

---

## Code Examples

### useReducedMotion in a whileInView component
```typescript
// Source: motion/react official API + project pattern
'use client';
import { motion, useReducedMotion } from 'motion/react';

export function AboutSection() {
  const prefersReduced = useReducedMotion();

  return (
    <div className="max-w-5xl mx-auto px-6 py-24">
      <motion.div
        {...(prefersReduced ? {} : {
          initial: { opacity: 0, y: 30 },
          whileInView: { opacity: 1, y: 0 },
          viewport: { once: true, margin: '-100px' },
          transition: { duration: 0.6, ease: [0.16, 1, 0.3, 1] },
        })}
      >
        {/* content */}
      </motion.div>
    </div>
  );
}
```

### useReducedMotion in AnimatedList (ReactBits internal patch)
```typescript
// src/components/reactbits/AnimatedList.tsx
import { motion, useInView, useReducedMotion, type Variants } from 'motion/react';

export function AnimatedList({ children, className = '', delay = 80, duration = 0.5, ... }) {
  const ref = useRef<HTMLDivElement>(null);
  const prefersReduced = useReducedMotion();
  const inView = useInView(ref, { once: true, margin: rootMargin as `${number}px`, amount: threshold });

  return (
    <motion.div
      ref={ref}
      className={className}
      variants={containerVariants}
      initial="hidden"
      animate={prefersReduced || inView ? 'visible' : 'hidden'}
    >
      {/* children */}
    </motion.div>
  );
}
```

### useReducedMotion in SplitText/BlurText (ReactBits internal patch)
```typescript
// src/components/reactbits/SplitText.tsx (same pattern for BlurText)
import { motion, useInView, useAnimation, useReducedMotion, type Variants, type Easing } from 'motion/react';

export function SplitText({ text, ... }) {
  const controls = useAnimation();
  const ref = useRef<HTMLParagraphElement>(null);
  const prefersReduced = useReducedMotion();
  const inView = useInView(ref, { once: true, margin: rootMargin as `${number}px`, amount: threshold });

  useEffect(() => {
    if (prefersReduced) {
      // Jump to final visible state immediately — no animation
      controls.set('visible');
      return;
    }
    if (inView) {
      controls.start('visible').then(() => {
        onLetterAnimationComplete?.();
      });
    }
  }, [inView, controls, prefersReduced, onLetterAnimationComplete]);
  // ...
}
```

### Nav layoutId motion.div — reduced motion
```typescript
// Nav.tsx — the layoutId animated underline also needs to be conditional
{isActive && (
  <motion.div
    layoutId={prefersReduced ? undefined : 'nav-underline'}
    className="absolute bottom-0 left-0 right-0 h-0.5 bg-[#6366f1] rounded-full"
    transition={prefersReduced ? { duration: 0 } : { type: 'spring', stiffness: 380, damping: 30 }}
  />
)}
// When layoutId is undefined, Framer Motion treats it as a regular div — no shared layout animation
```

---

## State of the Art

| Old Approach | Current Approach | Notes |
|--------------|------------------|-------|
| `framer-motion` package name | `motion` package (`motion/react` import) | Changed 2024 — project already uses correct package |
| `@types/animejs` for v4 types | animejs v4 ships own types | `@types/animejs` covers v3 only and conflicts |
| `tailwind.config.ts` for custom tokens | `@theme` block in `globals.css` (Tailwind v4) | Project uses Tailwind v4 — no config file |
| Vercel deployment | Cloudflare Pages (user decision) | Static export (`output: 'export'`) matches both targets |

---

## DSGN Audit Findings (pre-research codebase scan)

This is the result of scanning all `.tsx` files now, so the planner has the actual violation list:

### DSGN-01: Pure white page backgrounds
**Status: CLEAN** — No `bg-white` appears on any section or page wrapper in `page.tsx`. The three `bg-white` occurrences are all on card/pill elements (EducationSection TiltedCard, SkillsSection badges, SpotlightCard base class) — valid Crowe pattern.

### DSGN-02: Pure black text
**Status: CLEAN** — No `text-black`, `#000000`, or `color: black` found in any tsx file. Body text uses `tint-900` (#0f172a) which is the project's warm-dark substitute.

### DSGN-03: Borders on cards
**Status: NEEDS REVIEW** — Three border occurrences found:
- `Nav.tsx:51` — `border-b border-[rgba(15,23,42,0.06)]` — This is the glassmorphism nav separator (nearly invisible, 6% opacity). Per requirements NAV-02, this is intentional and compliant.
- `Nav.tsx:114` — Same on mobile dropdown — same rationale.
- `Footer.tsx:3` — `border-t border-[rgba(248,250,252,0.08)]` — White at 8% opacity on dark indigo bg. Functionally invisible. Could be removed (just spacing) or kept — either is defensible.

**Verdict:** No true violations. The borders present are all translucent glassmorphism separators, not the harsh `border: 1px solid #E0E0E0` anti-pattern. The Footer border could optionally be removed for cleanliness.

### DSGN-04: Pure black shadows
**Status: CLEAN** — No `rgba(0,0,0` found anywhere. All shadows use `rgba(15,23,42,*)` (slate-tinted, project's equivalent of indigo-tinted).

### DSGN-05: prefers-reduced-motion
**Status: VIOLATIONS FOUND** — `useReducedMotion()` is called NOWHERE in the codebase. Components requiring patching:
- `AboutSection.tsx` — whileInView on motion.div (x2)
- `EducationSection.tsx` — whileInView on motion.div (x4)
- `ContactSection.tsx` — whileInView on motion.div (x2) + whileHover on motion.a
- `HeroSection.tsx` — animate= on motion.div (x2) — Anime.js is guarded; Framer Motion is not
- `Nav.tsx` — layoutId motion.div for active underline
- `src/components/reactbits/AnimatedList.tsx` — internal motion animation
- `src/components/reactbits/SplitText.tsx` — internal motion animation
- `src/components/reactbits/BlurText.tsx` — internal motion animation

**Anime.js is already guarded:** HeroSection.tsx:17 and ExperienceSection.tsx:18 both have `window.matchMedia('(prefers-reduced-motion: reduce)')` guards — these components do not need Anime.js changes.

### DSGN-06: Horizontal rules between sections
**Status: CLEAN** — No `<hr` tags found. Section transitions are all background color shifts in `page.tsx`.

---

## Validation Architecture

nyquist_validation is enabled in .planning/config.json.

### Test Framework
| Property | Value |
|----------|-------|
| Framework | None installed — no vitest/jest config found |
| Config file | None — Wave 0 gap |
| Quick run command | `npm run build` (build as functional proxy test) |
| Full suite command | Manual audit checklist + Lighthouse + responsive check |

### Phase Requirements → Test Map

| Req ID | Behavior | Test Type | Automated Command | File Exists? |
|--------|----------|-----------|-------------------|-------------|
| DSGN-01 | No pure white page backgrounds | grep audit | `grep -rn "bg-white" src/app/page.tsx` | ✅ page.tsx exists |
| DSGN-02 | No pure black text | grep audit | `grep -rn "text-black\|#000000" src/` | ✅ files exist |
| DSGN-03 | No hard borders on cards | grep audit | `grep -rn "border border-" src/components/` | ✅ files exist |
| DSGN-04 | No rgba(0,0,0) shadows | grep audit | `grep -rn "rgba(0,0,0" src/` | ✅ files exist |
| DSGN-05 | prefers-reduced-motion respected | code fix + manual | Chrome Rendering panel — "Emulate prefers-reduced-motion: reduce" | manual-only |
| DSGN-06 | No hr tags between sections | grep audit | `grep -rn "<hr" src/` | ✅ files exist |
| QUAL-01 | Responsive at 375/768/1280px | manual | Chrome DevTools device toolbar | manual-only |
| QUAL-02 | Lighthouse > 90 | manual | Chrome DevTools Lighthouse → `npx serve out` | manual-only |
| QUAL-03 | No console errors | manual | Browser console on `npx serve out` | manual-only |
| QUAL-04 | Build exits 0, /out exists | build | `npm run build` | ✅ next.config.ts exists |
| QUAL-05 | GitHub repo created and pushed | deploy | `git remote -v` confirms origin | ❌ Wave 0 — no remote |
| QUAL-06 | Cloudflare Pages live | deploy | Navigate to *.pages.dev URL | manual-only |

### Sampling Rate
- **Per task commit:** `npm run build` — confirms no TypeScript/build errors
- **Per wave merge:** Full grep audit + build + `npx serve out` visual check
- **Phase gate:** All manual checkpoints confirmed before marking phase complete

### Wave 0 Gaps
- [ ] Git remote not set — `git remote add origin https://github.com/achyuthrachur/achyuth-rachur-portfolio.git` needed in Wave 0 or deploy task
- No test framework gaps — this phase has no unit-testable logic; all verification is grep/build/manual

---

## Open Questions

1. **Footer border-t removal**
   - What we know: `border-t border-[rgba(248,250,252,0.08)]` is present on Footer — white at 8% opacity on dark indigo background, visually invisible
   - What's unclear: Whether planner should explicitly remove it for DSGN-03 purity or leave it
   - Recommendation: Remove it — replace with `py-6` spacing only; the visual result is identical and the audit passes cleanly

2. **Heading hierarchy for Lighthouse**
   - What we know: HeroSection has no `h1` — name is rendered via SplitText as a `motion.p`. ExperienceSection uses `h2`. AboutSection uses `h2`.
   - What's unclear: Lighthouse Accessibility may flag "page has no h1" — this would reduce score
   - Recommendation: Investigate during Lighthouse run. If flagged, change SplitText's root element from `motion.p` to `motion.h1` in HeroSection.

3. **SplitText `motion.p` aria-label**
   - What we know: SplitText renders individual character spans inside a `motion.p` with `aria-label={text}` — this is the correct screen-reader pattern
   - What's unclear: Whether Lighthouse parses aria-label for the landmark/heading score
   - Recommendation: Leave as-is during first Lighthouse run; fix only if score is below 90.

---

## Sources

### Primary (HIGH confidence)
- Direct codebase inspection — all 8 component tsx files read and analyzed
- `src/app/globals.css` — confirmed prefers-reduced-motion CSS rule coverage and project color palette
- `package.json` — confirmed `motion@12.34.5`, `next@16.1.6`, `animejs@4.3.6`
- `next.config.ts` — confirmed `output: 'export'`, static export for Cloudflare Pages
- `git remote -v` — confirmed no remote configured (empty output)
- `where gh` — confirmed gh CLI not available on this machine

### Secondary (MEDIUM confidence)
- motion/react `useReducedMotion` API — hook exists in the `motion` package (same package already installed as `motion@12.34.5`); import path `import { useReducedMotion } from 'motion/react'` matches established project import pattern confirmed in codebase
- Cloudflare Pages build settings — output directory `out` for Next.js static export is standard; confirmed against project's next.config.ts `output: 'export'` setting

### Tertiary (LOW confidence)
- Lighthouse contrast ratios for `text-tint-500` — computed from hex values; not run against actual rendered page

---

## Metadata

**Confidence breakdown:**
- DSGN audit findings: HIGH — direct code inspection of all source files
- Framer Motion useReducedMotion API: HIGH — package already installed, import path confirmed from existing codebase patterns
- Lighthouse expected scores: MEDIUM — no actual run yet; estimates based on code structure
- Cloudflare Pages UI steps: MEDIUM — from user-provided CONTEXT.md decisions; UI labels may differ slightly from current Cloudflare dashboard

**Research date:** 2026-03-04
**Valid until:** 2026-04-04 (stable libraries; Cloudflare UI may update)
