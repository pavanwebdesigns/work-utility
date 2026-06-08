"use client";

import Image from "next/image";
import { useState } from "react";

interface LogoProps {
  size?: "default" | "small";
}

export function Logo({ size = "default" }: LogoProps) {
  const [hasError, setHasError] = useState(false);
  const isSmall = size === "small";

  if (hasError) {
    return (
      <div
        className={`flex items-center justify-center rounded-md bg-brand-blue font-bold text-white ${
          isSmall ? "h-6 w-6 text-[10px]" : "h-8 w-8 text-xs"
        }`}
      >
        WU
      </div>
    );
  }

  return (
    <Image
      src="/logo.svg"
      alt="WorkUtilities"
      width={isSmall ? 24 : 120}
      height={isSmall ? 24 : 32}
      className={isSmall ? "h-6 w-auto" : "h-8 w-auto"}
      priority={!isSmall}
      onError={() => setHasError(true)}
    />
  );
}
