import { useEffect, useState } from "react";
import { motion, useReducedMotion } from "motion/react";
import { ArrowDown, ArrowUpRight, Github, Linkedin, Mail, Code } from "lucide-react";
import { profile } from "./data";
import { scrollToSection } from "./useLenis";

/** Typewriter that cycles through roles. */
function RoleTypewriter({ roles }: { roles: string[] }) {
  const reduced = useReducedMotion();
  const [index, setIndex] = useState(0);
  const [text, setText] = useState(roles[0] ?? "");
  const [deleting, setDeleting] = useState(false);

  useEffect(() => {
    if (reduced) return;
    const current = roles[index] ?? roles[0]!;
    const done = text === current;

    const timeout = window.setTimeout(
      () => {
        if (!deleting) {
          if (done) setDeleting(true);
          else setText(current.slice(0, text.length + 1));
        } else if (text.length === 0) {
          setDeleting(false);
          setIndex((i) => (i + 1) % roles.length);
        } else {
          setText(current.slice(0, text.length - 1));
        }
      },
      deleting ? 36 : done ? 1800 : 70,
    );

    return () => window.clearTimeout(timeout);
  }, [text, deleting, index, roles, reduced]);

  return (
    <span className="text-primary">
      {text}
      <span className="ml-0.5 inline-block h-[1em] w-[2px] translate-y-[0.1em] animate-pulse bg-primary align-middle" />
    </span>
  );
}

const socials = [
  { href: profile.links.github, label: "GitHub", Icon: Github },
  { href: profile.links.linkedin, label: "LinkedIn", Icon: Linkedin },
  { href: profile.links.leetcode, label: "LeetCode", Icon: Code },
  { href: `mailto:${profile.email}`, label: "Email", Icon: Mail },
];

export function Hero() {
  const reduced = useReducedMotion();
  const words = profile.tagline.split(" ");

  return (
    <section
      id="hero"
      className="relative flex min-h-[100svh] items-end px-6 pb-20 pt-32 md:px-12 md:pb-28"
    >
      <div className="mx-auto w-full max-w-6xl">
        <div className="grid gap-12 md:grid-cols-12 md:items-end">
          <div className="md:col-span-8">
            <motion.p
              initial={reduced ? false : { opacity: 0, y: 10 }}
              animate={reduced ? false : { opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="font-mono text-xs uppercase tracking-[0.25em] text-muted-foreground"
            >
              New Delhi, India — available for 2027 roles
            </motion.p>

            <h1 className="mt-8 text-[15vw] font-medium leading-[0.86] tracking-tighter md:text-[9rem]">
              {"Aastha".split("").map((letter, i) => (
                <motion.span
                  key={i}
                  className="inline-block"
                  initial={reduced ? false : { opacity: 0, y: "0.4em", filter: "blur(10px)" }}
                  animate={reduced ? false : { opacity: 1, y: 0, filter: "blur(0px)" }}
                  transition={{ duration: 0.8, delay: 0.1 + i * 0.06, ease: [0.22, 1, 0.36, 1] }}
                >
                  {letter}
                </motion.span>
              ))}
            </h1>

            <p className="mt-8 font-display text-xl md:text-3xl">
              <RoleTypewriter roles={profile.roles} />
            </p>

            <p className="mt-6 max-w-lg font-serif text-2xl italic leading-snug text-muted-foreground md:text-3xl">
              {words.map((w, i) => (
                <motion.span
                  key={i}
                  className="inline-block"
                  initial={reduced ? false : { opacity: 0, y: 14 }}
                  animate={reduced ? false : { opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: 0.7 + i * 0.09 }}
                >
                  {w}&nbsp;
                </motion.span>
              ))}
            </p>
          </div>

          <div className="md:col-span-4 md:pb-4">
            <div className="flex flex-wrap items-center gap-3">
              <button
                onClick={() => scrollToSection("projects")}
                className="group inline-flex items-center gap-2 rounded-full bg-primary px-5 py-3 text-sm font-medium text-primary-foreground transition-transform hover:scale-[1.03]"
              >
                View work
                <ArrowUpRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
              </button>
              <a
                href={`mailto:${profile.email}`}
                className="inline-flex items-center gap-2 rounded-full border border-border px-5 py-3 text-sm transition-colors hover:border-primary/50 hover:text-primary"
              >
                Email me
              </a>
            </div>

            <ul className="mt-8 flex items-center gap-4">
              {socials.map(({ href, label, Icon }) => (
                <li key={label}>
                  <a
                    href={href}
                    target={href.startsWith("mailto") ? undefined : "_blank"}
                    rel="noreferrer"
                    aria-label={label}
                    className="inline-flex h-10 w-10 items-center justify-center rounded-full border border-hairline text-muted-foreground transition-all hover:border-primary/50 hover:text-primary"
                  >
                    <Icon className="h-4 w-4" />
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div className="mt-20 flex items-center gap-3 text-xs text-muted-foreground">
          <motion.span
            animate={reduced ? false : { y: [0, 6, 0] }}
            transition={{ duration: 1.8, repeat: Infinity }}
          >
            <ArrowDown className="h-4 w-4" />
          </motion.span>
          Scroll
        </div>
      </div>
    </section>
  );
}
