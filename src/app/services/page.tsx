import React from "react";
import PageHero from "@/components/PageHero";
import Services from "@/components/Services";
import Process from "@/components/Process";
import ContactCTA from "@/components/ContactCTA";

export default function ServicesPage() {
  return (
    <>
      <PageHero 
        badge="Our Expertise"
        title="Full-Spectrum Brand Solutions"
        subtitle="From concept to execution, we provide tailored marketing and activation services designed for maximum brand visibility and impact."
      />
      <Services />
      <Process />
      <ContactCTA />
    </>
  );
}
