# Phase 1: Foundation - Research

**Researched:** 2026-03-03
**Domain:** Next.js 16 scaffold, Tailwind v4 configuration, shadcn/ui init, React Bits install, animation library setup
**Confidence:** MEDIUM-HIGH (most critical areas verified; React Bits CLI reliability is LOW due to documented bugs)

---

<user_constraints>
## User Constraints (from CONTEXT.md)

### Locked Decisions
- Run `npx create-next-app@latest . --typescript --tailwind --eslint --app --src-dir --import-alias "@/*"` in the **current directory** (Resume/)
- Do NOT create a subdirectory
- **No Helvetica Now font files available** — use web-safe fallback stack: `Arial, 'Helvetica Neue', Helvetica, system-ui, sans-serif`
- Do NOT add a `src/fonts/` directory or local font loading
- `next.config.ts`: `output: "export"` + `images: { unoptimized: true }` for Cloudflare Pages static export
- No API routes, no server actions, no middleware — keep next.config.ts minimal
- **React Bits install strategy:** CLI first (`npx shadcn@latest add @react-bits/[Component]-TS-TW`), fall back to manual copy from `https://reactbits.dev` (TS + Tailwind variant) into `src/components/reactbits/[ComponentName].tsx`
- All 9 React Bits components in `src/components/reactbits/`: SplitText, BlurText, ShinyText, CountUp, GradientText, SpotlightCard, TiltedCard, AnimatedList, Aurora
- Each component: named export matching the component name
- Initialize shadcn (`npx shadcn@latest init`) and apply Crowe HSL overrides immediately
- Install **only Badge** during Phase 1 via shadcn
- Tailwind config: extend with the **full Crowe theme** from DESIGN.md Section 1.2 — do NOT truncate or abbreviate
- `globals.css`: (1) shadcn HSL overrides in `@layer base`, (2) Crowe CSS custom properties, (3) `prefers-reduced-motion` media query, (4) `html { scroll-behavior: smooth; }`
- **Package install order:** scaffold → shadcn init → animejs + framer-motion + iconsax-react → React Bits → shadcn badge

### Claude's Discretion
- Exact ESLint and Prettier config (follow project defaults)
- Whether to install `@types/animejs` (check if needed with v4)
- Blank `app/page.tsx` content for Phase 1 (minimal branded placeholder is fine)
- `.gitignore` entries beyond Next.js defaults

### Deferred Ideas (OUT OF SCOPE)
- None — discussion stayed within Phase 1 scope
- Helvetica Now font files: if the user later acquires a license, add `.woff2` files to `src/fonts/` and wire up in `layout.tsx` using `next/font/local`
</user_constraints>

---

<phase_requirements>
## Phase Requirements

| ID | Description | Research Support |
|----|-------------|-----------------|
| SCAF-01 | Project scaffolded with Next.js 14+ App Router, TypeScript, Tailwind CSS, src/ directory | Next.js 16 is current; `create-next-app` flags confirmed |
| SCAF-02 | Static export configured (output: "export", images: { unoptimized: true }) for Cloudflare Pages | Confirmed pattern — standard for static export, no changes in v16 |
| SCAF-03 | shadcn/ui initialized with Crowe theme overrides (DESIGN.md Section 3 HSL tokens in globals.css) | shadcn init confirmed compatible with Next.js 16 + React 19; Tailwind v4 `@theme` approach clarified |
| SCAF-04 | Tailwind config extended with full Crowe color tokens, tint scale, shadow system, font families, backgroundColor aliases | **CRITICAL FINDING:** Tailwind v4 (default with Next.js 16) uses CSS `@theme` in globals.css, NOT tailwind.config.ts — see Architecture section |
| SCAF-05 | animejs, framer-motion, iconsax-react installed | Confirmed; framer-motion rebranded to `motion` package — see pitfall |
| SCAF-06 | React Bits components installed (TS-TW): SplitText, BlurText, ShinyText, CountUp, GradientText, SpotlightCard, TiltedCard, AnimatedList, Aurora | CLI has known jsrepo bugs; manual copy fallback is the reliable path |
</phase_requirements>

---

## Summary

This phase scaffolds the entire technical foundation for the portfolio. The core work is: (1) run `create-next-app`, (2) configure static export, (3) wire Crowe brand tokens into the Tailwind/shadcn system, (4) install all animation/icon libraries, (5) install React Bits components.

**Critical finding:** `create-next-app@latest` in 2026 installs **Next.js 16 with Tailwind CSS v4**. Tailwind v4 is a CSS-first configuration system — it does NOT use `tailwind.config.ts` for custom tokens. Instead, custom colors, shadows, and font families are declared in `globals.css` using the `@theme` directive. This is a paradigm shift from what DESIGN.md and CLAUDE.md document (which show v3 `tailwind.config.ts` syntax). The planner must account for this: all Crowe brand tokens from DESIGN.md Section 1.2 must be translated from `tailwind.config.ts` format into `@theme {}` blocks inside `globals.css`.

**Second critical finding:** `framer-motion` has been rebranded to the `motion` package (`npm install motion`). The import path changes from `framer-motion` to `motion/react`. DESIGN.md and CLAUDE.md still reference `framer-motion` — the planner should install `motion` but both package names work (backward compat confirmed). Install `motion` for React 19 compatibility.

**Third finding:** The React Bits jsrepo CLI has documented bugs (issue #39 on GitHub). The CLI-first strategy is still worth attempting, but the planner should treat manual copy as the primary path if any component fails within 60 seconds.

**Primary recommendation:** Scaffold with `create-next-app@latest`, translate all Crowe tokens to Tailwind v4 `@theme` CSS format in globals.css, install `motion` (not `framer-motion`), and copy React Bits components manually if CLI fails.

---

## Standard Stack

### Core
| Library | Version | Purpose | Why Standard |
|---------|---------|---------|--------------|
| Next.js | 16.x (latest via `create-next-app@latest`) | React framework with App Router, static export | Current stable; Turbopack default; required for Cloudflare Pages static export |
| TypeScript | 5.1.0+ (bundled) | Type safety | Enforced by CLAUDE.md; Next.js 16 requires TS 5.1+ |
| Tailwind CSS | v4.x (bundled with Next.js 16) | Utility CSS with brand tokens | Automatic with `--tailwind` flag; v4 is CSS-first |
| shadcn/ui | latest | Copy-paste component system | CLAUDE.md mandated; Crowe theming layer |
| animejs | v4.x | DOM/SVG animation engine | DESIGN.md mandated; scroll triggers, stagger, counters |
| motion | v12.x (was framer-motion) | React layout/gesture animations | DESIGN.md mandated; whileInView, layoutId, AnimatePresence |
| iconsax-react | 0.0.8 | 1000-icon library with 6 styles | DESIGN.md mandated; replaces Lucide |

### Supporting
| Library | Version | Purpose | When to Use |
|---------|---------|---------|-------------|
| React Bits (manual copy) | latest source | Animated components: SplitText, BlurText, etc. | All 9 components needed in this phase |
| @types/animejs | 3.1.x | TypeScript defs for animejs | NOT needed — animejs v4 ships its own TypeScript definitions built-in |

### Alternatives Considered
| Instead of | Could Use | Tradeoff |
|------------|-----------|----------|
| `motion` | `framer-motion` | Both work; `motion` is the current package name with React 19 support; `framer-motion` still published but older naming |
| Tailwind v4 `@theme` | Tailwind v3 `tailwind.config.ts` | v3 is available by pinning tailwind version but would fight against Next.js 16 defaults; stay on v4 |

**Installation:**
```bash
# Step 1 — Scaffold
npx create-next-app@latest . --typescript --tailwind --eslint --app --src-dir --import-alias "@/*"

# Step 2 — shadcn init
npx shadcn@latest init

# Step 3 — Animation + Icons
npm install animejs motion iconsax-react

# Step 4 — React Bits (attempt CLI per component, fallback to manual)
npx shadcn@latest add @react-bits/SplitText-TS-TW
npx shadcn@latest add @react-bits/BlurText-TS-TW
npx shadcn@latest add @react-bits/ShinyText-TS-TW
npx shadcn@latest add @react-bits/CountUp-TS-TW
npx shadcn@latest add @react-bits/GradientText-TS-TW
npx shadcn@latest add @react-bits/SpotlightCard-TS-TW
npx shadcn@latest add @react-bits/TiltedCard-TS-TW
npx shadcn@latest add @react-bits/AnimatedList-TS-TW
npx shadcn@latest add @react-bits/Aurora-TS-TW

# Step 5 — shadcn Badge component
npx shadcn@latest add badge
```

---

## Architecture Patterns

### Recommended Project Structure
```
src/
├── app/
│   ├── layout.tsx           # Root layout: html/body, global CSS class, metadata
│   ├── page.tsx             # Phase 1: minimal branded placeholder
│   └── globals.css          # ALL token definitions: shadcn HSL + Crowe CSS vars + @theme
├── components/
│   ├── ui/                  # shadcn components (badge, etc.)
│   └── reactbits/           # All 9 React Bits components
│       ├── SplitText.tsx
│       ├── BlurText.tsx
│       ├── ShinyText.tsx
│       ├── CountUp.tsx
│       ├── GradientText.tsx
│       ├── SpotlightCard.tsx
│       ├── TiltedCard.tsx
│       ├── AnimatedList.tsx
│       └── Aurora.tsx
├── fonts/                   # EMPTY in Phase 1 (no Helvetica Now files)
next.config.ts               # output: "export", images: { unoptimized: true }
tailwind.config.ts           # MINIMAL or ABSENT in Tailwind v4 — tokens live in globals.css
```

### Pattern 1: Tailwind v4 CSS-First Token Configuration

**What:** In Tailwind v4, all custom design tokens (colors, shadows, font families, etc.) are declared using the `@theme` directive inside your main CSS file, NOT in `tailwind.config.ts`. The `@theme` block generates Tailwind utility classes automatically.

**When to use:** Any time DESIGN.md specifies `tailwind.config.ts` syntax — translate to `@theme` in globals.css.

**Example:**
```css
/* src/app/globals.css — Tailwind v4 @theme block */
@import "tailwindcss";

@theme {
  /* Colors — generates bg-crowe-amber, text-crowe-indigo-dark, etc. */
  --color-crowe-amber: #F5A800;
  --color-crowe-amber-bright: #FFD231;
  --color-crowe-amber-dark: #D7761D;
  --color-crowe-indigo: #002E62;
  --color-crowe-indigo-bright: #003F9F;
  --color-crowe-indigo-dark: #011E41;
  --color-tint-950: #1a1d2b;
  --color-tint-900: #2d3142;
  /* ... all tints ... */

  /* Font families — generates font-display, font-body, font-mono */
  --font-display: 'Helvetica Now Display', 'Helvetica Neue', Arial, system-ui, sans-serif;
  --font-body: 'Helvetica Now Text', 'Helvetica Neue', Arial, system-ui, sans-serif;
  --font-mono: 'JetBrains Mono', 'Fira Code', 'IBM Plex Mono', 'Consolas', monospace;

  /* Shadows — generates shadow-crowe-sm, shadow-crowe-card, etc. */
  --shadow-crowe-sm: 0 1px 3px rgba(1,30,65,0.06), 0 1px 2px rgba(1,30,65,0.04);
  --shadow-crowe-card: 0 1px 3px rgba(1,30,65,0.04), 0 6px 16px rgba(1,30,65,0.04), 0 12px 32px rgba(1,30,65,0.02);
  /* ... all shadows ... */

  /* Background color aliases — generates bg-page, bg-section, etc. */
  --color-page: #f8f9fc;
  --color-section: #f6f7fa;
  --color-section-warm: #f0f2f8;
  --color-section-amber: #fff8eb;
}
```

**Key insight:** In Tailwind v4, `--color-*` variables auto-generate color utilities, `--font-*` generates font utilities, `--shadow-*` generates shadow utilities. The DESIGN.md `tailwind.config.ts` object maps cleanly: `colors.crowe.amber.DEFAULT` → `--color-crowe-amber`.

### Pattern 2: globals.css Layer Structure

**What:** The globals.css file has four distinct sections, in this order.

**Example:**
```css
/* src/app/globals.css */

/* ──────────────────────────────────────────
   1. Tailwind v4 import (replaces @tailwind directives)
   ────────────────────────────────────────── */
@import "tailwindcss";

/* ──────────────────────────────────────────
   2. shadcn/ui HSL overrides (from DESIGN.md Section 3)
   Must be in @layer base for shadcn components to read them
   ────────────────────────────────────────── */
@layer base {
  :root {
    --background: 225 33% 98%;
    --foreground: 228 20% 22%;
    --card: 225 50% 99%;
    --card-foreground: 228 20% 22%;
    --popover: 0 0% 100%;
    --popover-foreground: 228 20% 22%;
    --primary: 215 98% 13%;
    --primary-foreground: 225 33% 97%;
    --secondary: 39 100% 48%;
    --secondary-foreground: 215 98% 13%;
    --muted: 225 20% 96%;
    --muted-foreground: 228 10% 37%;
    --accent: 39 100% 48%;
    --accent-foreground: 215 98% 13%;
    --destructive: 341 79% 56%;
    --destructive-foreground: 225 33% 97%;
    --border: 226 17% 89%;
    --input: 226 17% 89%;
    --ring: 215 100% 19%;
    --radius: 0.75rem;
  }
}

/* ──────────────────────────────────────────
   3. Crowe CSS custom properties (from DESIGN.md Section 1.2)
   Direct :root block — these are raw CSS vars for use in any CSS value
   ────────────────────────────────────────── */
:root {
  --crowe-amber-bright: #FFD231;
  --crowe-amber-core: #F5A800;
  /* ... all Crowe tokens verbatim from DESIGN.md ... */
}

/* ──────────────────────────────────────────
   4. Tailwind v4 @theme block — generates utility classes
   (Translates DESIGN.md tailwind.config.ts into v4 format)
   ────────────────────────────────────────── */
@theme {
  --color-crowe-amber: #F5A800;
  /* ... all color/shadow/font tokens ... */
}

/* ──────────────────────────────────────────
   5. Base overrides
   ────────────────────────────────────────── */
html {
  scroll-behavior: smooth;
}

/* ──────────────────────────────────────────
   6. Accessibility
   ────────────────────────────────────────── */
@media (prefers-reduced-motion: reduce) {
  *, *::before, *::after {
    animation-duration: 0.01ms !important;
    animation-iteration-count: 1 !important;
    transition-duration: 0.01ms !important;
  }
}
```

### Pattern 3: next.config.ts Static Export

**What:** Minimal configuration for Cloudflare Pages static export.

**Example:**
```typescript
// next.config.ts
import type { NextConfig } from 'next';

const nextConfig: NextConfig = {
  output: 'export',
  images: {
    unoptimized: true,
  },
};

export default nextConfig;
```

### Pattern 4: Motion (formerly Framer Motion) Import

**What:** The `framer-motion` package has been rebranded to `motion`. Install `motion`, import from `motion/react`.

**Example:**
```typescript
// Correct for 2026 (motion package)
import { motion, AnimatePresence } from 'motion/react';

// Still works for backward compat but older:
// import { motion } from 'framer-motion';
```

### Pattern 5: React Bits Component Structure (Manual Copy)

**What:** When CLI fails, copy TypeScript + Tailwind (TS-TW) variant source directly from reactbits.dev into `src/components/reactbits/`. Each component gets its own file with a named export.

**Example:**
```typescript
// src/components/reactbits/SplitText.tsx
'use client';

import { useMemo, useRef, useEffect } from 'react';
import { motion, useInView, useAnimation } from 'motion/react';

interface SplitTextProps {
  text: string;
  className?: string;
  delay?: number;
  // ... component-specific props from reactbits.dev
}

export function SplitText({ text, className, delay = 0 }: SplitTextProps) {
  // ... component implementation from reactbits.dev source
}
```

**Note on motion import in React Bits components:** Some React Bits components may still use `import { motion } from 'framer-motion'`. When copying manually, update that import to `from 'motion/react'`.

### Anti-Patterns to Avoid
- **Using `tailwind.config.ts` for Crowe tokens with Tailwind v4:** The file still exists but v4 ignores most `theme.extend` entries — tokens must be in `@theme` in globals.css
- **`import { motion } from 'framer-motion'` with React 19:** Use `motion` package; peer dependency warnings may appear with `framer-motion` on React 19
- **Installing `@types/animejs`:** Animejs v4 ships built-in TypeScript definitions — the `@types/animejs` package only covers v3 API and will conflict
- **`output: 'export'` with ISR or server components:** Static export eliminates all server-side features — keep layout.tsx simple, no `use server` directives needed at this stage
- **Running `npx shadcn@latest init` before scaffold:** Run create-next-app first; shadcn init reads the project's framework to set up correctly

---

## Don't Hand-Roll

| Problem | Don't Build | Use Instead | Why |
|---------|-------------|-------------|-----|
| Animated text split by character | Custom letter-splitting animation | React Bits SplitText | Handles SSR hydration, motion integration, accessibility |
| Spotlight hover effects | Canvas-based mouse tracker | React Bits SpotlightCard | Handles pointer events, cleanup, GPU-accelerated via CSS |
| Aurora/mesh background | WebGL shader code | React Bits Aurora | Pre-built with correct color hooks and performance |
| Amber icon glow | Custom CSS keyframes | `motion` `animate` or `framer-motion` | Spring physics, proper cleanup, reduced-motion handling |
| Staggered list entrance | CSS `animation-delay` per item | Anime.js `stagger()` | Dynamic delay calculation, scroll trigger integration |
| Icon library | SVG imports per icon | iconsax-react | 6000 variants, tree-shakeable, TypeScript typed |

**Key insight:** Every React Bits component handles the hardest parts: SSR/client boundary (`'use client'`), motion library cleanup on unmount, pointer event normalization, and accessibility. Hand-rolling these would add 2-4 hours of debugging per component.

---

## Common Pitfalls

### Pitfall 1: Tailwind v4 Token Format Mismatch

**What goes wrong:** Copying DESIGN.md `tailwind.config.ts` syntax verbatim into a Tailwind v4 project. The `theme.extend.colors` object format in a `.ts` config file is ignored by v4.

**Why it happens:** DESIGN.md was written against Tailwind v3 conventions. Next.js 16 ships with Tailwind v4, which uses CSS-first `@theme` blocks.

**How to avoid:** Translate all entries from DESIGN.md `tailwind.config.ts` to `@theme {}` in globals.css using the `--color-*`, `--font-*`, `--shadow-*` naming convention.

**Warning signs:** Tailwind color classes like `bg-crowe-amber` or `text-crowe-indigo-dark` don't work in the browser; `tailwind.config.ts` still exists but was not the active token source.

### Pitfall 2: `motion` vs `framer-motion` Package Confusion

**What goes wrong:** Installing `framer-motion` and getting React 19 peer dependency warnings, or React Bits copied components using `import from 'framer-motion'` that conflict with the installed `motion` package.

**Why it happens:** The library rebranded in late 2024; CLAUDE.md and DESIGN.md still say `framer-motion`.

**How to avoid:** Install `motion` (not `framer-motion`). When manually copying React Bits components, find-replace `from 'framer-motion'` with `from 'motion/react'` in each file.

**Warning signs:** `npm install framer-motion` shows peer dependency warnings for React 19; TypeScript cannot resolve `motion/react` after installing `framer-motion`.

### Pitfall 3: React Bits CLI Failures

**What goes wrong:** `npx shadcn@latest add @react-bits/[Component]-TS-TW` errors with "Something went wrong", network timeouts, or jsrepo initialization failures.

**Why it happens:** The jsrepo CLI (used by React Bits) has a documented bug in versions around 1.29.0 related to URL construction (GitHub issue #39). It also has Node.js version sensitivity — works on Node 22.13.5 / 22.7.0, fails on others.

**How to avoid:** Try CLI first. If any error appears within 60 seconds, immediately fall back to manual copy:
1. Go to `https://reactbits.dev/[category]/[component-name]`
2. Select TypeScript + Tailwind variant
3. Copy the source
4. Paste into `src/components/reactbits/[ComponentName].tsx`
5. Update any `from 'framer-motion'` to `from 'motion/react'`

**Warning signs:** `"▲ Something went wrong"` or `"Unable to initialize jsrepo"` in terminal output.

### Pitfall 4: shadcn init Peer Dependency Prompts with React 19

**What goes wrong:** `npx shadcn@latest init` prompts for peer dependency resolution when Next.js 16 uses React 19.

**Why it happens:** Some Radix UI primitives bundled with shadcn declare `react@^18` peer dependency; npm v7+ errors on mismatch.

**How to avoid:** When prompted, select the `--legacy-peer-deps` option or run `npm install --legacy-peer-deps` if shadcn install fails. The components work correctly at runtime despite the peer dependency declaration.

**Warning signs:** npm error about `ERESOLVE unable to resolve dependency tree` during `shadcn init` or `shadcn add badge`.

### Pitfall 5: `iconsax-react` React 19 Peer Dependency

**What goes wrong:** `npm install iconsax-react` fails or warns about React 19 peer dependency.

**Why it happens:** `iconsax-react` (v0.0.8) declares `react@^17 || ^18` in peer deps — React 19 is outside that range.

**How to avoid:** Install with `npm install iconsax-react --legacy-peer-deps`. A community fork (`iconsax-react-19`) exists but using the official package with `--legacy-peer-deps` is simpler and works correctly at runtime.

**Warning signs:** npm WARN or ERR about peer dependency when running `npm install iconsax-react`.

### Pitfall 6: Static Export Breaks on Server Features

**What goes wrong:** `npm run build` fails with "Error: Page ... is missing `generateStaticParams()`" or "Dynamic server usage" errors if any component accidentally uses server-only features.

**Why it happens:** `output: 'export'` in next.config.ts disallows any server-side runtime code. This is Phase 1 risk-free (blank page.tsx), but good to know for later phases.

**How to avoid:** Keep layout.tsx and page.tsx as pure client-renderable components. Mark any component using browser APIs with `'use client'` directive. Never use `cookies()`, `headers()`, or `fetch()` with `no-store` in page components.

---

## Code Examples

Verified patterns from project sources and official documentation:

### Next.js 16 Static Export Configuration
```typescript
// next.config.ts
import type { NextConfig } from 'next';

const nextConfig: NextConfig = {
  output: 'export',
  images: {
    unoptimized: true,
  },
};

export default nextConfig;
```

### Tailwind v4 @theme Token Declaration (in globals.css)
```css
/* Translates the full DESIGN.md Section 1.2 tailwind.config.ts into Tailwind v4 format */
@theme {
  /* ── Crowe Colors ── */
  --color-crowe-amber-bright: #FFD231;
  --color-crowe-amber: #F5A800;
  --color-crowe-amber-dark: #D7761D;
  --color-crowe-indigo-bright: #003F9F;
  --color-crowe-indigo: #002E62;
  --color-crowe-indigo-dark: #011E41;
  --color-crowe-teal-bright: #16D9BC;
  --color-crowe-teal: #05AB8C;
  --color-crowe-teal-dark: #0C7876;
  --color-crowe-cyan-light: #8FE1FF;
  --color-crowe-cyan: #54C0E8;
  --color-crowe-cyan-dark: #007DA3;
  --color-crowe-blue-light: #32A8FD;
  --color-crowe-blue: #0075C9;
  --color-crowe-blue-dark: #0050AD;
  --color-crowe-violet-bright: #EA80FF;
  --color-crowe-violet: #B14FC5;
  --color-crowe-violet-dark: #612080;
  --color-crowe-coral-bright: #FF526F;
  --color-crowe-coral: #E5376B;
  --color-crowe-coral-dark: #992A5C;
  /* ── Tint Scale ── */
  --color-tint-950: #1a1d2b;
  --color-tint-900: #2d3142;
  --color-tint-700: #545968;
  --color-tint-500: #8b90a0;
  --color-tint-300: #c8cbd6;
  --color-tint-200: #dfe1e8;
  --color-tint-100: #eef0f4;
  --color-tint-50: #f6f7fa;
  /* ── Background Aliases ── */
  --color-page: #f8f9fc;
  --color-section: #f6f7fa;
  --color-section-warm: #f0f2f8;
  --color-section-amber: #fff8eb;
  /* ── Font Families ── */
  --font-display: 'Helvetica Now Display', 'Helvetica Neue', Arial, system-ui, sans-serif;
  --font-body: 'Helvetica Now Text', 'Helvetica Neue', Arial, system-ui, sans-serif;
  --font-mono: 'JetBrains Mono', 'Fira Code', 'IBM Plex Mono', 'Consolas', monospace;
  /* ── Shadows ── */
  --shadow-crowe-sm: 0 1px 3px rgba(1,30,65,0.06), 0 1px 2px rgba(1,30,65,0.04);
  --shadow-crowe-md: 0 4px 8px -2px rgba(1,30,65,0.06), 0 2px 4px -1px rgba(1,30,65,0.04);
  --shadow-crowe-lg: 0 6px 16px -4px rgba(1,30,65,0.07), 0 4px 6px -2px rgba(1,30,65,0.04);
  --shadow-crowe-xl: 0 12px 32px -8px rgba(1,30,65,0.08), 0 8px 16px -4px rgba(1,30,65,0.03);
  --shadow-crowe-hover: 0 8px 24px -4px rgba(1,30,65,0.10), 0 4px 8px -2px rgba(1,30,65,0.04);
  --shadow-crowe-card: 0 1px 3px rgba(1,30,65,0.04), 0 6px 16px rgba(1,30,65,0.04), 0 12px 32px rgba(1,30,65,0.02);
  --shadow-amber-glow: 0 4px 16px rgba(245,168,0,0.20);
}
```

**Tailwind class mapping:** `bg-crowe-amber` ✓ · `text-crowe-indigo-dark` ✓ · `shadow-crowe-card` ✓ · `font-display` ✓ · `bg-page` ✓

### shadcn/ui Badge Component Usage (verify working after Phase 1)
```typescript
// Quick smoke test after `npx shadcn@latest add badge`
import { Badge } from '@/components/ui/badge';

export default function TestPage() {
  return <Badge variant="outline">Skills Label</Badge>;
}
```

### Motion (formerly Framer Motion) Import Pattern
```typescript
// src/components/reactbits/SplitText.tsx (and any React Bits component)
'use client';
import { motion } from 'motion/react'; // NOT from 'framer-motion'
```

### Animejs v4 Import Pattern
```typescript
// Modular imports — only import what you need
import { animate, stagger, createScope } from 'animejs';
// NOT: import anime from 'animejs'; (v3 API, no longer works in v4)
```

### Minimal Branded page.tsx (Phase 1 Placeholder)
```typescript
// src/app/page.tsx
export default function Home() {
  return (
    <main className="min-h-screen bg-page flex items-center justify-center">
      <p className="font-body text-tint-900">Achyuth Rachur — Portfolio</p>
    </main>
  );
}
```

### layout.tsx (font classes, metadata, global styles)
```typescript
// src/app/layout.tsx
import type { Metadata } from 'next';
import './globals.css';

export const metadata: Metadata = {
  title: 'Achyuth Rachur — Staff Consultant | IRM',
  description: 'Portfolio of Achyuth Rachur, Staff Consultant in Integrated Risk Management at Crowe LLP.',
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body className="font-body antialiased">{children}</body>
    </html>
  );
}
```

---

## State of the Art

| Old Approach | Current Approach | When Changed | Impact |
|--------------|------------------|--------------|--------|
| `tailwind.config.ts` for custom tokens | `@theme {}` in globals.css (CSS-first) | Tailwind v4, Jan 2025 | All DESIGN.md tailwind config examples must be translated to `@theme` syntax |
| `npm install framer-motion` | `npm install motion` + `import from 'motion/react'` | Nov 2024 rebrand | DESIGN.md/CLAUDE.md refs to `framer-motion` must use `motion` package |
| `npx create-next-app@latest` → Next.js 14/15 | Same command → Next.js 16.x | Feb 2026 | Turbopack default bundler; React 19 minimum; Node 20.9+ |
| `@tailwind base; components; utilities` | `@import "tailwindcss"` | Tailwind v4 | Old directives still work but v4 prefers single import |
| `react-bits` jsrepo CLI | Manual copy from reactbits.dev | CLI has bugs (issue #39) | Manual copy is more reliable; treat CLI as optional fast path |

**Deprecated/outdated:**
- `next export` CLI command: Removed in Next.js 14; replaced by `output: 'export'` in config (confirmed still working in v16)
- `@types/animejs`: Covers v3 API only; animejs v4 has built-in TypeScript definitions — do NOT install
- `import anime from 'animejs'` default import: v4 uses named exports only (`import { animate } from 'animejs'`)

---

## Open Questions

1. **Tailwind v4 `@theme` vs `tailwind.config.ts` coexistence**
   - What we know: Tailwind v4 prefers CSS-first; a `tailwind.config.ts` can still exist for plugin configuration but custom token extensions should be in `@theme`
   - What's unclear: Whether `create-next-app@latest` generates an empty `tailwind.config.ts` or omits it entirely in the current template
   - Recommendation: Planner should instruct the implementer to check what `create-next-app` generates and either use the generated file for plugin config only, or delete it if empty, while placing all Crowe tokens in globals.css `@theme`

2. **React Bits component dependencies**
   - What we know: CLI command format is `npx shadcn@latest add @react-bits/[Name]-TS-TW`; components use `motion/react`
   - What's unclear: Exact peer dependency list for each of the 9 components (some may require additional packages beyond `motion`)
   - Recommendation: When manually copying, check each component's import list for any additional packages and install them

3. **shadcn `init` with Tailwind v4**
   - What we know: shadcn supports Tailwind v4 as of 2025; it generates a different `globals.css` structure when Tailwind v4 is detected
   - What's unclear: Whether `npx shadcn@latest init` automatically detects Tailwind v4 and generates `@theme` syntax or still generates v3-style `@layer base`
   - Recommendation: Run `shadcn init` and inspect the generated globals.css; manually ensure Crowe HSL overrides are inside `@layer base` as DESIGN.md specifies

---

## Validation Architecture

### Test Framework
| Property | Value |
|----------|-------|
| Framework | None pre-installed — this is Phase 1 (scaffold only) |
| Config file | None — see Wave 0 |
| Quick run command | `npm run build && echo "BUILD OK"` |
| Full suite command | `npm run dev` (verify no runtime errors at localhost:3000) |

### Phase Requirements → Test Map

| Req ID | Behavior | Test Type | Automated Command | File Exists? |
|--------|----------|-----------|-------------------|-------------|
| SCAF-01 | App Router, TypeScript, Tailwind, src/ directory all present | smoke | `ls src/app/layout.tsx src/app/page.tsx src/app/globals.css` | ❌ Wave 0 |
| SCAF-02 | Static build produces /out directory | build | `npm run build && ls out/index.html` | ❌ Wave 0 |
| SCAF-03 | shadcn HSL vars present in globals.css | smoke | `grep -r "\-\-primary: 215" src/app/globals.css` | ❌ Wave 0 |
| SCAF-04 | Crowe color tokens available as Tailwind classes | manual | `npm run build` (no class warnings); inspect generated CSS for `crowe-amber` | ❌ Wave 0 |
| SCAF-05 | animejs, motion, iconsax-react importable | smoke | `node -e "require('animejs'); require('motion'); require('iconsax-react'); console.log('OK')"` | ❌ Wave 0 |
| SCAF-06 | All 9 React Bits components importable from src/components/reactbits/ | smoke | TypeScript compile check: `npm run typecheck` | ❌ Wave 0 |

### Sampling Rate
- **Per task commit:** `npm run build` — confirms static export produces /out without error
- **Per wave merge:** `npm run build && npm run typecheck && npm run lint`
- **Phase gate:** `npm run build` green + `npm run dev` starts clean before calling phase done

### Wave 0 Gaps
- [ ] No test files exist yet (greenfield project)
- [ ] Framework install: `npm install -D vitest @testing-library/react` — only needed in later phases when components have behavior to test; Phase 1 relies on build + typecheck as verification
- [ ] Smoke verification script: can be a simple bash check at phase end

*(Phase 1 is primarily infrastructure with no React component logic to unit test — build success + TypeScript clean + importability are the correct verification gates)*

---

## Sources

### Primary (HIGH confidence)
- DESIGN.md (project file, v3 tailwind.config.ts format documented — requires translation to v4)
- CLAUDE.md (project file, canonical standards)
- 01-CONTEXT.md (locked decisions — authoritative)
- [Next.js 16 announcement — nextjs.org/blog/next-16](https://nextjs.org/blog/next-16) — Turbopack stable, React 19 minimum, Node 20.9+
- [Next.js Static Exports docs](https://nextjs.org/docs/app/api-reference/config/next-config-js/output) — `output: 'export'` + `images.unoptimized` confirmed

### Secondary (MEDIUM confidence)
- [Tailwind CSS v4.0 announcement — tailwindcss.com](https://tailwindcss.com/blog/tailwindcss-v4) — `@theme` directive, CSS-first config
- [shadcn/ui Tailwind v4 docs — ui.shadcn.com/docs/tailwind-v4](https://ui.shadcn.com/docs/tailwind-v4) — `@theme inline` support confirmed
- [Motion (framer-motion) rebrand — motion.dev](https://motion.dev/docs/react-upgrade-guide) — `motion` package, `motion/react` import path
- [React Bits GitHub — DavidHDev/react-bits](https://github.com/DavidHDev/react-bits) — CLI install format confirmed; jsrepo bug issue #39 documented
- [shadcn/ui React 19 docs](https://ui.shadcn.com/docs/react-19) — `--legacy-peer-deps` workaround for React 19

### Tertiary (LOW confidence — flag for validation)
- iconsax-react React 19 compatibility: `iconsax-react-19` fork exists; standard package likely needs `--legacy-peer-deps`
- Exact Tailwind v4 class name format for nested colors like `crowe.amber.dark` → may need to be `crowe-amber-dark` (hyphenated, not dotted)
- Whether `create-next-app@latest` still generates a `tailwind.config.ts` file in early 2026 (some reports say it was removed, others say it's minimal/empty)

---

## Metadata

**Confidence breakdown:**
- Standard stack: HIGH — all libraries confirmed current and compatible
- Architecture (Tailwind v4 @theme): MEDIUM — pattern confirmed from official docs and shadcn docs but exact create-next-app output unknown until scaffold runs
- React Bits install: LOW-MEDIUM — CLI format confirmed but reliability low; manual copy path is well-understood
- Pitfalls: HIGH — all documented from official sources and GitHub issues

**Research date:** 2026-03-03
**Valid until:** 2026-04-01 (30 days — Next.js/Tailwind ecosystem is stable at this scale)
