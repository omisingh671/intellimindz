import Image from "next/image";
import Link from "next/link";
import { footerLinks } from "@/shared/constants/nav";
import { siteConfig } from "@/shared/constants/site";
import { Container } from "@/shared/components/ui/Container";

export function Footer() {
  return (
    <footer className="border-t border-slate-200 bg-white">
      <Container className="grid gap-10 py-12 md:grid-cols-[1.4fr_1fr_1fr_1fr]">
        <div>
          <Link
            href="/"
            className="inline-flex rounded-lg focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-600"
            aria-label={`${siteConfig.name} home`}
          >
            <Image
              src="/images/logo.png"
              alt={siteConfig.name}
              width={560}
              height={150}
              className="h-12 w-auto max-w-55 object-contain"
            />
          </Link>
          <p className="mt-5 max-w-sm text-sm leading-7 text-slate-600">
            {siteConfig.description}
          </p>
        </div>

        <FooterColumn title="Platform" links={footerLinks.platform} />
        <FooterColumn title="Categories" links={footerLinks.categories} />
        <FooterColumn title="Action" links={footerLinks.action} />
      </Container>

      <div className="border-t border-slate-200 py-6 text-center text-sm text-slate-500">
        © 2026 {siteConfig.name}. All rights reserved.
      </div>
    </footer>
  );
}

type FooterColumnProps = {
  title: string;
  links: {
    label: string;
    href: string;
  }[];
};

function FooterColumn({ title, links }: FooterColumnProps) {
  return (
    <div>
      <h2 className="text-sm font-bold text-slate-950">{title}</h2>
      <ul className="mt-5 space-y-3">
        {links.map((link) => (
          <li key={`${title}-${link.label}`}>
            <Link
              href={link.href}
              className="text-sm text-slate-600 transition hover:text-blue-700"
            >
              {link.label}
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}
