import React from "react";
import PageHero from "@/components/PageHero";
import Insights from "@/components/Insights";
import ContactCTA from "@/components/ContactCTA";

export default function InsightsPage() {
  return (
    <>
      <PageHero 
        badge="Insights"
        title="Knowledge That Moves"
        subtitle="Exploring the latest trends, strategies, and success stories in the world of brand experiences and on-ground marketing."
      />
      <Insights />
      <ContactCTA />
    </>
  );
}
