"use client";

import dynamic from "next/dynamic";
import type { ReactNode } from "react";
import { CurrencyProvider } from "@/lib/currency-context";
import { FavoritesProvider } from "@/lib/favorites-context";
import { FavoritesDrawerProvider } from "@/lib/favorites-drawer-context";

const FavoritesDrawer = dynamic(
  () =>
    import("@/components/FavoritesDrawer").then((mod) => mod.FavoritesDrawer),
  { ssr: false },
);

export function Providers({ children }: { children: ReactNode }) {
  return (
    <CurrencyProvider>
      <FavoritesProvider>
        <FavoritesDrawerProvider>
          {children}
          <FavoritesDrawer />
        </FavoritesDrawerProvider>
      </FavoritesProvider>
    </CurrencyProvider>
  );
}
