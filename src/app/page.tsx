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
import { ClientLogoRollingStrip } from "@/components/ClientLogoMarquee";

export default function Home() {
  return (
    <>
      <Preloader />
      <Hero />
      <Marquee />
      {/* <Services limit={6} showFilters={false} /> */}
      {/* <Projects limit={2} /> */}
      <Clients />
      <section className="relative overflow-hidden pb-20 md:pb-28">
        <ClientLogoRollingStrip />
      </section>
      <ContactCTA />
    </>
  );
}
