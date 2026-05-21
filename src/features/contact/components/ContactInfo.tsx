import { siteConfig } from "@/shared/constants/site";
import { Icons } from "@/shared/icons/icon-registry";

export function ContactInfo() {
  const items = [
    { label: "Email", value: siteConfig.email, Icon: Icons.mail },
    { label: "Phone", value: siteConfig.phone, Icon: Icons.phone },
    { label: "Location", value: siteConfig.location, Icon: Icons.building },
  ];

  return (
    <div className="rounded-3xl bg-blue-950 p-6 text-white sm:p-8">
      <h2 className="text-2xl font-bold">Institutional and learner enquiries</h2>
      <p className="mt-3 text-sm leading-7 text-blue-100">
        Use the form for course guidance, sponsorship interest, school or college
        programs, and future partnership conversations.
      </p>
      <div className="mt-7 space-y-4">
        {items.map(({ label, value, Icon }) => (
          <div key={label} className="flex gap-3">
            <span className="grid size-10 place-items-center rounded-2xl bg-white/10">
              <Icon className="size-5" />
            </span>
            <div>
              <p className="text-sm font-semibold text-blue-100">{label}</p>
              <p className="text-sm font-bold text-white">{value}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
