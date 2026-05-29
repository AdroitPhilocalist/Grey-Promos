import React from "react";
import PageHero from "@/components/PageHero";
import About from "@/components/About";
import Team from "@/components/Team";
import Operations from "@/components/Operations";
import ContactCTA from "@/components/ContactCTA";

export default function AboutPage() {
  return (
    <>
      <PageHero 
        badge="About Us"
        title="Experience the Extraordinary"
        subtitle="Since 2015, Grey Promos has been pioneering brand activations that bridge the gap between creative vision and real-world impact."
      />
      <About />
      <Team />
      <Operations />
      <ContactCTA />
    </>
  );
}
