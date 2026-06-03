"use client";

import React from "react";

interface PageHeroProps {
  title: string;
  subtitle: string;
  badge: string;
}

export default function PageHero({ title, subtitle, badge }: PageHeroProps) {
  return (
    <section className="relative pt-40 pb-20 md:pt-48 md:pb-32 overflow-hidden">
      {/* Background Elements */}
      <div className="absolute inset-0 z-0">
        <div className="absolute inset-0 polka-hero-field pointer-events-none" />
        <div className="polka-section-accent right" />
      </div>

      <div className="container-custom relative z-10">
        <div className="max-w-4xl">
          <div className="inline-flex items-center gap-3 px-4 py-1.5 rounded-full border border-white/[0.08] bg-white/[0.02] text-[10px] md:text-xs font-bold uppercase tracking-wider text-accent mb-8">
            <span className="w-1.5 h-1.5 rounded-full bg-accent animate-pulse" />
            {badge}
          </div>

          <h1 className="text-6xl md:text-8xl lg:text-9xl font-display font-bold leading-[0.9] mb-10 tracking-tight">
            {title}
          </h1>

          <p className="text-lg md:text-2xl text-muted leading-relaxed max-w-2xl font-light tracking-wide">
            {subtitle}
          </p>
        </div>
      </div>
      
      {/* Bottom Divider */}
      <div className="absolute bottom-0 left-0 w-full h-[1px] bg-gradient-to-r from-transparent via-white/10 to-transparent" />
    </section>
  );
}
