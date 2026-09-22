# Rayver Dasalla Portfolio — AI Assistant Rules & Guidelines

These rules are unconditionally active for all operations within the `Rayver-Dasalla-Portfolio` repository.

---

## 1. MANDATORY ARTIFACT-FIRST POLICY

> [!IMPORTANT]
> The AI must **ALWAYS use Artifacts** (`.md` files in the brain directory: `<appDataDir>/brain/<conversation-id>/`) for:
> 1. **Implementation Plans (`implementation_plan.md`)**: Mandatory before executing any feature additions, redesigns, multi-file edits, or structural changes. Always set `RequestFeedback: true` and `UserFacing: true`.
> 2. **Walkthroughs (`walkthrough.md`)**: Mandatory after completing code changes to document what was done, link modified files, and describe test results.
> 3. **Architectural Analysis & Design Documents**: Any extensive reviews, feature blueprints, comparisons, or recommendations must be written to a dedicated artifact.
> 4. **Concise Chat Responses**: Never dump long walls of markdown into the chat. Link to the created artifact and mention only the essential highlights or decisions needed from the user.

---

## 2. PACKAGE MANAGER & TOOLING STANDARDS

- **Exclusively use `pnpm`**. Never execute `npm` or `yarn`.
  - Dev server: `pnpm dev`
  - Production build: `pnpm build`
  - Linting: `pnpm lint`
  - Package installation: `pnpm install` or `pnpm add <pkg>`
- **Build Approvals**: In `pnpm-workspace.yaml`, `esbuild: true` must remain approved under `allowBuilds`.
- **Validation**: Always run `pnpm build` after making modifications to verify clean compilation.

---

## 3. DESIGN SYSTEM & TAILWIND V4 RULES

- **Styling Core**: Tailwind CSS v4 (`@import 'tailwindcss';` in `src/index.css`).
- **Color Variables**: Use semantic classes connected to CSS variables (`text-textPrimary`, `bg-primary`, `bg-white/5`, `border-gray-400/20`).
- **Section Layout**: Always match the established standard:
  - Outer wrapper: `px-4 sm:px-8 md:my-20 md:px-20`
  - Grid wrapper: `mx-auto` (do not constrain with `max-w-7xl` if sibling sections use full width)
  - Grid gap: Standardize on `gap-5` across responsive breakpoints
- **Uniform Card Styling**:
  - Always enforce `flex h-full w-full flex-col` so cards in a grid have equal height.
  - Hover effects: `hover:-translate-y-2 hover:border-gray-500/50 hover:shadow-[0_20px_60px_-15px_rgba(255,255,255,0.2)]`.
  - Maintain generous internal padding (`p-6 sm:p-7 md:p-8`) to prevent cramped layouts.

---

## 4. INTERACTION & ACCESSIBILITY PATTERNS

- Retain existing animations: `IntersectionObserver` scroll cascade (`isVisible*`), mobile icon confetti, custom desktop cursor, and keyboard interactions.
- Ensure all interactive links and buttons have descriptive labels and accessible tap targets.
