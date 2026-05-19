import { learningLevels } from "@/features/home/data/home.data";
import { ButtonLink } from "@/shared/components/ui/Button";
import { Container } from "@/shared/components/ui/Container";
import { SectionHeader } from "@/shared/components/ui/SectionHeader";

export function LearningLevelsSection() {
  return (
    <section className="bg-white py-16 sm:py-20">
      <Container>
        <SectionHeader
          title="From quick discovery to advanced specialisation"
          description="The course architecture is designed as a clear learning ladder."
        />
        <div className="mt-10 grid gap-4 md:grid-cols-2 xl:grid-cols-5">
          {learningLevels.map((level) => (
            <article
              key={level.step}
              className="flex min-h-[338px] flex-col rounded-[1.35rem] border border-slate-200 bg-slate-50/80 p-5 shadow-[0_2px_10px_rgba(15,23,42,0.08)] transition hover:-translate-y-1 hover:border-blue-100 hover:bg-white hover:shadow-[0_18px_35px_rgba(15,23,42,0.12)]"
            >
              <div className="flex items-start justify-between gap-3">
                <span className="grid size-10 place-items-center rounded-2xl border border-slate-200 bg-white text-sm font-bold text-blue-700 shadow-[0_3px_8px_rgba(15,23,42,0.12)]">
                  {level.step}
                </span>
                <span className="rounded-full border border-blue-100 bg-blue-50 px-3 py-1 text-xs font-bold text-blue-700">
                  {level.label}
                </span>
              </div>
              <div className="flex-1">
                <LevelMeta label="Duration" value={level.duration} />
                <LevelMeta label="Outcome" value={level.outcome} />
                <LevelMeta label="Ideal for" value={level.idealFor} />
              </div>
              <ButtonLink
                href={`/courses?level=${encodeURIComponent(level.label)}`}
                className="mt-6 w-full"
              >
                Explore Courses
              </ButtonLink>
            </article>
          ))}
        </div>
      </Container>
    </section>
  );
}

type LevelMetaProps = {
  label: string;
  value: string;
};

function LevelMeta({ label, value }: LevelMetaProps) {
  return (
    <div className="mt-5">
      <p className="text-xs font-bold uppercase text-blue-900/40">{label}</p>
      <p className="mt-1 text-sm font-semibold leading-6 text-blue-950/85">
        {value}
      </p>
    </div>
  );
}
