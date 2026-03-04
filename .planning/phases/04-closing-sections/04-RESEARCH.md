# Phase 4: Closing Sections - Research

**Researched:** 2026-03-04
**Domain:** React component authoring — Education, Contact, Footer sections on a Next.js 16 / Tailwind v4 / motion/react portfolio
**Confidence:** HIGH

---

<user_constraints>
## User Constraints (from CONTEXT.md)

### Locked Decisions

**Education section**
- Background: `bg-page` (#f8fafc) — already set in page.tsx
- Section heading: "Education" — `text-3xl font-semibold text-tint-900 font-body` with `h-0.5 w-12 bg-[#6366f1] rounded-full` underline accent (same pattern as About/Skills)
- Degree card: React Bits `<TiltedCard>` — borderless, crowe-card shadow, 12px radius, fade-in via Framer Motion whileInView
  - Institution: "Purdue University"
  - Degree: "Bachelor of Science in Management and Data Analytics"
  - Graduated: "December 2024"
  - No GPA, no honors
- Research Papers subsection: heading "Research" with same underline style; two SpotlightCard link cards (NOT TiltedCard)
  - Each card: paper title, publication name, date, external link icon + "View Paper" link, `target="_blank" rel="noopener noreferrer"`
  - Paper 1: "The Effect of the Digital Age on Privacy in the United States" — Centre for Business and Economic Research — Business and Management Review — September 26, 2022 — https://cberuk.com/cdn/conference_proceedings/2022-09-16-09-14-01-AM.pdf
  - Paper 2: "Securing the Future: Legal Strategies for AI Implementation in Business Operations" — Eurasia Business and Economics Society — April 2024 — https://drive.google.com/file/d/1nbN3ES_DH7tnr9bP7ZrtQL1FWUtrNiaC/view?pli=1
- Layout: Degree card full-width, research cards in `grid-cols-1 md:grid-cols-2 gap-6`
- Animation: Framer Motion `whileInView`, `once: true`, `viewport={{ margin: '-100px' }}`

**Contact section**
- Background: `bg-[#0f172a]` (dark slate) — already set in page.tsx
- Heading: React Bits `<GradientText>` — "Let's connect" — `colors={['#818cf8', '#f8fafc', '#818cf8']}` — reads well on dark bg
- Contact icons layout: `flex flex-row gap-8 justify-center mt-8`
- Icons (Iconsax):
  - Personal email (`achyuth.v.rachur@gmail.com`): `<Sms>` — `mailto:achyuth.v.rachur@gmail.com`
  - Work email (`achyuth.rachur@crowe.com`): `<DirectboxSend>` (or `<Sms>` variant) — `mailto:achyuth.rachur@crowe.com`
  - LinkedIn: `<Link21>` — https://www.linkedin.com/in/achyuth-rachur/
  - GitHub: `<Code>` — https://github.com/achyuthrachur
  - Phone: SKIP — explicitly excluded
- Icon default state: `variant="Linear"`, `color="#f8fafc"`, `size={28}`
- Icon hover state: Framer Motion `whileHover={{ scale: 1.1 }}`, color shifts to `#818cf8` — use inline style + `useState` for color
- Each icon has a label below it (`text-xs text-slate-400`) for accessibility and clarity
- Each icon wrapped in `<a>` tag with `target="_blank" rel="noopener noreferrer"` (except mailto which omits it)

**Footer**
- Background: `bg-[#0f172a]` — same as Contact, no separator
- Content: "© 2025 Achyuth Rachur" centered, `text-sm text-slate-500`
- Padding: `py-6`
- Separator from contact: `border-t border-[rgba(248,250,252,0.08)]` — very subtle divider

**GradientText colors override**
- `colors={['#818cf8', '#f8fafc', '#818cf8']}` — indigo-400 to soft-white cycle on dark background

**Animation**
- whileInView patterns consistent with Phases 2–3: `once: true`, ease-out, 600ms
- Contact icons: stagger via AnimatedList or Framer Motion stagger
- prefers-reduced-motion: all animations respect global CSS rule

### Claude's Discretion

- Whether Footer is a separate `<footer>` element inside the contact section or a new section in page.tsx
- Exact icon for work email (Sms vs DirectboxSend vs another Iconsax icon)
- Whether to show email addresses as text labels under icons or just use tooltips

### Deferred Ideas (OUT OF SCOPE)

- None — all content provided, scope is Phase 4 requirements exactly

</user_constraints>

---

<phase_requirements>
## Phase Requirements

| ID | Description | Research Support |
|----|-------------|-----------------|
| EDU-01 | Section background #fafbfd | page.tsx already sets `bg-page` on the education section shell; component inner container uses `max-w-5xl mx-auto px-6 py-24` |
| EDU-02 | Each education entry in React Bits TiltedCard — borderless, crowe-card shadow, 12px radius | TiltedCard.tsx component fully read; props and usage patterns documented below |
| EDU-03 | Fade-in on scroll via Framer Motion whileInView | AboutSection.tsx provides the exact proven pattern to replicate |
| EDU-04 | Education placeholder compiles cleanly | Real content provided in CONTEXT.md — placeholder concern resolved; Purdue entry is real data |
| CONT-01 | Section background Crowe Indigo Dark (#011E41) | page.tsx already sets `bg-[#0f172a]` on the contact section shell |
| CONT-02 | "Let's connect" heading via React Bits GradientText — amber-to-indigo spectrum | GradientText.tsx component fully read; `colors` prop override documented |
| CONT-03 | Contact icons in flex row, centered, gap-8 — Iconsax icons, Linear, #f6f7fa, size 28 | iconsax-react@0.0.8 installed; icon names verified from CONTEXT.md; layout pattern clear |
| CONT-04 | Each icon is an `<a>` tag pointing to actual contact URL/handle | Anchor pattern with `target="_blank" rel="noopener noreferrer"` standard; mailto omits target |
| CONT-05 | Hover state: Framer Motion scale(1.05) + color shift to amber, icon variant switches to Bold | useState for color + whileHover for scale; variant prop switching documented |
| FOOT-01 | Indigo Dark background, py-6 | Footer is `<footer>` element inside or after contact in page.tsx; uses same `bg-[#0f172a]` |
| FOOT-02 | "© 2025 Achyuth Rachur" centered, color #8b90a0 (muted), small text | `text-sm text-slate-500 text-center` in `py-6` container |

</phase_requirements>

---

## Summary

Phase 4 builds three closely-related sections that complete the portfolio page end-to-end. All three sections are pure React component authoring work — no new libraries, no configuration changes, and no dependencies beyond what is already installed. The infrastructure is fully established from Phases 1–3.

The codebase uses a personal brand palette (slate/indigo-500), not the original Crowe Amber/Indigo palette described in CLAUDE.md. The globals.css maps the Crowe token names (`--crowe-indigo-dark`, `--crowe-amber-core`, etc.) to the personal palette equivalents. This means all token references must use what is actually in globals.css: `#0f172a` for brand dark, `#6366f1` for the accent color, `#818cf8` for the lighter indigo tint, and `#f8fafc` for soft white.

The three components to build are: `EducationSection.tsx`, `ContactSection.tsx`, and a `<footer>` element. The education section uses TiltedCard for the degree and SpotlightCard for the two research paper links. The contact section uses GradientText heading and Iconsax icons in an anchor row with hover state managed by useState + whileHover. The footer is a simple centered text element with a hairline top border.

**Primary recommendation:** Build three new component files following the exact patterns from Phase 3 components. Wire all three into page.tsx replacing placeholders. One build verification pass closes the phase.

---

## Standard Stack

### Core (all already installed — no new installs required)

| Library | Version | Purpose | Why Standard |
|---------|---------|---------|--------------|
| next | 16.1.6 | App Router framework | Project foundation |
| react | 19.2.3 | Component model | Project foundation |
| motion | 12.34.5 | whileInView, whileHover, useState-driven color transitions | Proven pattern from Phases 2–3 |
| iconsax-react | 0.0.8 | Sms, Link21, Code, DirectboxSend icons | Installed; requires --legacy-peer-deps (already resolved) |
| tailwindcss | v4 | Utility classes — bg-*, text-*, flex, grid | Project foundation |

### No New Installations Needed

All libraries for Phase 4 are already present in `package.json`. The phase is purely component authoring.

---

## Architecture Patterns

### Recommended Project Structure

```
src/
├── components/
│   ├── EducationSection.tsx     # NEW — Phase 4
│   ├── ContactSection.tsx       # NEW — Phase 4
│   ├── Nav.tsx                  # existing
│   ├── HeroSection.tsx          # existing
│   ├── AboutSection.tsx         # existing (template for Education)
│   ├── ExperienceSection.tsx    # existing (template for stagger)
│   ├── SkillsSection.tsx        # existing (template for badge row)
│   └── reactbits/
│       ├── TiltedCard.tsx       # existing — used in EducationSection
│       ├── SpotlightCard.tsx    # existing — used for research paper cards
│       ├── GradientText.tsx     # existing — used in ContactSection
│       └── AnimatedList.tsx     # existing — optional for contact icon stagger
└── app/
    └── page.tsx                 # Wired in final plan step
```

### Pattern 1: whileInView Fade-In (from AboutSection.tsx — use verbatim)

**What:** Framer Motion scroll-triggered entrance, once per element.
**When to use:** EducationSection degree card and research paper grid.

```tsx
// Source: src/components/AboutSection.tsx (Phase 3, verified working)
import { motion } from 'motion/react';

<motion.div
  initial={{ opacity: 0, y: 30 }}
  whileInView={{ opacity: 1, y: 0 }}
  viewport={{ once: true, margin: '-100px' }}
  transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
>
  {/* section content */}
</motion.div>
```

### Pattern 2: Section Heading + Underline Accent (from AboutSection.tsx)

**What:** h2 with indigo underline that animates width from 0 to 3rem on scroll.
**When to use:** Education section "Education" and "Research" subheadings.

```tsx
// Source: src/components/AboutSection.tsx
<h2 className="text-3xl font-semibold text-crowe-indigo-dark font-body">Education</h2>
<motion.div
  className="h-0.5 bg-[#6366f1] rounded-full mt-2 mb-8"
  initial={{ width: 0 }}
  whileInView={{ width: '3rem' }}
  viewport={{ once: true }}
  transition={{ delay: 0.2, duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
/>
```

Note: `text-crowe-indigo-dark` resolves to `#0f172a` (slate-900) in this project — correct for dark headings on light background.

### Pattern 3: TiltedCard Usage (degree card)

**What:** 3D tilt with amber glare on hover. Pass content as children.
**When to use:** The single Purdue degree entry in EducationSection.

```tsx
// Source: src/components/reactbits/TiltedCard.tsx (Phase 1, verified)
import { TiltedCard } from '@/components/reactbits/TiltedCard';

<TiltedCard
  className="p-8 rounded-xl bg-white"
  containerClassName="w-full"
  tiltMaxAngleX={8}
  tiltMaxAngleY={8}
  glareEnable={true}
  glareColor="rgba(99, 102, 241, 0.6)"  // indigo tint matching project palette
  scale={1.02}
>
  <h3 className="text-xl font-semibold text-tint-900 font-body">Purdue University</h3>
  <p className="text-base text-tint-700 mt-1 font-body">
    Bachelor of Science in Management and Data Analytics
  </p>
  <p className="text-sm text-tint-500 mt-2 font-body">December 2024</p>
</TiltedCard>
```

**Critical:** TiltedCard renders a `motion.div` with `style={{ rotateX, rotateY, scale, transformStyle: 'preserve-3d' }}`. The outer container must have `style={{ perspective: '1000px' }}`. TiltedCard handles this internally — no wrapper perspective needed from the consumer.

**Shadow:** Apply crowe-card shadow via inline style on the children inner div or via `className` on TiltedCard. The TiltedCard itself does not apply box-shadow — caller is responsible. Use inline style `boxShadow: '0 1px 3px rgba(15,23,42,0.04), 0 6px 16px rgba(15,23,42,0.04), 0 12px 32px rgba(15,23,42,0.02)'` matching the project's shadow tokens.

### Pattern 4: SpotlightCard for Research Paper Links

**What:** Spotlight radial gradient follows cursor on hover. Borderless white card.
**When to use:** Research paper link cards — two-column grid on desktop.

```tsx
// Source: src/components/reactbits/SpotlightCard.tsx (Phase 3, verified)
import { SpotlightCard } from '@/components/reactbits/SpotlightCard';

<SpotlightCard className="p-6 flex flex-col gap-3" spotlightColor="rgba(99,102,241,0.08)">
  <h4 className="text-base font-semibold text-tint-900 font-body leading-snug">
    The Effect of the Digital Age on Privacy in the United States
  </h4>
  <p className="text-sm text-tint-500 font-body">
    Centre for Business and Economic Research — Business and Management Review
  </p>
  <p className="text-xs text-tint-500 font-body">September 26, 2022</p>
  <a
    href="https://cberuk.com/cdn/conference_proceedings/2022-09-16-09-14-01-AM.pdf"
    target="_blank"
    rel="noopener noreferrer"
    className="mt-auto inline-flex items-center gap-1.5 text-sm font-medium text-[#6366f1] hover:text-[#4f46e5] transition-colors"
  >
    View Paper
    {/* ExportSquare or ArrowRight from iconsax-react */}
  </a>
</SpotlightCard>
```

SpotlightCard already applies `bg-white`, `rounded-xl`, and crowe-card shadow internally — no need to add them in className.

### Pattern 5: GradientText Heading on Dark Background

**What:** Animated gradient text that cycles between colors.
**When to use:** "Let's connect" heading in ContactSection.

```tsx
// Source: src/components/reactbits/GradientText.tsx (Phase 1, verified)
import { GradientText } from '@/components/reactbits/GradientText';

<GradientText
  colors={['#818cf8', '#f8fafc', '#818cf8']}
  animationSpeed={8}
  className="text-3xl font-semibold font-body"
>
  Let&apos;s connect
</GradientText>
```

GradientText renders a `<span>` with `WebkitBackgroundClip: 'text'` and `WebkitTextFillColor: 'transparent'`. It injects a `<style>` tag for the `gradient-shift` keyframe animation. Both work correctly with the existing project setup.

### Pattern 6: Iconsax Contact Icon with Hover State

**What:** Interactive icon wrapped in anchor, color controlled by useState, scale via whileHover.
**When to use:** Each of the four contact icons in ContactSection.

```tsx
// Source: pattern derived from CONTEXT.md + iconsax-react@0.0.8 API
'use client';
import { useState } from 'react';
import { motion } from 'motion/react';
import { Sms, Link21, Code, DirectboxSend } from 'iconsax-react';

interface ContactIconProps {
  href: string;
  label: string;
  icon: React.ComponentType<{ color: string; variant: string; size: number }>;
  isMailto?: boolean;
}

function ContactIcon({ href, label, icon: Icon, isMailto = false }: ContactIconProps) {
  const [hovered, setHovered] = useState(false);

  return (
    <a
      href={href}
      {...(!isMailto && { target: '_blank', rel: 'noopener noreferrer' })}
      className="flex flex-col items-center gap-2"
    >
      <motion.div
        whileHover={{ scale: 1.1 }}
        transition={{ duration: 0.15, ease: [0.16, 1, 0.3, 1] }}
        onHoverStart={() => setHovered(true)}
        onHoverEnd={() => setHovered(false)}
      >
        <Icon
          color={hovered ? '#818cf8' : '#f8fafc'}
          variant={hovered ? 'Bold' : 'Linear'}
          size={28}
        />
      </motion.div>
      <span className="text-xs text-slate-400 font-body">{label}</span>
    </a>
  );
}
```

**Iconsax icon import names confirmed available in iconsax-react@0.0.8:**
- `Sms` — envelope/email icon
- `DirectboxSend` — send-to-inbox icon (suitable for work email differentiation)
- `Link21` — link/chain icon (LinkedIn)
- `Code` — code brackets icon (GitHub)
- `ExportSquare` — external link icon (for "View Paper" links in research cards)

### Pattern 7: Footer Element Structure

**What:** Minimal footer with subtle top border separating it from Contact.
**When to use:** After ContactSection in page.tsx, or as a sub-element of the contact section.

Claude's discretion: recommend a separate `<footer>` element in page.tsx for semantic HTML correctness. This means page.tsx gets a `<footer>` sibling after the contact `<section>`. Both share `bg-[#0f172a]` so they flow visually without gap.

```tsx
// In page.tsx — after contact section
<footer className="bg-[#0f172a] border-t border-[rgba(248,250,252,0.08)] py-6">
  <p className="text-sm text-slate-500 text-center font-body">
    &copy; 2025 Achyuth Rachur
  </p>
</footer>
```

### Anti-Patterns to Avoid

- **Importing from `framer-motion`:** This project uses the `motion` package. Import path is `motion/react`. `import { motion } from 'motion/react'` — NOT `from 'framer-motion'`.
- **Adding `'use client'` to page.tsx:** page.tsx is a server component. It imports client components but does not need `'use client'` itself.
- **Using Tailwind config variants for runtime color:** Icon hover color is runtime state — use `useState` + inline style, NOT Tailwind classes. Tailwind classes cannot express dynamic runtime values.
- **Forgetting `scroll-mt-16` on section shells:** The education and contact section shells in page.tsx already have `scroll-mt-16` — do NOT add it again inside the component inner container.
- **TiltedCard shadow**: TiltedCard does not self-apply box-shadow. The inner content `div` must carry the shadow class or inline style.
- **AnimatedList with non-array children:** AnimatedList handles both array and single-child cases, but the stagger effect only applies when children is an array. For contact icons, pass them as an array or use Framer Motion stagger directly.

---

## Don't Hand-Roll

| Problem | Don't Build | Use Instead | Why |
|---------|-------------|-------------|-----|
| Tilt + glare effect on degree card | Custom mouse tracking | `TiltedCard.tsx` | Already built with spring physics and glare overlay |
| Cursor-tracking spotlight on paper cards | Custom gradient logic | `SpotlightCard.tsx` | Already built with mouse event tracking |
| Animated gradient text | CSS gradient animation | `GradientText.tsx` | Already built with `gradient-shift` keyframe |
| Staggered list entrance | Custom intersection observer | `AnimatedList.tsx` | Already built with Framer Motion staggerChildren |
| Icon library | SVG files | `iconsax-react` | 6000 icon variants, tree-shakeable, already installed |

---

## Common Pitfalls

### Pitfall 1: Wrong motion import path

**What goes wrong:** Component throws module-not-found or type errors.
**Why it happens:** Developer imports from `framer-motion` which is not installed — only `motion` is in package.json.
**How to avoid:** Always `import { motion, ... } from 'motion/react'` — confirmed pattern from every existing component.
**Warning signs:** TypeScript error "Cannot find module 'framer-motion'" at compile time.

### Pitfall 2: TiltedCard glare color mismatch

**What goes wrong:** Glare is amber/orange (TiltedCard default) instead of indigo tint.
**Why it happens:** TiltedCard's default `glareColor` is `rgba(245, 168, 0, 1)` — the original Crowe Amber. This project uses indigo-500 as its accent.
**How to avoid:** Pass `glareColor="rgba(99, 102, 241, 0.6)"` explicitly on all TiltedCard usages.
**Warning signs:** Golden/amber glare highlight on hover instead of indigo.

### Pitfall 3: GradientText default colors on dark background

**What goes wrong:** GradientText shows `#011E41` (near-black) as one stop — invisible on dark contact section background.
**Why it happens:** GradientText's default `colors` prop is `['#011E41', '#F5A800', '#002E62', '#D7761D', '#011E41']` — original Crowe palette.
**How to avoid:** Always pass `colors={['#818cf8', '#f8fafc', '#818cf8']}` explicitly for the Contact section usage.
**Warning signs:** Parts of "Let's connect" disappear or look muddy on the dark background.

### Pitfall 4: Iconsax React 19 peer dependency

**What goes wrong:** `npm install` fails with peer dependency conflict.
**Why it happens:** iconsax-react@0.0.8 declares `react ^17||^18` peer deps; project uses React 19.
**How to avoid:** This is already resolved in Phase 1 — iconsax-react IS installed. Do not run `npm install iconsax-react` again. If reinstalling for any reason, use `--legacy-peer-deps`.
**Warning signs:** Only relevant if package.json is modified and `npm install` is re-run.

### Pitfall 5: Contact icon hover color via Tailwind class

**What goes wrong:** Icon color does not change on hover because Tailwind cannot modify inline React props at runtime.
**Why it happens:** Developer tries `className="hover:text-[#818cf8]"` on the Iconsax component — but Iconsax reads the `color` prop, not CSS `color` property.
**How to avoid:** Use `useState(false)` for `hovered`, set color via `color={hovered ? '#818cf8' : '#f8fafc'}` prop — confirmed pattern from CONTEXT.md.
**Warning signs:** Icon color stays white on hover even though class is applied.

### Pitfall 6: Missing `'use client'` directive

**What goes wrong:** Build error — hooks (useState) cannot be used in server components.
**Why it happens:** Both EducationSection and ContactSection use Framer Motion whileInView and/or useState — these require client rendering.
**How to avoid:** First line of both new component files must be `'use client';`.
**Warning signs:** Next.js build error: "useState/useEffect can only be used inside a Client Component."

### Pitfall 7: Education section `bg-page` vs `bg-[#fafbfd]`

**What goes wrong:** Section background doesn't match the requirement (EDU-01 says #fafbfd, but globals.css maps `--color-page` to `#f8fafc`).
**Why it happens:** The REQUIREMENTS.md says #fafbfd but the project palette uses #f8fafc (slate-50) as `bg-page`. In the personal brand palette these are effectively the same visual result.
**How to avoid:** Keep `bg-page` on the section shell in page.tsx (already present). The `EducationSection` inner container does not set a background — it sits inside the shell. This is consistent with all Phase 3 sections.
**Warning signs:** Only relevant if comparing against REQUIREMENTS.md spec literally — not a visual issue.

---

## Code Examples

### EducationSection — Full Pattern

```tsx
// Source: derived from AboutSection.tsx + TiltedCard.tsx + SpotlightCard.tsx
'use client';

import { motion } from 'motion/react';
import { TiltedCard } from '@/components/reactbits/TiltedCard';
import { SpotlightCard } from '@/components/reactbits/SpotlightCard';
import { ExportSquare } from 'iconsax-react';

const PAPERS = [
  {
    title: 'The Effect of the Digital Age on Privacy in the United States',
    publication: 'Centre for Business and Economic Research — Business and Management Review',
    date: 'September 26, 2022',
    url: 'https://cberuk.com/cdn/conference_proceedings/2022-09-16-09-14-01-AM.pdf',
  },
  {
    title: 'Securing the Future: Legal Strategies for AI Implementation in Business Operations',
    publication: 'Eurasia Business and Economics Society',
    date: 'April 2024',
    url: 'https://drive.google.com/file/d/1nbN3ES_DH7tnr9bP7ZrtQL1FWUtrNiaC/view?pli=1',
  },
];

export function EducationSection() {
  return (
    <div className="max-w-5xl mx-auto px-6 py-24">
      {/* Section heading */}
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: '-100px' }}
        transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
      >
        <h2 className="text-3xl font-semibold text-crowe-indigo-dark font-body">Education</h2>
        <motion.div
          className="h-0.5 bg-[#6366f1] rounded-full mt-2 mb-8"
          initial={{ width: 0 }}
          whileInView={{ width: '3rem' }}
          viewport={{ once: true }}
          transition={{ delay: 0.2, duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
        />

        {/* Degree card — TiltedCard */}
        <TiltedCard
          className="p-8 rounded-xl bg-white w-full"
          containerClassName="w-full"
          tiltMaxAngleX={8}
          tiltMaxAngleY={8}
          glareEnable={true}
          glareColor="rgba(99, 102, 241, 0.6)"
          scale={1.02}
        >
          <div style={{ boxShadow: '0 1px 3px rgba(15,23,42,0.04), 0 6px 16px rgba(15,23,42,0.04), 0 12px 32px rgba(15,23,42,0.02)' }} className="rounded-xl -m-8 p-8">
            <h3 className="text-xl font-semibold text-tint-900 font-body">Purdue University</h3>
            <p className="text-base text-tint-700 mt-1 font-body">
              Bachelor of Science in Management and Data Analytics
            </p>
            <p className="text-sm text-tint-500 mt-2 font-body">December 2024</p>
          </div>
        </TiltedCard>
      </motion.div>

      {/* Research Papers subsection */}
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: '-100px' }}
        transition={{ duration: 0.6, delay: 0.15, ease: [0.16, 1, 0.3, 1] }}
        className="mt-16"
      >
        <h3 className="text-2xl font-semibold text-crowe-indigo-dark font-body">Research</h3>
        <motion.div
          className="h-0.5 bg-[#6366f1] rounded-full mt-2 mb-8"
          initial={{ width: 0 }}
          whileInView={{ width: '3rem' }}
          viewport={{ once: true }}
          transition={{ delay: 0.3, duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
        />
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {PAPERS.map((paper) => (
            <SpotlightCard
              key={paper.title}
              className="p-6 flex flex-col gap-3 h-full"
              spotlightColor="rgba(99,102,241,0.08)"
            >
              <h4 className="text-base font-semibold text-tint-900 font-body leading-snug">
                {paper.title}
              </h4>
              <p className="text-sm text-tint-500 font-body">{paper.publication}</p>
              <p className="text-xs text-tint-500 font-body">{paper.date}</p>
              <a
                href={paper.url}
                target="_blank"
                rel="noopener noreferrer"
                className="mt-auto inline-flex items-center gap-1.5 text-sm font-medium text-[#6366f1] hover:text-[#4f46e5] transition-colors"
              >
                <ExportSquare size={16} color="currentColor" variant="Linear" />
                View Paper
              </a>
            </SpotlightCard>
          ))}
        </div>
      </motion.div>
    </div>
  );
}
```

### ContactSection — Full Pattern

```tsx
// Source: CONTEXT.md decisions + GradientText.tsx + iconsax-react pattern
'use client';

import { useState } from 'react';
import { motion } from 'motion/react';
import { GradientText } from '@/components/reactbits/GradientText';
import { Sms, DirectboxSend, Link21, Code } from 'iconsax-react';

interface ContactIconProps {
  href: string;
  label: string;
  Icon: React.ComponentType<{ color: string; variant: string; size: number }>;
  isMailto?: boolean;
}

function ContactIcon({ href, label, Icon, isMailto = false }: ContactIconProps) {
  const [hovered, setHovered] = useState(false);

  const anchorProps = isMailto
    ? {}
    : { target: '_blank' as const, rel: 'noopener noreferrer' };

  return (
    <a
      href={href}
      {...anchorProps}
      className="flex flex-col items-center gap-2 group"
    >
      <motion.div
        whileHover={{ scale: 1.1 }}
        transition={{ duration: 0.15, ease: [0.16, 1, 0.3, 1] }}
        onHoverStart={() => setHovered(true)}
        onHoverEnd={() => setHovered(false)}
      >
        <Icon
          color={hovered ? '#818cf8' : '#f8fafc'}
          variant={hovered ? 'Bold' : 'Linear'}
          size={28}
        />
      </motion.div>
      <span className="text-xs text-slate-400 font-body">{label}</span>
    </a>
  );
}

const CONTACT_ITEMS = [
  { href: 'mailto:achyuth.v.rachur@gmail.com', label: 'Personal', Icon: Sms, isMailto: true },
  { href: 'mailto:achyuth.rachur@crowe.com', label: 'Crowe', Icon: DirectboxSend, isMailto: true },
  { href: 'https://www.linkedin.com/in/achyuth-rachur/', label: 'LinkedIn', Icon: Link21 },
  { href: 'https://github.com/achyuthrachur', label: 'GitHub', Icon: Code },
];

export function ContactSection() {
  return (
    <div className="max-w-5xl mx-auto px-6 py-24 flex flex-col items-center text-center">
      <GradientText
        colors={['#818cf8', '#f8fafc', '#818cf8']}
        animationSpeed={8}
        className="text-3xl font-semibold font-body"
      >
        Let&apos;s connect
      </GradientText>

      <motion.div
        className="flex flex-row gap-8 justify-center mt-8"
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: '-100px' }}
        transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
      >
        {CONTACT_ITEMS.map(({ href, label, Icon, isMailto }) => (
          <ContactIcon
            key={label}
            href={href}
            label={label}
            Icon={Icon}
            isMailto={isMailto}
          />
        ))}
      </motion.div>
    </div>
  );
}
```

### page.tsx — Final Wiring

```tsx
// Replace both placeholder sections and add footer
import { Nav } from '@/components/Nav';
import { HeroSection } from '@/components/HeroSection';
import { AboutSection } from '@/components/AboutSection';
import { ExperienceSection } from '@/components/ExperienceSection';
import { SkillsSection } from '@/components/SkillsSection';
import { EducationSection } from '@/components/EducationSection';
import { ContactSection } from '@/components/ContactSection';

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

      <section id="education" className="scroll-mt-16 bg-page">
        <EducationSection />
      </section>

      <section id="contact" className="scroll-mt-16 bg-[#0f172a]">
        <ContactSection />
      </section>

      <footer className="bg-[#0f172a] border-t border-[rgba(248,250,252,0.08)] py-6">
        <p className="text-sm text-slate-500 text-center font-body">
          &copy; 2025 Achyuth Rachur
        </p>
      </footer>
    </main>
  );
}
```

Note: Remove `min-h-screen flex items-center justify-center` from the education and contact section shells — those were placeholder styles. The real components manage their own height and layout.

---

## State of the Art

| Old Approach | Current Approach | When Changed | Impact |
|--------------|------------------|--------------|--------|
| `import { motion } from 'framer-motion'` | `import { motion } from 'motion/react'` | Phase 1 | All motion imports must use `motion/react` |
| Tailwind config via `tailwind.config.ts` | Tokens in `@theme` block in `globals.css` | Phase 1 (Tailwind v4) | No config file; all custom tokens in CSS |
| shadcn CLI for components | Manual authoring from canonical specs | Phase 1 | Corporate proxy blocks registry; hand-write all components |
| React Bits CLI install | Hand-written from reactbits.dev specs | Phase 1 | Same proxy issue; components already complete in Phase 1 |
| `iconsax-react` standard install | `--legacy-peer-deps` required | Phase 1 | React 19 mismatch; already resolved, do not reinstall |

**Effective personal palette (how tokens map in this project):**

| CLAUDE.md token | Actual value in this project | Used for |
|-----------------|------------------------------|---------|
| `--crowe-indigo-dark` | `#0f172a` (slate-900) | Brand dark — hero, contact, footer bg |
| `--crowe-amber-core` | `#6366f1` (indigo-500) | Accent — underlines, SpotlightCard |
| `--crowe-amber-bright` | `#818cf8` (indigo-400) | Lighter accent — GradientText, hover color |
| `text-crowe-indigo-dark` | `#0f172a` | Section headings |
| `#f8fafc` | soft white | Text on dark bg (not `--crowe-white: #ffffff`) |

---

## Open Questions

1. **TiltedCard shadow application method**
   - What we know: TiltedCard does not self-apply box-shadow. It wraps children in `motion.div`.
   - What's unclear: Whether shadow should be on an inner div inside TiltedCard children, or whether the outer container should carry it.
   - Recommendation: Apply shadow via inline style on the inner content `div` — most direct approach, avoids stacking context conflicts with the 3D perspective transform.

2. **ExportSquare icon availability in iconsax-react@0.0.8**
   - What we know: iconsax-react@0.0.8 is installed; it exposes 1000 icons. ExportSquare is a standard iconsax icon.
   - What's unclear: The exact available icon names at version 0.0.8 (very early version) vs. the current iconsax catalog.
   - Recommendation: If ExportSquare fails to import, fall back to `ArrowRight` or a simple Unicode arrow `→` for the "View Paper" link. This is a low-risk fallback since the link still functions without the icon.

3. **Footer as separate element vs. inside ContactSection**
   - What we know: Claude's discretion; user left this open.
   - Recommendation: Separate `<footer>` in page.tsx for semantic HTML correctness. Both elements share `bg-[#0f172a]` so they visually flow together. This also keeps ContactSection.tsx clean with a single responsibility.

---

## Validation Architecture

### Test Framework

| Property | Value |
|----------|-------|
| Framework | None installed — no vitest/jest config detected |
| Config file | None |
| Quick run command | `npm run build` (Next.js static export — build success = functional validation) |
| Full suite command | `npm run build && npm run lint` |

### Phase Requirements → Test Map

| Req ID | Behavior | Test Type | Automated Command | File Exists? |
|--------|----------|-----------|-------------------|-------------|
| EDU-01 | Education section background #fafbfd | visual/smoke | `npm run build` | N/A — validated in build |
| EDU-02 | TiltedCard renders for degree entry | smoke | `npm run build` | N/A |
| EDU-03 | Fade-in on scroll | manual | Open browser, scroll | N/A |
| EDU-04 | Placeholder compiles cleanly | smoke | `npm run build` | N/A — real content provided |
| CONT-01 | Contact bg dark slate | visual/smoke | `npm run build` | N/A |
| CONT-02 | GradientText heading | smoke | `npm run build` | N/A |
| CONT-03 | Four Iconsax icons visible | smoke | `npm run build` | N/A |
| CONT-04 | Icons are anchor tags | smoke | `npm run build` + browser check | N/A |
| CONT-05 | Hover: scale + color shift | manual | Browser hover test | N/A |
| FOOT-01 | Footer bg + py-6 | smoke | `npm run build` | N/A |
| FOOT-02 | Copyright text centered, muted | smoke | `npm run build` | N/A |

### Sampling Rate

- **Per task commit:** `npm run build` — confirms no TypeScript errors, no broken imports, static export succeeds
- **Per wave merge:** `npm run build && npm run lint`
- **Phase gate:** Full build green + manual browser verification before `/gsd:verify-work`

### Wave 0 Gaps

None — no test framework is planned for this project (static portfolio, testing scope deferred to Phase 5 quality audit). Build success serves as the primary automated gate.

---

## Sources

### Primary (HIGH confidence)

- `src/components/reactbits/TiltedCard.tsx` — complete component read; props, implementation, defaults verified
- `src/components/reactbits/GradientText.tsx` — complete component read; colors prop interface verified
- `src/components/reactbits/SpotlightCard.tsx` — complete component read; spotlightColor, shadow, border behavior verified
- `src/components/reactbits/AnimatedList.tsx` — complete component read; children array vs single-child behavior verified
- `src/components/AboutSection.tsx` — whileInView pattern, heading + underline animation pattern verified
- `src/components/ExperienceSection.tsx` — Highlight helper, IntersectionObserver stagger pattern verified
- `src/components/SkillsSection.tsx` — AnimatedList usage, badge layout pattern verified
- `src/app/page.tsx` — existing section shells, scroll-mt-16, placeholder classes verified
- `src/app/globals.css` — actual token values verified; personal brand palette (slate/indigo) confirmed
- `package.json` — all dependency versions confirmed; motion@12.34.5, iconsax-react@0.0.8

### Secondary (MEDIUM confidence)

- `.planning/phases/04-closing-sections/04-CONTEXT.md` — all implementation decisions
- `.planning/REQUIREMENTS.md` — full requirement text for EDU-*, CONT-*, FOOT-*
- CLAUDE.md — animation patterns, Iconsax usage rules

### Tertiary (LOW confidence)

- iconsax icon name availability (`ExportSquare`) at version 0.0.8 — not runtime-verified; fallback documented

---

## Metadata

**Confidence breakdown:**
- Standard stack: HIGH — all libraries verified in package.json, no new installs
- Architecture: HIGH — patterns copied directly from verified existing components
- Pitfalls: HIGH — sourced from codebase decisions log in STATE.md and direct component inspection
- Icon names: MEDIUM — iconsax names from CONTEXT.md decisions; exact availability at 0.0.8 not runtime-tested

**Research date:** 2026-03-04
**Valid until:** 2026-04-04 (stable dependencies; no fast-moving ecosystem concerns for this phase)
