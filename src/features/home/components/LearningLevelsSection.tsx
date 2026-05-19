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
              className="flex min-h-[320px] flex-col rounded-3xl border border-slate-200 bg-white p-5 shadow-sm"
            >
              <div className="flex items-start justify-between gap-3">
                <span className="grid size-10 place-items-center rounded-2xl border border-slate-200 bg-white text-sm font-bold text-blue-700 shadow-sm">
                  {level.step}
                </span>
                <span className="rounded-full border border-blue-100 bg-blue-50 px-3 py-1 text-xs font-bold text-blue-700">
                  {level.label}
                </span>
              </div>
              <LevelMeta label="Duration" value={level.duration} />
              <LevelMeta label="Outcome" value={level.outcome} />
              <LevelMeta label="Ideal for" value={level.idealFor} />
              <ButtonLink href="/courses" className="mt-auto w-full">
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
      <p className="text-xs font-bold uppercase text-slate-400">{label}</p>
      <p className="mt-1 text-sm font-semibold leading-6 text-slate-800">{value}</p>
    </div>
  );
}
