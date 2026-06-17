"use client";

import {
  createContext,
  useContext,
  useEffect,
  useState,
  type ReactNode,
} from "react";

export type Currency = "INR" | "USD";
export type Region = "IN" | "US";

interface CurrencyContextType {
  currency: Currency;
  region: Region;
  setRegion: (region: Region) => void;
  symbol: string;
  name: string;
}

const CurrencyContext = createContext<CurrencyContextType>({
  currency: "INR",
  region: "IN",
  setRegion: () => {},
  symbol: "₹",
  name: "INR",
});

const STORAGE_KEY = "wu-currency";
const OVERRIDE_COOKIE = "wu-currency-override";
const DEFAULT_COOKIE = "wu-currency-default";

function regionToCurrency(region: Region): Currency {
  return region === "IN" ? "INR" : "USD";
}

function currencyToRegion(currency: Currency): Region {
  return currency === "INR" ? "IN" : "US";
}

function readCookie(name: string): string | null {
  if (typeof document === "undefined") return null;
  const match = document.cookie.match(new RegExp(`(?:^|; )${name}=([^;]*)`));
  return match ? decodeURIComponent(match[1]) : null;
}

function setCookie(name: string, value: string) {
  document.cookie = `${name}=${encodeURIComponent(value)};path=/;max-age=${60 * 60 * 24 * 365};samesite=lax`;
}

export function CurrencyProvider({ children }: { children: ReactNode }) {
  const [currency, setCurrencyState] = useState<Currency>("USD");

  useEffect(() => {
    const saved = localStorage.getItem(STORAGE_KEY) as Currency | null;
    if (saved === "INR" || saved === "USD") {
      setCurrencyState(saved);
      return;
    }

    const cookieDefault = readCookie(DEFAULT_COOKIE) as Currency | null;
    if (cookieDefault === "INR" || cookieDefault === "USD") {
      setCurrencyState(cookieDefault);
    }
  }, []);

  const setRegion = (region: Region) => {
    const next = regionToCurrency(region);
    setCurrencyState(next);
    localStorage.setItem(STORAGE_KEY, next);
    setCookie(OVERRIDE_COOKIE, "1");
  };

  const region = currencyToRegion(currency);

  return (
    <CurrencyContext.Provider
      value={{
        currency,
        region,
        setRegion,
        symbol: currency === "INR" ? "₹" : "$",
        name: currency,
      }}
    >
      {children}
    </CurrencyContext.Provider>
  );
}

export const useCurrency = () => useContext(CurrencyContext);
