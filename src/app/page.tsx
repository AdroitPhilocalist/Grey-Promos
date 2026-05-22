import Preloader from "@/components/Preloader";
import Hero from "@/components/Hero";
import Marquee from "@/components/Marquee";
import About from "@/components/About";
import Process from "@/components/Process";
import Services from "@/components/Services";
import Projects from "@/components/Projects";
import Clients from "@/components/Clients";
import Operations from "@/components/Operations";
import Team from "@/components/Team";
import Insights from "@/components/Insights";
import ContactCTA from "@/components/ContactCTA";

export default function Home() {
  return (
    <>
      <Preloader />
      <Hero />
      <Marquee />
      <About />
      <Process />
      <Services />
      <Projects />
      <Clients />
      <Operations />
      <Team />
      <Insights />
      <ContactCTA />
    </>
  );
}
