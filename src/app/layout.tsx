import type { Metadata } from "next";
import { Footer } from "@/shared/components/layout/Footer";
import { Navbar } from "@/shared/components/layout/Navbar";
import { siteConfig } from "@/shared/constants/site";
import { AppProviders } from "@/shared/providers/AppProviders";
import "./globals.css";

export const metadata: Metadata = {
  title: {
    default: siteConfig.name,
    template: `%s | ${siteConfig.name}`,
  },
  description: siteConfig.description,
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>
        <AppProviders>
          <Navbar />
          {children}
          <Footer />
        </AppProviders>
      </body>
    </html>
  );
}
