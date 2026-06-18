export type DeviceInfoReport = {
  browser: string;
  browserVersion: string;
  os: string;
  userAgent: string;
  language: string;
  languages: string;
  platform: string;
  screenResolution: string;
  viewportSize: string;
  devicePixelRatio: number;
  colorDepth: number;
  timezone: string;
  online: boolean;
  touchSupport: boolean;
  cookiesEnabled: boolean;
  hardwareConcurrency: number | string;
};

function parseBrowser(ua: string): { name: string; version: string } {
  if (ua.includes("Firefox/")) {
    const v = ua.match(/Firefox\/([\d.]+)/);
    return { name: "Firefox", version: v?.[1] ?? "unknown" };
  }
  if (ua.includes("Edg/")) {
    const v = ua.match(/Edg\/([\d.]+)/);
    return { name: "Microsoft Edge", version: v?.[1] ?? "unknown" };
  }
  if (ua.includes("Chrome/") && !ua.includes("Edg/")) {
    const v = ua.match(/Chrome\/([\d.]+)/);
    return { name: "Chrome", version: v?.[1] ?? "unknown" };
  }
  if (ua.includes("Safari/") && !ua.includes("Chrome/")) {
    const v = ua.match(/Version\/([\d.]+)/);
    return { name: "Safari", version: v?.[1] ?? "unknown" };
  }
  return { name: "Unknown", version: "unknown" };
}

function parseOS(ua: string, platform: string): string {
  if (ua.includes("Windows")) return "Windows";
  if (ua.includes("Mac OS X") || ua.includes("Macintosh")) return "macOS";
  if (ua.includes("Android")) return "Android";
  if (ua.includes("iPhone") || ua.includes("iPad")) return "iOS";
  if (ua.includes("Linux")) return "Linux";
  return platform || "Unknown";
}

export function getDeviceInfo(): DeviceInfoReport {
  if (typeof window === "undefined") {
    return {
      browser: "—",
      browserVersion: "—",
      os: "—",
      userAgent: "—",
      language: "—",
      languages: "—",
      platform: "—",
      screenResolution: "—",
      viewportSize: "—",
      devicePixelRatio: 1,
      colorDepth: 0,
      timezone: "—",
      online: false,
      touchSupport: false,
      cookiesEnabled: false,
      hardwareConcurrency: "—",
    };
  }

  const ua = navigator.userAgent;
  const { name, version } = parseBrowser(ua);

  return {
    browser: name,
    browserVersion: version,
    os: parseOS(ua, navigator.platform),
    userAgent: ua,
    language: navigator.language,
    languages: navigator.languages?.join(", ") ?? navigator.language,
    platform: navigator.platform,
    screenResolution: `${screen.width} × ${screen.height}`,
    viewportSize: `${window.innerWidth} × ${window.innerHeight}`,
    devicePixelRatio: window.devicePixelRatio,
    colorDepth: screen.colorDepth,
    timezone: Intl.DateTimeFormat().resolvedOptions().timeZone,
    online: navigator.onLine,
    touchSupport: "ontouchstart" in window || navigator.maxTouchPoints > 0,
    cookiesEnabled: navigator.cookieEnabled,
    hardwareConcurrency: navigator.hardwareConcurrency ?? "unknown",
  };
}

export function formatDeviceReport(info: DeviceInfoReport): string {
  return [
    `Browser: ${info.browser} ${info.browserVersion}`,
    `OS: ${info.os}`,
    `Platform: ${info.platform}`,
    `Language: ${info.language}`,
    `Languages: ${info.languages}`,
    `Screen: ${info.screenResolution}`,
    `Viewport: ${info.viewportSize}`,
    `Device Pixel Ratio: ${info.devicePixelRatio}`,
    `Color Depth: ${info.colorDepth}-bit`,
    `Timezone: ${info.timezone}`,
    `Online: ${info.online ? "Yes" : "No"}`,
    `Touch Support: ${info.touchSupport ? "Yes" : "No"}`,
    `Cookies Enabled: ${info.cookiesEnabled ? "Yes" : "No"}`,
    `CPU Cores: ${info.hardwareConcurrency}`,
    `User Agent: ${info.userAgent}`,
  ].join("\n");
}
