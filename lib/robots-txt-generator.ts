export type RobotsRule = {
  id: string;
  userAgent: string;
  allow: string[];
  disallow: string[];
  crawlDelay?: number;
};

export type RobotsTxtConfig = {
  rules: RobotsRule[];
  sitemapUrl: string;
};

export const ROBOTS_USER_AGENT_PRESETS = [
  { value: "*", label: "All Robots (*)" },
  { value: "Googlebot", label: "Googlebot" },
  { value: "Bingbot", label: "Bingbot" },
  { value: "GPTBot", label: "GPTBot (OpenAI)" },
  { value: "CCBot", label: "CCBot (Common Crawl)" },
  { value: "AhrefsBot", label: "AhrefsBot" },
  { value: "SemrushBot", label: "SemrushBot" },
  { value: "Claude-Web", label: "Claude-Web" },
  { value: "meta-externalagent", label: "meta-externalagent (Meta AI)" },
] as const;

export type RobotsPresetId =
  | "allow-all"
  | "block-ai"
  | "wordpress"
  | "nextjs"
  | "block-all";

export const ROBOTS_PRESETS: Record<
  RobotsPresetId,
  { label: string; rules: Omit<RobotsRule, "id">[]; sitemapUrl?: string }
> = {
  "allow-all": {
    label: "Allow All (Default)",
    rules: [{ userAgent: "*", allow: ["/"], disallow: [] }],
  },
  "block-ai": {
    label: "Block AI Crawlers",
    rules: [
      { userAgent: "GPTBot", allow: [], disallow: ["/"] },
      { userAgent: "CCBot", allow: [], disallow: ["/"] },
      { userAgent: "Claude-Web", allow: [], disallow: ["/"] },
      { userAgent: "meta-externalagent", allow: [], disallow: ["/"] },
    ],
  },
  wordpress: {
    label: "WordPress Standard",
    rules: [
      {
        userAgent: "*",
        allow: ["/wp-admin/admin-ajax.php"],
        disallow: ["/wp-admin/"],
      },
    ],
  },
  nextjs: {
    label: "Next.js / Vercel",
    rules: [
      {
        userAgent: "*",
        allow: [],
        disallow: ["/_next/static/", "/_next/image/", "/api/"],
      },
    ],
  },
  "block-all": {
    label: "Block All Bots",
    rules: [{ userAgent: "*", allow: [], disallow: ["/"] }],
  },
};

let ruleIdCounter = 0;

export function createEmptyRule(userAgent = "*"): RobotsRule {
  ruleIdCounter += 1;
  return {
    id: `rule-${ruleIdCounter}`,
    userAgent,
    allow: [],
    disallow: [],
  };
}

export function validateRobotsPath(path: string): string | null {
  const trimmed = path.trim();
  if (!trimmed) return null;
  if (trimmed === "/") return null;
  if (!trimmed.startsWith("/")) {
    return "Paths should start with / (e.g. /admin/, not admin)";
  }
  return null;
}

export function generateRobotsTxt(config: RobotsTxtConfig): string {
  const lines: string[] = [];

  for (const rule of config.rules) {
    if (!rule.userAgent.trim()) continue;

    lines.push(`User-agent: ${rule.userAgent.trim()}`);

    for (const path of rule.disallow) {
      const trimmed = path.trim();
      if (trimmed) lines.push(`Disallow: ${trimmed}`);
    }

    for (const path of rule.allow) {
      const trimmed = path.trim();
      if (trimmed) lines.push(`Allow: ${trimmed}`);
    }

    if (rule.crawlDelay !== undefined && rule.crawlDelay > 0) {
      lines.push(`Crawl-delay: ${rule.crawlDelay}`);
    }

    lines.push("");
  }

  const sitemap = config.sitemapUrl.trim();
  if (sitemap) {
    lines.push(`Sitemap: ${sitemap}`);
  }

  return lines.join("\n").replace(/\n+$/, "") + (lines.length > 0 ? "\n" : "");
}

export function presetToRules(
  presetId: RobotsPresetId,
): { rules: RobotsRule[]; sitemapUrl: string } {
  const preset = ROBOTS_PRESETS[presetId];
  return {
    rules: preset.rules.map((r) => ({
      ...createEmptyRule(r.userAgent),
      allow: [...r.allow],
      disallow: [...r.disallow],
      crawlDelay: r.crawlDelay,
    })),
    sitemapUrl: preset.sitemapUrl ?? "",
  };
}
