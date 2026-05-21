import { donationImpacts } from "@/features/home/data/home.data";
import { Icons } from "@/shared/icons/icon-registry";

export function DonationCard() {
  return (
    <aside className="rounded-3xl bg-blue-950 p-6 text-white shadow-sm sm:p-8">
      <h3 className="text-2xl font-bold">How will your donation impact?</h3>
      <ul className="mt-7 space-y-5">
        {donationImpacts.map((impact) => (
          <li key={impact} className="flex gap-3 text-sm font-medium">
            <Icons.check className="mt-0.5 size-4 shrink-0 text-emerald-300" />
            <span>{impact}</span>
          </li>
        ))}
      </ul>
    </aside>
  );
}
