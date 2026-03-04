# Phase 2: Hero + Navigation - Context

**Gathered:** 2026-03-04
**Status:** Ready for planning

<domain>
## Phase Boundary

Build the above-the-fold experience: a full-viewport animated hero section (Aurora background, animated name/subtitle/tagline, amber underline, scroll indicator) and a glassmorphism sticky navigation bar with active-section tracking. No other sections are in scope for this phase.

</domain>

<decisions>
## Implementation Decisions

### Navigation — Structure
- **Left side:** Full name "Achyuth Rachur" — `font-semibold text-crowe-indigo-dark`, links back to `#hero` on click
- **Center/right links:** About, Experience, Skills, Education — `text-tint-700` when inactive, amber underline (Framer Motion `layoutId`) when active
- **Right side CTA:** Amber "Contact" button — `bg-crowe-amber text-crowe-indigo-dark rounded-sm`, scrolls to `#contact`
- **Mobile:** Hamburger menu icon (Iconsax `HambergerMenu` or equivalent) — opens dropdown/sheet with all nav links
- **Height:** `h-16` (64px) — sets `scroll-mt-16` on all section anchors

### Navigation — Visual Treatment
- **Glassmorphism:** `bg-[rgba(250,251,253,0.85)] backdrop-blur-[16px] border-b border-[rgba(1,30,65,0.04)]` (from original spec)
- **Scroll behavior:** Gradual opacity increase as hero scrolls out of view — `bg-opacity` transitions from 0.85 → 0.97 based on scroll position (not a snap toggle)
- **Active indicator:** Framer Motion `layoutId="nav-underline"` shared amber underline animates between active sections
- **Position:** `sticky top-0 z-50`

### Hero — Layout
- **Background:** Full viewport height (`min-h-screen`), Crowe Indigo Dark (`bg-[#011E41]`)
- **Aurora:** `src/components/reactbits/Aurora` — `colorStops={['#011E41','#002E62','#003F9F']}`, `blend={0.3}` (low opacity, atmospheric), `amplitude={1.0}`, `speed={0.5}` — positioned `absolute inset-0`
- **Content vertical position:** Centered — `flex items-center justify-center`
- **Content max-width:** `max-w-2xl` (672px)
- **Text alignment:** Left-aligned — name, subtitle, tagline, and amber underline all left-anchored

### Hero — Content & Animation
- **Name:** "Achyuth Rachur" via `<SplitText>` — `splitBy="chars"`, `delay={50}`, color `#f6f7fa` (soft white, not pure white)
- **Subtitle:** "Staff Consultant | Integrated Risk Management" via `<BlurText>` — `animateBy="words"`, `direction="top"`, `delay={200}`, color `rgba(246,247,250,0.7)` (muted soft white)
- **Tagline:** "Helping financial institutions design, deploy, and govern AI that works." — plain `<p>` tag, fade-in via Framer Motion `initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }}`, delay 0.6s, color `rgba(246,247,250,0.55)` (more muted than subtitle)
- **Amber underline:** Framer Motion `<motion.div>` — `initial={{ width: 0 }} animate={{ width: '100%' }}`, transition `delay: 0.8, duration: 0.8, ease: [0.16,1,0.3,1]`, `h-1 rounded-full bg-[#F5A800]`

### Scroll Indicator
- **Component:** Iconsax `<ArrowDown>` — `variant="Linear"`, `color="#f6f7fa"`, `size={28}`
- **Animation:** Anime.js infinite `translateY` bounce (0 → 8px → 0), duration 1200ms, loop, easeInOutSine
- **Behavior:** Clickable — wraps in `<a href="#about">`, smooth scrolls to About section
- **Fade out:** Framer Motion `useScroll` + `useTransform` — opacity 1 → 0 as scroll passes `100px` from top. Positioned `absolute bottom-8` within hero
- **Reduced motion:** Anime.js animation skipped if `prefers-reduced-motion: reduce`

### Active Section Detection
- **Method:** `IntersectionObserver` watching each section (`#about`, `#experience`, `#skills`, `#education`, `#contact`)
- **Threshold:** `0.5` — section is "active" when 50% visible
- **State:** React `useState` for active section ID, drives the Framer Motion `layoutId` underline

### Claude's Discretion
- Exact hamburger menu implementation (drawer vs dropdown, animation style)
- Section ID naming convention (lowercase, matches nav link hrefs)
- Framer Motion `useScroll` / `useTransform` specifics for nav opacity
- Whether to use `useMotionValueEvent` or `onChange` for scroll-based opacity

</decisions>

<specifics>
## Specific Ideas

- Tagline verbatim: "Helping financial institutions design, deploy, and govern AI that works."
- Aurora opacity should be very low — "atmospheric, not distracting" (from original spec: 0.3)
- The amber underline under the name is a strong brand moment — it draws the eye and reinforces Crowe identity
- Nav glassmorphism specs are exact from original: `bg-[rgba(250,251,253,0.85)] backdrop-blur-[16px] border-b border-[rgba(1,30,65,0.04)]`

</specifics>

<code_context>
## Existing Code Insights

### Reusable Assets
- `src/components/reactbits/SplitText.tsx`: `splitBy`, `delay`, `duration`, `from/to`, `threshold`, `rootMargin` — InView triggered, staggered chars/words
- `src/components/reactbits/BlurText.tsx`: `animateBy`, `direction`, `delay`, `duration`, `threshold` — blur+fade+y entrance
- `src/components/reactbits/Aurora.tsx`: `colorStops`, `blend`, `amplitude`, `speed` — canvas-based, `absolute inset-0 w-full h-full`
- `src/components/ui/badge.tsx`: available for nav if needed, Crowe-themed variants
- `src/lib/utils.ts`: `cn()` — clsx + twMerge for safe class composition

### Established Patterns
- `motion/react` (not `framer-motion`) — all Framer Motion imports use this package
- `'use client'` at top of every interactive component
- Named exports (not default exports)
- Crowe tokens via Tailwind utilities: `bg-crowe-indigo-dark`, `text-crowe-amber`, `shadow-crowe-card`, `bg-page`, etc.
- All shadows use `rgba(1,30,65,*)` — never pure black
- Aurora already defaults to `['#011E41','#002E62','#F5A800']` — match spec with `colorStops`

### Integration Points
- `src/app/layout.tsx`: nav goes inside layout (renders on all pages) or inside page.tsx (single-page)
- Since this is single-page, nav should be in `src/app/page.tsx` or a `<Nav>` component imported there
- `src/app/globals.css`: `scroll-behavior: smooth` already set
- All section anchors need `id` attribute matching nav hrefs and `scroll-mt-16` (64px nav offset)

</code_context>

<deferred>
## Deferred Ideas

- None — discussion stayed within Phase 2 scope

</deferred>

---

*Phase: 02-hero-navigation*
*Context gathered: 2026-03-04*
