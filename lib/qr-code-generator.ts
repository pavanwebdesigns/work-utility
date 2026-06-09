export type QrTab =
  | "url"
  | "text"
  | "email"
  | "phone"
  | "sms"
  | "whatsapp"
  | "wifi"
  | "vcard"
  | "location"
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
  vcardName: string;
  vcardPhone: string;
  vcardEmail: string;
  vcardCompany: string;
  latitude: string;
  longitude: string;
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
  vcardName: "",
  vcardPhone: "",
  vcardEmail: "",
  vcardCompany: "",
  latitude: "",
  longitude: "",
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
  return value.replace(/\n/g, "\\n");
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
      const message = inputs.smsMessage.trim();
      return message
        ? `SMSTO:${phone.replace(/^\+/, "")}:${message}`
        : `SMSTO:${phone.replace(/^\+/, "")}:`;
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
    case "vcard": {
      const name = inputs.vcardName.trim();
      if (!name) return "";
      const lines = [
        "BEGIN:VCARD",
        "VERSION:3.0",
        `FN:${escapeVcard(name)}`,
      ];
      if (inputs.vcardPhone.trim()) {
        lines.push(`TEL:${escapeVcard(inputs.vcardPhone.trim())}`);
      }
      if (inputs.vcardEmail.trim()) {
        lines.push(`EMAIL:${escapeVcard(inputs.vcardEmail.trim())}`);
      }
      if (inputs.vcardCompany.trim()) {
        lines.push(`ORG:${escapeVcard(inputs.vcardCompany.trim())}`);
      }
      lines.push("END:VCARD");
      return lines.join("\n");
    }
    case "location": {
      const lat = inputs.latitude.trim();
      const lng = inputs.longitude.trim();
      if (!lat || !lng) return "";
      return `geo:${lat},${lng}`;
    }
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
