# Achyuth Rachur — Personal Resume/Portfolio

## What This Is

A single-page personal portfolio and resume website for Achyuth Rachur, Staff Consultant at Crowe LLP specializing in AI governance and Integrated Risk Management for financial institutions. Built with Next.js, deployed to Cloudflare Pages, styled entirely to the Crowe brand identity with premium animated components.

## Core Value

A visitor should immediately understand who Achyuth is, what he does, and feel confident enough to reach out — all from one seamless, scroll-driven experience.

## Requirements

### Validated

(None yet — ship to validate)

### Active

- [ ] Hero section with animated name (SplitText), subtitle (BlurText), amber underline, Aurora background, scroll indicator
- [ ] Glassmorphism sticky navigation with active-section amber underline and smooth scroll
- [ ] About section with professional summary, fade-in on scroll
- [ ] Experience section with SpotlightCard (amber tint) per bullet, stagger entrance
- [ ] Skills section with Badge pills in 2x2 grid (4 categories), AnimatedList stagger
- [ ] Education section with TiltedCard per entry, fade-in on scroll
- [ ] Contact section (Indigo Dark bg) with Iconsax icons for email/LinkedIn/GitHub/phone, GradientText heading, amber hover
- [ ] Footer with copyright
- [ ] Full Crowe brand compliance: warm bgs, indigo-tinted shadows, no pure white/black/borders
- [ ] Static export for Cloudflare Pages (output: "export", images: unoptimized)
- [ ] prefers-reduced-motion respected across all animations
- [ ] Responsive: mobile, tablet, desktop
- [ ] Lighthouse > 90

### Out of Scope

- Server-side rendering / API routes / middleware — Cloudflare Pages static only
- Dark mode toggle — Crowe brand is light-mode-first
- CMS / blog — not requested
- Multiple pages / routing — single page only
- Contact form with backend — links only (email, LinkedIn, GitHub, phone)
- Education content — placeholder until user provides details

## Context

- **Design system:** DESIGN.md is the source of truth for all visual decisions. Crowe brand tokens are pre-defined in that file.
- **Animation stack:** React Bits (TS-TW variants) for animated components, Framer Motion for scroll reveals and layout animations, Anime.js for DOM-level stagger/scroll triggers.
- **Icon library:** iconsax-react (Linear variant default, Bold for CTAs, color #f6f7fa on dark backgrounds)
- **Education placeholder:** User noted education as "[ADD YOUR EDUCATION]" — site should compile cleanly with a placeholder entry; user will fill in later.
- **Domain:** Will be added post-deploy in Cloudflare Pages settings.
- **Repo:** Will be created as achyuthrachur/[project-name] on GitHub, pushed, then connected to Cloudflare Pages.

## Constraints

- **Deployment:** Cloudflare Pages — static export only. `output: "export"` + `images: { unoptimized: true }` in next.config.ts. No SSR, no server actions, no API routes.
- **Design:** All visual decisions must pass the DESIGN.md Section 1.6 anti-pattern checklist before finalizing.
- **React Bits installs:** Use `npx shadcn@latest add @react-bits/[Component]-TS-TW`; if CLI fails, copy source from reactbits.dev manually into `src/components/reactbits/`.
- **Font:** Helvetica Now requires a license; use the Arial → Helvetica Neue → system-ui fallback stack unless font files are provided.

## Key Decisions

| Decision | Rationale | Outcome |
|----------|-----------|---------|
| Single-page scroll vs multi-page | Portfolio sites convert better as single scroll experiences; simpler for static deploy | — Pending |
| Cloudflare Pages over Vercel | User specified Cloudflare Pages as deploy target | — Pending |
| React Bits TS-TW variants | Matches our TypeScript + Tailwind stack; full component ownership | — Pending |
| Aurora background at 0.3 opacity | Atmospheric, not distracting — brand-aligned indigo spectrum | — Pending |
| No contact form | Reduces complexity; links sufficient for portfolio use case | — Pending |

---
*Last updated: 2026-03-03 after initialization*
