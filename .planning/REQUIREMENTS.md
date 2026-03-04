# Requirements: Achyuth Rachur Portfolio

**Defined:** 2026-03-03
**Core Value:** A visitor immediately understands who Achyuth is, what he does, and feels confident enough to reach out — all from one seamless, scroll-driven experience.

## v1 Requirements

### Project Scaffold

- [x] **SCAF-01**: Project is scaffolded with Next.js 14+ App Router, TypeScript, Tailwind CSS, src/ directory structure
- [x] **SCAF-02**: Static export configured (output: "export", images: { unoptimized: true }) for Cloudflare Pages
- [x] **SCAF-03**: shadcn/ui initialized with Crowe theme overrides (DESIGN.md Section 3 HSL tokens in globals.css)
- [x] **SCAF-04**: Tailwind config extended with full Crowe color tokens, tint scale, shadow system, font families, and backgroundColor aliases
- [x] **SCAF-05**: animejs, framer-motion, iconsax-react installed
- [x] **SCAF-06**: React Bits components installed (TS-TW): SplitText, BlurText, ShinyText, CountUp, GradientText, SpotlightCard, TiltedCard, AnimatedList, Aurora — via CLI or manual copy from reactbits.dev

### Navigation

- [x] **NAV-01**: Sticky top navigation with links: About, Experience, Skills, Education, Contact
- [x] **NAV-02**: Glassmorphism styling: bg rgba(250,251,253,0.85) backdrop-blur-[16px] border-b border-[rgba(1,30,65,0.04)]
- [x] **NAV-03**: Active section indicator uses Framer Motion layoutId shared amber underline animation
- [x] **NAV-04**: Smooth scroll behavior with scroll-mt offset for sticky nav height
- [x] **NAV-05**: Nav background opacity increases on scroll past hero

### Hero Section

- [x] **HERO-01**: Full viewport height section with Crowe Indigo Dark (#011E41) background
- [x] **HERO-02**: Aurora background (React Bits) with indigo spectrum colors ['#011E41','#002E62','#003F9F'] at 0.3 opacity
- [x] **HERO-03**: Name "Achyuth Rachur" animated via React Bits SplitText — character stagger, color #f6f7fa
- [x] **HERO-04**: Subtitle "Staff Consultant | Integrated Risk Management" animated via React Bits BlurText — word-by-word, muted white rgba(246,247,250,0.7)
- [x] **HERO-05**: Amber underline under name — Framer Motion div, width 0 → 100%, h-1 bg-[#F5A800] rounded-full, delay 0.8s
- [x] **HERO-06**: Scroll indicator at bottom — Iconsax ArrowDown with Anime.js infinite translateY bounce

### About Section

- [x] **ABOUT-01**: Section background #f8f9fc (page background)
- [x] **ABOUT-02**: Professional summary rendered as paragraph prose (first person, conversational)
- [x] **ABOUT-03**: Fade-in on scroll via Framer Motion whileInView: opacity 0→1, y 30→0, once:true

### Experience Section

- [x] **EXP-01**: Section background #f6f7fa
- [x] **EXP-02**: Company heading "Crowe LLP" in Indigo Dark (#011E41); role and dates in muted (#8b90a0)
- [x] **EXP-03**: Each experience bullet rendered in a React Bits SpotlightCard with spotlightColor "rgba(245,168,0,0.08)"
- [x] **EXP-04**: Cards are borderless with crowe-card shadow (DESIGN.md Section 1.5), 12px radius
- [x] **EXP-05**: Key terms highlighted via ShinyText (amber shine) or span with bg-[#fff8eb] + font-semibold
- [x] **EXP-06**: Stagger entrance via Anime.js onScroll trigger, stagger(100) on the card group

### Skills Section

- [x] **SKILL-01**: Section background #f0f2f8 (indigo wash)
- [x] **SKILL-02**: Four skill groups in 2-column CSS grid (desktop), 1-column (mobile): "AI, Analytics & Engineering" / "Risk, Compliance & Governance" / "Model Risk Management" / "Domain Use Cases"
- [x] **SKILL-03**: Each skill rendered as shadcn Badge pill — bg-white text-[#2d3142] border-none shadow-crowe-sm; hover: shadow-amber-glow + scale(1.03)
- [x] **SKILL-04**: Group headings in text-[#011E41] font-semibold with amber underline accent
- [x] **SKILL-05**: React Bits AnimatedList (or Anime.js stagger(50)) wraps each group's badge list for stagger entrance

### Education Section

- [x] **EDU-01**: Section background #fafbfd
- [x] **EDU-02**: Each education entry rendered in React Bits TiltedCard — borderless, crowe-card shadow, 12px radius
- [x] **EDU-03**: Fade-in on scroll via Framer Motion whileInView
- [x] **EDU-04**: Education placeholder compiles cleanly (user will provide actual content)

### Contact Section

- [x] **CONT-01**: Section background Crowe Indigo Dark (#011E41)
- [x] **CONT-02**: "Let's connect" heading via React Bits GradientText — amber-to-indigo spectrum
- [x] **CONT-03**: Contact icons in flex row, centered, gap-8: Iconsax Sms (email), Link21 (LinkedIn), Code (GitHub), Call (phone) — variant Linear, color #f6f7fa, size 28
- [x] **CONT-04**: Each icon is an anchor (<a>) tag pointing to actual contact URL/handle
- [x] **CONT-05**: Hover state: Framer Motion scale(1.05) + color shift to #F5A800 (amber), icon variant switches to Bold

### Footer

- [x] **FOOT-01**: Indigo Dark background, py-6
- [x] **FOOT-02**: "© 2025 Achyuth Rachur" centered, color #8b90a0 (muted), small text

### Design Compliance

- [ ] **DSGN-01**: No pure white (#FFFFFF) page backgrounds — use #f8f9fc or warmer alternatives
- [ ] **DSGN-02**: No pure black (#000000) text — use #2d3142
- [ ] **DSGN-03**: No borders on cards — use layered indigo-tinted shadows only
- [ ] **DSGN-04**: No rgba(0,0,0,*) shadows — use rgba(1,30,65,*) throughout
- [ ] **DSGN-05**: prefers-reduced-motion respected — all animations disabled/instant when user prefers reduced motion
- [ ] **DSGN-06**: All section transitions use background color shifts (no <hr> or horizontal rules)

### Quality & Deployment

- [ ] **QUAL-01**: Responsive layout verified: mobile, tablet, desktop
- [ ] **QUAL-02**: Lighthouse score > 90 (Performance, Accessibility)
- [ ] **QUAL-03**: No console errors in production build
- [ ] **QUAL-04**: Static build (npm run build) outputs to /out directory without errors
- [ ] **QUAL-05**: GitHub repo created: achyuthrachur/[project-name], pushed
- [ ] **QUAL-06**: Cloudflare Pages deployment configured (build cmd: npm run build, output dir: out)

## v2 Requirements

### Enhancements (post-launch)

- **V2-01**: Add actual education content once user provides university/degree/year
- **V2-02**: Custom domain configured in Cloudflare Pages settings
- **V2-03**: Contact form with email delivery (requires backend/worker, not in static export)
- **V2-04**: Blog/writing section
- **V2-05**: Dark mode toggle

## Out of Scope

| Feature | Reason |
|---------|--------|
| Server-side rendering | Cloudflare Pages static export only |
| API routes / server actions | Static export constraint |
| Contact form with backend | No SSR; links-only contact approach sufficient |
| Multiple pages / routing | Single-page scroll design |
| Dark mode | Crowe brand is light-mode-first; adds scope without clear value now |
| CMS integration | No dynamic content for a resume site |
| Multi-language support | Not requested |

## Traceability

Which phases cover which requirements. Updated during roadmap creation.

| Requirement | Phase | Status |
|-------------|-------|--------|
| SCAF-01 | Phase 1 — Foundation | Complete |
| SCAF-02 | Phase 1 — Foundation | Complete |
| SCAF-03 | Phase 1 — Foundation | Complete |
| SCAF-04 | Phase 1 — Foundation | Complete |
| SCAF-05 | Phase 1 — Foundation | Complete |
| SCAF-06 | Phase 1 — Foundation | Complete |
| NAV-01 | Phase 2 — Hero + Navigation | Complete |
| NAV-02 | Phase 2 — Hero + Navigation | Complete |
| NAV-03 | Phase 2 — Hero + Navigation | Complete |
| NAV-04 | Phase 2 — Hero + Navigation | Complete |
| NAV-05 | Phase 2 — Hero + Navigation | Complete |
| HERO-01 | Phase 2 — Hero + Navigation | Complete |
| HERO-02 | Phase 2 — Hero + Navigation | Complete |
| HERO-03 | Phase 2 — Hero + Navigation | Complete |
| HERO-04 | Phase 2 — Hero + Navigation | Complete |
| HERO-05 | Phase 2 — Hero + Navigation | Complete |
| HERO-06 | Phase 2 — Hero + Navigation | Complete |
| ABOUT-01 | Phase 3 — Content Sections | Complete |
| ABOUT-02 | Phase 3 — Content Sections | Complete |
| ABOUT-03 | Phase 3 — Content Sections | Complete |
| EXP-01 | Phase 3 — Content Sections | Complete |
| EXP-02 | Phase 3 — Content Sections | Complete |
| EXP-03 | Phase 3 — Content Sections | Complete |
| EXP-04 | Phase 3 — Content Sections | Complete |
| EXP-05 | Phase 3 — Content Sections | Complete |
| EXP-06 | Phase 3 — Content Sections | Complete |
| SKILL-01 | Phase 3 — Content Sections | Complete |
| SKILL-02 | Phase 3 — Content Sections | Complete |
| SKILL-03 | Phase 3 — Content Sections | Complete |
| SKILL-04 | Phase 3 — Content Sections | Complete |
| SKILL-05 | Phase 3 — Content Sections | Complete |
| EDU-01 | Phase 4 — Closing Sections | Complete |
| EDU-02 | Phase 4 — Closing Sections | Complete |
| EDU-03 | Phase 4 — Closing Sections | Complete |
| EDU-04 | Phase 4 — Closing Sections | Complete |
| CONT-01 | Phase 4 — Closing Sections | Complete |
| CONT-02 | Phase 4 — Closing Sections | Complete |
| CONT-03 | Phase 4 — Closing Sections | Complete |
| CONT-04 | Phase 4 — Closing Sections | Complete |
| CONT-05 | Phase 4 — Closing Sections | Complete |
| FOOT-01 | Phase 4 — Closing Sections | Complete |
| FOOT-02 | Phase 4 — Closing Sections | Complete |
| DSGN-01 | Phase 5 — Polish + Deploy | Pending |
| DSGN-02 | Phase 5 — Polish + Deploy | Pending |
| DSGN-03 | Phase 5 — Polish + Deploy | Pending |
| DSGN-04 | Phase 5 — Polish + Deploy | Pending |
| DSGN-05 | Phase 5 — Polish + Deploy | Pending |
| DSGN-06 | Phase 5 — Polish + Deploy | Pending |
| QUAL-01 | Phase 5 — Polish + Deploy | Pending |
| QUAL-02 | Phase 5 — Polish + Deploy | Pending |
| QUAL-03 | Phase 5 — Polish + Deploy | Pending |
| QUAL-04 | Phase 5 — Polish + Deploy | Pending |
| QUAL-05 | Phase 5 — Polish + Deploy | Pending |
| QUAL-06 | Phase 5 — Polish + Deploy | Pending |

**Coverage:**
- v1 requirements: 53 total
- Mapped to phases: 53
- Unmapped: 0

---
*Requirements defined: 2026-03-03*
*Last updated: 2026-03-03 after roadmap creation*
