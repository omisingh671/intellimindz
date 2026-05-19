# Intellimindz Foundation Roadmap

## Product Direction

Intellimindz Foundation is a budget-friendly FinTech + EdTech website for financial literacy, structured learning programs, course discovery, enquiries, donations, and future authentication.

The first release should stay static, fast, responsive, accessible, and easy to deploy. Backend, database, CMS, payment gateway, real SSO, and AI integrations are intentionally deferred until requested.

## Phase 1 - Project Foundation and Homepage

Status: Completed

- Create the feature-based structure under `src/features` and reusable platform layer under `src/shared`.
- Keep `src/app` focused on routing, metadata, layout composition, and global styles.
- Add shared layout components, constants, icon registry, UI primitives, API client setup, React Query provider, and frontend-safe auth store.
- Build a polished responsive homepage inspired by the screenshots in `public/resources`.
- Add simple route shells for About Us, Courses, Categories, Contact, Donate, Login, and SignUp.
- Add validated frontend-only forms for Contact, Login, and SignUp.
- Verify `pnpm build`.

## Phase 2 - Content and Page Depth

Status: Planned

- Expand About Us with foundation story, mission, learner outcomes, and trust markers.
- Improve Courses and Categories with filters, detail-ready card structure, and stronger content hierarchy.
- Add donation content depth while keeping payment integration pending.
- Add SEO metadata for each public page.
- Add lightweight accessibility and responsive QA pass.

## Phase 3 - Form Handling Options

Status: Planned

- Choose a low-cost submission path for enquiry and contact forms.
- Possible options: Google Forms, FormSubmit, a Next.js Route Handler, or email service integration.
- Add success/error states, spam protection approach, and server-side validation only when a submission path is selected.

## Phase 4 - Auth Preparation

Status: Planned

- Keep frontend auth types, mock services, and persisted Zustand state ready for future integration.
- Design the real backend auth flow before implementation: JWT access token, refresh token rotation, RBAC, secure cookies, and session invalidation.
- Keep social SSO and enterprise SSO as future extension points.
- Do not add real auth providers or password hashing on the frontend.

## Phase 5 - Backend, CMS, Payments, and Operations

Status: Future

- Add backend APIs only when business flows require persistence.
- Add database/ORM only after data ownership and admin workflows are clear.
- Add donation payment gateway only after compliance and receipt requirements are defined.
- Add CMS/admin tooling only when non-developer content updates are needed.
- Add logging, monitoring, CI/CD, and Docker deployment polish as production readiness increases.

## Current Completion Notes

- Basic Next.js scaffold exists.
- Reference screenshots are available under `public/resources`.
- Feature-based project foundation is in place under `src/features` and `src/shared`.
- Homepage, shared layout, route shells, frontend-only forms, API/query setup, auth placeholders, and persisted mock auth state are implemented.
- `pnpm lint` and `pnpm build` pass.
