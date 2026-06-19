export function getRailwayApiBaseUrl(): string {
  const baseUrl = process.env.NEXT_PUBLIC_PDF_API_URL;
  if (!baseUrl) {
    throw new Error("API service is not configured");
  }
  return baseUrl.replace(/\/$/, "");
}

export type CurrencyRatesResponse = {
  base: string;
  date: string;
  rates: Record<string, number>;
  cached?: boolean;
};

export type CryptoCoin = {
  id: string;
  name: string;
  price_usd: number | null;
  price_inr: number | null;
  change_24h: number | null;
  market_cap_usd: number | null;
  volume_24h_usd: number | null;
};

export type CryptoPricesResponse = {
  updated_at: number;
  vs_currency: string;
  coins: CryptoCoin[];
  cached?: boolean;
};

export type DnsRecord = {
  name: string;
  type: string;
  ttl: number | null;
  data: string;
};

export type DnsLookupResponse = {
  domain: string;
  records: DnsRecord[];
};

export type IpLookupResponse = {
  ip: string;
  country: string | null;
  country_code: string | null;
  region: string | null;
  city: string | null;
  isp: string | null;
  organization: string | null;
  timezone: string | null;
  latitude: number | null;
  longitude: number | null;
  cached?: boolean;
};

async function parseJson<T>(response: Response): Promise<T> {
  if (!response.ok) {
    let message = "Request failed";
    try {
      const error = await response.json();
      if (typeof error.detail === "string") {
        message = error.detail;
      }
    } catch {
      // ignore
    }
    throw new Error(message);
  }
  return response.json() as Promise<T>;
}

export async function fetchCurrencyRates(
  base: string
): Promise<CurrencyRatesResponse> {
  const response = await fetch(
    `${getRailwayApiBaseUrl()}/api/currency/rates?base=${encodeURIComponent(base)}`
  );
  return parseJson(response);
}

export async function fetchCryptoPrices(
  ids?: string
): Promise<CryptoPricesResponse> {
  const params = new URLSearchParams({ vs_currency: "usd" });
  if (ids) params.set("ids", ids);
  const response = await fetch(
    `${getRailwayApiBaseUrl()}/api/crypto/prices?${params.toString()}`
  );
  return parseJson(response);
}

export async function fetchDnsLookup(
  domain: string,
  type: string
): Promise<DnsLookupResponse> {
  const params = new URLSearchParams({
    domain,
    type,
  });
  const response = await fetch(
    `${getRailwayApiBaseUrl()}/api/dns/lookup?${params.toString()}`
  );
  return parseJson(response);
}

export async function fetchIpLookup(ip?: string): Promise<IpLookupResponse> {
  const params = ip ? `?ip=${encodeURIComponent(ip)}` : "";
  const response = await fetch(
    `${getRailwayApiBaseUrl()}/api/ip/lookup${params}`
  );
  return parseJson(response);
}

/** Client-side public IP via ipify — used so "My IP" is the user's IP, not Railway's. */
export async function fetchClientPublicIp(): Promise<string> {
  const response = await fetch("https://api.ipify.org?format=json");
  if (!response.ok) throw new Error("Could not detect your IP address");
  const data = (await response.json()) as { ip: string };
  return data.ip;
}

export function formatUsd(value: number | null | undefined): string {
  if (value === null || value === undefined) return "—";
  if (value >= 1) {
    return new Intl.NumberFormat("en-US", {
      style: "currency",
      currency: "USD",
      maximumFractionDigits: value >= 100 ? 0 : 2,
    }).format(value);
  }
  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
    maximumSignificantDigits: 4,
  }).format(value);
}

export function formatInr(value: number | null | undefined): string {
  if (value === null || value === undefined) return "—";
  return new Intl.NumberFormat("en-IN", {
    style: "currency",
    currency: "INR",
    maximumFractionDigits: value >= 100 ? 0 : 2,
  }).format(value);
}

export function formatCompactUsd(value: number | null | undefined): string {
  if (value === null || value === undefined) return "—";
  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
    notation: "compact",
    maximumFractionDigits: 2,
  }).format(value);
}

export const SUPPORTED_CURRENCIES = [
  "USD",
  "EUR",
  "GBP",
  "INR",
  "JPY",
  "AUD",
  "CAD",
  "CHF",
  "CNY",
  "SGD",
  "AED",
  "SAR",
] as const;

export type SupportedCurrency = (typeof SUPPORTED_CURRENCIES)[number];

export const CURRENCY_LABELS: Record<SupportedCurrency, string> = {
  USD: "US Dollar",
  EUR: "Euro",
  GBP: "British Pound",
  INR: "Indian Rupee",
  JPY: "Japanese Yen",
  AUD: "Australian Dollar",
  CAD: "Canadian Dollar",
  CHF: "Swiss Franc",
  CNY: "Chinese Yuan",
  SGD: "Singapore Dollar",
  AED: "UAE Dirham",
  SAR: "Saudi Riyal",
};

export const DNS_RECORD_TYPES = [
  "A",
  "AAAA",
  "CNAME",
  "MX",
  "TXT",
  "NS",
  "SOA",
  "ALL",
] as const;

export const CRYPTO_COINS = [
  { id: "bitcoin", symbol: "BTC" },
  { id: "ethereum", symbol: "ETH" },
  { id: "tether", symbol: "USDT" },
  { id: "binancecoin", symbol: "BNB" },
  { id: "solana", symbol: "SOL" },
  { id: "ripple", symbol: "XRP" },
  { id: "usd-coin", symbol: "USDC" },
  { id: "cardano", symbol: "ADA" },
  { id: "dogecoin", symbol: "DOGE" },
  { id: "tron", symbol: "TRX" },
  { id: "avalanche-2", symbol: "AVAX" },
  { id: "shiba-inu", symbol: "SHIB" },
  { id: "chainlink", symbol: "LINK" },
  { id: "matic-network", symbol: "MATIC" },
  { id: "litecoin", symbol: "LTC" },
] as const;
