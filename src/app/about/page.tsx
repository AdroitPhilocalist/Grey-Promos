"use client";

import React from "react";
import AboutStory from "@/components/AboutStory";
import AboutTeamReveal from "@/components/AboutTeamReveal";
import PresenceMap from "@/components/PresenceMap";
import ContactCTA from "@/components/ContactCTA";

export default function AboutPage() {
  return (
    <>
      <AboutStory />
      <AboutTeamReveal />
      <PresenceMap />
      <ContactCTA />
    </>
  );
}
