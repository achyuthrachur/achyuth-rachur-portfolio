# Phase 2: Hero + Navigation - Research

**Researched:** 2026-03-04
**Domain:** React/Next.js animated hero section + glassmorphism sticky nav with scroll-driven behaviors
**Confidence:** HIGH

---

<user_constraints>
## User Constraints (from CONTEXT.md)

### Locked Decisions

**Navigation — Structure**
- Left side: Full name "Achyuth Rachur" — `font-semibold text-crowe-indigo-dark`, links back to `#hero` on click
- Center/right links: About, Experience, Skills, Education — `text-tint-700` when inactive, amber underline (Framer Motion `layoutId`) when active
- Right side CTA: Amber "Contact" button — `bg-crowe-amber text-crowe-indigo-dark rounded-sm`, scrolls to `#contact`
- Mobile: Hamburger menu icon (Iconsax `HambergerMenu` or equivalent) — opens dropdown/sheet with all nav links
- Height: `h-16` (64px) — sets `scroll-mt-16` on all section anchors

**Navigation — Visual Treatment**
- Glassmorphism: `bg-[rgba(250,251,253,0.85)] backdrop-blur-[16px] border-b border-[rgba(1,30,65,0.04)]`
- Scroll behavior: Gradual opacity increase as hero scrolls out of view — `bg-opacity` transitions from 0.85 → 0.97 based on scroll position (not a snap toggle)
- Active indicator: Framer Motion `layoutId="nav-underline"` shared amber underline animates between active sections
- Position: `sticky top-0 z-50`

**Hero — Layout**
- Background: Full viewport height (`min-h-screen`), Crowe Indigo Dark (`bg-[#011E41]`)
- Aurora: `src/components/reactbits/Aurora` — `colorStops={['#011E41','#002E62','#003F9F']}`, `blend={0.3}`, `amplitude={1.0}`, `speed={0.5}` — positioned `absolute inset-0`
- Content vertical position: Centered — `flex items-center justify-center`
- Content max-width: `max-w-2xl` (672px)
- Text alignment: Left-aligned — name, subtitle, tagline, and amber underline all left-anchored

**Hero — Content & Animation**
- Name: "Achyuth Rachur" via `<SplitText>` — `splitBy="chars"`, `delay={50}`, color `#f6f7fa`
- Subtitle: "Staff Consultant | Integrated Risk Management" via `<BlurText>` — `animateBy="words"`, `direction="top"`, `delay={200}`, color `rgba(246,247,250,0.7)`
- Tagline: plain `<p>` tag, fade-in via Framer Motion `initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }}`, delay 0.6s, color `rgba(246,247,250,0.55)`
- Amber underline: Framer Motion `<motion.div>` — `initial={{ width: 0 }} animate={{ width: '100%' }}`, transition `delay: 0.8, duration: 0.8, ease: [0.16,1,0.3,1]`, `h-1 rounded-full bg-[#F5A800]`

**Scroll Indicator**
- Component: Iconsax `<ArrowDown>` — `variant="Linear"`, `color="#f6f7fa"`, `size={28}`
- Animation: Anime.js infinite `translateY` bounce (0 → 8px → 0), duration 1200ms, loop, easeInOutSine
- Behavior: Clickable — wraps in `<a href="#about">`, smooth scrolls to About section
- Fade out: Framer Motion `useScroll` + `useTransform` — opacity 1 → 0 as scroll passes `100px` from top. Positioned `absolute bottom-8` within hero
- Reduced motion: Anime.js animation skipped if `prefers-reduced-motion: reduce`

**Active Section Detection**
- Method: `IntersectionObserver` watching each section (`#about`, `#experience`, `#skills`, `#education`, `#contact`)
- Threshold: `0.5`
- State: React `useState` for active section ID, drives the Framer Motion `layoutId` underline

### Claude's Discretion
- Exact hamburger menu implementation (drawer vs dropdown, animation style)
- Section ID naming convention (lowercase, matches nav link hrefs)
- Framer Motion `useScroll` / `useTransform` specifics for nav opacity
- Whether to use `useMotionValueEvent` or `onChange` for scroll-based opacity

### Deferred Ideas (OUT OF SCOPE)
- None — discussion stayed within Phase 2 scope
</user_constraints>

---

<phase_requirements>
## Phase Requirements

| ID | Description | Research Support |
|----|-------------|-----------------|
| NAV-01 | Sticky top navigation with links: About, Experience, Skills, Education, Contact | Nav component architecture, sticky positioning, section anchor pattern |
| NAV-02 | Glassmorphism styling: bg rgba(250,251,253,0.85) backdrop-blur-[16px] border-b border-[rgba(1,30,65,0.04)] | Glassmorphism CSS pattern verified, exact values locked in CONTEXT.md |
| NAV-03 | Active section indicator uses Framer Motion layoutId shared amber underline animation | `motion/react` layoutId pattern confirmed; see Code Examples |
| NAV-04 | Smooth scroll behavior with scroll-mt offset for sticky nav height | `scroll-behavior: smooth` already set in globals.css; `scroll-mt-16` pattern |
| NAV-05 | Nav background opacity increases on scroll past hero | `useScroll` + `useTransform` + `useMotionValueEvent` pattern; see Code Examples |
| HERO-01 | Full viewport height section with Crowe Indigo Dark (#011E41) background | `min-h-screen bg-[#011E41]` with `relative overflow-hidden` for Aurora canvas |
| HERO-02 | Aurora background (React Bits) with indigo spectrum colors ['#011E41','#002E62','#003F9F'] at 0.3 opacity | Aurora component already installed; prop interface confirmed |
| HERO-03 | Name "Achyuth Rachur" animated via React Bits SplitText — character stagger, color #f6f7fa | SplitText prop interface confirmed; `splitBy="characters"` for char stagger |
| HERO-04 | Subtitle "Staff Consultant | Integrated Risk Management" animated via React Bits BlurText — word-by-word, muted white rgba(246,247,250,0.7) | BlurText prop interface confirmed; color applied via className |
| HERO-05 | Amber underline under name — Framer Motion div, width 0 → 100%, h-1 bg-[#F5A800] rounded-full, delay 0.8s | `motion/react` animate pattern confirmed; see Code Examples |
| HERO-06 | Scroll indicator at bottom — Iconsax ArrowDown with Anime.js infinite translateY bounce | `animate()` from animejs v4 confirmed; ArrowDown icon from iconsax-react confirmed |
</phase_requirements>

---

## Summary

Phase 2 builds the entire above-the-fold experience: a glassmorphism sticky navigation bar with scroll-driven opacity and Framer Motion active underline, plus a full-viewport dark hero with Aurora canvas background, staggered text animations (SplitText, BlurText), and an Anime.js bouncing scroll indicator. All libraries are already installed and their components are already in the codebase from Phase 1.

The critical architectural insight is component decomposition: `<Nav>` and `<HeroSection>` must be separate 'use client' components imported into the server-rendered `page.tsx`. The Nav needs scroll position state shared with hero opacity behavior. The `useScroll` hook from `motion/react` runs in the Nav component itself and drives opacity via `useTransform`. Active section tracking via `IntersectionObserver` runs in a shared hook or inside the Nav component, with section IDs as the source of truth.

The SplitText component uses `splitBy="characters"` (not `"chars"`) based on the actual prop interface — the CONTEXT.md references `"chars"` but the component source defines the union as `'characters' | 'words'`. This is a critical finding. Similarly, BlurText does not accept a direct `color` prop; color must be applied via Tailwind `className`. Both components are InView-triggered (fire once when scrolled into view), which is ideal for hero content that loads at the top of the page.

**Primary recommendation:** Build `<Nav>` and `<HeroSection>` as separate client components. Use `motion/react` `useScroll` for scroll-driven nav opacity. Use `layoutId="nav-underline"` for the animated active underline. Apply all animation props through existing component interfaces — no custom animation primitives needed except for the Anime.js bounce on the scroll indicator.

---

## Standard Stack

### Core (all already installed — no new installs needed)

| Library | Version | Purpose | Why Standard |
|---------|---------|---------|--------------|
| `motion` (motion/react) | 12.34.5 | Nav layoutId underline, hero fade-ins, scroll-driven opacity, scroll indicator fade | Only Framer Motion animation library in project |
| `animejs` | 4.3.6 | Scroll indicator infinite bounce (Anime.js excels at loop animations) | Already installed; v4 modular API |
| `iconsax-react` | 0.0.8 | ArrowDown scroll indicator, hamburger menu icon | Already installed; --legacy-peer-deps required |
| `next` | 16.1.6 | App Router, static export, layout.tsx | Project framework |
| `tailwindcss` | v4 | All utility classes, Crowe @theme tokens | Project styling |

### Supporting (already installed)

| Library | Version | Purpose | When to Use |
|---------|---------|---------|-------------|
| `clsx` + `tailwind-merge` | 2.1.1 / 3.5.0 | `cn()` class composition in components | All component className construction |
| `class-variance-authority` | 0.7.1 | Variant-based styling | Not needed for Nav/Hero but available |

### No New Installs Required

All required libraries are present in `package.json`. The corporate SSL proxy blocks CLI registries — this constraint is already accommodated by Phase 1 work. No additional `npm install` commands needed for this phase.

---

## Architecture Patterns

### Recommended File Structure

```
src/
├── app/
│   ├── page.tsx              # Server component — imports Nav + HeroSection
│   └── layout.tsx            # Root layout (unchanged)
└── components/
    ├── Nav.tsx               # 'use client' — sticky nav, glassmorphism, layoutId underline
    ├── HeroSection.tsx       # 'use client' — full-viewport hero, Aurora, animations
    ├── ScrollIndicator.tsx   # 'use client' — Anime.js bounce + Framer fade (OR inline in HeroSection)
    ├── reactbits/            # Existing (untouched)
    │   ├── Aurora.tsx
    │   ├── SplitText.tsx
    │   └── BlurText.tsx
    └── ui/
        └── badge.tsx         # Existing (untouched)
```

**Decision:** ScrollIndicator can be inlined inside HeroSection.tsx (fewer files, simpler). Only extract it if the bounce + fade logic makes HeroSection too long.

### Pattern 1: Glassmorphism Sticky Nav

**What:** Fixed header using CSS backdrop-filter with inline style for dynamic opacity
**When to use:** Always — this is the locked spec

```tsx
// src/components/Nav.tsx
'use client';

import { useEffect, useRef, useState } from 'react';
import { motion, useScroll, useTransform, useMotionValueEvent } from 'motion/react';
import { ArrowDown2, HambergerMenu, CloseCircle } from 'iconsax-react';
import { cn } from '@/lib/utils';

const NAV_LINKS = [
  { label: 'About', href: '#about' },
  { label: 'Experience', href: '#experience' },
  { label: 'Skills', href: '#skills' },
  { label: 'Education', href: '#education' },
];

export function Nav() {
  const [activeSection, setActiveSection] = useState<string>('');
  const [mobileOpen, setMobileOpen] = useState(false);
  const [navBgOpacity, setNavBgOpacity] = useState(0.85);
  const { scrollY } = useScroll();

  // Scroll-driven nav opacity: 0.85 at top → 0.97 past hero
  useMotionValueEvent(scrollY, 'change', (latest) => {
    const heroHeight = window.innerHeight; // hero is min-h-screen
    const progress = Math.min(latest / heroHeight, 1);
    const opacity = 0.85 + (0.97 - 0.85) * progress;
    setNavBgOpacity(opacity);
  });

  // IntersectionObserver for active section
  useEffect(() => {
    const sectionIds = ['about', 'experience', 'skills', 'education', 'contact'];
    const observers: IntersectionObserver[] = [];

    sectionIds.forEach((id) => {
      const el = document.getElementById(id);
      if (!el) return;
      const observer = new IntersectionObserver(
        ([entry]) => {
          if (entry.isIntersecting) setActiveSection(id);
        },
        { threshold: 0.5 }
      );
      observer.observe(el);
      observers.push(observer);
    });

    return () => observers.forEach((o) => o.disconnect());
  }, []);

  return (
    <nav
      className="sticky top-0 z-50 h-16 backdrop-blur-[16px] border-b border-[rgba(1,30,65,0.04)]"
      style={{ backgroundColor: `rgba(250,251,253,${navBgOpacity})` }}
    >
      <div className="max-w-5xl mx-auto px-6 h-full flex items-center justify-between">
        {/* Logo / name */}
        <a href="#hero" className="font-semibold text-crowe-indigo-dark font-body">
          Achyuth Rachur
        </a>

        {/* Desktop links */}
        <div className="hidden md:flex items-center gap-6">
          {NAV_LINKS.map(({ label, href }) => {
            const id = href.slice(1);
            const isActive = activeSection === id;
            return (
              <a
                key={id}
                href={href}
                className={cn(
                  'relative text-sm pb-1 transition-colors duration-150',
                  isActive ? 'text-crowe-indigo-dark' : 'text-tint-700'
                )}
              >
                {label}
                {isActive && (
                  <motion.div
                    layoutId="nav-underline"
                    className="absolute bottom-0 left-0 right-0 h-0.5 bg-crowe-amber rounded-full"
                    transition={{ type: 'spring', stiffness: 380, damping: 30 }}
                  />
                )}
              </a>
            );
          })}
          <a
            href="#contact"
            className="bg-crowe-amber text-crowe-indigo-dark rounded-sm px-4 py-1.5 text-sm font-semibold"
          >
            Contact
          </a>
        </div>

        {/* Mobile hamburger */}
        <button
          className="md:hidden text-crowe-indigo-dark"
          onClick={() => setMobileOpen((v) => !v)}
          aria-label="Toggle menu"
        >
          {mobileOpen
            ? <CloseCircle variant="Linear" size={24} />
            : <HambergerMenu variant="Linear" size={24} />}
        </button>
      </div>

      {/* Mobile dropdown */}
      {mobileOpen && (
        <div className="md:hidden absolute top-16 left-0 right-0 bg-[rgba(250,251,253,0.97)] backdrop-blur-[16px] border-b border-[rgba(1,30,65,0.04)] px-6 py-4 flex flex-col gap-4">
          {NAV_LINKS.map(({ label, href }) => (
            <a
              key={href}
              href={href}
              className="text-tint-700 text-sm"
              onClick={() => setMobileOpen(false)}
            >
              {label}
            </a>
          ))}
          <a
            href="#contact"
            className="bg-crowe-amber text-crowe-indigo-dark rounded-sm px-4 py-1.5 text-sm font-semibold text-center"
            onClick={() => setMobileOpen(false)}
          >
            Contact
          </a>
        </div>
      )}
    </nav>
  );
}
```

### Pattern 2: Hero Section with Aurora + Text Animation Stack

**What:** Full-viewport dark hero with layered animations — Aurora canvas behind, SplitText name, BlurText subtitle, Framer tagline, Framer amber underline
**When to use:** The hero section, never elsewhere

```tsx
// src/components/HeroSection.tsx
'use client';

import { useEffect, useRef } from 'react';
import { motion, useScroll, useTransform } from 'motion/react';
import { animate } from 'animejs';
import { ArrowDown } from 'iconsax-react';
import { Aurora } from '@/components/reactbits/Aurora';
import { SplitText } from '@/components/reactbits/SplitText';
import { BlurText } from '@/components/reactbits/BlurText';

export function HeroSection() {
  const scrollIndicatorRef = useRef<HTMLDivElement>(null);
  const { scrollY } = useScroll();
  const indicatorOpacity = useTransform(scrollY, [0, 100], [1, 0]);

  // Anime.js bounce on scroll indicator
  useEffect(() => {
    const prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (prefersReduced || !scrollIndicatorRef.current) return;

    const anim = animate(scrollIndicatorRef.current, {
      translateY: [0, 8, 0],
      duration: 1200,
      loop: true,
      ease: 'inOutSine',
    });

    return () => anim.cancel();
  }, []);

  return (
    <section
      id="hero"
      className="relative min-h-screen bg-[#011E41] flex items-center justify-center overflow-hidden"
    >
      {/* Aurora canvas — absolute inset */}
      <Aurora
        colorStops={['#011E41', '#002E62', '#003F9F']}
        blend={0.3}
        amplitude={1.0}
        speed={0.5}
      />

      {/* Content layer — above canvas */}
      <div className="relative z-10 max-w-2xl w-full px-6">
        {/* Name — SplitText char stagger */}
        <SplitText
          text="Achyuth Rachur"
          splitBy="characters"
          delay={50}
          duration={0.4}
          className="font-display font-bold text-5xl md:text-6xl text-[#f6f7fa] leading-tight"
        />

        {/* Amber underline — Framer Motion width expand */}
        <motion.div
          className="h-1 rounded-full bg-[#F5A800] mt-2 mb-4"
          initial={{ width: 0 }}
          animate={{ width: '100%' }}
          transition={{ delay: 0.8, duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
        />

        {/* Subtitle — BlurText word stagger */}
        <BlurText
          text="Staff Consultant | Integrated Risk Management"
          animateBy="words"
          direction="top"
          delay={200}
          duration={0.5}
          className="text-xl md:text-2xl font-body text-[rgba(246,247,250,0.7)]"
        />

        {/* Tagline — plain motion.p with delay */}
        <motion.p
          className="mt-4 text-base md:text-lg font-body text-[rgba(246,247,250,0.55)] max-w-lg"
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6, duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
        >
          Helping financial institutions design, deploy, and govern AI that works.
        </motion.p>
      </div>

      {/* Scroll indicator — absolute bottom, Framer fade */}
      <motion.div
        className="absolute bottom-8 left-1/2 -translate-x-1/2"
        style={{ opacity: indicatorOpacity }}
      >
        <a href="#about" aria-label="Scroll to About section">
          <div ref={scrollIndicatorRef}>
            <ArrowDown variant="Linear" color="#f6f7fa" size={28} />
          </div>
        </a>
      </motion.div>
    </section>
  );
}
```

### Pattern 3: Framer Motion layoutId Shared Underline

**What:** A single amber underline that visually slides between active nav links using Framer Motion's layout animation system.
**When to use:** Active nav link state changes — the underline "morphs" position rather than appearing/disappearing.

```tsx
// The layoutId approach (already in Pattern 1 above)
// Key: all motion.div elements with the same layoutId="nav-underline" share one
// animated DOM node. When activeSection changes, Framer Motion smoothly repositions it.

// Spring transition for snappy but smooth movement:
transition={{ type: 'spring', stiffness: 380, damping: 30 }}

// Alternative — ease transition:
transition={{ duration: 0.2, ease: [0.16, 1, 0.3, 1] }
```

### Pattern 4: Scroll-Driven Nav Opacity via useMotionValueEvent

**What:** Nav background transitions from 85% to 97% opacity as the user scrolls through the hero. `useMotionValueEvent` is preferred over deprecated `.onChange()`.
**When to use:** Any scroll-driven value update.

```tsx
// motion/react API — preferred approach
import { useScroll, useMotionValueEvent } from 'motion/react';

const { scrollY } = useScroll();

useMotionValueEvent(scrollY, 'change', (latest) => {
  const heroHeight = window.innerHeight;
  const progress = Math.min(latest / heroHeight, 1);
  const opacity = 0.85 + (0.97 - 0.85) * progress;
  setNavBgOpacity(opacity);
});

// Then applied as inline style on the nav element:
style={{ backgroundColor: `rgba(250,251,253,${navBgOpacity})` }}

// NOTE: Do NOT use Tailwind bg-opacity utilities for this — Tailwind v4 uses
// bg-{color}/{opacity} syntax, and dynamic values need inline styles.
```

### Pattern 5: page.tsx Integration (Server Component)

**What:** Server-rendered page.tsx imports client components. Nav is placed before hero and rendered on the same page.
**When to use:** Single-page scroll layout.

```tsx
// src/app/page.tsx
import { Nav } from '@/components/Nav';
import { HeroSection } from '@/components/HeroSection';

export default function Home() {
  return (
    <main>
      <Nav />
      <HeroSection />
      {/* Phase 3+ sections go here with id attributes and scroll-mt-16 */}
      <section id="about" className="scroll-mt-16">{/* placeholder */}</section>
      <section id="experience" className="scroll-mt-16">{/* placeholder */}</section>
      <section id="skills" className="scroll-mt-16">{/* placeholder */}</section>
      <section id="education" className="scroll-mt-16">{/* placeholder */}</section>
      <section id="contact" className="scroll-mt-16">{/* placeholder */}</section>
    </main>
  );
}
```

### Anti-Patterns to Avoid

- **Putting Nav in layout.tsx:** For a single-page site, Nav belongs in page.tsx (or as a client component imported from page.tsx). layout.tsx is the server boundary and cannot hold client state for scroll tracking.
- **Using `framer-motion` import path:** Import exclusively from `motion/react` — this is the 2024+ package name. `framer-motion` is the old package name and is NOT installed.
- **Animating `backgroundColor` directly in Framer Motion for glassmorphism:** The `backdrop-filter` CSS property doesn't animate predictably through Framer Motion's style prop. Use `inline style={{ backgroundColor: ... }}` with `useState` driven by `useMotionValueEvent` instead.
- **Using `window.scrollY` directly in React:** Prefer `useScroll()` from motion/react — it handles SSR gracefully and avoids layout thrash.
- **Setting `style={{ color: ... }}` on SplitText or BlurText:** These components render `<motion.p>` and accept `className`. Pass color via Tailwind arbitrary value `text-[#f6f7fa]` or `text-[rgba(246,247,250,0.7)]` in the `className` prop.
- **Using `scrollTo` for mobile nav links:** Since `scroll-behavior: smooth` is already set globally in globals.css, plain `<a href="#id">` links will scroll smoothly without any JavaScript.

---

## Don't Hand-Roll

| Problem | Don't Build | Use Instead | Why |
|---------|-------------|-------------|-----|
| Char-stagger entrance animation | Custom char splitter with CSS animations | `SplitText` (already installed) | Handles InView, stagger timing, variants, aria-label |
| Blur-fade word entrance | Custom blur + opacity keyframes | `BlurText` (already installed) | Handles word tokenization, direction, InView |
| Infinite bounce animation | CSS `@keyframes bounce` | `animate()` from animejs v4 | Trivially cancellable, respects reduced-motion check, precise timing |
| Active section detection | Manual scroll event listeners + getBoundingClientRect | `IntersectionObserver` | Browser-native, performant, no layout thrash |
| Animated underline between nav items | CSS absolute positioning + JS width/left calculation | Framer Motion `layoutId` | Automatically handles position/size transitions across DOM nodes |
| Scroll-driven style values | `window.addEventListener('scroll', ...)` | `useScroll` + `useMotionValueEvent` | Declarative, SSR-safe, no memory leaks |

**Key insight:** Every animation primitive needed for this phase already exists in the project. The task is wiring together existing components and hooks, not building new animation infrastructure.

---

## Common Pitfalls

### Pitfall 1: SplitText `splitBy` prop value mismatch

**What goes wrong:** CONTEXT.md says `splitBy="chars"` but the actual SplitText component source defines `splitBy?: 'characters' | 'words'` — not `'chars'`. Passing `"chars"` falls back to default behavior and won't error (TypeScript will catch it if strict), but won't split by characters.
**Why it happens:** The CONTEXT.md was written from design intent; the actual component uses canonical React Bits naming.
**How to avoid:** Use `splitBy="characters"` (not `"chars"`). Verified directly from `src/components/reactbits/SplitText.tsx` line 13.
**Warning signs:** Name appears as one block rather than animating character by character.

### Pitfall 2: Color on BlurText / SplitText via prop

**What goes wrong:** Both components do NOT have a `color` prop. Passing `color="#f6f7fa"` as a prop has no effect — the prop is silently ignored (not in the interface).
**Why it happens:** These components apply color via their `className` prop to the parent `<motion.p>`.
**How to avoid:** Pass color through `className`: `className="text-[#f6f7fa]"` for SplitText, `className="text-[rgba(246,247,250,0.7)]"` for BlurText.
**Warning signs:** Text shows as default browser black/inherited color instead of soft white.

### Pitfall 3: Nav in layout.tsx causes hydration issues

**What goes wrong:** If Nav is placed in layout.tsx and uses `useScroll` or `useState`, the server renders without scroll state, client hydrates with it — causing hydration mismatch or SSR errors.
**Why it happens:** layout.tsx is a server component by default in Next.js App Router. 'use client' in layout.tsx affects all children, which is not desirable.
**How to avoid:** Keep Nav as a standalone client component imported in page.tsx (also a server component that can import client components).
**Warning signs:** Next.js hydration warning in console; `window is not defined` errors.

### Pitfall 4: Aurora canvas z-index below content

**What goes wrong:** Content appears behind the Aurora canvas because both are in the same stacking context.
**Why it happens:** Aurora canvas is `absolute inset-0` — if content siblings lack `relative z-10`, they appear at z-0 same level or below.
**How to avoid:** Hero section needs `relative overflow-hidden`. Aurora gets no extra z (default 0). Content wrapper gets `relative z-10`.
**Warning signs:** Text is invisible or partially obscured.

### Pitfall 5: Anime.js animation not cleaned up on unmount

**What goes wrong:** The scroll indicator bounce continues running (RAF loop) after component unmounts during hot reload or navigation.
**Why it happens:** `animate()` returns an Animation object with a `.cancel()` method. If the cleanup is not called, the RAF persists.
**How to avoid:** Return `() => anim.cancel()` from the `useEffect`. Verified from animejs v4 API.
**Warning signs:** Console warnings about memory leaks; animation persists across page navigation.

### Pitfall 6: backdrop-filter not working on Chrome without explicit bg

**What goes wrong:** `backdrop-blur-[16px]` has no visible effect on nav.
**Why it happens:** backdrop-filter requires at least a partially transparent background to show the blur effect. Without `background-color`, there's nothing to blur against.
**How to avoid:** Always pair `backdrop-blur-[16px]` with `background-color: rgba(...)` on the same element. The glassmorphism spec already includes this.
**Warning signs:** Nav looks like a solid white bar or is invisible.

### Pitfall 7: `useScroll` SSR warning with static export

**What goes wrong:** Next.js static export (output: 'export') may warn about scroll APIs during build.
**Why it happens:** `useScroll` accesses window, which doesn't exist during static generation. However, since the component has `'use client'`, this is handled automatically — client components are not rendered during static export of their interactive parts.
**How to avoid:** Ensure `'use client'` is at the top of Nav.tsx. No additional guard needed.
**Warning signs:** Build errors referencing `window is not defined` — only occurs if 'use client' is missing.

### Pitfall 8: IntersectionObserver fires before sections exist

**What goes wrong:** Nav's IntersectionObserver setup runs before Phase 3/4 sections have their IDs in the DOM.
**Why it happens:** `document.getElementById('experience')` returns null if the section doesn't exist yet.
**How to avoid:** Add null guard: `const el = document.getElementById(id); if (!el) return;` before calling `observer.observe(el)`. This allows Phase 2 to ship with placeholder sections.
**Warning signs:** No active nav link ever highlights (silent null reference).

---

## Code Examples

### SplitText — correct prop usage (verified from source)

```tsx
// Source: src/components/reactbits/SplitText.tsx (lines 6-19)
// CORRECT: splitBy="characters" (not "chars")
<SplitText
  text="Achyuth Rachur"
  splitBy="characters"          // union: 'characters' | 'words'
  delay={50}                    // ms per character (staggerChildren: delay/1000)
  duration={0.4}                // seconds per character animation
  className="font-display font-bold text-5xl md:text-6xl text-[#f6f7fa] leading-tight"
  textAlign="left"
/>
```

### BlurText — correct prop usage (verified from source)

```tsx
// Source: src/components/reactbits/BlurText.tsx (lines 6-16)
<BlurText
  text="Staff Consultant | Integrated Risk Management"
  animateBy="words"             // union: 'words' | 'characters'
  direction="top"               // union: 'top' | 'bottom' — y animates from -20 when 'top'
  delay={200}                   // ms per word (staggerChildren: delay/1000)
  duration={0.5}                // seconds per word animation
  className="text-xl md:text-2xl font-body text-[rgba(246,247,250,0.7)]"
/>
```

### Aurora — correct prop usage (verified from source)

```tsx
// Source: src/components/reactbits/Aurora.tsx (lines 4-11)
// Default colorStops includes amber — MUST override to indigo-only spectrum
<Aurora
  colorStops={['#011E41', '#002E62', '#003F9F']}  // overrides default ['#011E41','#002E62','#F5A800']
  blend={0.3}                                      // low opacity — atmospheric, not distracting
  amplitude={1.0}
  speed={0.5}
/>
// Canvas already has className="absolute inset-0 w-full h-full" — no extra positioning needed
```

### Framer Motion amber underline (Framer hero underline)

```tsx
// Source: motion/react animate API
<motion.div
  className="h-1 rounded-full bg-[#F5A800] mt-2 mb-4"
  initial={{ width: 0 }}
  animate={{ width: '100%' }}
  transition={{ delay: 0.8, duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
/>
```

### Anime.js v4 infinite bounce (scroll indicator)

```tsx
// Source: animejs v4 API — modular import
import { animate } from 'animejs';

useEffect(() => {
  const prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  if (prefersReduced || !ref.current) return;

  const anim = animate(ref.current, {
    translateY: [0, 8, 0],
    duration: 1200,
    loop: true,
    ease: 'inOutSine',      // animejs v4 uses camelCase easing names
  });

  return () => anim.cancel();  // cleanup required
}, []);
```

### Framer Motion useScroll + useTransform (scroll indicator fade)

```tsx
// Source: motion/react API
import { useScroll, useTransform } from 'motion/react';

const { scrollY } = useScroll();
// opacity: 1 at scrollY=0, 0 at scrollY=100
const indicatorOpacity = useTransform(scrollY, [0, 100], [1, 0]);

// Applied to the wrapper:
<motion.div style={{ opacity: indicatorOpacity }}>
  {/* scroll indicator */}
</motion.div>
```

### Iconsax ArrowDown + HambergerMenu (verified installed)

```tsx
// Source: iconsax-react 0.0.8 — installed with --legacy-peer-deps
import { ArrowDown, HambergerMenu, CloseCircle } from 'iconsax-react';

// Scroll indicator
<ArrowDown variant="Linear" color="#f6f7fa" size={28} />

// Mobile nav toggle
<HambergerMenu variant="Linear" size={24} color="currentColor" />
<CloseCircle variant="Linear" size={24} color="currentColor" />
```

### useMotionValueEvent (preferred over deprecated onChange)

```tsx
// Source: motion/react API — useMotionValueEvent is the v11+ API
import { useScroll, useMotionValueEvent } from 'motion/react';

const { scrollY } = useScroll();

useMotionValueEvent(scrollY, 'change', (latest) => {
  // runs on every scroll frame without causing React re-renders internally
  const heroHeight = window.innerHeight;
  const progress = Math.min(latest / heroHeight, 1);
  setNavBgOpacity(0.85 + 0.12 * progress);  // 0.85 → 0.97
});
```

---

## State of the Art

| Old Approach | Current Approach | When Changed | Impact |
|--------------|------------------|--------------|--------|
| `framer-motion` package | `motion` package, import from `motion/react` | 2024 (v11) | Import path changed — project already uses correct path |
| `.onChange()` on MotionValue | `useMotionValueEvent(value, 'change', cb)` | Framer Motion v11 | `.onChange` is deprecated; use the hook instead |
| `framer-motion` `splitBy="chars"` convention | React Bits SplitText uses `'characters'` | React Bits canonical | Must use `"characters"` not `"chars"` |
| `animate()` from animejs v3 (default export) | `import { animate } from 'animejs'` (v4 named) | animejs v4 | v3 used default import; v4 is fully modular |
| `tailwind.config.ts` for custom tokens | `@theme {}` block in CSS (Tailwind v4) | Tailwind v4 (2024) | Project already uses v4 — tokens in globals.css `@theme` block |

**Deprecated/outdated:**
- `framer-motion` package name: replaced by `motion` — project correctly uses `motion` (v12.34.5)
- `animejs` `@types/animejs`: covers v3 API only — project correctly does NOT install it (types built-in to v4)
- `iconsax-react` peer dependency warning: declares `react ^17||^18` but project uses React 19 — installed with `--legacy-peer-deps`, works fine at runtime

---

## Open Questions

1. **Iconsax `HambergerMenu` exact icon name**
   - What we know: Iconsax has a hamburger icon; iconsax-react 0.0.8 is installed
   - What's unclear: Whether the export name is `HambergerMenu` (as spelled in CONTEXT.md with the typo) or `HamburgerMenu`
   - Recommendation: Import and check at compile time. If `HambergerMenu` fails TypeScript, try `HamburgerMenu` or `Menu`. The Iconsax naming uses the typo `HambergerMenu` in their source (this is a known quirk of the library). Use `HambergerMenu` first.

2. **Nav placement: page.tsx vs layout.tsx**
   - What we know: This is a single-page scroll site; nav must be `'use client'`
   - What's unclear: Whether placing Nav in page.tsx (instead of layout.tsx) causes any issues with Next.js static export
   - Recommendation: Place Nav in page.tsx as a client component import. Single-page sites don't need nav in layout since there's only one page.

3. **Placeholder section IDs for Phase 2**
   - What we know: Nav expects `#about`, `#experience`, `#skills`, `#education`, `#contact` to exist for IntersectionObserver
   - What's unclear: Whether Phase 2 should include minimal placeholder sections or leave them for Phase 3
   - Recommendation: Include minimal placeholder `<section id="about" className="scroll-mt-16 h-screen">` etc. in page.tsx to prevent broken anchor links and make nav active tracking work from day one.

---

## Validation Architecture

No test framework is configured in this project (no `vitest.config.*`, no `jest.config.*`, no test scripts in `package.json`). The project has no `tests/` or `__tests__/` directory. Phase 5 (Polish + Deploy) handles Lighthouse and quality validation. No automated test infrastructure exists or is planned for this phase.

**Manual verification checklist for this phase:**
- [ ] `npm run build` — static export succeeds to `/out`
- [ ] `npm run dev` — no console errors on load
- [ ] Nav is visible, sticky, glassmorphism renders correctly
- [ ] Nav amber underline animates to active section on scroll
- [ ] Nav opacity increases as hero scrolls out
- [ ] Hero SplitText animates char by char
- [ ] Hero BlurText animates word by word
- [ ] Tagline fades in after 0.6s delay
- [ ] Amber underline expands under name after 0.8s
- [ ] Scroll indicator bounces and fades on scroll
- [ ] Mobile hamburger opens/closes nav links
- [ ] All anchor links scroll smoothly to correct section

---

## Sources

### Primary (HIGH confidence)
- `src/components/reactbits/SplitText.tsx` — prop interface verified directly
- `src/components/reactbits/BlurText.tsx` — prop interface verified directly
- `src/components/reactbits/Aurora.tsx` — prop interface and default colorStops verified
- `src/app/globals.css` — Tailwind v4 @theme tokens, scroll-behavior, reduced-motion verified
- `package.json` — all package versions confirmed (motion 12.34.5, animejs 4.3.6, iconsax-react 0.0.8)
- `.planning/phases/02-hero-navigation/02-CONTEXT.md` — locked decisions read verbatim

### Secondary (MEDIUM confidence)
- `motion/react` API: `useScroll`, `useTransform`, `useMotionValueEvent`, `layoutId` — consistent with motion v12 (packages match installed version)
- animejs v4 `animate()` API: `translateY`, `loop`, `ease: 'inOutSine'`, `cancel()` — consistent with v4 modular API documented in DESIGN.md
- `iconsax-react` naming convention: `HambergerMenu` spelling consistent with known library quirk

### Tertiary (LOW confidence — verify at implementation time)
- Exact Iconsax export names for all icons used — verify TypeScript autocomplete during implementation

---

## Metadata

**Confidence breakdown:**
- Standard stack: HIGH — all packages verified in package.json, component interfaces read directly from source
- Architecture: HIGH — patterns follow established project conventions from Phase 1 + locked CONTEXT.md decisions
- Pitfalls: HIGH — SplitText prop typo and BlurText color-via-className verified directly from source files; others verified from known Next.js/motion patterns

**Research date:** 2026-03-04
**Valid until:** 2026-04-03 (stable libraries; motion and animejs APIs are stable)
