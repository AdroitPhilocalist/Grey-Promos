import React from "react";
import PageHero from "@/components/PageHero";
import ContactCTA from "@/components/ContactCTA";

export default function ContactPage() {
  return (
    <>
      <PageHero 
        badge="Connect"
        title="Let's Build Something Impactful"
        subtitle="Ready to take your brand to the next level? Tell us about your project and let's create an extraordinary experience together."
      />
      <ContactCTA />
    </>
  );
}
