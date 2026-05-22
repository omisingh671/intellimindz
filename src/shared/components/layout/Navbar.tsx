"use client";

import type { Session } from "next-auth";
import { useSession } from "next-auth/react";
import Image from "next/image";
import Link from "next/link";
import { usePathname, useSearchParams } from "next/navigation";
import { useEffect, useRef, useState } from "react";

import { siteConfig } from "@/shared/constants/site";
import { AUTH_ROLES } from "@/shared/constants/auth-roles";
import { Icons } from "@/shared/icons/icon-registry";
import { cn } from "@/shared/lib/utils";

import { primaryNavItems } from "@/shared/constants/nav";
import { Container } from "@/shared/components/ui/Container";

import { learningLevels } from "@/features/home/data/home.data";
import { courses } from "@/features/courses/data/courses.data";
import { useLogoutMutation } from "@/features/auth/hooks";

import type { CourseLevel } from "@/features/courses/types/course.types";

export function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [isUserMenuOpen, setIsUserMenuOpen] = useState(false);
  const drawerRef = useRef<HTMLElement>(null);
  const mobileToggleRef = useRef<HTMLButtonElement>(null);
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const { data: session, status } = useSession();
  const user = status === "authenticated" ? session?.user : null;
  const logoutMutation = useLogoutMutation();
  const MenuIcon = isOpen ? Icons.x : Icons.menu;
  const latestCourses = courses.filter((course) => course.isLatest).slice(0, 6);
  const selectedCourseLevel = getSelectedCourseLevel(searchParams.get("level"));
  const isAuthenticated = status === "authenticated" && Boolean(user);
  const isActive = (href: string) =>
    href === "/"
      ? pathname === href
      : pathname === href || pathname.startsWith(`${href}/`);
  const isLoginActive = isActive("/login");
  const isSignupActive = isActive("/signup");
  const handleLogout = () => {
    setIsUserMenuOpen(false);
    setIsOpen(false);
    logoutMutation.mutate();
  };

  useEffect(() => {
    if (!isOpen) {
      return;
    }

    const handlePointerDown = (event: PointerEvent) => {
      const target = event.target;

      if (!(target instanceof Node)) {
        return;
      }

      if (
        drawerRef.current?.contains(target) ||
        mobileToggleRef.current?.contains(target)
      ) {
        return;
      }

      setIsOpen(false);
    };

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        setIsOpen(false);
      }
    };

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
    document.addEventListener("pointerdown", handlePointerDown, true);
    document.addEventListener("keydown", handleKeyDown);

    return () => {
      document.removeEventListener("pointerdown", handlePointerDown, true);
      document.removeEventListener("keydown", handleKeyDown);
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
            className="h-12 w-auto max-w-55 object-contain sm:max-w-70"
          />
        </Link>

        <nav
          className="hidden items-center gap-2 xl:gap-3 lg:flex"
          aria-label="Primary"
        >
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

        {isAuthenticated && user ? (
          <DesktopUserMenu
            isOpen={isUserMenuOpen}
            isLoggingOut={logoutMutation.isPending}
            onLogout={handleLogout}
            onToggle={() => setIsUserMenuOpen((current) => !current)}
            setIsOpen={setIsUserMenuOpen}
            user={user}
          />
        ) : (
          <div className="hidden items-center overflow-hidden rounded-full border border-slate-200 bg-white shadow-sm shadow-slate-950/5 ring-1 ring-slate-950/2 lg:flex">
            <Link
              href="/login"
              className={cn(
                "inline-flex min-h-11 items-center px-5 text-sm font-semibold transition",
                isLoginActive
                  ? "bg-blue-600 text-white"
                  : "text-slate-600 hover:bg-blue-50 hover:text-blue-700",
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
                isSignupActive
                  ? "bg-blue-700 text-white"
                  : "bg-white text-slate-600 hover:bg-blue-50 hover:text-blue-700",
              )}
            >
              Sign Up
            </Link>
          </div>
        )}

        <button
          ref={mobileToggleRef}
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
        ref={drawerRef}
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
              className="h-11 w-auto max-w-61.25 object-contain"
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
                onClick={() => setIsOpen(false)}
                selectedLevel={selectedCourseLevel}
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
          {isAuthenticated && user ? (
            <MobileUserMenu
              isLoggingOut={logoutMutation.isPending}
              onNavigate={() => setIsOpen(false)}
              onLogout={handleLogout}
              user={user}
            />
          ) : (
            <div className="grid gap-3">
              <Link
                href="/login"
                className={cn(
                  "inline-flex min-h-12 items-center justify-center gap-2 rounded-full border px-5 text-sm font-semibold transition focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-600 focus-visible:ring-offset-2",
                  isActive("/login")
                    ? "border-blue-200 bg-blue-50 text-blue-700"
                    : "border-slate-300 bg-white text-slate-950 hover:border-blue-300 hover:bg-blue-50",
                )}
                onClick={() => setIsOpen(false)}
              >
                <Icons.user className="size-4" />
                Login
              </Link>
              <Link
                href="/signup"
                className={cn(
                  "inline-flex min-h-12 items-center justify-center gap-2 rounded-full px-5 text-sm font-semibold text-white shadow-sm shadow-blue-600/20 transition focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-600 focus-visible:ring-offset-2",
                  isActive("/signup")
                    ? "bg-blue-700"
                    : "bg-blue-600 hover:bg-blue-700",
                )}
                onClick={() => setIsOpen(false)}
              >
                <Icons.userPlus className="size-4" />
                Sign Up
              </Link>
            </div>
          )}
        </div>
      </aside>
    </header>
  );
}

type UserMenuProps = {
  isLoggingOut: boolean;
  onLogout: () => void;
  user: NavSessionUser;
};

type NavSessionUser = Session["user"];

type DesktopUserMenuProps = UserMenuProps & {
  isOpen: boolean;
  onToggle: () => void;
  setIsOpen: (isOpen: boolean) => void;
};

function DesktopUserMenu({
  isLoggingOut,
  isOpen,
  onLogout,
  onToggle,
  setIsOpen,
  user,
}: DesktopUserMenuProps) {
  const userLabel = getUserLabel(user);
  const displayName = getCompactUserName(userLabel);

  return (
    <div
      className="relative hidden lg:block"
      onBlur={(event) => {
        if (!event.currentTarget.contains(event.relatedTarget)) {
          setIsOpen(false);
        }
      }}
    >
      <button
        type="button"
        aria-expanded={isOpen}
        aria-haspopup="menu"
        className="inline-flex min-h-11 items-center gap-3 rounded-full border border-slate-200 bg-white py-1.5 pl-1.5 pr-4 text-left shadow-sm shadow-slate-950/5 ring-1 ring-slate-950/2 transition hover:border-blue-200 hover:bg-blue-50 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-600 focus-visible:ring-offset-2"
        onClick={onToggle}
      >
        <UserAvatar user={user} />
        <span
          className="max-w-36 truncate text-sm font-semibold text-slate-800"
          title={userLabel}
        >
          {displayName}
        </span>
        <Icons.chevronDown
          className={cn("size-4 text-slate-500 transition", isOpen && "rotate-180")}
        />
      </button>

      <div
        role="menu"
        className={cn(
          "absolute right-0 top-full z-50 mt-3 w-72 overflow-hidden rounded-3xl border border-slate-200 bg-white p-2 shadow-2xl shadow-slate-950/15 ring-1 ring-slate-950/5",
          isOpen ? "block" : "hidden",
        )}
      >
        <div className="flex items-center gap-3 border-b border-slate-100 px-3 py-3">
          <UserAvatar user={user} />
          <div className="min-w-0">
            <p className="truncate text-sm font-bold text-slate-950" title={userLabel}>
              {displayName}
            </p>
            <p className="truncate text-xs font-semibold text-slate-500">
              {user.email ?? ""}
            </p>
          </div>
        </div>
        {user.role !== AUTH_ROLES.learner ? (
          <UserMenuLink
            href="/admin/dashboard"
            icon="shieldCheck"
            label="Admin Dashboard"
            onClick={() => setIsOpen(false)}
          />
        ) : null}
        <UserMenuLink
          href="/account"
          icon="user"
          label="Account"
          onClick={() => setIsOpen(false)}
        />
        <UserMenuLink
          href="/settings"
          icon="settings"
          label="Settings"
          onClick={() => setIsOpen(false)}
        />
        <button
          type="button"
          role="menuitem"
          className="mt-1 flex min-h-11 w-full items-center gap-3 rounded-2xl px-3 text-left text-sm font-semibold text-rose-700 transition hover:bg-rose-50 disabled:cursor-not-allowed disabled:opacity-70"
          disabled={isLoggingOut}
          onClick={onLogout}
        >
          <Icons.logOut className="size-4" />
          {isLoggingOut ? "Logging out..." : "Logout"}
        </button>
      </div>
    </div>
  );
}

type MobileUserMenuProps = UserMenuProps & {
  onNavigate: () => void;
};

function MobileUserMenu({
  isLoggingOut,
  onLogout,
  onNavigate,
  user,
}: MobileUserMenuProps) {
  const userLabel = getUserLabel(user);
  const displayName = getCompactUserName(userLabel);

  return (
    <div className="rounded-3xl border border-slate-200 bg-white p-3 shadow-sm shadow-slate-950/5">
      <div className="flex items-center gap-3 border-b border-slate-100 pb-3">
        <UserAvatar user={user} />
        <div className="min-w-0">
          <p className="truncate text-sm font-bold text-slate-950" title={userLabel}>
            {displayName}
          </p>
          <p className="truncate text-xs font-semibold text-slate-500">
            {user.email ?? ""}
          </p>
        </div>
      </div>
      <div className="grid gap-1 pt-2">
        {user.role !== AUTH_ROLES.learner ? (
          <UserMenuLink
            href="/admin/dashboard"
            icon="shieldCheck"
            label="Admin Dashboard"
            onClick={onNavigate}
          />
        ) : null}
        <UserMenuLink
          href="/account"
          icon="user"
          label="Account"
          onClick={onNavigate}
        />
        <UserMenuLink
          href="/settings"
          icon="settings"
          label="Settings"
          onClick={onNavigate}
        />
        <button
          type="button"
          className="flex min-h-11 items-center gap-3 rounded-2xl px-3 text-left text-sm font-semibold text-rose-700 transition hover:bg-rose-50 disabled:cursor-not-allowed disabled:opacity-70"
          disabled={isLoggingOut}
          onClick={onLogout}
        >
          <Icons.logOut className="size-4" />
          {isLoggingOut ? "Logging out..." : "Logout"}
        </button>
      </div>
    </div>
  );
}

type UserMenuLinkProps = {
  href: string;
  icon: keyof typeof Icons;
  label: string;
  onClick?: () => void;
};

function UserMenuLink({ href, icon, label, onClick }: UserMenuLinkProps) {
  const Icon = Icons[icon];

  return (
    <Link
      href={href}
      role="menuitem"
      className="flex min-h-11 items-center gap-3 rounded-2xl px-3 text-sm font-semibold text-slate-700 transition hover:bg-blue-50 hover:text-blue-700"
      onClick={onClick}
    >
      <Icon className="size-4" />
      {label}
    </Link>
  );
}

function UserAvatar({ user }: { user: NavSessionUser }) {
  const userLabel = getUserLabel(user);
  const initial = getUserLabel(user).charAt(0).toUpperCase() || "U";

  return (
    <span className="relative grid size-9 shrink-0 overflow-hidden rounded-full bg-[#0d183d] text-sm font-bold text-white shadow-sm shadow-slate-950/15">
      {user.image ? (
        <Image
          src={user.image}
          alt={`${userLabel} profile picture`}
          fill
          unoptimized
          sizes="36px"
          className="object-cover"
        />
      ) : (
        <span className="m-auto">{initial}</span>
      )}
    </span>
  );
}

function getUserLabel(user: NavSessionUser) {
  return user.name?.trim() || user.email?.trim() || "Account";
}

function getCompactUserName(name: string, maxLength = 18) {
  const trimmedName = name.trim();

  if (trimmedName.length <= maxLength) {
    return trimmedName;
  }

  return `${trimmedName.slice(0, maxLength - 3).trimEnd()}...`;
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
          "bg-linear-to-r from-blue-600 to-cyan-500 text-white shadow-sm shadow-blue-600/20 hover:text-white",
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
            "bg-linear-to-r from-blue-600 to-cyan-500 text-white shadow-sm shadow-blue-600/20 hover:text-white",
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
  onClick: () => void;
  selectedLevel: CourseLevel | null;
};

function MobileCoursesMenu({
  isActive,
  onClick,
  selectedLevel,
}: MobileCoursesMenuProps) {
  const [isMenuOpen, setIsMenuOpen] = useState(isActive);
  const toggleMenu = () => setIsMenuOpen((current) => !current);
  const isAllLevelsActive = isActive && !selectedLevel;

  return (
    <div
      className={cn(
        "rounded-2xl transition",
        isActive && "bg-blue-50 ring-1 ring-blue-100",
      )}
    >
      <button
        type="button"
        className={cn(
          "group relative flex min-h-14 w-full items-center gap-3 rounded-2xl px-3 text-left text-sm font-semibold text-slate-700 transition hover:bg-blue-50 hover:text-blue-700",
          isActive && "text-blue-700",
        )}
        aria-expanded={isMenuOpen}
        aria-controls="mobile-courses-levels"
        onClick={toggleMenu}
      >
        <span
          className={cn(
            "grid size-10 shrink-0 place-items-center rounded-xl bg-slate-100 text-slate-600 transition group-hover:bg-white group-hover:text-blue-700",
            isActive && "bg-white text-blue-700 shadow-sm shadow-blue-600/10",
          )}
        >
          <Icons.bookOpen className="size-5" />
        </span>
        <span>Courses</span>
        <Icons.chevronDown
          className={cn(
            "ml-auto size-4 text-slate-500 transition",
            isMenuOpen && "rotate-180 text-blue-700",
          )}
        />
      </button>

      <div
        id="mobile-courses-levels"
        className={cn("px-3 pb-3", !isMenuOpen && "hidden")}
      >
        <div className="overflow-hidden rounded-2xl border border-slate-200 bg-white p-1">
          <Link
            href="/courses"
            className={cn(
              "flex min-h-11 items-center justify-between rounded-xl px-3 text-sm font-bold text-slate-950 transition hover:bg-blue-50 hover:text-blue-700",
              isAllLevelsActive && "bg-blue-100 text-blue-700 hover:bg-blue-100 hover:text-blue-700",
            )}
            onClick={onClick}
          >
            <span className="flex items-center gap-3">
              <span className="grid size-8 shrink-0 place-items-center rounded-lg bg-blue-50 text-blue-700">
                <Icons.layers className="size-4" />
              </span>
              All levels
            </span>
            <span
              className={cn(
                "text-xs font-semibold text-blue-700",
                isAllLevelsActive && "text-blue-700",
              )}
            >
              View all
            </span>
          </Link>
          {learningLevels.map((level) => (
            <Link
              key={level.label}
              href={`/courses?level=${encodeURIComponent(level.label)}`}
              className={cn(
                "mt-1 flex items-center gap-3 rounded-xl px-3 py-2.5 transition hover:bg-blue-50",
                selectedLevel === level.label && "bg-blue-100 hover:bg-blue-100",
              )}
              onClick={onClick}
            >
              <span
                className={cn(
                  "grid size-8 shrink-0 place-items-center rounded-lg bg-white text-blue-700 ring-1 ring-slate-200",
                  selectedLevel === level.label && "bg-blue-600 text-white ring-blue-600",
                )}
              >
                <MobileLevelIcon level={level.label} />
              </span>
              <span className="min-w-0">
                <span
                  className={cn(
                    "block text-sm font-bold text-slate-950",
                    selectedLevel === level.label && "text-blue-700",
                  )}
                >
                  {level.label}
                </span>
                <span
                  className={cn(
                    "mt-0.5 block text-xs font-semibold text-slate-500",
                    selectedLevel === level.label && "text-blue-700/70",
                  )}
                >
                  {level.duration}
                </span>
              </span>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
}

function getSelectedCourseLevel(level: string | null): CourseLevel | null {
  const matchingLevel = learningLevels.find((item) => item.label === level);

  return matchingLevel?.label ?? null;
}

function MobileLevelIcon({ level }: { level: CourseLevel }) {
  const levelIcons: Record<CourseLevel, keyof typeof Icons> = {
    Discovery: "search",
    Fluency: "message",
    Beginner: "bookOpen",
    Intermediate: "rocket",
    Advanced: "graduationCap",
  };
  const Icon = Icons[levelIcons[level]];

  return <Icon className="size-4" />;
}
