import React from "react";
import PageHero from "@/components/PageHero";
import Projects from "@/components/Projects";
import ContactCTA from "@/components/ContactCTA";

export default function WorkPage() {
  return (
    <>
      <PageHero 
        badge="Portfolio"
        title="Featured Work"
        subtitle="A collection of high-energy events, precision-built brand installations, and immersive activations designed to leave a lasting impression."
      />
      <Projects showTitle={false} />
      <ContactCTA />
    </>
  );
}
