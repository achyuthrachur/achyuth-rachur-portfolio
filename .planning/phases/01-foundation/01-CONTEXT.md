# Phase 1: Foundation - Context

**Gathered:** 2026-03-03
**Status:** Ready for planning

<domain>
## Phase Boundary

Scaffold a Next.js 14+ project with TypeScript, Tailwind, App Router, and src/ directory. Apply full Crowe brand token setup (colors, tints, shadows, fonts, radii, spacing). Configure static export for Cloudflare Pages. Initialize shadcn/ui with Crowe HSL overrides. Install all animation and component dependencies. Result: a dev server that starts cleanly, a build that produces `/out`, and all libraries importable — no visible UI yet beyond a blank branded page.

</domain>

<decisions>
## Implementation Decisions

### Scaffold location
- Run `npx create-next-app@latest . --typescript --tailwind --eslint --app --src-dir --import-alias "@/*"` in the **current directory** (Resume/)
- CLAUDE.md and DESIGN.md already live here — keeping everything at the same root is cleaner
- Do NOT create a subdirectory

### Font strategy
- **No Helvetica Now font files available** — use the web-safe fallback stack throughout
- Fallback chain: `Arial, 'Helvetica Neue', Helvetica, system-ui, sans-serif`
- Do NOT add a `src/fonts/` directory or local font loading — no files to load
- The font-family CSS variables and Tailwind fontFamily config use the fallback chain
- If the user later provides `.woff2` font files, they can be added to `src/fonts/` and wired up in `layout.tsx`

### next.config.ts
- `output: "export"` — required for Cloudflare Pages static export
- `images: { unoptimized: true }` — required for static export (no Next.js image optimization server)
- No API routes, no server actions, no middleware — keep the config minimal

### React Bits install strategy
- **Attempt CLI first** for each component: `npx shadcn@latest add @react-bits/[Component]-TS-TW`
- If CLI fails (404, network error, or registry mismatch): manually fetch source from `https://reactbits.dev`, select TypeScript + Tailwind variant, and copy into `src/components/reactbits/[ComponentName].tsx`
- All 9 components go into `src/components/reactbits/` regardless of install method:
  - SplitText, BlurText, ShinyText, CountUp, GradientText, SpotlightCard, TiltedCard, AnimatedList, Aurora
- Each component should export a named export matching the component name

### shadcn component scope for Phase 1
- Initialize shadcn (`npx shadcn@latest init`) and apply Crowe HSL overrides immediately
- Install **only Badge** during Phase 1 (needed for Skills in Phase 3)
- All other shadcn components installed on-demand in the phases that need them
- Reason: minimizes Phase 1 scope; other components may need props/customization specific to their phase

### Tailwind config completeness
- Extend with the **full Crowe theme** from DESIGN.md Section 1.2:
  - `colors.crowe` — full amber/indigo/teal/cyan/blue/violet/coral palette with bright/DEFAULT/dark variants
  - `colors.tint` — full 950/900/700/500/300/200/100/50 warm tint scale
  - `fontFamily.display`, `fontFamily.body`, `fontFamily.mono` — all three
  - `boxShadow` — all crowe-sm/md/lg/xl/hover/card/amber-glow variants
  - `backgroundColor` — page/section/section-warm/section-amber aliases
- Do NOT truncate or abbreviate the config

### globals.css structure
- Two layers: (1) shadcn HSL overrides in `@layer base` from DESIGN.md Section 3, then (2) Crowe CSS custom properties from DESIGN.md Section 1.2
- Add `prefers-reduced-motion` media query at the bottom:
  ```css
  @media (prefers-reduced-motion: reduce) {
    *, *::before, *::after {
      animation-duration: 0.01ms !important;
      animation-iteration-count: 1 !important;
      transition-duration: 0.01ms !important;
    }
  }
  ```
- Set `html { scroll-behavior: smooth; }` for smooth scroll navigation

### Package installation order
1. `npx create-next-app@latest .` — scaffold
2. `npx shadcn@latest init` — component system
3. `npm install animejs framer-motion iconsax-react` — animation + icons
4. React Bits components — CLI or manual per component
5. `npx shadcn@latest add badge` — only shadcn component needed now

### Claude's Discretion
- Exact ESLint and Prettier config (follow project defaults)
- Whether to install `@types/animejs` (check if needed with v4)
- Blank `app/page.tsx` content for Phase 1 (minimal branded placeholder is fine)
- `.gitignore` entries beyond Next.js defaults

</decisions>

<specifics>
## Specific Ideas

- The user specified these exact React Bits components (verbatim from their prompt):
  SplitText, BlurText, ShinyText, CountUp, GradientText, SpotlightCard, TiltedCard, AnimatedList, Aurora
- All must be TS-TW variants
- `src/components/reactbits/` is the canonical location for all React Bits components
- The user explicitly noted: "If any install fails, go to https://reactbits.dev, find the component, select TS + Tailwind variant, and copy the source directly into src/components/reactbits/"

</specifics>

<code_context>
## Existing Code Insights

### Reusable Assets
- None — greenfield project, no existing code

### Established Patterns
- DESIGN.md is the source of truth for all visual tokens (colors, shadows, typography, spacing)
- CLAUDE.md Section 8 provides the canonical project init sequence

### Integration Points
- `src/app/layout.tsx` — where font variables, global CSS, and providers are applied
- `src/app/globals.css` — where Crowe CSS custom properties and shadcn HSL vars live
- `tailwind.config.ts` — where brand tokens become utility classes
- `next.config.ts` — where static export is configured

</code_context>

<deferred>
## Deferred Ideas

- None — discussion stayed within Phase 1 scope
- Helvetica Now font files: if the user later acquires a license, add `.woff2` files to `src/fonts/` and wire up in `layout.tsx` using `next/font/local`

</deferred>

---

*Phase: 01-foundation*
*Context gathered: 2026-03-03*
