# Phase 3: Content Sections - Context

**Gathered:** 2026-03-04
**Status:** Ready for planning

<domain>
## Phase Boundary

Build three content sections replacing the Phase 2 placeholders: About (professional summary prose), Experience (seven SpotlightCards with amber spotlight, stagger entrance), and Skills (four badge-grid categories with AnimatedList stagger). All sections already have correct IDs, background colors, and scroll-mt-16 in page.tsx — Phase 3 fills them with real components.

</domain>

<decisions>
## Implementation Decisions

### About section
- **Layout:** Clean prose only — no decorative elements, no section label, no pull quote. Let the writing speak.
- **Content:** Professional summary rewritten in first person (conversational, confident — as noted in original spec)
- **Text width:** `max-w-2xl` for comfortable reading (same as hero text block)
- **Text style:** `text-lg text-tint-700 leading-relaxed` — comfortable reading experience
- **Section heading:** "About" in `text-crowe-indigo-dark font-semibold text-3xl` with a short amber underline (Framer Motion width 0→3rem, delay 0.2s) — matches amber accent pattern from hero
- **Scroll reveal:** Framer Motion `whileInView={{ opacity: 1, y: 0 }}` from `{ opacity: 0, y: 30 }`, `viewport={{ once: true, margin: '-100px' }}`, transition 0.6s ease-out
- **Background:** `bg-page` (#f8f9fc) — already set in page.tsx placeholder

### Experience section
- **Company heading:** "Crowe LLP" in `text-crowe-indigo-dark font-semibold text-2xl`; role "Staff Consultant | Integrated Risk Management" + dates in `text-tint-500 text-sm mt-1`
- **Card layout:** Single column — cards stacked vertically, full content width. Resume bullets need reading room; 2-col cramped for full-sentence bullets.
- **Card count:** 7 SpotlightCards, one per experience bullet
- **spotlightColor:** `"rgba(245,168,0,0.08)"` — spec value (slightly lower than default 0.12)
- **Card styling:** `p-6 rounded-xl` on the SpotlightCard, NO explicit border or bg (SpotlightCard provides white bg + crowe shadow by default)
- **Key term highlighting:** Static amber-wash spans — `<span className="bg-[#fff8eb] font-semibold px-1 rounded-sm">term</span>`. Repeated ShinyText animation on every bullet would be distracting.
- **Key terms to highlight (from spec):** "AI enablement", "governance-first", "MRM", "Model Risk Management", "independent validation", "bias/fairness"
- **Stagger entrance:** Anime.js `onScroll` trigger with `stagger(100)` on the card group — per original spec
- **Background:** `bg-section` (#f6f7fa) — already set in page.tsx placeholder

### Skills section
- **Grid:** 2×2 CSS grid on desktop (`grid-cols-2 gap-8`), single column on mobile (`grid-cols-1`)
- **Four groups (from original spec):**
  1. "AI, Analytics & Engineering"
  2. "Risk, Compliance & Governance"
  3. "Model Risk Management"
  4. "Domain Use Cases"
- **Group heading style:** `text-crowe-indigo-dark font-semibold text-lg mb-4` with amber underline accent (`h-0.5 w-8 bg-crowe-amber mt-1 mb-4` — short fixed-width underline)
- **Badge styling (from spec):** White pill — `bg-white text-[#2d3142] border-none shadow-crowe-sm rounded-full px-3 py-1 text-sm font-medium`. NOT the shadcn variants.
- **Badge hover:** `hover:shadow-amber-glow hover:scale-[1.03] transition-all duration-200`
- **Stagger entrance:** React Bits `<AnimatedList>` wrapping each group's badge list — default 80ms stagger, from `{ opacity: 0, y: 20 }` to `{ opacity: 1, y: 0 }`
- **Background:** `bg-section-warm` (#f0f2f8) — already set in page.tsx placeholder

### Animation continuity
- All scroll reveals use `viewport={{ once: true }}` — no re-animation on scroll back up (per global animation rules)
- Entrance easing: `[0.16, 1, 0.3, 1]` (Crowe ease-out) throughout
- Durations: 500-700ms for section reveals, 200ms for hover micro-interactions

### Claude's Discretion
- Exact first-person rewrite of the professional summary prose (maintain factual accuracy, improve conversational tone)
- Whether to create separate component files (AboutSection.tsx, ExperienceSection.tsx, SkillsSection.tsx) or inline in page.tsx — separate files preferred for maintainability
- Exact Anime.js v4 onScroll API for experience card stagger
- AnimatedList internal details (how children are mapped to staggered motion.divs)

</decisions>

<specifics>
## Specific Ideas

**Experience bullet content (verbatim from brief):**
1. "Led delivery of AI enablement for financial institutions, translating risk/compliance needs into practical ML and GenAI use cases with clear scope, controls, and monitoring plans."
2. "Designed and developed AI solutions across audit, financial crime, model validation, and reconciliation, targeting automation of evidence collection, investigation support, exception triage, and consistency checks."
3. "Implemented governance-first patterns for AI in production, including model documentation, control design, bias/fairness considerations, human-in-the-loop review, and ongoing performance monitoring."
4. "Supported Model Risk Management (MRM) programs through independent validation of vendor and internally developed models, assessing conceptual soundness, data, performance, stability, and implementation risk."
5. "Evaluated model documentation and internal controls against regulatory expectations and industry sound practices; delivered clear findings, remediation recommendations, and defensible workpapers."
6. "Partnered with stakeholders across risk, compliance, audit, and technology to drive adoption—balancing innovation speed with operational constraints and control requirements."
7. *(The original brief lists 6 bullets — use these 6, creating 6 SpotlightCards)*

**Skills content (verbatim from brief):**

AI, Analytics & Engineering:
- Generative AI (use-case design, prompt/agent patterns, workflow automation)
- Machine Learning (model development concepts, evaluation, monitoring)
- Model monitoring & drift concepts (performance stability, ongoing controls)
- Data analysis & scripting (Python, R)
- Data visualization & dashboards (Tableau)

Risk, Compliance & Governance:
- AI governance & controls (transparency, auditability, human oversight)
- Bias/fairness risk concepts & testing approaches
- Risk & compliance process automation
- Control design, evidence, and defensible documentation
- Stakeholder management (risk/compliance/technology alignment)

Model Risk Management:
- Independent Model Validation (vendor + internally developed models)
- Model performance & stability assessment
- Documentation and internal controls review
- CECL familiarity (WARM, DCF) and quantitative testing methods (e.g., OLS; HAC-adjusted techniques)

Domain Use Cases:
- Audit analytics & automation
- Financial crime / AML operations support (triage, investigation enablement concepts)
- Model validation automation & reviewer support
- Reconciliation automation & exception management

</specifics>

<code_context>
## Existing Code Insights

### Reusable Assets
- `src/components/reactbits/SpotlightCard.tsx`: `children`, `className`, `spotlightColor` — provides white bg + crowe shadow + amber spotlight on hover. Wrap card content directly.
- `src/components/reactbits/AnimatedList.tsx`: `children`, `delay` (80ms), `duration` (0.5s), `from/to` — wraps children with staggered entrance. Use for skill badge groups.
- `src/components/reactbits/ShinyText.tsx`: `text`, `speed`, `className` — looping amber shimmer. NOT used for experience key terms (too distracting in repeated context). Could use for section headings.
- `src/components/ui/badge.tsx`: shadcn Badge — NOT used for skills (spec calls for custom white pill). Available for other uses.
- `src/lib/utils.ts`: `cn()` for className composition.

### Established Patterns
- `'use client'` on all interactive/animated components
- Named exports only
- `motion/react` (not `framer-motion`) for Framer Motion imports
- `scroll-mt-16` on all `<section>` elements for nav offset
- Section containers: `max-w-5xl mx-auto px-6 py-24`
- Crowe shadow classes: `shadow-crowe-sm`, `shadow-crowe-card`, `shadow-amber-glow`
- Section backgrounds already applied in page.tsx — replace min-h-screen placeholder content

### Integration Points
- `src/app/page.tsx`: Replace `<section id="about">`, `<section id="experience">`, `<section id="skills">` placeholder divs with real component imports
- Keep `bg-page`, `bg-section`, `bg-section-warm` classes on the section elements
- Keep `scroll-mt-16` and `id` attributes — Nav's IntersectionObserver depends on them
- Corporate SSL proxy blocks CLI installs — no new npm packages; use existing libraries only

</code_context>

<deferred>
## Deferred Ideas

- None — discussion stayed within Phase 3 scope

</deferred>

---

*Phase: 03-content-sections*
*Context gathered: 2026-03-04*
