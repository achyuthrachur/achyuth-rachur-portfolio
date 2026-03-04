# Phase 3: Content Sections - Research

**Researched:** 2026-03-04
**Domain:** React component authoring — Framer Motion whileInView, Anime.js v4 onScroll, React Bits AnimatedList/SpotlightCard integration
**Confidence:** HIGH

---

<user_constraints>
## User Constraints (from CONTEXT.md)

### Locked Decisions

**About section**
- Layout: Clean prose only — no decorative elements, no section label, no pull quote
- Content: Professional summary rewritten in first person (conversational, confident)
- Text width: `max-w-2xl` for comfortable reading (same as hero text block)
- Text style: `text-lg text-tint-700 leading-relaxed`
- Section heading: "About" in `text-crowe-indigo-dark font-semibold text-3xl` with a short amber underline (Framer Motion width 0→3rem, delay 0.2s)
- Scroll reveal: Framer Motion `whileInView={{ opacity: 1, y: 0 }}` from `{ opacity: 0, y: 30 }`, `viewport={{ once: true, margin: '-100px' }}`, transition 0.6s ease-out
- Background: `bg-page` (#f8f9fc) — already set in page.tsx placeholder

**Experience section**
- Company heading: "Crowe LLP" in `text-crowe-indigo-dark font-semibold text-2xl`; role "Staff Consultant | Integrated Risk Management" + dates in `text-tint-500 text-sm mt-1`
- Card layout: Single column — cards stacked vertically, full content width
- Card count: 6 SpotlightCards (CONTEXT clarifies 6, not 7 — bullet 7 is a note that 6 exist)
- spotlightColor: `"rgba(245,168,0,0.08)"`
- Card styling: `p-6 rounded-xl` on the SpotlightCard, NO explicit border or bg (SpotlightCard provides these)
- Key term highlighting: Static amber-wash spans — `<span className="bg-[#fff8eb] font-semibold px-1 rounded-sm">term</span>`
- Key terms: "AI enablement", "governance-first", "MRM", "Model Risk Management", "independent validation", "bias/fairness"
- Stagger entrance: Anime.js `onScroll` trigger with `stagger(100)` on the card group
- Background: `bg-section` (#f6f7fa) — already set in page.tsx placeholder

**Skills section**
- Grid: 2×2 CSS grid desktop (`grid-cols-2 gap-8`), single column mobile (`grid-cols-1`)
- Four groups: "AI, Analytics & Engineering" / "Risk, Compliance & Governance" / "Model Risk Management" / "Domain Use Cases"
- Group heading style: `text-crowe-indigo-dark font-semibold text-lg mb-4` with amber underline (`h-0.5 w-8 bg-crowe-amber mt-1 mb-4`)
- Badge styling: White pill — `bg-white text-[#2d3142] border-none shadow-crowe-sm rounded-full px-3 py-1 text-sm font-medium`
- Badge hover: `hover:shadow-amber-glow hover:scale-[1.03] transition-all duration-200`
- Stagger entrance: React Bits `<AnimatedList>` wrapping each group's badge list
- Background: `bg-section-warm` (#f0f2f8) — already set in page.tsx placeholder

**Animation continuity**
- All scroll reveals: `viewport={{ once: true }}` — no re-animation on scroll back up
- Entrance easing: `[0.16, 1, 0.3, 1]` (Crowe ease-out) throughout
- Durations: 500-700ms for section reveals, 200ms for hover micro-interactions

### Claude's Discretion
- Exact first-person rewrite of the professional summary prose (maintain factual accuracy, improve conversational tone)
- Whether to create separate component files (AboutSection.tsx, ExperienceSection.tsx, SkillsSection.tsx) or inline in page.tsx — separate files preferred for maintainability
- Exact Anime.js v4 onScroll API for experience card stagger
- AnimatedList internal details (how children are mapped to staggered motion.divs)

### Deferred Ideas (OUT OF SCOPE)
- None — discussion stayed within Phase 3 scope
</user_constraints>

---

<phase_requirements>
## Phase Requirements

| ID | Description | Research Support |
|----|-------------|-----------------|
| ABOUT-01 | Section background #f8f9fc (page background) | Already set in page.tsx `bg-page`; component replaces inner placeholder content only |
| ABOUT-02 | Professional summary rendered as paragraph prose (first person, conversational) | Content verbatim available in CONTEXT.md specifics; motion/react whileInView pattern confirmed |
| ABOUT-03 | Fade-in on scroll via Framer Motion whileInView: opacity 0→1, y 30→0, once:true | HeroSection.tsx and DESIGN.md confirm pattern; AnimatedList.tsx uses same `motion/react` import |
| EXP-01 | Section background #f6f7fa | Already set in page.tsx `bg-section`; component replaces inner placeholder content only |
| EXP-02 | Company heading "Crowe LLP" in Indigo Dark (#011E41); role and dates in muted (#8b90a0) | Heading style confirmed by color system; Tailwind classes map directly to Crowe tokens |
| EXP-03 | Each experience bullet rendered in a React Bits SpotlightCard with spotlightColor "rgba(245,168,0,0.08)" | SpotlightCard.tsx fully read; props interface confirmed — `children`, `className`, `spotlightColor` |
| EXP-04 | Cards are borderless with crowe-card shadow, 12px radius | SpotlightCard already provides `rounded-xl bg-white` + crowe-card inline shadow; no override needed |
| EXP-05 | Key terms highlighted via span with bg-[#fff8eb] + font-semibold | Static span approach confirmed; ShinyText discarded for this use — too distracting in repetition |
| EXP-06 | Stagger entrance via Anime.js onScroll trigger, stagger(100) on card group | Anime.js v4 onScroll API documented below; null guard pattern from HeroSection.tsx applies |
| SKILL-01 | Section background #f0f2f8 (indigo wash) | Already set in page.tsx `bg-section-warm`; component replaces inner placeholder content only |
| SKILL-02 | Four skill groups in 2-column CSS grid (desktop), 1-column (mobile) | Standard Tailwind responsive grid: `grid-cols-1 md:grid-cols-2 gap-8` |
| SKILL-03 | Each skill rendered as custom badge pill — bg-white text-[#2d3142] border-none shadow-crowe-sm; hover: shadow-amber-glow + scale(1.03) | Custom `<span>` or `<div>` element; NOT shadcn Badge variant. Classes fully specified. |
| SKILL-04 | Group headings in text-[#011E41] font-semibold with amber underline accent | Static `<div className="h-0.5 w-8 bg-crowe-amber mt-1 mb-4">` underline; no animation needed |
| SKILL-05 | React Bits AnimatedList (or Anime.js stagger(50)) wraps each group's badge list for stagger entrance | AnimatedList.tsx fully read; interface and internal motion/react variant pattern confirmed |
</phase_requirements>

---

## Summary

Phase 3 builds three content components that replace the placeholder sections in `page.tsx`. All section backgrounds, IDs, and `scroll-mt-16` classes are already in place — each new component slots into the existing `<section>` shell as an import. The work is purely component authoring, not page restructuring.

The animation stack is already installed and battle-tested from Phase 2: `motion/react` (the correct 2024+ import path) for Framer Motion whileInView and AnimatedList, and Anime.js v4 modular imports for the scroll-triggered experience card stagger. Both HeroSection.tsx and AnimatedList.tsx serve as direct pattern references with zero gaps — the same patterns apply here.

The only non-trivial technical area is the Anime.js v4 `onScroll` API for EXP-06, which requires specific argument structure and a null guard (identical to the IntersectionObserver null guard pattern already in HeroSection.tsx). All content — prose summary, 6 experience bullets, skill badge text — is available verbatim in CONTEXT.md. No new npm packages are required.

**Primary recommendation:** Create three named-export client components (AboutSection.tsx, ExperienceSection.tsx, SkillsSection.tsx), import them into the existing server-component page.tsx, and replace each placeholder `<p>` with the corresponding component. Keep all existing `<section>` attributes intact.

---

## Standard Stack

### Core (all already installed in Phase 1)

| Library | Version | Purpose | Why Standard |
|---------|---------|---------|--------------|
| motion (motion/react) | installed | Framer Motion — whileInView scroll reveals, AnimatedList stagger | Already used in Nav.tsx and AnimatedList.tsx; `motion/react` is the correct 2024+ import |
| animejs | v4 installed | Anime.js — scroll-triggered card stagger via onScroll | Already used in HeroSection.tsx; v4 modular API confirmed |
| React Bits SpotlightCard | local component | Amber spotlight hover effect on experience cards | Already at src/components/reactbits/SpotlightCard.tsx — props confirmed |
| React Bits AnimatedList | local component | Staggered list entrance for skill badges | Already at src/components/reactbits/AnimatedList.tsx — interface confirmed |

### Supporting

| Library | Version | Purpose | When to Use |
|---------|---------|---------|-------------|
| cn() from @/lib/utils | local | className composition | Whenever conditional class strings are needed |
| iconsax-react | installed | Icons (not needed for this phase but available) | Phase 4 Contact section |

### Not Needed This Phase
- ShinyText — available but explicitly rejected for experience key terms (distracting in repeated context)
- shadcn Badge — available but explicitly rejected for skills (spec requires custom white pill)
- No new npm installs — corporate SSL proxy blocks them

---

## Architecture Patterns

### Recommended File Structure

```
src/
├── app/
│   └── page.tsx                    # Server component — import 3 new client components here
├── components/
│   ├── AboutSection.tsx            # NEW — 'use client', named export
│   ├── ExperienceSection.tsx       # NEW — 'use client', named export
│   ├── SkillsSection.tsx           # NEW — 'use client', named export
│   ├── Nav.tsx                     # Phase 2 — unchanged
│   ├── HeroSection.tsx             # Phase 2 — unchanged
│   └── reactbits/
│       ├── SpotlightCard.tsx       # Phase 1 — unchanged, consumed by ExperienceSection
│       └── AnimatedList.tsx        # Phase 1 — unchanged, consumed by SkillsSection
```

### Pattern 1: Server Component Imports Client Components (page.tsx)

The page.tsx MUST remain a server component (no `'use client'` directive). Client components are imported normally — Next.js handles the boundary automatically.

```tsx
// src/app/page.tsx — server component, no changes to section shells
import { Nav } from '@/components/Nav';
import { HeroSection } from '@/components/HeroSection';
import { AboutSection } from '@/components/AboutSection';       // NEW
import { ExperienceSection } from '@/components/ExperienceSection'; // NEW
import { SkillsSection } from '@/components/SkillsSection';     // NEW

export default function Home() {
  return (
    <main>
      <Nav />
      <HeroSection />

      <section id="about" className="scroll-mt-16 bg-page">
        <AboutSection />
      </section>

      <section id="experience" className="scroll-mt-16 bg-section">
        <ExperienceSection />
      </section>

      <section id="skills" className="scroll-mt-16 bg-section-warm">
        <SkillsSection />
      </section>

      {/* Phase 4 sections unchanged */}
      <section id="education" className="scroll-mt-16 min-h-screen bg-page flex items-center justify-center">
        <p className="font-body text-tint-500 text-sm">Education — coming in Phase 4</p>
      </section>

      <section id="contact" className="scroll-mt-16 min-h-screen bg-[#011E41] flex items-center justify-center">
        <p className="font-body text-tint-500 text-sm">Contact — coming in Phase 4</p>
      </section>
    </main>
  );
}
```

**IMPORTANT:** Drop `min-h-screen flex items-center justify-center` from the three Phase 3 sections — those were placeholder centering styles. The real components bring their own layout (`py-24`).

### Pattern 2: Framer Motion whileInView (AboutSection)

```tsx
// Source: AnimatedList.tsx internal pattern + DESIGN.md Section 2.3
'use client';
import { motion } from 'motion/react';  // NOTE: motion/react, NOT framer-motion

export function AboutSection() {
  return (
    <div className="max-w-5xl mx-auto px-6 py-24">
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: '-100px' }}
        transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
      >
        <h2 className="text-3xl font-semibold text-crowe-indigo-dark font-body">About</h2>
        {/* Amber underline — width 0 → 3rem, delayed */}
        <motion.div
          className="h-0.5 bg-crowe-amber rounded-full mt-2 mb-8"
          initial={{ width: 0 }}
          whileInView={{ width: '3rem' }}
          viewport={{ once: true }}
          transition={{ delay: 0.2, duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
        />
        <p className="text-lg text-tint-700 leading-relaxed max-w-2xl">
          {/* First-person prose — see Content section below */}
        </p>
      </motion.div>
    </div>
  );
}
```

### Pattern 3: Anime.js v4 onScroll — Experience Card Stagger (EXP-06)

The Anime.js v4 `onScroll` API creates a scroll-linked animation observer. The key is that it returns a ScrollObserver which must be reverted in cleanup, and DOM elements must exist when `onScroll` is called, requiring either a `useEffect` with a ref or CSS class selector.

```tsx
// Source: DESIGN.md Section 2.2 + Anime.js v4 docs pattern
'use client';
import { useEffect, useRef } from 'react';
import { animate, stagger, onScroll } from 'animejs';

export function ExperienceSection() {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (prefersReduced || !containerRef.current) return;  // null guard pattern from HeroSection

    // Set initial state — cards start invisible and below
    const cards = containerRef.current.querySelectorAll('.exp-card');
    if (!cards.length) return;

    // Set all cards to initial hidden state
    animate(cards, { opacity: 0, translateY: 40, duration: 0 });

    // Trigger stagger animation when container enters viewport
    const observer = onScroll({
      target: containerRef.current,
      enter: 'bottom 85%',  // trigger when container bottom hits 85% of viewport
      onEnter: () => {
        animate(cards, {
          opacity: [0, 1],
          translateY: [40, 0],
          duration: 600,
          delay: stagger(100),
          ease: 'outQuint',
        });
      },
    });

    return () => {
      observer.revert();
    };
  }, []);

  return (
    <div className="max-w-5xl mx-auto px-6 py-24">
      {/* Company heading */}
      <h2 className="text-2xl font-semibold text-crowe-indigo-dark font-body">Crowe LLP</h2>
      <p className="text-sm text-tint-500 mt-1 mb-10">
        Staff Consultant | Integrated Risk Management · Aug 2022 – Present
      </p>

      {/* Card group — ref target for Anime.js onScroll */}
      <div ref={containerRef} className="flex flex-col gap-4">
        {EXPERIENCE_BULLETS.map((bullet, i) => (
          <SpotlightCard
            key={i}
            className="exp-card p-6"
            spotlightColor="rgba(245,168,0,0.08)"
          >
            <p className="text-base text-tint-900 leading-relaxed font-body">{bullet}</p>
          </SpotlightCard>
        ))}
      </div>
    </div>
  );
}
```

**Anime.js v4 onScroll API notes (HIGH confidence — from DESIGN.md/CLAUDE.md documented API):**
- Import: `import { animate, stagger, onScroll } from 'animejs'`
- `onScroll({ target, enter, onEnter })` — not `createScrollObserver` or any other variant
- Returns an object with `.revert()` for cleanup
- `enter` values: `'bottom 85%'` means "when the element's bottom crosses 85% down the viewport"
- Must set initial state with a zero-duration animate() call before registering onScroll, so cards are not visible before the trigger fires

### Pattern 4: AnimatedList for Skills Badges

```tsx
// Source: AnimatedList.tsx interface — confirmed from source read
'use client';
import { AnimatedList } from '@/components/reactbits/AnimatedList';

// AnimatedList wraps children as an array — each child gets its own motion.div
// Internal: staggerChildren at delay/1000 seconds, itemVariants from→to with Crowe ease-out

function SkillGroup({ title, skills }: { title: string; skills: string[] }) {
  return (
    <div>
      <h3 className="text-lg font-semibold text-crowe-indigo-dark font-body">{title}</h3>
      <div className="h-0.5 w-8 bg-crowe-amber mt-1 mb-4" />
      {/* AnimatedList wraps skill badges array — each badge is a direct child */}
      <AnimatedList className="flex flex-wrap gap-2" delay={80} duration={0.5}>
        {skills.map((skill) => (
          <span
            key={skill}
            className="bg-white text-[#2d3142] border-none shadow-crowe-sm rounded-full px-3 py-1 text-sm font-medium hover:shadow-amber-glow hover:scale-[1.03] transition-all duration-200 cursor-default"
          >
            {skill}
          </span>
        ))}
      </AnimatedList>
    </div>
  );
}
```

**AnimatedList behavior (HIGH confidence — from source read):**
- Accepts `children` as array or single node
- Uses `motion/react` `useInView` internally with `once: true` — aligns with project's global once-only rule
- Each child wrapped in `<motion.div variants={itemVariants}>` — children must be renderable React nodes
- Default `delay=80` (80ms stagger), `duration=0.5` (500ms per item), `from={ opacity:0, y:20 }`, `to={ opacity:1, y:0 }`
- `rootMargin='-50px'` default — triggers slightly before element is fully in view
- Uses `ease: [0.16, 1, 0.3, 1]` internally — already the Crowe ease-out curve

### Anti-Patterns to Avoid

- **`import { motion } from 'framer-motion'`** — wrong package. The installed package is `motion` and the import path is `motion/react`. This is the single most common error in this codebase.
- **Adding `'use client'` to page.tsx** — page.tsx must stay a server component. Only the three new section components need `'use client'`.
- **Touching section `id`, `scroll-mt-16`, or background classes in page.tsx** — Nav's IntersectionObserver depends on existing IDs; background classes are already correct.
- **Using `min-h-screen flex items-center justify-center` in section components** — these were placeholder layout classes on the outer `<section>`. The inner component provides its own layout via `py-24`.
- **Calling `onScroll` outside `useEffect`** — Anime.js DOM operations must run client-side after mount.
- **Wrapping SpotlightCard in another `<div>` for shadow** — SpotlightCard already provides its own `rounded-xl bg-white` and the crowe-card shadow inline style. Adding an outer wrapper with shadow creates double-shadow.
- **Using shadcn Badge for skill pills** — the spec explicitly rejects shadcn variants here. Use a plain `<span>` with the specified classes.
- **Forgetting `itemClassName` vs `className` in AnimatedList** — `className` applies to the container `motion.div`, not to individual items. Badge classes go on the `<span>` elements passed as children, not on `AnimatedList`.

---

## Don't Hand-Roll

| Problem | Don't Build | Use Instead | Why |
|---------|-------------|-------------|-----|
| Scroll-triggered stagger animation | Custom IntersectionObserver + state + CSS transitions | Anime.js `onScroll` + `stagger()` | Handles timing, easing, and cleanup; one-liner trigger |
| Per-item stagger entrance in a list | Manually calculating CSS animation-delay for each item | React Bits `AnimatedList` | Already handles useInView, staggerChildren, Framer Motion variants |
| Hover amber spotlight on cards | Custom canvas or CSS radial-gradient mouse tracking | `SpotlightCard` with `spotlightColor` prop | Handles mouse position tracking, focus state, opacity transitions |
| Scroll-driven opacity/transform | Manual scroll event listeners | Framer Motion `whileInView` | Built-in viewport detection, once:true, margin offset |

**Key insight:** Every animation pattern needed for Phase 3 already exists as a built component or library function. No new patterns need to be invented.

---

## Common Pitfalls

### Pitfall 1: Wrong Motion Import Path
**What goes wrong:** `import { motion } from 'framer-motion'` causes a module-not-found error or imports the wrong API surface. The installed package in this project is `motion` (not `framer-motion`).
**Why it happens:** Historical muscle memory — `framer-motion` was the package name until 2024.
**How to avoid:** Always write `import { motion, useInView, AnimatePresence } from 'motion/react'`
**Warning signs:** TypeScript error on import, or animation hooks don't match expected API

### Pitfall 2: Anime.js onScroll Firing Before Cards Render
**What goes wrong:** If `onScroll` is called before cards are in the DOM, `querySelectorAll` returns empty NodeList and no animation registers.
**Why it happens:** React renders asynchronously; if `useEffect` runs before children mount, the ref's children won't be ready.
**How to avoid:** Use `containerRef.current.querySelectorAll('.exp-card')` inside `useEffect` — by the time `useEffect` fires, all children are mounted. Add a length check: `if (!cards.length) return`.
**Warning signs:** Cards appear unanimated or are visible before scroll trigger fires

### Pitfall 3: Cards Visible Before Scroll Trigger
**What goes wrong:** Experience cards show at full opacity on initial render, then the Anime.js stagger has no visual effect.
**Why it happens:** Anime.js `onScroll`/`onEnter` only fires when the element enters the viewport. Cards rendered at default opacity are already visible.
**How to avoid:** Set initial state with a zero-duration animate call: `animate(cards, { opacity: 0, translateY: 40, duration: 0 })` immediately before registering `onScroll`.
**Warning signs:** Animation runs but has no visible effect because cards start at their final state

### Pitfall 4: AnimatedList className Applied to Container, Not Items
**What goes wrong:** Passing flex layout classes to AnimatedList's `className` wraps the entire list in a flex container, but the `motion.div` wrappers around each child are block-level — they won't participate in the flex layout.
**Why it happens:** AnimatedList wraps each child in `<motion.div>` — those divs become the flex children, not the badges themselves. Block-level motion.divs in a flex container will stack or collapse depending on content.
**How to avoid:** Either (a) accept that motion.divs are the flex children (fine if they wrap inline elements), or (b) apply `flex flex-wrap gap-2` to the container and let motion.divs be block children each containing a `<span>`.
**Actual behavior:** `flex flex-wrap gap-2` on the `AnimatedList` className will work correctly — the `motion.div` wrappers participate in flex layout naturally. The `<span>` badges inside are inline, but motion.divs are block by default, so each badge gets its own row unless `motion.div` is given `display: inline-block` or `display: contents`. Best approach: pass `className="flex flex-wrap gap-2"` and also add `style={{ display: 'inline-block' }}` to badge spans, OR just accept column layout and use margin instead of gap.

**Recommended resolution:** Use `<AnimatedList className="flex flex-wrap gap-2">` and check rendered output. If motion.div wrappers break flex wrap, add `[&>div]:inline-block` Tailwind hack or switch to `display: contents` via inline style on the motion.div wrapper — but since we can't modify AnimatedList internals, the simplest fix is to keep badges as block-level and accept each on its own row, using `gap-2` between motion.divs.

**Actual clean approach:** Pass `className="flex flex-col gap-2"` (column) to AnimatedList and let each badge span render full-width. This sidesteps the block/inline conflict entirely and looks clean for a skills list.

### Pitfall 5: Removing section-level `min-h-screen` Without Content Height
**What goes wrong:** Removing `min-h-screen` from the section in page.tsx causes the section to be too short for the Nav's IntersectionObserver threshold (0.5) to ever fire.
**Why it happens:** The IntersectionObserver in Nav.tsx uses `threshold: 0.5` — half the element must be visible. If a section is shorter than two viewport-heights of content, it may never hit 50% intersection while adjacent sections are visible.
**How to avoid:** Ensure `py-24` on the inner container provides enough height. The 6 experience cards plus heading will generate ample height (400px+). About and Skills sections similarly. Drop `min-h-screen` safely — real content provides height.
**Warning signs:** Nav active section indicator stops highlighting "experience", "about", or "skills" even when user has scrolled to them

---

## Code Examples

### About Section — Full Component Skeleton

```tsx
// src/components/AboutSection.tsx
// Source: HeroSection.tsx patterns + DESIGN.md Section 2.3
'use client';

import { motion } from 'motion/react';

export function AboutSection() {
  return (
    <div className="max-w-5xl mx-auto px-6 py-24">
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: '-100px' }}
        transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
      >
        <h2 className="text-3xl font-semibold text-crowe-indigo-dark font-body">About</h2>
        <motion.div
          className="h-0.5 bg-crowe-amber rounded-full mt-2 mb-8"
          initial={{ width: 0 }}
          whileInView={{ width: '3rem' }}
          viewport={{ once: true }}
          transition={{ delay: 0.2, duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
        />
        <p className="text-lg text-tint-700 leading-relaxed max-w-2xl font-body">
          I work at the intersection of AI and financial services risk — helping institutions
          design, govern, and validate AI systems that regulators and internal stakeholders
          can trust. At Crowe, I've led engagements where the goal wasn't just to ship a
          model, but to build the controls, documentation, and oversight structures that make
          it defensible. I'm most useful when the problem involves both technical judgment
          and regulatory context — translating between what the model does and what the
          business actually needs to know.
        </p>
      </motion.div>
    </div>
  );
}
```

### Experience Section — Key Term Span Pattern

```tsx
// Source: CONTEXT.md — static amber-wash approach
// Key terms wrapped in amber-wash spans inline within paragraph text
<p className="text-base text-tint-900 leading-relaxed font-body">
  Led delivery of{' '}
  <span className="bg-[#fff8eb] font-semibold px-1 rounded-sm">AI enablement</span>
  {' '}for financial institutions, translating risk/compliance needs into practical ML
  and GenAI use cases with clear scope, controls, and monitoring plans.
</p>
```

### Experience Section — Anime.js onScroll Stagger

```tsx
// Source: DESIGN.md Section 2.2 onScroll pattern + HeroSection.tsx null guard pattern
'use client';

import { useEffect, useRef } from 'react';
import { animate, stagger, onScroll } from 'animejs';
import { SpotlightCard } from '@/components/reactbits/SpotlightCard';

export function ExperienceSection() {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (prefersReduced || !containerRef.current) return;

    const cards = containerRef.current.querySelectorAll<HTMLElement>('.exp-card');
    if (!cards.length) return;

    // Set cards invisible before scroll trigger fires
    animate(Array.from(cards), { opacity: 0, translateY: 40, duration: 0 });

    const observer = onScroll({
      target: containerRef.current,
      enter: 'bottom 85%',
      onEnter: () => {
        animate(Array.from(cards), {
          opacity: [0, 1],
          translateY: [40, 0],
          duration: 600,
          delay: stagger(100),
          ease: 'outQuint',
        });
      },
    });

    return () => {
      observer.revert();
    };
  }, []);

  return (
    <div className="max-w-5xl mx-auto px-6 py-24">
      <h2 className="text-2xl font-semibold text-crowe-indigo-dark font-body">Crowe LLP</h2>
      <p className="text-sm text-tint-500 mt-1 mb-10 font-body">
        Staff Consultant | Integrated Risk Management · Aug 2022 – Present
      </p>
      <div ref={containerRef} className="flex flex-col gap-4">
        {/* 6 SpotlightCards with className="exp-card p-6" */}
      </div>
    </div>
  );
}
```

### Skills Section — AnimatedList Badge Group

```tsx
// Source: AnimatedList.tsx interface (confirmed from source read)
'use client';

import { AnimatedList } from '@/components/reactbits/AnimatedList';

const SKILL_GROUPS = [
  {
    title: 'AI, Analytics & Engineering',
    skills: [
      'Generative AI (use-case design, prompt/agent patterns, workflow automation)',
      'Machine Learning (model development concepts, evaluation, monitoring)',
      'Model monitoring & drift concepts (performance stability, ongoing controls)',
      'Data analysis & scripting (Python, R)',
      'Data visualization & dashboards (Tableau)',
    ],
  },
  // ... 3 more groups
];

function SkillGroup({ title, skills }: { title: string; skills: string[] }) {
  return (
    <div>
      <h3 className="text-lg font-semibold text-crowe-indigo-dark font-body">{title}</h3>
      <div className="h-0.5 w-8 bg-crowe-amber mt-1 mb-4" />
      <AnimatedList className="flex flex-col gap-2" delay={80} duration={0.5}>
        {skills.map((skill) => (
          <span
            key={skill}
            className="bg-white text-[#2d3142] border-none shadow-crowe-sm rounded-full px-3 py-1 text-sm font-medium hover:shadow-amber-glow hover:scale-[1.03] transition-all duration-200 cursor-default inline-block"
          >
            {skill}
          </span>
        ))}
      </AnimatedList>
    </div>
  );
}

export function SkillsSection() {
  return (
    <div className="max-w-5xl mx-auto px-6 py-24">
      <h2 className="text-3xl font-semibold text-crowe-indigo-dark font-body mb-2">Skills</h2>
      <div className="h-0.5 w-12 bg-crowe-amber rounded-full mb-10" />
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {SKILL_GROUPS.map((group) => (
          <SkillGroup key={group.title} title={group.title} skills={group.skills} />
        ))}
      </div>
    </div>
  );
}
```

---

## Content Reference

All content below is verbatim from CONTEXT.md `<specifics>` — the planner should use this as authoritative source for the three components.

### About Prose (Claude's Discretion — first-person rewrite)

The original brief tagline is: "Helping financial institutions design, deploy, and govern AI that works." (already in HeroSection.tsx). The About prose should expand on this with:
- What the work involves (AI enablement, governance, MRM)
- The setting (Crowe, financial services context)
- What makes the candidate distinctive (bridge between technical and regulatory/business)
- Conversational, first-person, confident but not boastful

Target: 3-5 sentences, `max-w-2xl`, reads naturally — not a bullet list in prose form.

### Experience Bullets (verbatim from CONTEXT.md)

1. "Led delivery of AI enablement for financial institutions, translating risk/compliance needs into practical ML and GenAI use cases with clear scope, controls, and monitoring plans."
2. "Designed and developed AI solutions across audit, financial crime, model validation, and reconciliation, targeting automation of evidence collection, investigation support, exception triage, and consistency checks."
3. "Implemented governance-first patterns for AI in production, including model documentation, control design, bias/fairness considerations, human-in-the-loop review, and ongoing performance monitoring."
4. "Supported Model Risk Management (MRM) programs through independent validation of vendor and internally developed models, assessing conceptual soundness, data, performance, stability, and implementation risk."
5. "Evaluated model documentation and internal controls against regulatory expectations and industry sound practices; delivered clear findings, remediation recommendations, and defensible workpapers."
6. "Partnered with stakeholders across risk, compliance, audit, and technology to drive adoption—balancing innovation speed with operational constraints and control requirements."

**Key terms to highlight per bullet:**
- Bullet 1: "AI enablement"
- Bullet 3: "governance-first", "bias/fairness"
- Bullet 4: "Model Risk Management (MRM)", "independent validation"
- Bullet 5: (no highlighted terms specified — all important equally)
- Bullet 6: (no highlighted terms specified)

### Skill Groups (verbatim from CONTEXT.md)

**AI, Analytics & Engineering:**
- Generative AI (use-case design, prompt/agent patterns, workflow automation)
- Machine Learning (model development concepts, evaluation, monitoring)
- Model monitoring & drift concepts (performance stability, ongoing controls)
- Data analysis & scripting (Python, R)
- Data visualization & dashboards (Tableau)

**Risk, Compliance & Governance:**
- AI governance & controls (transparency, auditability, human oversight)
- Bias/fairness risk concepts & testing approaches
- Risk & compliance process automation
- Control design, evidence, and defensible documentation
- Stakeholder management (risk/compliance/technology alignment)

**Model Risk Management:**
- Independent Model Validation (vendor + internally developed models)
- Model performance & stability assessment
- Documentation and internal controls review
- CECL familiarity (WARM, DCF) and quantitative testing methods (e.g., OLS; HAC-adjusted techniques)

**Domain Use Cases:**
- Audit analytics & automation
- Financial crime / AML operations support (triage, investigation enablement concepts)
- Model validation automation & reviewer support
- Reconciliation automation & exception management

---

## State of the Art

| Old Approach | Current Approach | When Changed | Impact |
|--------------|------------------|--------------|--------|
| `import { motion } from 'framer-motion'` | `import { motion } from 'motion/react'` | 2024 — package renamed | BREAKING: wrong import = module not found in this project |
| Anime.js `createScrollObserver` | `onScroll()` | Anime.js v4 | API surface changed; v4 uses `onScroll` directly |
| `@types/animejs` for TypeScript | Built-in types in animejs v4 | animejs v4 | STATE.md explicitly notes NOT to install @types/animejs |

---

## Open Questions

1. **Anime.js v4 `onScroll` exact argument shape**
   - What we know: DESIGN.md documents `onScroll({ target, enter, onEnter })` pattern; returns object with `.revert()`
   - What's unclear: Whether `enter` accepts `'bottom 85%'` vs `'top bottom'` style vs pixel values — the exact format string
   - Recommendation: Use the pattern from DESIGN.md verbatim (`enter: 'bottom 80%'`). If stagger doesn't fire, try `enter: 'top 100%'` as fallback. Alternatively, fall back to `IntersectionObserver` (same pattern as Nav.tsx) with manual Anime.js `animate()` call — this is fully proven and avoids the onScroll API uncertainty.
   - **Safe fallback pattern:**
     ```tsx
     useEffect(() => {
       const prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
       const container = containerRef.current;
       if (prefersReduced || !container) return;

       const cards = container.querySelectorAll<HTMLElement>('.exp-card');
       if (!cards.length) return;

       animate(Array.from(cards), { opacity: 0, translateY: 40, duration: 0 });

       const observer = new IntersectionObserver(
         ([entry]) => {
           if (entry.isIntersecting) {
             animate(Array.from(cards), {
               opacity: [0, 1],
               translateY: [40, 0],
               duration: 600,
               delay: stagger(100),
               ease: 'outQuint',
             });
             observer.disconnect();
           }
         },
         { threshold: 0.1 }
       );
       observer.observe(container);

       return () => observer.disconnect();
     }, []);
     ```
   - This fallback uses only proven APIs (IntersectionObserver + Anime.js `animate` + `stagger`) and matches the exact pattern Nav.tsx uses for section detection.

2. **AnimatedList flex-wrap behavior with motion.div wrappers**
   - What we know: AnimatedList wraps each child in `<motion.div>` — motion.div is block-level by default
   - What's unclear: Whether `flex flex-wrap gap-2` on the container will cause motion.divs to wrap correctly or stack
   - Recommendation: Use `flex flex-col gap-2` (vertical list) — sidesteps the block/inline-flex conflict cleanly, looks appropriate for skill lists. Alternatively, try `flex flex-wrap gap-2` and inspect — motion.div participates in flex layout naturally, badges inside the motion.div will be inline-ish.

---

## Validation Architecture

No automated test infrastructure detected in this project. The project is a static Next.js site with no test runner configured (no vitest.config, no jest.config, no test directories). All validation is visual/manual.

### Phase Requirements → Test Map

| Req ID | Behavior | Test Type | Automated Command | File Exists? |
|--------|----------|-----------|-------------------|-------------|
| ABOUT-01 | bg-page on about section | manual-only | visual inspection | N/A |
| ABOUT-02 | First-person prose renders | manual-only | `npm run build` (no TS errors) | N/A |
| ABOUT-03 | Fade-in on scroll | manual-only | visual inspection in browser | N/A |
| EXP-01 | bg-section on experience | manual-only | visual inspection | N/A |
| EXP-02 | Heading/role styling | manual-only | visual inspection | N/A |
| EXP-03 | SpotlightCard amber spotlight | manual-only | hover interaction in browser | N/A |
| EXP-04 | Borderless crowe-card shadow | manual-only | visual inspection | N/A |
| EXP-05 | Key term amber-wash spans | manual-only | visual inspection | N/A |
| EXP-06 | Anime.js stagger on scroll | manual-only | scroll trigger in browser | N/A |
| SKILL-01 | bg-section-warm on skills | manual-only | visual inspection | N/A |
| SKILL-02 | 2-col desktop / 1-col mobile | manual-only | resize browser or DevTools responsive | N/A |
| SKILL-03 | White pill badges + hover | manual-only | hover interaction in browser | N/A |
| SKILL-04 | Group headings + amber underlines | manual-only | visual inspection | N/A |
| SKILL-05 | AnimatedList stagger on scroll | manual-only | scroll trigger in browser | N/A |

### Build Validation (the only automated check)

```bash
# Confirms TypeScript cleanliness and successful static export
npm run build
```

A clean build (no TypeScript errors, no missing imports) is the gate for all Phase 3 tasks.

### Wave 0 Gaps

None — no test infrastructure needed beyond the existing `npm run build` check. This is a static resume site; visual correctness is the acceptance criterion.

---

## Sources

### Primary (HIGH confidence)
- `src/components/reactbits/AnimatedList.tsx` — interface, internal motion/react usage, stagger behavior confirmed from source
- `src/components/reactbits/SpotlightCard.tsx` — props (`children`, `className`, `spotlightColor`), default shadow, rounded-xl confirmed from source
- `src/components/HeroSection.tsx` — null guard pattern, Anime.js `animate` + `useEffect` + `anim.cancel()` pattern, `motion/react` import confirmed
- `src/components/Nav.tsx` — `motion/react` import confirmed, IntersectionObserver null guard pattern
- `src/app/page.tsx` — existing section IDs, background classes, `scroll-mt-16`, server component structure confirmed
- `DESIGN.md` — Anime.js v4 `onScroll` API, all Crowe color tokens, shadow system, animation timing
- `.planning/phases/03-content-sections/03-CONTEXT.md` — all content verbatim (prose, bullets, skills), all styling decisions locked

### Secondary (MEDIUM confidence)
- `CLAUDE.md` / `DESIGN.md` — Anime.js v4 modular API (`onScroll`, `stagger`, `animate` imports) cross-referenced between both files
- `.planning/STATE.md` — `motion` package (not `framer-motion`) decision, `@types/animejs` exclusion, Tailwind v4 `@theme` pattern

### Tertiary (LOW confidence — flag for validation)
- Anime.js v4 `onScroll` `enter` string format — documented in DESIGN.md but exact format string not independently verified against Anime.js v4 official docs. Use IntersectionObserver fallback if it fails.

---

## Metadata

**Confidence breakdown:**
- Standard stack: HIGH — all libraries confirmed from source reads of actual installed files
- Architecture: HIGH — page.tsx server component structure and section shells confirmed from source
- Content: HIGH — verbatim from CONTEXT.md, no ambiguity
- Animation patterns: HIGH (motion/react whileInView, AnimatedList) / MEDIUM (Anime.js onScroll exact format string)
- Pitfalls: HIGH — derived from observed code patterns and established project decisions in STATE.md

**Research date:** 2026-03-04
**Valid until:** 2026-04-04 (stable stack — no npm version changes expected)
