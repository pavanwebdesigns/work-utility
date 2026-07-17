export type QrTab =
  | "url"
  | "text"
  | "email"
  | "phone"
  | "sms"
  | "wifi"
  | "vcard"
  | "location"
  | "event"
  | "whatsapp"
  | "facebook"
  | "twitter"
  | "youtube";

export type WifiEncryption = "WPA" | "WEP" | "nopass";
export type ErrorCorrectionLevel = "L" | "M" | "Q" | "H";

export type QrInputs = {
  url: string;
  text: string;
  phone: string;
  email: string;
  emailSubject: string;
  emailBody: string;
  smsPhone: string;
  smsMessage: string;
  whatsappPhone: string;
  whatsappMessage: string;
  wifiSsid: string;
  wifiPassword: string;
  wifiEncryption: WifiEncryption;
  wifiHidden: boolean;
  vcardFirstName: string;
  vcardLastName: string;
  vcardOrg: string;
  vcardTitle: string;
  vcardPhoneWork: string;
  vcardPhoneMobile: string;
  vcardPhonePrivate: string;
  vcardEmail: string;
  vcardWebsite: string;
  vcardStreet: string;
  vcardCity: string;
  vcardState: string;
  vcardZip: string;
  vcardCountry: string;
  /** @deprecated kept for older callers — prefer vcardFirstName */
  vcardName: string;
  vcardPhone: string;
  vcardCompany: string;
  latitude: string;
  longitude: string;
  mapsLink: string;
  eventName: string;
  eventStart: string;
  eventEnd: string;
  eventLocation: string;
  eventDescription: string;
  facebookUrl: string;
  twitterUrl: string;
  youtubeUrl: string;
};

export const DEFAULT_QR_INPUTS: QrInputs = {
  url: "",
  text: "",
  phone: "",
  email: "",
  emailSubject: "",
  emailBody: "",
  smsPhone: "",
  smsMessage: "",
  whatsappPhone: "",
  whatsappMessage: "",
  wifiSsid: "",
  wifiPassword: "",
  wifiEncryption: "WPA",
  wifiHidden: false,
  vcardFirstName: "",
  vcardLastName: "",
  vcardOrg: "",
  vcardTitle: "",
  vcardPhoneWork: "",
  vcardPhoneMobile: "",
  vcardPhonePrivate: "",
  vcardEmail: "",
  vcardWebsite: "",
  vcardStreet: "",
  vcardCity: "",
  vcardState: "",
  vcardZip: "",
  vcardCountry: "",
  vcardName: "",
  vcardPhone: "",
  vcardCompany: "",
  latitude: "",
  longitude: "",
  mapsLink: "",
  eventName: "",
  eventStart: "",
  eventEnd: "",
  eventLocation: "",
  eventDescription: "",
  facebookUrl: "",
  twitterUrl: "",
  youtubeUrl: "",
};

export type QrOptions = {
  foreground: string;
  background: string;
  size: number;
  errorCorrectionLevel: ErrorCorrectionLevel;
  logoDataUrl?: string | null;
};

export const DEFAULT_QR_OPTIONS: QrOptions = {
  foreground: "#000000",
  background: "#FFFFFF",
  size: 400,
  errorCorrectionLevel: "M",
  logoDataUrl: null,
};

function normalizePhone(value: string): string {
  return value.replace(/[^\d+]/g, "");
}

function normalizeUrl(value: string): string {
  const trimmed = value.trim();
  if (!trimmed) return "";
  if (/^https?:\/\//i.test(trimmed)) return trimmed;
  return `https://${trimmed}`;
}

function escapeWifi(value: string): string {
  return value.replace(/([\\;,":])/g, "\\$1");
}

function escapeVcard(value: string): string {
  return value.replace(/\\/g, "\\\\").replace(/\n/g, "\\n").replace(/;/g, "\\;");
}

function escapeIcal(value: string): string {
  return value
    .replace(/\\/g, "\\\\")
    .replace(/;/g, "\\;")
    .replace(/,/g, "\\,")
    .replace(/\n/g, "\\n");
}

/** Convert datetime-local value (YYYY-MM-DDTHH:mm) to iCal YYYYMMDDTHHmmss */
export function formatIcalDateTime(value: string): string {
  const trimmed = value.trim();
  if (!trimmed) return "";
  const digits = trimmed.replace(/[-:T]/g, "");
  if (digits.length >= 12) return `${digits.slice(0, 12)}00`.slice(0, 15);
  if (digits.length === 8) return `${digits}T000000`;
  return digits;
}

/**
 * Extract lat/lng from common Google Maps URL patterns.
 * Supports ?q=lat,lng, /@lat,lng,z, and query=lat,lng.
 */
export function extractLatLngFromMapsUrl(
  raw: string
): { lat: string; lng: string } | null {
  const value = raw.trim();
  if (!value) return null;

  const patterns = [
    /[?&]q=(-?\d+\.?\d*),\s*(-?\d+\.?\d*)/i,
    /[?&]query=(-?\d+\.?\d*),\s*(-?\d+\.?\d*)/i,
    /@(-?\d+\.?\d*),\s*(-?\d+\.?\d*)(?:,|\s|$)/,
    /!3d(-?\d+\.?\d*)!4d(-?\d+\.?\d*)/,
    /^(-?\d+\.?\d*)\s*,\s*(-?\d+\.?\d*)$/,
  ];

  for (const pattern of patterns) {
    const match = value.match(pattern);
    if (match) {
      const lat = Number(match[1]);
      const lng = Number(match[2]);
      if (
        Number.isFinite(lat) &&
        Number.isFinite(lng) &&
        lat >= -90 &&
        lat <= 90 &&
        lng >= -180 &&
        lng <= 180
      ) {
        return { lat: String(lat), lng: String(lng) };
      }
    }
  }

  return null;
}

export function buildVcardPayload(inputs: QrInputs): string {
  const firstName = inputs.vcardFirstName.trim();
  if (!firstName) return "";

  const lastName = inputs.vcardLastName.trim();
  const org = inputs.vcardOrg.trim() || inputs.vcardCompany.trim();
  const title = inputs.vcardTitle.trim();
  const phoneWork = inputs.vcardPhoneWork.trim();
  const phoneMobile =
    inputs.vcardPhoneMobile.trim() || inputs.vcardPhone.trim();
  const phonePrivate = inputs.vcardPhonePrivate.trim();
  const email = inputs.vcardEmail.trim();
  const website = inputs.vcardWebsite.trim();
  const street = inputs.vcardStreet.trim();
  const city = inputs.vcardCity.trim();
  const state = inputs.vcardState.trim();
  const zip = inputs.vcardZip.trim();
  const country = inputs.vcardCountry.trim();

  const fn = [firstName, lastName].filter(Boolean).join(" ");
  const lines = [
    "BEGIN:VCARD",
    "VERSION:3.0",
    `N:${escapeVcard(lastName)};${escapeVcard(firstName)};;;`,
    `FN:${escapeVcard(fn)}`,
  ];

  if (org) lines.push(`ORG:${escapeVcard(org)}`);
  if (title) lines.push(`TITLE:${escapeVcard(title)}`);
  if (phoneWork) {
    lines.push(`TEL;TYPE=WORK,VOICE:${escapeVcard(phoneWork)}`);
  }
  if (phoneMobile) {
    lines.push(`TEL;TYPE=CELL,VOICE:${escapeVcard(phoneMobile)}`);
  }
  if (phonePrivate) {
    lines.push(`TEL;TYPE=HOME,VOICE:${escapeVcard(phonePrivate)}`);
  }
  if (email) lines.push(`EMAIL;TYPE=INTERNET:${escapeVcard(email)}`);
  if (website) lines.push(`URL:${escapeVcard(normalizeUrl(website))}`);

  if (street || city || state || zip || country) {
    lines.push(
      `ADR;TYPE=WORK:;;${escapeVcard(street)};${escapeVcard(city)};${escapeVcard(state)};${escapeVcard(zip)};${escapeVcard(country)}`
    );
  }

  lines.push("END:VCARD");
  return lines.join("\n");
}

export function buildEventPayload(inputs: QrInputs): string {
  const name = inputs.eventName.trim();
  const start = formatIcalDateTime(inputs.eventStart);
  if (!name || !start) return "";

  const end = formatIcalDateTime(inputs.eventEnd) || start;
  const location = inputs.eventLocation.trim();
  const description = inputs.eventDescription.trim();

  const lines = [
    "BEGIN:VEVENT",
    `SUMMARY:${escapeIcal(name)}`,
    `DTSTART:${start}`,
    `DTEND:${end}`,
  ];
  if (location) lines.push(`LOCATION:${escapeIcal(location)}`);
  if (description) lines.push(`DESCRIPTION:${escapeIcal(description)}`);
  lines.push("END:VEVENT");
  return lines.join("\n");
}

export function buildQrPayload(tab: QrTab, inputs: QrInputs): string {
  switch (tab) {
    case "url":
      return inputs.url.trim() ? normalizeUrl(inputs.url) : "";
    case "text":
      return inputs.text.trim();
    case "phone": {
      const phone = normalizePhone(inputs.phone);
      return phone ? `tel:${phone}` : "";
    }
    case "sms": {
      const phone = normalizePhone(inputs.smsPhone);
      if (!phone) return "";
      const message = inputs.smsMessage.trim().slice(0, 160);
      return `SMSTO:${phone}:${message}`;
    }
    case "email": {
      const email = inputs.email.trim();
      if (!email) return "";
      const params = new URLSearchParams();
      if (inputs.emailSubject.trim()) {
        params.set("subject", inputs.emailSubject.trim());
      }
      if (inputs.emailBody.trim()) {
        params.set("body", inputs.emailBody.trim());
      }
      const query = params.toString();
      return query ? `mailto:${email}?${query}` : `mailto:${email}`;
    }
    case "whatsapp": {
      const phone = normalizePhone(inputs.whatsappPhone).replace(/^\+/, "");
      if (!phone) return "";
      const message = inputs.whatsappMessage.trim();
      return message
        ? `https://wa.me/${phone}?text=${encodeURIComponent(message)}`
        : `https://wa.me/${phone}`;
    }
    case "wifi": {
      const ssid = inputs.wifiSsid.trim();
      if (!ssid) return "";
      const encryption = inputs.wifiEncryption;
      const password =
        encryption === "nopass" ? "" : escapeWifi(inputs.wifiPassword);
      const hidden = inputs.wifiHidden ? "true" : "false";
      return `WIFI:T:${encryption};S:${escapeWifi(ssid)};P:${password};H:${hidden};;`;
    }
    case "vcard":
      return buildVcardPayload(inputs);
    case "location": {
      const fromLink = extractLatLngFromMapsUrl(inputs.mapsLink);
      const lat = inputs.latitude.trim() || fromLink?.lat || "";
      const lng = inputs.longitude.trim() || fromLink?.lng || "";
      if (!lat || !lng) return "";
      return `geo:${lat},${lng}`;
    }
    case "event":
      return buildEventPayload(inputs);
    case "facebook":
      return inputs.facebookUrl.trim()
        ? normalizeUrl(inputs.facebookUrl)
        : "";
    case "twitter":
      return inputs.twitterUrl.trim() ? normalizeUrl(inputs.twitterUrl) : "";
    case "youtube":
      return inputs.youtubeUrl.trim() ? normalizeUrl(inputs.youtubeUrl) : "";
    default:
      return "";
  }
}

async function drawLogoOnCanvas(
  canvas: HTMLCanvasElement,
  logoDataUrl: string,
  backgroundColor: string
): Promise<void> {
  const ctx = canvas.getContext("2d");
  if (!ctx) return;

  const logo = new Image();
  logo.src = logoDataUrl;
  await logo.decode();

  const logoSize = canvas.width * 0.2;
  const pad = 6;
  const x = (canvas.width - logoSize) / 2;
  const y = (canvas.height - logoSize) / 2;

  ctx.fillStyle = backgroundColor;
  ctx.fillRect(x - pad, y - pad, logoSize + pad * 2, logoSize + pad * 2);
  ctx.drawImage(logo, x, y, logoSize, logoSize);
}

export async function generateQrPng(
  payload: string,
  options: QrOptions
): Promise<string> {
  const QRCode = (await import("qrcode")).default;
  const canvas = document.createElement("canvas");

  await QRCode.toCanvas(canvas, payload, {
    width: options.size,
    margin: 2,
    errorCorrectionLevel: options.errorCorrectionLevel,
    color: {
      dark: options.foreground,
      light: options.background,
    },
  });

  if (options.logoDataUrl) {
    await drawLogoOnCanvas(canvas, options.logoDataUrl, options.background);
  }

  return canvas.toDataURL("image/png");
}

export async function generateQrSvg(
  payload: string,
  options: QrOptions
): Promise<string> {
  const QRCode = (await import("qrcode")).default;

  let svg = await QRCode.toString(payload, {
    type: "svg",
    width: options.size,
    margin: 2,
    errorCorrectionLevel: options.errorCorrectionLevel,
    color: {
      dark: options.foreground,
      light: options.background,
    },
  });

  if (options.logoDataUrl) {
    const viewBoxMatch = svg.match(/viewBox="0 0 (\d+) (\d+)"/);
    const svgSize = viewBoxMatch ? Number(viewBoxMatch[1]) : options.size;
    const logoSize = svgSize * 0.2;
    const x = (svgSize - logoSize) / 2;
    const y = (svgSize - logoSize) / 2;
    const pad = svgSize * 0.015;
    const imageTag = `<rect x="${x - pad}" y="${y - pad}" width="${logoSize + pad * 2}" height="${logoSize + pad * 2}" fill="${options.background}"/><image href="${options.logoDataUrl}" x="${x}" y="${y}" width="${logoSize}" height="${logoSize}" preserveAspectRatio="xMidYMid meet"/>`;
    svg = svg.replace("</svg>", `${imageTag}</svg>`);
  }

  return svg;
}

export function downloadSvg(svg: string, filename = "qrcode.svg"): void {
  const blob = new Blob([svg], { type: "image/svg+xml;charset=utf-8" });
  const url = URL.createObjectURL(blob);
  const anchor = document.createElement("a");
  anchor.href = url;
  anchor.download = filename;
  anchor.click();
  URL.revokeObjectURL(url);
}

export function downloadPng(dataUrl: string, filename = "qrcode.png"): void {
  const anchor = document.createElement("a");
  anchor.href = dataUrl;
  anchor.download = filename;
  anchor.click();
}
