# Phase 5: Polish + Deploy - Context

**Gathered:** 2026-03-04
**Status:** Ready for planning

<domain>
## Phase Boundary

Audit the completed portfolio for design compliance and quality, then ship it live. Phase 5 does NOT add new sections or features — it verifies what was built in Phases 1–4 meets all DSGN-*/QUAL-* requirements and deploys to Cloudflare Pages.

</domain>

<decisions>
## Implementation Decisions

### GitHub repo
- Repo name: `achyuth-rachur-portfolio` — matches `package.json` name field
- GitHub username: `achyuthrachur`
- Full URL: `github.com/achyuthrachur/achyuth-rachur-portfolio`
- Push current `master` branch as the default branch
- Repo visibility: public (consistent with prior project decisions)

### Cloudflare Pages deployment
- User has an existing Cloudflare account — no account creation needed
- Connection is done manually in the Cloudflare Pages dashboard (no CLI)
- Phase 5 must include a **blocking human-verify checkpoint** with step-by-step UI instructions:
  1. Go to Cloudflare Dashboard → Pages → Create a project
  2. Connect to Git → authorize GitHub → select `achyuth-rachur-portfolio` repo
  3. Build settings: Framework preset = None, Build command = `npm run build`, Output directory = `out`
  4. Environment variables: none required for static export
  5. Save and deploy
  6. Verify the generated `*.pages.dev` URL loads correctly
- Custom domain: deferred to V2-02 (not in Phase 5 scope)
- Branch to deploy: `master` (current branch, no rename needed)

### Design compliance audit (DSGN-01 through DSGN-06)
- Run an **automated grep audit first**: scan all `.tsx` files for known violations:
  - `#FFFFFF` or `bg-white` as page/section backgrounds (DSGN-01)
  - `#000000` or `text-black` for body text (DSGN-02)
  - `border border-` on card elements (DSGN-03)
  - `rgba(0,0,0` in shadow values (DSGN-04)
  - `<hr` or `border-b` between sections (DSGN-06)
- Then a **manual visual pass** in the browser: scroll the page and check against the DESIGN.md anti-pattern checklist
- Fix violations found in audit before proceeding to deploy

### prefers-reduced-motion coverage (DSGN-05)
- `globals.css` has `animation-duration: 0.01ms` + `transition-duration: 0.01ms` — covers CSS transitions and some animation libraries
- `HeroSection.tsx` and `ExperienceSection.tsx` already have explicit `window.matchMedia('prefers-reduced-motion: reduce')` guards for their Anime.js code
- **Gap to fix:** Framer Motion (`motion/react`) animations use inline JavaScript styles — the CSS rule does NOT suppress them. All components using `motion.*` with `initial`/`animate`/`whileInView` must also call `useReducedMotion()` from `motion/react` and short-circuit when true
- Components to audit for Framer Motion usage: AboutSection, SkillsSection, EducationSection, ContactSection, HeroSection, Nav

### Responsive verification (QUAL-01)
- Test in Chrome DevTools responsive mode at three breakpoints:
  - **375px** — mobile (iPhone SE equivalent)
  - **768px** — tablet (iPad portrait)
  - **1280px** — desktop
- Key sections to verify at mobile: nav mobile menu, skills 2-col→1-col, education card width, contact icons row wrap
- Blocking human-verify checkpoint: user scrolls all sections at each breakpoint and confirms

### Lighthouse (QUAL-02)
- Run via Chrome DevTools → Lighthouse tab → "Navigation" mode
- Target: Performance ≥ 90 and Accessibility ≥ 90
- Run on the `npm run build` static output served locally (`npx serve out`) — not dev server (which uses Turbopack and inflates scores)
- Common fixes if score is low: add `alt` text to images, ensure heading hierarchy, check color contrast on muted text

### Build verification (QUAL-04)
- `npm run build` must exit 0 and produce `/out` directory — already passing from Phase 4
- Plan should re-verify before push (not assume it still passes)

### Claude's Discretion
- Whether to install `serve` globally or use `npx serve out` for local Lighthouse run
- Exact grep patterns for the automated audit script
- Order of operations within the audit plan (automated first, then manual)

</decisions>

<code_context>
## Existing Code Insights

### Reusable Assets
- `src/app/globals.css` — `@media (prefers-reduced-motion: reduce)` block already covers CSS transitions/animations. Needs Framer Motion gap patched.
- `HeroSection.tsx:17` — `window.matchMedia` pattern for Anime.js guard. Copy this pattern to any other component with Anime.js.
- `ExperienceSection.tsx:18` — Same `window.matchMedia` pattern.

### Established Patterns
- `motion/react` import path (not `framer-motion`) — Phase 1 decision. `useReducedMotion` is imported from same package: `import { useReducedMotion } from 'motion/react'`
- All section wrappers carry `scroll-mt-16` — established in Phase 2. Don't break during any audit fixes.
- `bg-[#fafbfd]` and `bg-[#f6f7fa]` as warm off-white backgrounds (not pure `bg-white`) — already compliant sections use these.

### Integration Points
- `src/app/page.tsx` — server component wrapping all sections. Any section-level background changes go here.
- `src/components/` — all components live here. Framer Motion audit touches AboutSection, SkillsSection, EducationSection, ContactSection.
- Git remote: none configured yet — `gh repo create` will set `origin`.

</code_context>

<specifics>
## Specific Ideas

- Cloudflare Pages dashboard flow: the human-verify checkpoint should read like a walkthrough, not a checklist — numbered steps with exact UI labels as they appear in the Cloudflare UI.
- The Lighthouse run must use the static `/out` build, not `npm run dev` — dev server Turbopack inflates perf score and gives a false read.

</specifics>

<deferred>
## Deferred Ideas

- Custom domain configuration — V2-02 (user will add in Cloudflare Pages settings post-deploy)
- Education content replacement with real university/degree/year — V2-01
- GitHub Actions CI/CD pipeline — not requested for this phase; manual push + Cloudflare auto-deploy is sufficient

</deferred>

---

*Phase: 05-polish-deploy*
*Context gathered: 2026-03-04*
