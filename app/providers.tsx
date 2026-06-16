"use client";

import type { ReactNode } from "react";
import { FavoritesDrawer } from "@/components/FavoritesDrawer";
import {
  CurrencyProvider,
  type Currency,
} from "@/lib/currency-context";
import { FavoritesProvider } from "@/lib/favorites-context";
import { FavoritesDrawerProvider } from "@/lib/favorites-drawer-context";

export function Providers({
  children,
  defaultCurrency,
}: {
  children: ReactNode;
  defaultCurrency?: Currency;
}) {
  return (
    <CurrencyProvider defaultCurrency={defaultCurrency}>
      <FavoritesProvider>
        <FavoritesDrawerProvider>
          {children}
          <FavoritesDrawer />
        </FavoritesDrawerProvider>
      </FavoritesProvider>
    </CurrencyProvider>
  );
}
