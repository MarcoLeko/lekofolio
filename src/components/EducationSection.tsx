import cv from "../../cv.json";

type EducationItem = {
  school: string;
  degree: string;
  period: string;
};

const education: EducationItem[] = cv.education.map((item) => ({
  school: item.institution,
  degree: item.degree,
  period: item.period,
}));

export default function EducationSection() {
  return (
    <section className="bg-surface py-24">
      <div className="mx-auto max-w-7xl px-8">
        <div className="flex flex-col justify-between gap-8 border-t border-outline-variant/20 pt-16 md:flex-row md:items-center">
          <h2 className="font-headline text-sm font-bold uppercase tracking-[0.2em] text-primary">
            Education
          </h2>
          <div className="flex flex-col gap-6 md:flex-row md:items-center md:gap-16">
            {education.map((item, index) => (
              <div
                key={item.school}
                className="flex items-center gap-6 md:gap-16"
              >
                <div className="space-y-1">
                  <p className="font-body font-bold text-on-surface">
                    {item.school}
                  </p>
                  <p className="text-sm text-on-surface-variant">
                    {item.degree}
                  </p>
                  <p className="font-label text-xs uppercase tracking-wide text-outline">
                    {item.period}
                  </p>
                </div>
                {index < education.length - 1 ? (
                  <div className="hidden h-8 w-px bg-outline-variant/30 md:block" />
                ) : null}
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
