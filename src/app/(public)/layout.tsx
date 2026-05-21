import { Suspense } from "react";
import { Footer } from "@/shared/components/layout/Footer";
import { Navbar } from "@/shared/components/layout/Navbar";

export default function PublicLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <>
      <Suspense fallback={<div className="min-h-20 border-b border-slate-200/80 bg-white" />}>
        <Navbar />
      </Suspense>
      {children}
      <Footer />
    </>
  );
}
