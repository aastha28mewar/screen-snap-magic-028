import { ArrowUpRight, FileText } from "lucide-react";
import { Button } from "@/components/ui/button";
import resumeAsset from "@/assets/resume.asset.json";
import { education } from "./data";
import { Reveal, Section } from "./Reveal";

export function Resume() {
  return (
    <Section id="resume" index="06" title="Résumé">
      <Reveal>
        <div className="flex flex-col justify-between gap-8 border-y border-hairline py-8 md:flex-row md:items-center">
          <div className="flex items-start gap-4">
            <FileText className="mt-1 h-6 w-6 shrink-0 text-primary" />
            <div>
              <h3 className="font-display text-xl">Aastha</h3>
              <p className="mt-2 text-sm text-muted-foreground">LLM Intern · Full Stack Developer · AI/ML</p>
              <p className="mt-2 text-sm text-muted-foreground">{education.degree} · Class of 2027</p>
              <p className="mt-3 font-mono text-xs text-muted-foreground">PDF · 1 page</p>
            </div>
          </div>
          <Button asChild className="self-start md:self-auto">
            <a href={resumeAsset.url} target="_blank" rel="noopener noreferrer">
              Open résumé <ArrowUpRight />
            </a>
          </Button>
        </div>
      </Reveal>
    </Section>
  );
}