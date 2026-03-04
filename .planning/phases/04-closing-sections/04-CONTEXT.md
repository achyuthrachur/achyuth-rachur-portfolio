# Phase 4: Closing Sections - Context

**Gathered:** 2026-03-04
**Status:** Ready for planning

<domain>
## Phase Boundary

Build the final three sections to complete the page: Education (degree + research papers), Contact (icons with real links), and Footer. Replaces the current Phase 3 placeholders in page.tsx.

</domain>

<decisions>
## Implementation Decisions

### Education section
- **Background:** `bg-page` (#f8fafc) — already set in page.tsx
- **Section heading:** "Education" — `text-3xl font-semibold text-tint-900 font-body` with short `h-0.5 w-12 bg-[#6366f1] rounded-full` underline accent
- **Degree card:** React Bits `<TiltedCard>` — borderless, crowe-card shadow, 12px radius, fade-in via Framer Motion whileInView
  - Institution: "Purdue University" — `text-xl font-semibold text-tint-900`
  - Degree: "Bachelor of Science in Management and Data Analytics"
  - Graduated: "December 2024"
  - No GPA, no honors (not provided)

- **Research Papers subsection:** Separate from the degree card — heading "Research" with same underline style
  - Two paper link cards (NOT TiltedCard — use SpotlightCard or a simple hover card)
  - Each card: paper title, publication name, date, and an external link icon + "View Paper" link
  - Open in new tab (`target="_blank" rel="noopener noreferrer"`)

  Paper 1:
  - Title: "The Effect of the Digital Age on Privacy in the United States"
  - Publication: Centre for Business and Economic Research — Business and Management Review
  - Date: September 26, 2022
  - URL: https://cberuk.com/cdn/conference_proceedings/2022-09-16-09-14-01-AM.pdf

  Paper 2:
  - Title: "Securing the Future: Legal Strategies for AI Implementation in Business Operations"
  - Publication: Eurasia Business and Economics Society
  - Date: April 2024
  - URL: https://drive.google.com/file/d/1nbN3ES_DH7tnr9bP7ZrtQL1FWUtrNiaC/view?pli=1

- **Layout:** Degree card full width, then research cards in 2-col grid (desktop) / 1-col (mobile)
- **Animation:** Framer Motion whileInView, `once: true`, `viewport={{ margin: '-100px' }}`

### Contact section
- **Background:** `bg-[#0f172a]` (dark slate) — already set in page.tsx
- **Heading:** React Bits `<GradientText>` — "Let's connect" — gradient from `#818cf8` (indigo-400) to `#f8fafc` (soft white). Text large `text-3xl font-semibold`
- **Contact icons layout:** `flex flex-row gap-8 justify-center mt-8`
- **Icons (Iconsax):**
  - Personal email (`achyuth.v.rachur@gmail.com`): `<Sms>` → `mailto:achyuth.v.rachur@gmail.com`
  - Work email (`achyuth.rachur@crowe.com`): `<Sms>` variant with label "Crowe" or `<DirectboxSend>` → `mailto:achyuth.rachur@crowe.com`
  - LinkedIn: `<Link21>` → https://www.linkedin.com/in/achyuth-rachur/
  - GitHub: `<Code>` → https://github.com/achyuthrachur
  - **Skip phone** — user confirmed
- **Icon default state:** `variant="Linear"`, `color="#f8fafc"`, `size={28}`
- **Icon hover state:** Framer Motion `whileHover={{ scale: 1.1 }}`, color shifts to `#818cf8` (indigo-400) — use inline style + useState for color
- **Each icon has a label below it** (`text-xs text-slate-400`) for accessibility and clarity
- **Each icon wrapped in `<a>` tag** with `target="_blank" rel="noopener noreferrer"` (except mailto links)

### Footer
- **Background:** `bg-[#0f172a]` (same as Contact — they flow together, no separator)
- **Content:** "© 2025 Achyuth Rachur" centered, `text-sm text-slate-500`
- **Padding:** `py-6`
- **Separator from contact:** `border-t border-[rgba(248,250,252,0.08)]` — very subtle divider

### GradientText update for new brand
- The `<GradientText>` component uses its default indigo-amber cycle. Override `colors` prop:
  - `colors={['#818cf8', '#f8fafc', '#818cf8']}` — indigo-400 to soft white cycle
  - This reads well on the dark background

### Animation
- whileInView patterns consistent with Phases 2–3: `once: true`, ease-out, 600ms
- Contact icons: stagger entrance via `AnimatedList` or Framer Motion stagger
- prefers-reduced-motion: all animations respect the global CSS rule

### Claude's Discretion
- Whether Footer is a separate `<footer>` element inside the contact section or a new section in page.tsx
- Exact icon for work email (Sms vs DirectboxSend vs another Iconsax icon)
- Whether to show email addresses as text labels under icons or just use tooltips

</decisions>

<specifics>
## Specific Ideas

**Research paper URLs (verbatim):**
- Paper 1: https://cberuk.com/cdn/conference_proceedings/2022-09-16-09-14-01-AM.pdf
- Paper 2: https://drive.google.com/file/d/1nbN3ES_DH7tnr9bP7ZrtQL1FWUtrNiaC/view?pli=1

**Contact links (verbatim):**
- mailto:achyuth.v.rachur@gmail.com
- mailto:achyuth.rachur@crowe.com
- https://www.linkedin.com/in/achyuth-rachur/
- https://github.com/achyuthrachur

**No phone number** — explicitly excluded.

**GradientText component** is already in `src/components/reactbits/GradientText.tsx` from Phase 1. It accepts a `colors` array prop.

</specifics>

<code_context>
## Existing Code Insights

### Reusable Assets
- `src/components/reactbits/TiltedCard.tsx`: `children`, `className`, `containerClassName`, `tiltMaxAngleX/Y`, `glareEnable`, `glareColor`, `scale` — 3D tilt + glare on hover. Use for degree card.
- `src/components/reactbits/GradientText.tsx`: `children`, `colors`, `animationSpeed`, `showBorder` — animated gradient text.
- `src/components/reactbits/SpotlightCard.tsx`: Available for research paper cards.
- `src/components/reactbits/AnimatedList.tsx`: Available for contact icon stagger.
- `src/lib/utils.ts`: `cn()` helper.

### Established Patterns
- `'use client'` on all interactive/animated components
- Named exports only
- `motion/react` for all Framer Motion imports
- `scroll-mt-16` on all sections (already applied in page.tsx placeholders)
- Section containers: `max-w-5xl mx-auto px-6 py-24`
- Indigo accent: `#6366f1` / `#4f46e5` / `#818cf8`
- Brand dark: `#0f172a`
- Text on dark bg: `#f8fafc` (soft white)

### Integration Points
- `src/app/page.tsx`: Replace `<section id="education">` and `<section id="contact">` placeholders
- Keep existing `id`, `scroll-mt-16`, `bg-page` / `bg-[#0f172a]` classes on section shells
- Footer can be added after the contact section or inside it

</code_context>

<deferred>
## Deferred Ideas

- None — all content provided, scope is Phase 4 requirements exactly

</deferred>

---

*Phase: 04-closing-sections*
*Context gathered: 2026-03-04*
