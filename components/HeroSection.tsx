"use client";

import { useEffect, useState } from "react";
import { HeroCenterContent } from "@/components/HeroCenterContent";
import HeroOrbit from "@/components/HeroOrbit";
import HeroWaterfall from "@/components/HeroWaterfall";

export default function HeroSection() {
  const [design, setDesign] = useState<"A" | "B">("A");

  useEffect(() => {
    setDesign(new Date().getDate() % 2 === 0 ? "B" : "A");
  }, []);

  return (
    <section className="relative overflow-hidden bg-surface-base px-4 pt-12 sm:px-10">
      <div
        className="hero-bg-layer pointer-events-none absolute inset-0 -z-10 opacity-20"
        aria-hidden="true"
      >
        <div className="hero-bg-mask h-full w-full">
          {design === "A" ? <HeroOrbit /> : <HeroWaterfall />}
        </div>
      </div>

      <div className="relative z-10 mx-auto w-full max-w-4xl text-center">
        <HeroCenterContent glass={design === "B"} />
      </div>

      <div className="relative z-10 mx-auto mt-10 max-w-3xl hero-gradient-line sm:mt-12" />
      <div className="pb-12" />
    </section>
  );
}
