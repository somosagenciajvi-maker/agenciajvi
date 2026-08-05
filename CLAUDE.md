# CLAUDE.md

Guidance for Claude Code (and other AI assistants) working in this repository.

## What this is

A single-page marketing landing page for **Agência JVI**, a Brazilian digital
marketing agency (Recife/PE). It is a static site: no backend, no router, no
CMS, no forms — every call to action links out to WhatsApp, phone, e-mail or
Instagram.

Stack: **Vite 5 + React 18 + TypeScript (strict)**, animated with
**Framer Motion**, **GSAP/ScrollTrigger** and **Lenis** smooth scroll. Styling
is a single hand-written global stylesheet — there is no Tailwind, no CSS
modules, no styled-components.

## Commands

```bash
npm install       # or npm ci — no node_modules is committed
npm run dev       # Vite dev server (default http://localhost:5173)
npm run build     # tsc -b (typecheck) && vite build -> dist/
npm run preview   # serve the production build locally
```

There is no test suite, no linter and no CI workflow. **`npm run build` is the
only gate** — it runs `tsc -b` first, so a type error fails the build. Run it
before committing any change to `src/`.

Typecheck alone: `npx tsc -b --noEmit` (note `tsconfig.json` already sets
`noEmit`, `strict`, `noUnusedLocals` and `noUnusedParameters` — unused imports
and parameters are hard errors).

## Layout

```
index.html                    entry HTML: all SEO/OG meta, JSON-LD, font preloads
vite.config.ts                react plugin, target es2019, assetsInlineLimit: 0
tsconfig.json                 strict, jsx: react-jsx, includes only src/
src/
  main.tsx                    React root + imports global.css
  App.tsx                     the entire page: every section component lives here
  components/
    motion.tsx                reusable animation primitives + shared EASE curve
    icons.tsx                 inline SVG icons (no icon library)
    useSmoothScroll.ts        Lenis + GSAP ticker + ScrollTrigger wiring
  styles/
    global.css                design tokens and every class used by App.tsx
public/
  favicon.svg
  art/*.png                   hero, olhos, equipe (large, ~2 MB each)
  fonts/*.woff2 + fonts.css   self-hosted Anton / Oswald / Inter subsets
```

`public/art/servicos.png` is currently unused — nothing references it. Leave it
alone unless a task calls for it.

## How the page is structured

`App.tsx` is intentionally one file holding all eight sections in render order:

`Nav` → `Hero` → `Problema` → `Oportunidade` → `Servicos` → `Diferenciais` →
`Resultados` → `Equipe` → `Contato` → `Footer`, plus a fixed scroll-progress
bar, a floating WhatsApp button, and `.vignette` / `.grain` overlay divs.

Conventions to preserve when editing it:

- Each section is a local function component preceded by a numbered banner
  comment (a `/* ===…` rule around `04 — SERVIÇOS`). Keep the numbering in sync
  with the render order.
- Section `id`s (`#hero`, `#problema`, `#oportunidade`, `#servicos`,
  `#resultados`, `#contato`, `#equipe`, `#diferenciais`) are the anchor targets
  for `Nav` and for smooth scrolling. Renaming an id means updating `Nav`.
- Repeated content lives in module-level consts at the top of the file
  (`SERVICES`, `DIFERENCIAIS`, `WHATSAPP`). Add new list content there, not
  inline in JSX.
- `WHATSAPP` is a single pre-encoded `wa.me` deep link reused by every CTA.
  Change the phone number or prefilled message in that one const.
- Section components stay in `App.tsx`; only genuinely reusable primitives get
  promoted to `src/components/`.

## Animation conventions

`src/components/motion.tsx` is the shared vocabulary — reach for it before
writing new inline `motion.*` variants:

- `EASE = [0.22, 1, 0.36, 1]` — the project's single easing curve. Every
  transition uses it (except deliberate `easeInOut` loops like the hero orb).
- `<Reveal>` — blur + fade + rise on scroll into view.
- `<ScaleReveal>` — blur + scale-down settle.
- `<WordReveal>` — word-by-word masked rise for display headlines. Pass `text`
  with `\n` for line breaks; it renders per-line `.reveal-line` masks and sets
  `aria-label` on the wrapper with `aria-hidden` on the visual spans.
- `<Counter>` — requestAnimationFrame count-up with cubic ease-out, fires once
  via `useInView`.

Other rules:

- Scroll-linked parallax uses Framer Motion's `useScroll` + `useTransform`
  against a section `ref` (see `Hero`, `Oportunidade`, `Equipe`). GSAP is only
  used for its ticker driving Lenis — do not author tweens in GSAP.
- Scroll reveals use `whileInView` with `viewport={{ once: true }}`. Keep them
  one-shot; re-triggering animations on scroll-up is not the look here.
- Animated text must stay screen-reader accessible: real text in an
  `aria-label`, decorative spans `aria-hidden="true"`.
- Accessibility/perf guard: `useSmoothScroll` bails out entirely under
  `prefers-reduced-motion: reduce`, and `global.css` neutralizes animation and
  transition durations in the same media query. Any new motion should degrade
  through one of those two paths.

## Styling conventions

- Everything lives in `src/styles/global.css`, organized by
  `/* ---------- section ---------- */` comment blocks that mirror the sections
  in `App.tsx`. Add new rules to the matching block.
- Design tokens are CSS custom properties on `:root`: `--black`, `--black-2`,
  `--blue` (`#0a5cff`), `--blue-deep`, `--muted`, `--line`, `--glass`, `--glow`,
  the font stacks (`--display` Anton, `--cond` Oswald, `--sans` Inter) and
  `--maxw` (1320px). Use the tokens; do not hardcode brand colors.
- Type scale classes: `.display` + `.h-xxl` / `.h-xl` / `.h-lg` for headlines,
  `.lead` for body copy, `.eyebrow` for the uppercase kicker labels.
- Layout helpers: `.wrap` (max width + responsive gutter), `.section-pad`
  (vertical rhythm), `.glass`, `.btn` / `.btn-ghost`.
- Sizing is fluid — `clamp()` everywhere rather than breakpoint jumps. The few
  `@media (min-width: …)` blocks are mobile-first additions (760/900/980/1040px).
- Dark theme only. There is no light mode and no theme toggle.
- One-off positioning (a `marginBottom`, a `background` on a section) is done
  with inline `style` props in `App.tsx`; anything reusable belongs in the
  stylesheet.

## Assets, fonts and SEO

- Fonts are **self-hosted** in `public/fonts/` with `fonts.css` declaring 24
  `@font-face` rules (latin + latin-ext subsets, `font-display: swap`). No
  Google Fonts request at runtime — keep it that way. `index.html` preloads
  Anton 400 and Oswald 400.
- Files under `public/` are copied verbatim and referenced by absolute path
  (`/art/hero.png`, `/fonts/fonts.css`). They are not hashed or processed by
  Vite; `assetsInlineLimit: 0` also keeps imported assets as separate files.
- The hero image is preloaded in `index.html` and carries
  `fetchPriority="high"`; the other art uses `loading="lazy"`. Preserve that
  split — the art files are multi-megabyte PNGs and are the page's main weight.
- All SEO lives in `index.html`: title, description, canonical, Open Graph,
  Twitter card and a `ProfessionalService` JSON-LD block containing the real
  phone, e-mail and Instagram. If contact details change in `App.tsx`, update
  the JSON-LD too — they are duplicated by design.
- Images need meaningful Portuguese `alt` text; icons are `aria-hidden`.

## Language and copy

- All user-facing copy is **Brazilian Portuguese** (`<html lang="pt-BR">`),
  including accents. Never translate site copy to English.
- Commit messages so far are Portuguese Conventional Commits
  (`feat: landing page premium da Agência JVI`). Follow that style.
- Code identifiers are a mix: section components use Portuguese names
  (`Problema`, `Oportunidade`, `Diferenciais`), while primitives and hooks use
  English (`Reveal`, `Counter`, `useSmoothScroll`). Match the file you are in.
- Accented characters inside masked reveals need vertical breathing room —
  `.reveal-line` has deliberate padding/negative-margin so `Ê`, `Ó` and `Ç` are
  not clipped. Don't "clean up" that rule.

## Git workflow

- `origin` is `somosagenciajvi-maker/agenciajvi`. Work happens on
  `claude/*` feature branches; push with `git push -u origin <branch>`.
- `node_modules/`, `dist/`, `.DS_Store`, `*.local` and `tsconfig.tsbuildinfo`
  are gitignored. Never commit build output.
- Only open a pull request when the user explicitly asks for one.

## Gotchas

- The production bundle is ~417 kB (~142 kB gzip), dominated by Framer Motion +
  GSAP. Adding another animation library is not warranted.
- `useSmoothScroll` also installs a global click handler that intercepts
  `a[href^="#"]` and hands the scroll to Lenis with a `-70px` offset for the
  fixed nav. Plain `scrollIntoView` will fight it.
- `Nav` toggles a `.scrolled` class from a passive `scroll` listener at 40px —
  it reads `window.scrollY` directly rather than going through Lenis.
- Adding a new nav link means adding both the `<a href="#id">` in `Nav` and a
  section carrying that `id`; nothing validates the pairing.
