import { Reveal, Section } from "./Reveal";
import { about } from "./data";

export function About() {
  return (
    <Section id="about" index="01" title="About">
      <div className="grid gap-14 md:grid-cols-12">
        <div className="md:col-span-7 md:col-start-1">
          {about.paragraphs.map((p, i) => (
            <Reveal key={i} delay={i * 0.1}>
              <p className="mb-6 text-base leading-relaxed text-muted-foreground md:text-lg">{p}</p>
            </Reveal>
          ))}
        </div>

        <div className="md:col-span-4 md:col-start-9">
          <ul className="divide-y divide-hairline border-y border-hairline">
            {about.stats.map((s, i) => (
              <li key={s.label}>
                <Reveal delay={i * 0.08}>
                  <div className="flex items-baseline justify-between py-4">
                    <span className="text-xs uppercase tracking-widest text-muted-foreground">
                      {s.label}
                    </span>
                    <span className="font-display text-2xl text-primary">{s.value}</span>
                  </div>
                </Reveal>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </Section>
  );
}
