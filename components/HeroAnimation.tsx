"use client";

import { useEffect, useState } from "react";
import HeroOrbit from "@/components/HeroOrbit";
import HeroWaterfall from "@/components/HeroWaterfall";

export default function HeroAnimation() {
  const [design, setDesign] = useState<"A" | "B">("A");

  useEffect(() => {
    setDesign(new Date().getDate() % 2 === 0 ? "B" : "A");
  }, []);

  return design === "A" ? <HeroOrbit /> : <HeroWaterfall />;
}
