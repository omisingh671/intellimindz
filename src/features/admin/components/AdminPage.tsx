import { cn } from "@/shared/lib/utils";

export function AdminPageHeader({
  eyebrow,
  title,
  description,
}: {
  eyebrow: string;
  title: string;
  description: string;
}) {
  return (
    <div className="mb-6">
      <p className="text-xs font-bold uppercase tracking-[0.18em] text-blue-700">
        {eyebrow}
      </p>
      <h2 className="mt-2 text-2xl font-black tracking-tight text-slate-950">
        {title}
      </h2>
      <p className="mt-2 max-w-3xl text-sm leading-6 text-slate-600">
        {description}
      </p>
    </div>
  );
}

export function StatCard({
  label,
  value,
  tone = "blue",
}: {
  label: string;
  value: number | string;
  tone?: "blue" | "green" | "slate";
}) {
  return (
    <article className="rounded-lg border border-slate-200 bg-white p-5 shadow-sm shadow-slate-950/5">
      <p
        className={cn(
          "text-sm font-semibold",
          tone === "green" ? "text-emerald-700" : tone === "slate" ? "text-slate-600" : "text-blue-700",
        )}
      >
        {label}
      </p>
      <p className="mt-3 text-3xl font-black tracking-tight text-slate-950">
        {value}
      </p>
    </article>
  );
}

export function AdminTable({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div className="overflow-hidden rounded-lg border border-slate-200 bg-white shadow-sm shadow-slate-950/5">
      <div className="overflow-x-auto">
        <table className="min-w-full divide-y divide-slate-200 text-left text-sm">
          {children}
        </table>
      </div>
    </div>
  );
}

export function Th({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <th className="whitespace-nowrap px-4 py-3 text-xs font-bold uppercase tracking-[0.12em] text-slate-500">
      {children}
    </th>
  );
}

export function Td({ children }: Readonly<{ children: React.ReactNode }>) {
  return <td className="whitespace-nowrap px-4 py-4 font-medium text-slate-700">{children}</td>;
}
