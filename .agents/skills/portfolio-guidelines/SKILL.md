---
name: portfolio-guidelines
description: >-
  Essential guidelines, architecture patterns, styling rules, and development standards
  for Rayver Dasalla's Portfolio. Use whenever creating components, modifying sections,
  managing dependencies, or structuring responses with artifacts.
---

# Portfolio Development Guidelines & Standards

This skill documents the core tech stack, styling rules, architecture patterns, and operational protocols for **Rayver Dasalla's Portfolio**.

---

## 1. Mandatory Artifact Protocol

> [!IMPORTANT]
> **Always Use Artifacts**: Whenever planning, reviewing, analyzing, or reporting on changes, the AI must create and maintain artifacts in the brain directory (`<appDataDir>/brain/<conversation-id>/`).

- **Implementation Plans**: Always generate or update `implementation_plan.md` with `RequestFeedback: true` for any multi-step feature, architectural change, or redesign.
- **Walkthroughs**: Always generate or update `walkthrough.md` after completing implementation to summarize changes, verify results, and link modified files.
- **Audits & Analysis**: For code reviews, performance evaluations, or feature proposals, compile them into a dedicated markdown artifact rather than dumping long text in the chat.
- **Do Not Re-summarize**: When presenting artifacts, highlight only key decision points and direct the user to the artifact.

---

## 2. Environment & Package Management

- **Package Manager**: Exclusively use **`pnpm`** (v11+). Never use `npm` or `yarn`.
  - Development: `pnpm dev` (Vite dev server on `http://localhost:5173`)
  - Production Build: `pnpm build` (`vite build`)
  - Linting: `pnpm lint` (`eslint .`)
  - Dependency Installation: `pnpm install` or `pnpm add <pkg>`
- **Build Scripts**: In pnpm v11, postinstall scripts must be approved in `pnpm-workspace.yaml`:
  ```yaml
  allowBuilds:
    esbuild: true
  ```
- **`package.json`**: Always retain `"packageManager": "pnpm@11.21.0"`.

---

## 3. Tech Stack & Architecture

- **Core**: React 19 (`react`, `react-dom`), Vite 7 (`@vitejs/plugin-react`).
- **Styling**: Tailwind CSS v4 (`@tailwindcss/vite`, `@import 'tailwindcss';` in `src/index.css`).
- **Icons**: `lucide-react` for UI icons; `/public/icons/icon_*.png` for technology badges.
- **Folder Structure**:
  - `src/sections/`: Primary landing page sections (`Hero`, `About`, `Skills`, `Projects`, `Contact`).
  - `src/components/layout/`: Navigation and footer (`Navbar`, `Footer`).
  - `src/components/ui/`: Reusable components (`Button`, `Project-Card`, `CustomCursor`, `FloatingShapes`).
  - `public/`: Static assets (`/icons/`, `/images/`, `Dasalla - CV.pdf`).

---

## 4. Design System & Styling Conventions

### Theme Colors (Tailwind v4 / CSS Variables)
Defined in `src/index.css` under `@theme`, `:root`, and `.dark`:
- `--color-primary`: `#16302b` (Deep forest emerald / light mode dark accent)
- `--color-secondary`: `#1a1a40` (Midnight indigo)
- `--color-textPrimary`: Dynamic font color based on theme
- Light and Dark mode variables for buttons, backgrounds, and modals.

### Grid & Layout Uniformity
- **Section Outer Container**: Always use standard responsive padding:
  ```jsx
  <div ref={mainRef} className="relative my-10 px-4 sm:px-8 md:my-20 md:px-20">
  ```
- **Grid Layout**: Always use `mx-auto` without restrictive `max-w-7xl` so that grid cards align seamlessly between sections (Skills, Projects, About).
- **Grid Gutter**: Standardize on `gap-5` across responsive breakpoints:
  ```jsx
  className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3"
  ```

### Card Styling Tokens
All cards (Skills, Projects, About Showcase) must share uniform glassmorphic tokens:
```jsx
className="group flex h-full w-full flex-col overflow-hidden rounded-lg border border-gray-400/20 bg-white/5 shadow-2xl transition-all duration-500 ease-out hover:-translate-y-2 hover:border-gray-500/50 hover:shadow-[0_20px_60px_-15px_rgba(255,255,255,0.2)]"
```
- Equal height: Always include `flex h-full flex-col` on grid cards.
- Content padding: Generous padding (`p-6 sm:p-7 md:p-8`) to prevent cramped layouts.

---

## 5. Animation & Interaction Patterns

- **Scroll Revealing**: Use `IntersectionObserver` with a threshold (e.g., `0.1`), triggering cascading `isVisible*` state timers (200ms, 400ms, 600ms) with `duration-700 ease-out`.
- **Watermark Section Numbers**: Large decorative numbers (`01` About, `02` Projects, `03` Contact) in the background:
  ```jsx
  <div className="pointer-events-none absolute top-0 left-4 text-[12rem] leading-none font-black opacity-[0.03] select-none sm:left-10 sm:text-[16rem] md:text-[20rem]">
    01
  </div>
  ```
- **Micro-Interactions**:
  - Rotating/scaling icons on card hover (`group-hover:scale-110 group-hover:rotate-12`).
  - Desktop custom cursor with smooth tracking (`CustomCursor.jsx`).
  - Mobile confetti particle bursts on interactive icon taps (`createConfetti()`).
  - Konami code Easter egg in `src/main.jsx`.

---

## 6. Pre-Commit / Build Verification

Before finishing any task, run:
```bash
pnpm build
```
Ensure 0 build or bundling errors.
