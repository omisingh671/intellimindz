import Link from "next/link";
import { siteConfig } from "@/shared/constants/site";
import { Icons } from "@/shared/icons/icon-registry";
import { hasPermission } from "@/server/auth/permissions";
import type { SessionUser } from "@/server/auth/session";

const adminNavItems = [
  { href: "/admin/dashboard", label: "Overview", icon: "home", permission: "admin:access" },
  { href: "/admin/users", label: "Users", icon: "users", permission: "users:manage" },
  { href: "/admin/learners", label: "Learners", icon: "graduationCap", permission: "learners:manage" },
  { href: "/admin/courses", label: "Courses", icon: "bookOpen", permission: "courses:manage" },
  { href: "/admin/categories", label: "Categories", icon: "layers", permission: "categories:manage" },
  { href: "/admin/leads", label: "Leads", icon: "message", permission: "leads:manage" },
  { href: "/admin/settings", label: "Settings", icon: "settings", permission: "settings:manage" },
] as const;

export function AdminShell({
  children,
  user,
}: Readonly<{
  children: React.ReactNode;
  user: SessionUser;
}>) {
  const visibleItems = adminNavItems.filter((item) =>
    hasPermission(user.role, item.permission),
  );

  return (
    <div className="min-h-screen bg-slate-100 text-slate-950">
      <aside className="fixed inset-y-0 left-0 hidden w-72 border-r border-slate-200 bg-white lg:block">
        <div className="border-b border-slate-200 px-6 py-5">
          <Link href="/" className="text-lg font-black tracking-tight text-blue-900">
            {siteConfig.name}
          </Link>
          <p className="mt-1 text-xs font-semibold uppercase tracking-[0.18em] text-slate-500">
            Admin Dashboard
          </p>
        </div>
        <nav className="grid gap-1 px-4 py-5" aria-label="Admin">
          {visibleItems.map((item) => {
            const Icon = Icons[item.icon];

            return (
              <Link
                key={item.href}
                href={item.href}
                className="flex min-h-11 items-center gap-3 rounded-lg px-3 text-sm font-semibold text-slate-700 transition hover:bg-blue-50 hover:text-blue-700"
              >
                <Icon className="size-4" />
                {item.label}
              </Link>
            );
          })}
        </nav>
      </aside>

      <div className="lg:pl-72">
        <header className="sticky top-0 z-30 border-b border-slate-200 bg-white/95 px-5 py-4 backdrop-blur lg:px-8">
          <div className="flex flex-wrap items-center justify-between gap-4">
            <div>
              <p className="text-xs font-bold uppercase tracking-[0.18em] text-blue-700">
                {user.role.replace("_", " ")}
              </p>
              <h1 className="mt-1 text-xl font-bold text-slate-950">
                Welcome, {user.name}
              </h1>
            </div>
            <Link
              href="/"
              className="inline-flex min-h-10 items-center justify-center rounded-lg border border-slate-300 bg-white px-4 text-sm font-bold text-slate-700 transition hover:border-blue-200 hover:bg-blue-50 hover:text-blue-700"
            >
              Public Site
            </Link>
          </div>
          <nav className="mt-4 flex gap-2 overflow-x-auto pb-1 lg:hidden" aria-label="Admin mobile">
            {visibleItems.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className="inline-flex min-h-10 shrink-0 items-center rounded-lg border border-slate-200 bg-white px-3 text-sm font-bold text-slate-700"
              >
                {item.label}
              </Link>
            ))}
          </nav>
        </header>
        <main className="px-5 py-6 lg:px-8">{children}</main>
      </div>
    </div>
  );
}
