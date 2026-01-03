# Agentic Development Guidelines

This document provides instructions and guidelines for AI agents and developers working on this repository.
It covers build commands, code style, conventions, and architectural patterns to ensure consistency.

## Project Overview

- **Framework**: Next.js 16 (App Router)
- **Language**: TypeScript
- **Styling**: Tailwind CSS v4
- **UI Components**: Shadcn UI (Radix UI primitives)
- **Icons**: Lucide React
- **Package Manager**: pnpm

## Tooling & Commands

Use `pnpm` for all package management tasks.

### Build & Development
- **Install Dependencies**:
  ```bash
  pnpm install
  ```
- **Start Development Server**:
  ```bash
  pnpm dev
  ```
  Runs on `http://localhost:3000`.
- **Production Build**:
  ```bash
  pnpm build
  ```
  Generates the optimized production build in `.next/`.
- **Start Production Server**:
  ```bash
  pnpm start
  ```

### Linting & Formatting
- **Lint Code**:
  ```bash
  pnpm lint
  ```
  Uses ESLint with Next.js configuration. Ensure all linting errors are resolved before committing.

### Testing
*Note: No test script is currently configured in `package.json`.*

If tests are added in the future (recommended framework: Vitest or Jest with React Testing Library):
- **Run All Tests**:
  ```bash
  pnpm test
  ```
- **Run Single Test**:
  ```bash
  pnpm test <path/to/file>
  ```

## Code Style & Conventions

### File & Directory Naming
- **Files**: Use `kebab-case` for all files (e.g., `mozaic-hero.tsx`, `utils.ts`).
- **Directories**: Use `kebab-case` (e.g., `components/ui`, `lib/hooks`).
- **Extensions**:
  - `.tsx` for React components.
  - `.ts` for utility functions, hooks, and types.

### Component Structure
- Use **functional components** with the `function` keyword.
- Export components as `default` for pages and page-specific components.
- Named exports are acceptable for UI primitives (e.g., `export { Button }`).

```tsx
// Good
export default function MyComponent() {
  return <div>...</div>
}

// Avoid
const MyComponent = () => {
  return <div>...</div>
}
```

### Imports
- Use **absolute imports** with the `@/` alias for internal modules.
- Group imports:
  1. External libraries (Next.js, React, third-party)
  2. Internal components (`@/components/...`)
  3. Internal utilities/hooks (`@/lib/...`, `@/hooks/...`)
  4. Styles / Assets

```tsx
import { useState } from "react"
import Link from "next/link"

import { Button } from "@/components/ui/button"
import { cn } from "@/lib/utils"
```

### TypeScript Usage
- **Strict Mode**: Enabled. Avoid `any`.
- **Interfaces/Types**: Prefer `interface` for object definitions and `type` for unions/intersections.
- **Props**: Use `interface` or `type` to define component props.

```tsx
interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: "default" | "outline"
}
```

### Styling (Tailwind CSS)
- Use utility classes directly in the `className` prop.
- For conditional classes, use the `cn` utility (wraps `clsx` and `tailwind-merge`).
- Avoid inline `style={{ ... }}` unless dynamic values are strictly necessary.
- Follow Shadcn UI patterns for component variants using `class-variance-authority` (cva).

```tsx
import { cn } from "@/lib/utils"

export function Card({ className, ...props }: React.ComponentProps<"div">) {
  return (
    <div
      className={cn("rounded-lg border bg-card text-card-foreground shadow-sm", className)}
      {...props}
    />
  )
}
```

### Syntax Preferences
- **Quotes**: Double quotes `"` are preferred for JSX attributes and imports (consistency with Prettier defaults).
- **Semicolons**: Avoid semicolons (ASI) unless necessary to avoid ambiguity.
- **Indentation**: 2 spaces.

### Error Handling
- Use `try/catch` blocks for async operations, especially in server components or API routes.
- Utilize Shadcn UI's `toast` or `sonner` for user feedback on errors.

## Architecture

### Directory Structure
- `app/`: Next.js App Router pages and layouts.
- `components/ui/`: Reusable UI primitives (buttons, inputs, etc.) - mostly from Shadcn.
- `components/`: Project-specific feature components.
- `lib/`: Utility functions (e.g., `utils.ts`).
- `hooks/`: Custom React hooks.
- `public/`: Static assets (images, fonts).

### Component Design
- **Atomic Design**: Keep UI primitives in `components/ui` separate from business logic components.
- **Composition**: Use `children` prop to compose complex UIs rather than excessive prop drilling.
- **Client vs Server**: Default to Server Components. Add `"use client"` directive at the top of the file *only* when interactivity (hooks, event listeners) is required.

## Git & Version Control

- **Commit Messages**: Use semantic commit messages (e.g., `feat: add hero section`, `fix: resolve layout bug`, `style: format code`).
- **Branching**: Create feature branches for new tasks.

---

*This file was generated to assist coding agents. Adherence to these guidelines ensures codebase longevity and maintainability.*
