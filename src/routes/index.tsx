import { createFileRoute } from "@tanstack/react-router";
import { Background } from "@/components/portfolio/Background";
import { Cursor } from "@/components/portfolio/Cursor";
import { Nav } from "@/components/portfolio/Nav";
import { Hero } from "@/components/portfolio/Hero";
import { About } from "@/components/portfolio/About";
import { Experience } from "@/components/portfolio/Experience";
import { Projects } from "@/components/portfolio/Projects";
import { Skills } from "@/components/portfolio/Skills";
import { Achievements } from "@/components/portfolio/Achievements";
import { Resume } from "@/components/portfolio/Resume";
import { Contact, Footer } from "@/components/portfolio/Contact";
import { useLenis } from "@/components/portfolio/useLenis";

const title = "Aastha — Full Stack Developer & AI/ML Enthusiast";
const description =
  "Portfolio of Aastha, a full stack developer and AI/ML enthusiast building RAG systems, analytics platforms and role-based web apps.";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title },
      { name: "description", content: description },
      { property: "og:title", content: title },
      { property: "og:description", content: description },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: Index,
});

function Index() {
  useLenis();

  return (
    <div className="relative min-h-screen">
      <Background />
      <Cursor />
      <Nav />
      <main>
        <Hero />
        <About />
        <Experience />
        <Projects />
        <Skills />
        <Achievements />
        <Resume />
        <Contact />
      </main>
      <Footer />
    </div>
  );
}
