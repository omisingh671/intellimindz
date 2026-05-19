# AGENTS.md

# Intellimindz Foundation Project Instructions

## Project Overview

Project name: Intellimindz Foundation

Type: FinTech + EdTech website

Goal:
Build a clean, modern, budget-friendly educational website focused on financial literacy, learning programs, course categories, learning levels, donation, enquiry, contact, and future authentication.

First priority:
Build a polished, responsive homepage and clean project foundation.

This project should start simple. Add real backend, database, CMS, payment gateway, real SSO providers, or AI features only when explicitly requested.

---

## Current Status

- Basic Next.js scaffold is created.
- Package manager is pnpm.
- AGENTS.md exists and must be followed.
- ROADMAP.md exists and should be updated as progress is made.
- Reference screenshots should be stored in `public/resources/`.
- The first implementation goal is a nice-looking homepage.
- Other pages should initially be basic shells and improved step by step.

---

## Codex Credit-Saving Rules

Use Codex efficiently and avoid unnecessary credit usage.

For small tasks, do not scan the full codebase unless required.

Before making changes:

- Read only the files directly related to the task.
- Summarize the intended change briefly.
- Make the smallest safe change.
- Avoid broad refactors unless explicitly requested.
- Avoid rewriting working files without a clear reason.
- Avoid installing packages unless explicitly requested.
- Avoid running expensive checks repeatedly.
- Prefer targeted edits over full-project rewrites.

For small tasks, follow this flow:

1. Inspect only relevant files.
2. Make the minimal change.
3. Run the smallest relevant validation.
4. Update `ROADMAP.md` only if the task changes project progress.
5. Stop.

Use full codebase review only when explicitly requested.

Examples:

- For navbar change, inspect only navbar, nav constants, layout if needed.
- For contact form change, inspect contact feature, form schema, shared input components if needed.
- For homepage section change, inspect that section and related data only.
- For route/page change, inspect related `app/` route and feature page component only.

Do not use large-context analysis for simple UI text, spacing, color, or small component changes.

---

## Reference Screens

Reference screenshots are stored in:

```txt
public/resources/
```

Use them as visual inspiration for:

- Layout
- Color direction
- Section flow
- Spacing
- Content hierarchy
- Card design
- Navbar/footer direction

Do not blindly copy screenshots.

Recreate the design cleanly using Next.js, React, and Tailwind CSS.

---

## Tech Stack

Use:

- Next.js App Router
- TypeScript
- Tailwind CSS
- pnpm
- React Server Components by default
- `lucide-react` for icons
- `zod` for schema validation
- `react-hook-form` for forms
- `@hookform/resolvers` for connecting Zod with React Hook Form
- `axios` for API client setup
- `@tanstack/react-query` for future server-state/data fetching
- `zustand` for client state and future persistent login state

Use Client Components only when needed for:

- State
- Event handlers
- Form interaction
- Mobile menu toggle
- Browser APIs
- Zustand usage
- React Query provider/client usage

Avoid unnecessary dependencies.

---

## Package Manager Rules

Use pnpm only.

Do not use:

```bash
npm install
yarn add
```

Use:

```bash
pnpm install
pnpm add package-name
pnpm add -D package-name
pnpm remove package-name
pnpm dlx package-name
```

Commit:

```txt
pnpm-lock.yaml
```

Do not delete `pnpm-lock.yaml`.

---

## Dependency Rules

Install only needed dependencies.

Allowed current dependencies:

```txt
lucide-react
clsx
tailwind-merge
zod
react-hook-form
@hookform/resolvers
axios
@tanstack/react-query
zustand
```

Do not add new packages without a clear reason.

Before adding a dependency, ask:

1. Can this be built with React and Tailwind only?
2. Is this package necessary now?
3. Will it increase complexity or bundle size?
4. Is this needed for the current phase?

Avoid in the first version:

- Database packages
- Prisma
- CMS SDKs
- Payment SDKs
- Real SSO provider SDKs
- Heavy animation libraries
- Large UI frameworks
- AI SDKs
- Unnecessary state libraries beyond Zustand

---

## Budget-Friendly Rules

This project should remain low-cost.

Avoid in the first version:

- Paid APIs
- AI API calls
- Database
- Prisma
- Authentication backend
- CMS
- Payment gateway
- Complex backend
- Heavy animation libraries
- Large UI frameworks
- Unnecessary state management

Prefer:

- Static data files
- Reusable components
- Local constants
- Simple forms
- Lightweight dependencies
- Good responsive design
- Good SEO
- Clean code
- Low-cost deployment

---

## Project Architecture

Use a feature-based project structure with clean separation of concerns.

Prefer grouping code by business/domain feature instead of putting all components, data, schemas, stores, and types in large global folders.

Main idea:

- `features/` contains domain-specific website sections, pages, components, data, schemas, stores, services, and types.
- `shared/` contains reusable UI, layout, constants, helpers, providers, API clients, icon registry, and common types.
- `app/` contains Next.js routing, layouts, metadata, page composition, and global CSS only.
- `public/` contains static assets.
- `docs/` contains project notes and command references.

---

## Preferred File Structure

```txt
app/
  layout.tsx
  page.tsx
  globals.css

  about/
    page.tsx

  courses/
    page.tsx

  categories/
    page.tsx

  contact/
    page.tsx

  donate/
    page.tsx

  login/
    page.tsx

  signup/
    page.tsx

features/
  home/
    components/
      HeroSection.tsx
      FeaturedCoursesSection.tsx
      CategoriesSection.tsx
      LearningLevelsSection.tsx
      DonateSection.tsx
      ContactSection.tsx
    data/
      home.data.ts
    types/
      home.types.ts

  about/
    components/
      AboutPage.tsx
    data/
      about.data.ts
    types/
      about.types.ts

  courses/
    components/
      CoursesPage.tsx
      CourseCard.tsx
      CoursesGrid.tsx
    data/
      courses.data.ts
    types/
      course.types.ts

  categories/
    components/
      CategoriesPage.tsx
      CategoryCard.tsx
      CategoriesGrid.tsx
    data/
      categories.data.ts
    types/
      category.types.ts

  donation/
    components/
      DonatePage.tsx
      DonationCard.tsx
      DonationSection.tsx
      DonationInterestForm.tsx
    data/
      donation.data.ts
    schemas/
      donation.schema.ts
    types/
      donation.types.ts

  contact/
    components/
      ContactPage.tsx
      ContactForm.tsx
      ContactInfo.tsx
      ContactSection.tsx
    schemas/
      contact.schema.ts
    types/
      contact.types.ts

  auth/
    components/
      LoginPage.tsx
      SignupPage.tsx
      LoginForm.tsx
      SignupForm.tsx
      SocialLoginButtons.tsx
      EnterpriseLoginButton.tsx
    schemas/
      login.schema.ts
      signup.schema.ts
    services/
      auth.api.ts
    stores/
      auth.store.ts
    types/
      auth.types.ts

shared/
  components/
    layout/
      Navbar.tsx
      Footer.tsx

    ui/
      Button.tsx
      Container.tsx
      SectionHeader.tsx
      Input.tsx
      Textarea.tsx
      FormError.tsx

  constants/
    site.ts
    nav.ts

  icons/
    icon-registry.ts

  lib/
    utils.ts

  providers/
    AppProviders.tsx
    ReactQueryProvider.tsx

  api/
    api-client.ts
    query-client.ts

  types/
    common.types.ts

public/
  images/
  resources/

docs/
  COMMANDS.md

AGENTS.md
ROADMAP.md
```

---

## Separation of Concern Rules

`app/` should only handle routing, layouts, metadata, page composition, and global CSS.

Do not put large UI sections directly inside `app/page.tsx`.

`app/page.tsx` should mostly compose feature components like:

```tsx
import { HeroSection } from "@/features/home/components/HeroSection";
import { FeaturedCoursesSection } from "@/features/home/components/FeaturedCoursesSection";
import { CategoriesSection } from "@/features/home/components/CategoriesSection";
import { LearningLevelsSection } from "@/features/home/components/LearningLevelsSection";
import { DonateSection } from "@/features/home/components/DonateSection";
import { ContactSection } from "@/features/home/components/ContactSection";

export default function HomePage() {
  return (
    <main>
      <HeroSection />
      <FeaturedCoursesSection />
      <CategoriesSection />
      <LearningLevelsSection />
      <DonateSection />
      <ContactSection />
    </main>
  );
}
```

Route files should stay small.

Example:

```tsx
import { CoursesPage } from "@/features/courses/components/CoursesPage";

export default function Page() {
  return <CoursesPage />;
}
```

Feature-specific components should stay inside their feature folder.

Examples:

- Course-related UI goes inside `features/courses/`.
- Category-related UI goes inside `features/categories/`.
- Contact form UI, schema, and types go inside `features/contact/`.
- Donation UI, schema, and types go inside `features/donation/`.
- Login, signup, auth schemas, auth services, and auth store go inside `features/auth/`.

Shared reusable components should go inside `shared/components`.

Examples:

- `Navbar` and `Footer` go in `shared/components/layout/`.
- Generic `Button`, `Container`, `SectionHeader`, `Input`, `Textarea`, and `FormError` go in `shared/components/ui/`.

Feature-specific data should stay inside the related feature.

Examples:

- Course data goes in `features/courses/data/courses.data.ts`.
- Category data goes in `features/categories/data/categories.data.ts`.
- Home-only content goes in `features/home/data/home.data.ts`.
- Donation content goes in `features/donation/data/donation.data.ts`.

Common helpers go in:

```txt
shared/lib/
```

Common constants go in:

```txt
shared/constants/
```

Common types go in:

```txt
shared/types/
```

React Query setup goes in:

```txt
shared/providers/
shared/api/
```

Icon registry goes in:

```txt
shared/icons/icon-registry.ts
```

Avoid mixing unrelated feature logic together.

---

## Pages and Routing Rules

Create these basic pages early:

- `/`
- `/about`
- `/courses`
- `/categories`
- `/contact`
- `/donate`
- `/login`
- `/signup`

Rules:

- Keep route files inside `app/`.
- Keep route files small.
- Put real page UI inside feature folders.
- Start with simple page shells for non-home pages.
- First make homepage polished.
- Implement each feature step by step later.

---

## Icon Registry Rules

Use a centralized icon registry.

Use `lucide-react` icons only through:

```txt
shared/icons/icon-registry.ts
```

Do not randomly import lucide icons across many components unless there is a strong reason.

The icon registry should:

- Export commonly used icons for this website type.
- Include icons needed for education, finance, navigation, auth, contact, donation, social proof, and UI actions.
- Stay under 200 icons.
- Use clear names.
- Keep imports organized.

Example:

```ts
import {
  ArrowRight,
  BookOpen,
  GraduationCap,
  HandCoins,
  Mail,
  Phone,
  ShieldCheck,
  Users,
} from "lucide-react";

export const Icons = {
  arrowRight: ArrowRight,
  bookOpen: BookOpen,
  graduationCap: GraduationCap,
  handCoins: HandCoins,
  mail: Mail,
  phone: Phone,
  shieldCheck: ShieldCheck,
  users: Users,
};
```

Usage:

```tsx
import { Icons } from "@/shared/icons/icon-registry";

const Icon = Icons.bookOpen;

export function Example() {
  return <Icon className="size-5" />;
}
```

---

## Form Architecture Rules

Use:

- `react-hook-form`
- `zod`
- `@hookform/resolvers`

Use Zod schemas for form validation.

Keep schemas separate from form UI when practical.

Preferred contact form structure:

```txt
features/contact/
  components/
    ContactForm.tsx
    ContactInfo.tsx
    ContactSection.tsx
  schemas/
    contact.schema.ts
  types/
    contact.types.ts
```

Preferred auth form structure:

```txt
features/auth/
  components/
    LoginForm.tsx
    SignupForm.tsx
  schemas/
    login.schema.ts
    signup.schema.ts
  types/
    auth.types.ts
```

Infer TypeScript types from Zod schemas when possible.

Example:

```ts
import { z } from "zod";

export const contactSchema = z.object({
  name: z.string().min(2, "Name is required"),
  email: z.email("Enter a valid email"),
  message: z.string().min(10, "Message must be at least 10 characters"),
});

export type ContactFormValues = z.infer<typeof contactSchema>;
```

Rules:

- Keep form components readable.
- Show clear validation messages.
- Use shared UI input components where practical.
- Keep backend integration mocked or pending until requested.
- Do not add database, email service, CRM, or payment integration unless explicitly requested.

---

## API, Auth, and State Rules

Use:

- `axios` for API client setup
- `@tanstack/react-query` for server-state/data fetching setup
- `zustand` for client state
- Zustand persist middleware for persistent login state

Create basic frontend-safe architecture only for now.

Do not implement real backend auth yet unless explicitly requested.

Auth should be prepared for future:

- Email/password login
- JWT access token
- Refresh token flow
- Persistent login
- Social SSO
- Enterprise SSO

For now:

- Create clean interfaces/types.
- Create mock-safe service functions if needed.
- Do not store sensitive data insecurely.
- Do not hardcode real secrets.
- Do not add real SSO providers yet.
- Do not add password hashing in frontend.

Password hashing belongs on the backend later.

Access-token and refresh-token handling should be designed carefully before real API integration.

---

## Data Rules

For the first version, store content locally.

Use feature-specific data files like:

```txt
features/courses/data/courses.data.ts
features/categories/data/categories.data.ts
features/home/data/home.data.ts
features/donation/data/donation.data.ts
```

Do not add database yet.

Do not add Prisma yet.

Do not add API routes unless explicitly requested.

---

## Design Direction

Website should feel:

- Modern
- Trustworthy
- Educational
- Financial-literacy focused
- Clean
- Friendly
- Professional
- Mobile responsive

Color direction:

- Blue or navy for trust
- Green for finance/growth
- White or light backgrounds
- Soft gradients
- Clear call-to-action buttons
- Good contrast

Avoid:

- Cluttered UI
- Too many colors
- Overly flashy animations
- Dark-heavy design unless requested

---

## Forms Rule

For the first version, forms can be frontend-only.

Do not connect forms to a backend until requested.

Possible future low-cost form options:

- Google Forms
- FormSubmit
- Next.js Route Handler
- Email service

Start simple.

---

## SOLID and Clean Code Principles

Follow pragmatic SOLID principles.

Use SOLID to keep code clean and maintainable, but do not over-engineer.

### Single Responsibility Principle

Each file, component, hook, schema, store, service, and utility should have one clear responsibility.

Examples:

- `Navbar.tsx` handles navigation UI only.
- `ContactForm.tsx` handles form UI and behavior only.
- `contact.schema.ts` handles contact validation only.
- `courses.data.ts` stores course data only.
- `auth.store.ts` manages auth client state only.
- `auth.api.ts` contains auth API functions only.

### Open/Closed Principle

Code should be easy to extend without rewriting large parts.

Prefer:

- Data-driven sections
- Reusable cards
- Config-based navigation
- Shared UI components
- Centralized icon registry
- Typed service functions

Avoid copy-pasting repeated UI blocks.

### Liskov Substitution Principle

Reusable components should behave predictably wherever used.

Example:

A shared `Button` should work consistently in Hero, Contact, Donate, Login, and SignUp sections.

### Interface Segregation Principle

Keep props and types small and focused.

Avoid large prop objects with many unused fields.

Prefer focused types such as:

- `Course`
- `Category`
- `NavItem`
- `ContactFormValues`
- `LoginFormValues`
- `SignupFormValues`
- `AuthUser`

### Dependency Inversion Principle

High-level UI should depend on shared abstractions, not scattered hardcoded details.

Prefer:

- Data from feature data files
- Constants from shared constants
- Helpers from `shared/lib`
- Icons from centralized icon registry
- API calls from feature services

Avoid repeating the same content, links, and config across many components.

---

## Practical Clean Code Rules

- Prefer composition over duplication.
- Keep page files small.
- Keep feature components focused.
- Move repeated UI into shared components only when reuse is real.
- Do not over-abstract too early.
- Avoid premature patterns that add complexity without benefit.
- Use clear names over clever abstractions.
- Keep business/domain data separate from UI when practical.
- Prefer Server Components unless interactivity is required.
- Use Client Components only for state, events, forms, mobile menus, browser APIs, React Query provider, or Zustand usage.

---

## SEO and Accessibility Rules

Use semantic HTML:

- `header`
- `main`
- `section`
- `footer`
- `nav`
- `article`

Use accessible buttons and links.

Use meaningful alt text for images.

Use proper heading order.

Add useful page metadata where appropriate.

Use `next/image` for images when useful.

---

## ROADMAP Rules

Keep `ROADMAP.md` updated as the project progresses.

Update it when:

- A phase is completed.
- A major feature is started or completed.
- Project direction changes.
- New planned features are added.

Do not update `ROADMAP.md` for tiny UI tweaks unless they affect project progress.

---

## Git Rules

Before changes:

```bash
git status
```

After meaningful changes:

```bash
git add .
git commit -m "Clear message"
```

Do not commit:

```txt
node_modules/
.next/
.env
.env.local
```

Commit:

```txt
AGENTS.md
ROADMAP.md
docs/COMMANDS.md
pnpm-lock.yaml
```

---

## Quality Checklist

Before saying work is complete:

- Check TypeScript errors where relevant.
- Run targeted validation for small changes.
- Run `pnpm build` before production-ready changes.
- Check responsive layout.
- Check obvious accessibility issues.
- Check that no unnecessary dependency was added.
- Check that project remains simple and budget-friendly.
- Update `ROADMAP.md` if the task changes project progress.

---

## Important Instruction

Do not over-engineer.

First build a clean static website and polished homepage.

Create basic page shells for other pages.

Implement each feature step by step later.

Only add backend, database, CMS, real authentication backend, real SSO, payment gateway, or AI features when explicitly requested.
