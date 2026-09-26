import { useState } from "react";
import { Github, Linkedin, Mail, Phone, Send } from "lucide-react";
import { toast } from "sonner";
import { Reveal, Section } from "./Reveal";
import { profile } from "./data";

export function Contact() {
  const [form, setForm] = useState({ name: "", email: "", message: "" });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // No backend yet: hand the message to the visitor's mail client.
    const subject = encodeURIComponent(`Portfolio message from ${form.name}`);
    const body = encodeURIComponent(`${form.message}\n\n— ${form.name} (${form.email})`);
    window.location.href = `mailto:${profile.email}?subject=${subject}&body=${body}`;
    toast.success("Opening your email app with the message ready to send.");
  };

  const field =
    "w-full rounded-md border border-hairline bg-card/50 px-4 py-3 text-sm text-foreground placeholder:text-muted-foreground/70 transition-colors focus:border-primary/60 focus:outline-none";

  return (
    <Section
      id="contact"
      index="06"
      title="Let's talk"
      kicker="Internships, collaborations, or a half-formed AI idea — I read everything."
    >
      <div className="grid gap-14 md:grid-cols-12">
        <div className="md:col-span-6">
          <Reveal>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label htmlFor="name" className="mb-2 block text-xs uppercase tracking-widest text-muted-foreground">
                  Name
                </label>
                <input
                  id="name"
                  required
                  className={field}
                  placeholder="Your name"
                  value={form.name}
                  onChange={(e) => setForm({ ...form, name: e.target.value })}
                />
              </div>
              <div>
                <label htmlFor="email" className="mb-2 block text-xs uppercase tracking-widest text-muted-foreground">
                  Email
                </label>
                <input
                  id="email"
                  type="email"
                  required
                  className={field}
                  placeholder="you@company.com"
                  value={form.email}
                  onChange={(e) => setForm({ ...form, email: e.target.value })}
                />
              </div>
              <div>
                <label htmlFor="message" className="mb-2 block text-xs uppercase tracking-widest text-muted-foreground">
                  Message
                </label>
                <textarea
                  id="message"
                  required
                  rows={5}
                  className={field}
                  placeholder="What are you building?"
                  value={form.message}
                  onChange={(e) => setForm({ ...form, message: e.target.value })}
                />
              </div>
              <button
                type="submit"
                className="group inline-flex items-center gap-2 rounded-full bg-primary px-5 py-3 text-sm font-medium text-primary-foreground transition-transform hover:scale-[1.03]"
              >
                Send message
                <Send className="h-4 w-4 transition-transform group-hover:translate-x-0.5" />
              </button>
            </form>
          </Reveal>
        </div>

        <div className="md:col-span-5 md:col-start-8">
          <Reveal delay={0.1}>
            <ul className="divide-y divide-hairline border-y border-hairline">
              <li>
                <a
                  href={`mailto:${profile.email}`}
                  className="flex items-center gap-3 py-4 text-sm transition-colors hover:text-primary"
                >
                  <Mail className="h-4 w-4 text-primary" />
                  {profile.email}
                </a>
              </li>
              <li>
                <a
                  href={`tel:${profile.phone.replace(/\s/g, "")}`}
                  className="flex items-center gap-3 py-4 text-sm transition-colors hover:text-primary"
                >
                  <Phone className="h-4 w-4 text-primary" />
                  {profile.phone}
                </a>
              </li>
              <li>
                <a
                  href={profile.links.github}
                  target="_blank"
                  rel="noreferrer"
                  className="flex items-center gap-3 py-4 text-sm transition-colors hover:text-primary"
                >
                  <Github className="h-4 w-4 text-primary" />
                  github.com/aasthamewar
                </a>
              </li>
              <li>
                <a
                  href={profile.links.linkedin}
                  target="_blank"
                  rel="noreferrer"
                  className="flex items-center gap-3 py-4 text-sm transition-colors hover:text-primary"
                >
                  <Linkedin className="h-4 w-4 text-primary" />
                  linkedin.com/in/aastha-354827323
                </a>
              </li>
            </ul>
          </Reveal>
        </div>
      </div>
    </Section>
  );
}

export function Footer() {
  return (
    <footer className="border-t border-hairline px-6 py-10 md:px-12">
      <div className="mx-auto flex max-w-6xl flex-col gap-3 text-xs text-muted-foreground md:flex-row md:items-center md:justify-between">
        <p>© {new Date().getFullYear()} Aastha. All rights reserved.</p>
        <p>Built with React, TanStack Start and Motion.</p>
      </div>
    </footer>
  );
}
