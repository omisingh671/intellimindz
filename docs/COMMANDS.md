pnpm install
pnpm dev
pnpm build
pnpm start
pnpm add package-name
pnpm add -D package-name
pnpm remove package-name
pnpm dlx package-name

# Environment

Copy `.env.example` to `.env` locally and update:

DATABASE_URL="mysql://root:password@localhost:3306/intellimindz"
AUTH_SECRET="replace-with-a-long-random-auth-secret"
AUTH_GOOGLE_ID=""
AUTH_GOOGLE_SECRET=""
AUTH_GITHUB_ID=""
AUTH_GITHUB_SECRET=""
AUTH_LINKEDIN_ID=""
AUTH_LINKEDIN_SECRET=""
NEXT_PUBLIC_API_URL="/api"
NEXT_PUBLIC_AUTH_MOCK="false"
NEXT_PUBLIC_DEV_LOGIN_AUTOFILL="false"

For local-only login autofill during development, set:

NEXT_PUBLIC_DEV_LOGIN_AUTOFILL="true"

# Prisma

pnpm prisma:generate
pnpm prisma:deploy
pnpm prisma:seed
pnpm prisma:studio

# Prisma migration commands

Create a new local migration after changing `prisma/schema.prisma`:

pnpm prisma:migrate -- --name your_migration_name

Apply existing migrations without creating a new one:

pnpm prisma:deploy

Reset local database, rerun all migrations, and run seed:

pnpm exec prisma migrate reset

Reset local database without running seed:

pnpm exec prisma migrate reset --skip-seed

Run seed again without resetting database:

pnpm prisma:seed

# Full-stack dev flow

pnpm install
pnpm prisma:generate
pnpm prisma:deploy
pnpm prisma:seed
pnpm dev

# Seeded demo users

All seeded users use this password:

Password@123

Admin accounts:

superadmin@intellimindz.local
admin@intellimindz.local
manager@intellimindz.local

Learner accounts:

student@intellimindz.local
professional@intellimindz.local
regulator@intellimindz.local
