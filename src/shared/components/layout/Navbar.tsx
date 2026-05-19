"use client";

import Link from "next/link";
import { useState } from "react";
import { primaryNavItems } from "@/shared/constants/nav";
import { siteConfig } from "@/shared/constants/site";
import { Icons } from "@/shared/icons/icon-registry";
import { cn } from "@/shared/lib/utils";
import { ButtonLink } from "@/shared/components/ui/Button";
import { Container } from "@/shared/components/ui/Container";

export function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const MenuIcon = isOpen ? Icons.x : Icons.menu;

  return (
    <header className="sticky top-0 z-50 border-b border-slate-200/80 bg-white/95 backdrop-blur">
      <Container className="flex min-h-20 items-center justify-between gap-4">
        <Link
          href="/"
          className="flex items-center gap-3 rounded-lg focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-600"
          aria-label={`${siteConfig.name} home`}
        >
          <span className="grid size-10 place-items-center rounded-2xl bg-gradient-to-br from-blue-600 to-cyan-500 text-sm font-bold text-white shadow-lg shadow-blue-600/20">
            {siteConfig.shortName}
          </span>
          <span className="min-w-0">
            <span className="block text-base font-bold text-slate-950">
              {siteConfig.name}
            </span>
            <span className="hidden text-xs text-slate-500 sm:block">
              {siteConfig.tagline}
            </span>
          </span>
        </Link>

        <nav className="hidden items-center gap-7 lg:flex" aria-label="Primary">
          {primaryNavItems.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className="text-sm font-semibold text-slate-600 transition hover:text-blue-700"
            >
              {item.label}
            </Link>
          ))}
        </nav>

        <div className="hidden items-center gap-3 lg:flex">
          <Link
            href="/login"
            className="text-sm font-semibold text-slate-600 transition hover:text-blue-700"
          >
            Login
          </Link>
          <ButtonLink href="/signup">Sign Up</ButtonLink>
        </div>

        <button
          type="button"
          className="grid size-11 place-items-center rounded-full border border-slate-200 text-slate-700 lg:hidden"
          aria-label="Toggle navigation"
          aria-expanded={isOpen}
          onClick={() => setIsOpen((current) => !current)}
        >
          <MenuIcon className="size-5" />
        </button>
      </Container>

      <div
        className={cn(
          "border-t border-slate-200 bg-white lg:hidden",
          isOpen ? "block" : "hidden",
        )}
      >
        <Container className="grid gap-2 py-4">
          {primaryNavItems.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className="rounded-xl px-3 py-3 text-sm font-semibold text-slate-700 hover:bg-slate-50"
              onClick={() => setIsOpen(false)}
            >
              {item.label}
            </Link>
          ))}
          <div className="grid grid-cols-2 gap-3 pt-2">
            <ButtonLink href="/login" variant="outline">
              Login
            </ButtonLink>
            <ButtonLink href="/signup">Sign Up</ButtonLink>
          </div>
        </Container>
      </div>
    </header>
  );
}
