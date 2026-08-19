import About from "@/components/About";
import Contact from "@/components/Contact";
import Footer from "@/components/Footer";
import Hero from "@/components/Hero";
import Nav from "@/components/Nav";
import Projects from "@/components/Projects";
import ScrollProgress from "@/components/ScrollProgress";
import Stack from "@/components/Stack";
import Work from "@/components/Work";
import Background from "@/components/backgrounds";

export default function Home() {
  return (
    <>
      {/* One pinned decoration layer for the whole page. Fixed rather than
          repeated per section, so nothing repaints on scroll and no seams
          show between sections. */}
      <div className="fixed inset-0 -z-10">
        <Background />
      </div>

      <ScrollProgress />
      <Nav />

      <main className="flex-1">
        <Hero />
        <About />
        <Stack />
        <Work />
        <Projects />
        <Contact />
      </main>

      <Footer />
    </>
  );
}
