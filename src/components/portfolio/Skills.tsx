import { BrainCircuit, Boxes, Code2, Database, Network, Wrench } from "lucide-react";
import type { LucideIcon } from "lucide-react";
import { Reveal, Section } from "./Reveal";
import { skillGroups } from "./data";

const icons: Record<string, LucideIcon> = {
  Code2,
  Boxes,
  Database,
  BrainCircuit,
  Wrench,
  Network,
};

export function Skills() {
  return (
    <Section
      id="skills"
      index="04"
      title="Skills"
      kicker="The stack I reach for, grouped by what it's actually for."
    >
      <div className="grid gap-px overflow-hidden rounded-xl border border-hairline bg-hairline md:grid-cols-2 xl:grid-cols-3">
        {skillGroups.map((group, i) => {
          const Icon = icons[group.icon] ?? Code2;
          return (
            <div key={group.category} className="bg-background/60 p-7">
              <Reveal delay={i * 0.05}>
                <div className="flex items-center gap-3">
                  <Icon className="h-4 w-4 text-primary" />
                  <h3 className="text-sm uppercase tracking-widest text-muted-foreground">
                    {group.category}
                  </h3>
                </div>
                <ul className="mt-5 flex flex-wrap gap-2">
                  {group.items.map((item) => (
                    <li
                      key={item}
                      data-hoverable
                      className="cursor-default rounded-full border border-hairline px-3 py-1.5 text-xs text-foreground/85 transition-all duration-300 hover:scale-105 hover:border-primary/50 hover:text-primary hover:shadow-[0_0_24px_-8px_var(--primary)]"
                    >
                      {item}
                    </li>
                  ))}
                </ul>
              </Reveal>
            </div>
          );
        })}
      </div>
    </Section>
  );
}
