"use client";

import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { learningLevels } from "@/features/home/data/home.data";
import { courses } from "@/features/courses/data/courses.data";
import type { CourseLevel } from "@/features/courses/types/course.types";
import { primaryNavItems } from "@/shared/constants/nav";
import { siteConfig } from "@/shared/constants/site";
import { Icons } from "@/shared/icons/icon-registry";
import { cn } from "@/shared/lib/utils";
import { Container } from "@/shared/components/ui/Container";

export function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const pathname = usePathname();
  const MenuIcon = isOpen ? Icons.x : Icons.menu;
  const latestCourses = courses.filter((course) => course.isLatest).slice(0, 6);
  const isActive = (href: string) =>
    href === "/" ? pathname === href : pathname === href || pathname.startsWith(`${href}/`);
  const isLoginActive = isActive("/login");
  const isSignupActive = isActive("/signup");

  useEffect(() => {
    if (!isOpen) {
      return;
    }

    const scrollY = window.scrollY;
    const bodyStyle = document.body.style;
    const htmlStyle = document.documentElement.style;
    const originalBodyOverflow = bodyStyle.overflow;
    const originalBodyPosition = bodyStyle.position;
    const originalBodyTop = bodyStyle.top;
    const originalBodyWidth = bodyStyle.width;
    const originalHtmlOverflow = htmlStyle.overflow;

    htmlStyle.overflow = "hidden";
    bodyStyle.overflow = "hidden";
    bodyStyle.position = "fixed";
    bodyStyle.top = `-${scrollY}px`;
    bodyStyle.width = "100%";

    return () => {
      htmlStyle.overflow = originalHtmlOverflow;
      bodyStyle.overflow = originalBodyOverflow;
      bodyStyle.position = originalBodyPosition;
      bodyStyle.top = originalBodyTop;
      bodyStyle.width = originalBodyWidth;
      window.scrollTo(0, scrollY);
    };
  }, [isOpen]);

  return (
    <header className="sticky top-0 z-50 border-b border-slate-200/80 bg-white/95 backdrop-blur">
      <Container className="flex min-h-20 items-center justify-between gap-4">
        <Link
          href="/"
          className="flex items-center gap-3 rounded-lg focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-600"
          aria-label={`${siteConfig.name} home`}
        >
          <Image
            src="/images/logo.png"
            alt={siteConfig.name}
            width={560}
            height={150}
            priority
            className="h-12 w-auto max-w-[220px] object-contain sm:max-w-[280px]"
          />
        </Link>

        <nav className="hidden items-center gap-2 xl:gap-3 lg:flex" aria-label="Primary">
          {primaryNavItems.map((item) =>
            item.href === "/courses" ? (
              <CoursesMegaMenu
                key={item.href}
                isActive={isActive(item.href)}
                latestCourses={latestCourses}
              />
            ) : (
              <DesktopNavLink
                key={item.href}
                href={item.href}
                isActive={isActive(item.href)}
                label={item.label}
              />
            ),
          )}
        </nav>

        <div className="hidden items-center overflow-hidden rounded-full border border-slate-200 bg-white shadow-sm shadow-slate-950/5 ring-1 ring-slate-950/[0.02] lg:flex">
          <Link
            href="/login"
            className={cn(
              "inline-flex min-h-11 items-center px-5 text-sm font-semibold text-slate-600 transition hover:bg-blue-50 hover:text-blue-700",
              isLoginActive &&
                "bg-blue-600 text-white hover:bg-blue-700 hover:text-white",
            )}
          >
            Login
          </Link>
          <span
            className={cn(
              "h-6 w-px bg-slate-200",
              (isLoginActive || isSignupActive) && "bg-blue-200",
            )}
            aria-hidden="true"
          />
          <Link
            href="/signup"
            className={cn(
              "inline-flex min-h-11 items-center px-5 text-sm font-semibold transition focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-600 focus-visible:ring-offset-2",
              "bg-white text-slate-600 hover:bg-blue-50 hover:text-blue-700",
              isSignupActive && "bg-blue-700 text-white",
            )}
          >
            Sign Up
          </Link>
        </div>

        <button
          type="button"
          className="grid size-11 place-items-center rounded-full border border-slate-200 bg-white text-slate-700 shadow-sm shadow-slate-950/5 transition hover:border-blue-200 hover:bg-blue-50 hover:text-blue-700 lg:hidden"
          aria-label="Toggle navigation"
          aria-expanded={isOpen}
          aria-controls="mobile-navigation-drawer"
          onClick={() => setIsOpen((current) => !current)}
        >
          <MenuIcon className="size-5" />
        </button>
      </Container>

      <button
        type="button"
        aria-label="Close navigation"
        className={cn(
          "fixed inset-0 z-40 bg-slate-950/45 backdrop-blur-sm transition-opacity duration-300 lg:hidden",
          isOpen ? "opacity-100" : "pointer-events-none opacity-0",
        )}
        onClick={() => setIsOpen(false)}
      />

      <aside
        id="mobile-navigation-drawer"
        className={cn(
          "fixed left-0 top-0 z-50 flex h-dvh w-[88vw] max-w-sm flex-col overflow-y-auto border-r border-slate-200 bg-white shadow-2xl shadow-slate-950/20 transition-transform duration-300 ease-out lg:hidden",
          isOpen ? "translate-x-0" : "-translate-x-full",
        )}
        aria-hidden={!isOpen}
      >
        <div className="flex items-start justify-between gap-4 border-b border-slate-200 px-5 py-5">
          <Link
            href="/"
            className="flex min-w-0 items-center gap-3 rounded-lg focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-600"
            aria-label={`${siteConfig.name} home`}
          >
            <Image
              src="/images/logo.png"
              alt={siteConfig.name}
              width={560}
              height={150}
              priority
              className="h-11 w-auto max-w-[245px] object-contain"
            />
          </Link>

          <button
            type="button"
            className="grid size-10 shrink-0 place-items-center rounded-full border border-slate-200 text-slate-600 transition hover:border-blue-200 hover:bg-blue-50 hover:text-blue-700"
            aria-label="Close navigation"
            onClick={() => setIsOpen(false)}
          >
            <Icons.x className="size-5" />
          </button>
        </div>

        <nav className="grid gap-2 px-4 py-5" aria-label="Mobile primary">
          {primaryNavItems.map((item) =>
            item.href === "/courses" ? (
              <MobileCoursesMenu
                key={item.href}
                isActive={isActive(item.href)}
                latestCourses={latestCourses.slice(0, 3)}
                onClick={() => setIsOpen(false)}
              />
            ) : (
              <MobileNavLink
                key={item.href}
                href={item.href}
                icon={item.icon}
                isActive={isActive(item.href)}
                label={item.label}
                onClick={() => setIsOpen(false)}
              />
            ),
          )}
        </nav>

        <div className="mt-auto border-t border-slate-200 bg-slate-50/80 px-4 py-5">
          <div className="grid gap-3">
            <Link
              href="/login"
              className={cn(
                "inline-flex min-h-12 items-center justify-center gap-2 rounded-full border border-slate-300 bg-white px-5 text-sm font-semibold text-slate-950 transition hover:border-blue-300 hover:bg-blue-50 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-600 focus-visible:ring-offset-2",
                isActive("/login") && "border-blue-200 bg-blue-50 text-blue-700",
              )}
              onClick={() => setIsOpen(false)}
            >
              <Icons.user className="size-4" />
              Login
            </Link>
            <Link
              href="/signup"
              className={cn(
                "inline-flex min-h-12 items-center justify-center gap-2 rounded-full bg-blue-600 px-5 text-sm font-semibold text-white shadow-sm shadow-blue-600/20 transition hover:bg-blue-700 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-600 focus-visible:ring-offset-2",
                isActive("/signup") && "bg-blue-700",
              )}
              onClick={() => setIsOpen(false)}
            >
              <Icons.userPlus className="size-4" />
              Sign Up
            </Link>
          </div>
        </div>
      </aside>
    </header>
  );
}

type DesktopNavLinkProps = {
  href: string;
  isActive: boolean;
  label: string;
};

function DesktopNavLink({ href, isActive, label }: DesktopNavLinkProps) {
  return (
    <Link
      href={href}
      aria-current={isActive ? "page" : undefined}
      className={cn(
        "rounded-full px-4 py-2 text-sm font-semibold text-slate-600 transition hover:bg-blue-50 hover:text-blue-700",
        isActive &&
          "bg-gradient-to-r from-blue-600 to-cyan-500 text-white shadow-sm shadow-blue-600/20 hover:text-white",
      )}
    >
      {label}
    </Link>
  );
}

type CoursesMegaMenuProps = {
  isActive: boolean;
  latestCourses: typeof courses;
};

function CoursesMegaMenu({ isActive, latestCourses }: CoursesMegaMenuProps) {
  const [selectedLevel, setSelectedLevel] = useState<CourseLevel | null>(null);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const visibleCourses = selectedLevel
    ? latestCourses.filter((course) => course.level === selectedLevel)
    : latestCourses;
  const viewAllHref = selectedLevel
    ? `/courses?level=${encodeURIComponent(selectedLevel)}`
    : "/courses";
  const closeMenu = () => setIsMenuOpen(false);

  return (
    <div
      className="relative"
      onBlur={(event) => {
        if (!event.currentTarget.contains(event.relatedTarget)) {
          closeMenu();
        }
      }}
      onFocus={() => setIsMenuOpen(true)}
      onMouseEnter={() => setIsMenuOpen(true)}
      onMouseLeave={closeMenu}
    >
      <Link
        href="/courses"
        aria-current={isActive ? "page" : undefined}
        aria-expanded={isMenuOpen}
        className={cn(
          "inline-flex items-center gap-1 rounded-full px-4 py-2 text-sm font-semibold text-slate-600 transition hover:bg-blue-50 hover:text-blue-700",
          isActive &&
            "bg-gradient-to-r from-blue-600 to-cyan-500 text-white shadow-sm shadow-blue-600/20 hover:text-white",
        )}
        onClick={closeMenu}
      >
        Courses
        <Icons.chevronDown
          className={cn("size-3.5 transition", isMenuOpen && "rotate-180")}
        />
      </Link>

      <div
        className={cn(
          "absolute left-1/2 top-full w-[min(calc(100vw-3rem),1024px)] -translate-x-1/2 pt-5",
          isMenuOpen ? "block" : "hidden",
        )}
      >
        <div className="overflow-hidden rounded-[1.75rem] border border-slate-200 bg-white shadow-2xl shadow-slate-950/15">
          <div className="grid grid-cols-[230px_1fr]">
            <div className="bg-slate-100/80 p-5">
              <p className="mb-4 text-xs font-bold uppercase tracking-[0.25em] text-blue-900/75">
                Course Levels
              </p>
              <div className="grid gap-2">
                <button
                  type="button"
                  className={cn(
                    "rounded-2xl px-4 py-3 text-left transition hover:bg-white hover:shadow-sm",
                    selectedLevel === null && "bg-white shadow-sm",
                  )}
                  onClick={() => setSelectedLevel(null)}
                >
                  <span
                    className={cn(
                      "block text-sm font-semibold text-slate-800",
                      selectedLevel === null && "text-blue-700",
                    )}
                  >
                    All
                  </span>
                  <span className="mt-1 block text-xs font-semibold text-slate-500">
                    {latestCourses.length} latest courses
                  </span>
                </button>
                {learningLevels.map((level) => (
                  <button
                    key={level.label}
                    type="button"
                    className={cn(
                      "rounded-2xl px-4 py-3 text-left transition hover:bg-white hover:shadow-sm",
                      selectedLevel === level.label && "bg-white shadow-sm",
                    )}
                    onClick={() => setSelectedLevel(level.label)}
                  >
                    <span
                      className={cn(
                        "block text-sm font-semibold text-slate-800",
                        selectedLevel === level.label && "text-blue-700",
                      )}
                    >
                      {level.label}
                    </span>
                    <span className="mt-1 block text-xs font-semibold text-slate-500">
                      {level.duration}
                    </span>
                  </button>
                ))}
              </div>
            </div>

            <div className="p-5">
              <div className="mb-4 flex items-start justify-between gap-4">
                <div>
                  <p className="text-lg font-bold text-slate-950">
                    Latest Courses
                  </p>
                  <p className="mt-1 text-xs font-semibold text-slate-500">
                    Compact view with prices. Explore the newest programs.
                  </p>
                </div>
                <Link
                  href={viewAllHref}
                  className="inline-flex min-h-11 shrink-0 items-center justify-center rounded-full bg-blue-600 px-5 text-sm font-bold text-white shadow-sm shadow-blue-600/20 transition hover:bg-blue-700 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-600 focus-visible:ring-offset-2"
                  onClick={closeMenu}
                >
                  View All
                </Link>
              </div>

              <div className="grid grid-cols-3 gap-3">
                {visibleCourses.map((course) => (
                  <Link
                    key={course.id}
                    href={`/courses/${course.id}`}
                    className="group/card rounded-2xl border border-slate-200 bg-white p-3 transition hover:-translate-y-0.5 hover:border-blue-200 hover:shadow-lg hover:shadow-blue-950/10"
                    onClick={closeMenu}
                  >
                    <div className="mb-3 flex items-start justify-between gap-2">
                      <span className="rounded-full bg-blue-50 px-3 py-1 text-[11px] font-bold text-blue-700 ring-1 ring-blue-100">
                        {course.level}
                      </span>
                      <span className="text-[11px] font-bold text-blue-700">
                        {course.fee}
                      </span>
                    </div>
                    <p className="line-clamp-2 text-sm font-bold leading-5 text-slate-950 transition group-hover/card:text-blue-700">
                      {course.title}
                    </p>
                    <p className="mt-3 text-xs font-semibold text-slate-500">
                      {course.category} - {course.duration}
                    </p>
                  </Link>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

type MobileNavLinkProps = {
  href: string;
  icon: keyof typeof Icons;
  isActive: boolean;
  label: string;
  onClick: () => void;
};

function MobileNavLink({
  href,
  icon,
  isActive,
  label,
  onClick,
}: MobileNavLinkProps) {
  const Icon = Icons[icon];

  return (
    <Link
      href={href}
      aria-current={isActive ? "page" : undefined}
      className={cn(
        "group relative flex min-h-14 items-center gap-3 rounded-2xl px-3 text-sm font-semibold text-slate-700 transition hover:bg-blue-50 hover:text-blue-700",
        isActive && "bg-blue-50 text-blue-700 ring-1 ring-blue-100",
      )}
      onClick={onClick}
    >
      <span
        className={cn(
          "grid size-10 shrink-0 place-items-center rounded-xl bg-slate-100 text-slate-600 transition group-hover:bg-white group-hover:text-blue-700",
          isActive && "bg-white text-blue-700 shadow-sm shadow-blue-600/10",
        )}
      >
        <Icon className="size-5" />
      </span>
      <span>{label}</span>
      {isActive ? (
        <span className="ml-auto h-7 w-1.5 rounded-full bg-emerald-500" />
      ) : null}
    </Link>
  );
}

type MobileCoursesMenuProps = {
  isActive: boolean;
  latestCourses: typeof courses;
  onClick: () => void;
};

function MobileCoursesMenu({
  isActive,
  latestCourses,
  onClick,
}: MobileCoursesMenuProps) {
  return (
    <div
      className={cn(
        "rounded-2xl transition",
        isActive && "bg-blue-50 ring-1 ring-blue-100",
      )}
    >
      <MobileNavLink
        href="/courses"
        icon="bookOpen"
        isActive={isActive}
        label="Courses"
        onClick={onClick}
      />
      <div className="grid gap-2 px-3 pb-3">
        <div className="flex items-center justify-between gap-3 border-t border-blue-100 pt-3">
          <span className="text-xs font-bold uppercase tracking-[0.18em] text-slate-500">
            Latest
          </span>
          <Link
            href="/courses"
            className="text-xs font-bold text-blue-700"
            onClick={onClick}
          >
            View all
          </Link>
        </div>
        {latestCourses.map((course) => (
          <Link
            key={course.id}
            href={`/courses/${course.id}`}
            className="rounded-xl bg-white px-3 py-2 ring-1 ring-slate-200 transition hover:ring-blue-200"
            onClick={onClick}
          >
            <span className="line-clamp-1 text-xs font-bold text-slate-950">
              {course.title}
            </span>
            <span className="mt-1 flex items-center justify-between gap-2 text-[11px] font-semibold text-slate-500">
              <span>{course.level}</span>
              <span className="text-blue-700">{course.fee}</span>
            </span>
          </Link>
        ))}
      </div>
    </div>
  );
}
