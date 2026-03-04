# Roadmap: Achyuth Rachur Portfolio

## Overview

Five phases take this from an empty directory to a live, Crowe-branded single-page portfolio on Cloudflare Pages. Phase 1 lays the technical foundation so every subsequent phase can run in the browser. Phases 2-4 build the page section by section — hero and navigation first (first impression), then core content (About, Experience, Skills), then the closing sections (Education, Contact, Footer). Phase 5 audits design compliance, verifies quality gates, and ships to production.

## Phases

- [x] **Phase 1: Foundation** - Scaffold Next.js project with full Crowe brand token setup and all animation dependencies installed (completed 2026-03-04)
- [ ] **Phase 2: Hero + Navigation** - Above-the-fold experience: animated hero section and glassmorphism sticky nav
- [ ] **Phase 3: Content Sections** - Professional story: About, Experience, and Skills sections with animated components
- [ ] **Phase 4: Closing Sections** - Complete the page: Education, Contact, and Footer
- [ ] **Phase 5: Polish + Deploy** - Design compliance audit, quality gates, and Cloudflare Pages deployment

## Phase Details

### Phase 1: Foundation
**Goal**: A running Next.js project with all Crowe brand tokens, animation libraries, and React Bits components ready for use
**Depends on**: Nothing (first phase)
**Requirements**: SCAF-01, SCAF-02, SCAF-03, SCAF-04, SCAF-05, SCAF-06
**Success Criteria** (what must be TRUE):
  1. `npm run dev` starts without errors and loads a blank page at localhost:3000
  2. `npm run build` produces an `/out` directory (static export) without errors
  3. Crowe color tokens, tint scale, shadow system, and font families are available as Tailwind classes
  4. React Bits components (SplitText, BlurText, SpotlightCard, TiltedCard, Aurora, AnimatedList, GradientText, ShinyText, CountUp) are importable from the project
  5. shadcn/ui globals.css contains Crowe HSL overrides so all shadcn components use brand colors
**Plans**: 3 plans

Plans:
- [ ] 01-01-PLAN.md — Scaffold Next.js project and configure static export for Cloudflare Pages
- [ ] 01-02-PLAN.md — Initialize shadcn/ui and write complete Crowe brand token system into globals.css
- [ ] 01-03-PLAN.md — Install animation/icon packages and populate all 9 React Bits components

### Phase 2: Hero + Navigation
**Goal**: A visitor landing on the site sees an animated hero with Achyuth's name and role, and can navigate smoothly between sections via a glassmorphism sticky nav
**Depends on**: Phase 1
**Requirements**: NAV-01, NAV-02, NAV-03, NAV-04, NAV-05, HERO-01, HERO-02, HERO-03, HERO-04, HERO-05, HERO-06
**Success Criteria** (what must be TRUE):
  1. The hero section fills the full viewport with an Aurora background, animated name (SplitText), animated subtitle (BlurText), an amber underline that animates in, and a bouncing scroll indicator
  2. The sticky nav is visible at the top on every scroll position with glassmorphism treatment
  3. Clicking a nav link smoothly scrolls to that section with correct scroll-mt offset
  4. The active nav item shows an amber underline indicator that moves between items using Framer Motion layoutId
  5. The nav background visibly increases in opacity after scrolling past the hero
**Plans**: 3 plans

Plans:
- [ ] 02-01-PLAN.md — Build Nav component: glassmorphism sticky nav with scroll opacity, layoutId active underline, and mobile hamburger
- [ ] 02-02-PLAN.md — Build HeroSection component: Aurora canvas, SplitText name, BlurText subtitle, amber underline, Anime.js scroll indicator
- [ ] 02-03-PLAN.md — Wire page.tsx: import Nav + HeroSection, add placeholder sections for anchor testing, verify build

### Phase 3: Content Sections
**Goal**: A visitor can read Achyuth's professional summary, experience bullets in SpotlightCards, and browse skills organized into four badge-grid categories
**Depends on**: Phase 2
**Requirements**: ABOUT-01, ABOUT-02, ABOUT-03, EXP-01, EXP-02, EXP-03, EXP-04, EXP-05, EXP-06, SKILL-01, SKILL-02, SKILL-03, SKILL-04, SKILL-05
**Success Criteria** (what must be TRUE):
  1. The About section renders a professional summary paragraph that fades in on scroll
  2. The Experience section shows "Crowe LLP" in Indigo Dark with SpotlightCard amber spotlight on each bullet, and cards stagger into view on scroll
  3. Key terms in experience bullets are visually highlighted (ShinyText or amber-wash span)
  4. The Skills section renders four category groups in a 2-column grid with badge pills that hover with an amber glow effect
  5. Badge pills and skill groups stagger into view on scroll via AnimatedList or Anime.js
**Plans**: TBD

### Phase 4: Closing Sections
**Goal**: The page is complete end-to-end — a visitor can see Education, reach Achyuth via Contact icons, and see the footer
**Depends on**: Phase 3
**Requirements**: EDU-01, EDU-02, EDU-03, EDU-04, CONT-01, CONT-02, CONT-03, CONT-04, CONT-05, FOOT-01, FOOT-02
**Success Criteria** (what must be TRUE):
  1. The Education section renders at least one TiltedCard (placeholder compiles cleanly; no build errors due to missing content)
  2. The Contact section has an Indigo Dark background with a GradientText heading and four Iconsax contact icons (email, LinkedIn, GitHub, phone) that are clickable anchors
  3. Each contact icon animates to amber and scales up on hover
  4. The footer renders "© 2025 Achyuth Rachur" in muted text on Indigo Dark background
**Plans**: TBD

### Phase 5: Polish + Deploy
**Goal**: The site passes design compliance, has no console errors, scores above 90 on Lighthouse, is responsive across breakpoints, and is live on Cloudflare Pages
**Depends on**: Phase 4
**Requirements**: DSGN-01, DSGN-02, DSGN-03, DSGN-04, DSGN-05, DSGN-06, QUAL-01, QUAL-02, QUAL-03, QUAL-04, QUAL-05, QUAL-06
**Success Criteria** (what must be TRUE):
  1. A full-page audit confirms: no pure white page backgrounds, no pure black text, no bordered cards, no rgba(0,0,0,*) shadows, and no horizontal rules between sections
  2. All animations are suppressed or instant when `prefers-reduced-motion: reduce` is set in the OS
  3. The layout renders correctly on mobile (375px), tablet (768px), and desktop (1280px) viewports
  4. Lighthouse scores for Performance and Accessibility are both above 90 with no console errors
  5. The site is live and publicly accessible via a Cloudflare Pages URL after GitHub push
**Plans**: TBD

## Progress

**Execution Order:**
Phases execute in numeric order: 1 → 2 → 3 → 4 → 5

| Phase | Plans Complete | Status | Completed |
|-------|----------------|--------|-----------|
| 1. Foundation | 3/3 | Complete    | 2026-03-04 |
| 2. Hero + Navigation | 2/3 | In Progress|  |
| 3. Content Sections | 0/TBD | Not started | - |
| 4. Closing Sections | 0/TBD | Not started | - |
| 5. Polish + Deploy | 0/TBD | Not started | - |
