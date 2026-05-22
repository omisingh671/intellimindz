# Intellimindz Foundation Roadmap

## Product Direction

Intellimindz Foundation is a budget-friendly FinTech + EdTech website for financial literacy, structured learning programs, course discovery, enquiries, donations, and role-based operations.

The public learner-facing release should stay fast, responsive, accessible, and visually stable. Backend and admin features now live inside the same Next.js App Router app through Route Handlers, Prisma, MySQL, Auth.js, and a protected `/admin` dashboard. CMS, real payment gateway integration, and AI integrations remain deferred until explicitly requested.

## Phase 1 - Project Foundation and Homepage

Status: Completed

- Create the feature-based structure under `src/features` and reusable platform layer under `src/shared`.
- Keep `src/app` focused on routing, metadata, layout composition, and global styles.
- Add shared layout components, constants, icon registry, UI primitives, API client setup, React Query provider, and Auth.js session provider wiring.
- Build a polished responsive homepage inspired by the screenshots in `public/resources`.
- Add simple route shells for About Us, Courses, Categories, Contact, Donate, Login, and SignUp.
- Add validated frontend-only forms for Contact, Login, and SignUp.
- Verify `pnpm build`.

## Phase 2 - Content and Page Depth

Status: In Progress

- Expand About Us with foundation story, mission, learner outcomes, and trust markers.
- Improve Courses and Categories with filters, detail-ready card structure, and stronger content hierarchy.
- Add a reusable `/categories/[slug]` detail-page system with category-specific hero content, tabs, courses, applications, learning path, careers, overview, and blog preview sections.
- Add donation content depth while keeping payment integration pending.
- Add SEO metadata for each public page.
- Add lightweight accessibility and responsive QA pass.

## Phase 3 - Full-Stack MVP Foundation

Status: In Progress

- Add Prisma + MySQL with models for users, Auth.js auth records, learner types, categories, levels, courses, and leads.
- Add separate course pricing and coupon models so GST-aware commercial data is not mixed into course content.
- Keep the existing public frontend data as the source of truth for seeded categories, levels, and courses.
- Add Auth.js JWT-session auth with CredentialsProvider, bcrypt manual signup/login, Google/GitHub/LinkedIn SSO, profile completion state, and `sessionVersion` revocation support.
- Add role-based access for `SUPER_ADMIN`, `ADMIN`, `MANAGER`, and `LEARNER`.
- Keep learners out of the admin dashboard.
- Add protected `/admin` pages for overview, users, learners, courses, categories, leads, and settings.
- Enforce permissions in API Route Handlers, not only in dashboard navigation.
- Add a reusable `useAppSubmit` form-submit pattern while keeping feature forms in control of business rules.
- Add reusable toast feedback for common form submit success and error states.
- Add self-service account profile editing with reusable local media storage for profile pictures.
- Connect public contact/course enquiry submissions to the backend `Lead` table with server-side validation.
- Connect donation interest submissions to backend persistence while keeping payment gateway integration deferred.
- Add a unified placeholder `Payment` ledger for donation and future course payments, including full, EMI, and flexible payment modes.
- Connect course detail enrollment CTA to a course payment placeholder flow while keeping real gateway integration deferred.

## Phase 4 - Form Handling Hardening

Status: Planned

- Add spam protection/rate limiting for public form submissions.
- Add admin workflow for donation interest follow-up.
- Add optional email notifications after the submission flow is stable.
- Add real payment gateway handoff and webhook verification after the placeholder payment records are stable.

## Phase 5 - Auth and Admin Hardening

Status: Planned

- Add password reset and email verification.
- Add admin session-revocation UI and audit trails around `sessionVersion` changes.
- Add admin create/edit forms for courses, categories, users, and leads.
- Add audit logging for sensitive admin actions.
- Add profile completion for SSO users after signup.

## Phase 6 - CMS, Payments, and Operations

Status: Future

- Add donation/course payment gateway only after compliance, receipt, and refund requirements are defined.
- Add CMS/admin tooling only when non-developer content updates are needed.
- Add logging, monitoring, CI/CD, and Docker deployment polish as production readiness increases.

## Current Completion Notes

- Basic Next.js scaffold exists.
- Reference screenshots are available under `public/resources`.
- Feature-based project foundation is in place under `src/features` and `src/shared`.
- Homepage, shared layout, route shells, frontend forms, API/query setup, and Auth.js-backed client auth state are implemented.
- Category cards now link into a reusable dynamic category detail template powered by local static category detail data.
- Public routes are grouped under a public layout so guest-facing pages keep the existing Navbar/Footer and visual design.
- Admin routes are grouped under a separate protected dashboard layout at `/admin`.
- Prisma schema and seed setup are added for the full-stack MVP.
- Signed-in users can update profile details and an optional profile picture from `/account`.
- `pnpm lint` and `pnpm build` pass.
