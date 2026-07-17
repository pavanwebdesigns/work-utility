"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import Link from "next/link";
import {
  Download,
  ImagePlus,
  Link2,
  QrCode,
  ScanLine,
  X,
} from "lucide-react";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { RelatedTools } from "@/components/RelatedTools";
import { ToolFeedback } from "@/components/ToolFeedback";
import { ToolSeoContent } from "@/components/ToolSeoContent";
import { DinoGame } from "@/components/DinoGame";
import { FavoriteButton } from "@/components/FavoriteButton";
import {
  buildQrPayload,
  DEFAULT_QR_INPUTS,
  extractLatLngFromMapsUrl,
  type ErrorCorrectionLevel,
  type QrInputs,
  type QrTab,
  type WifiEncryption,
} from "@/lib/qr-code-generator";

type DotStyle =
  | "square"
  | "dots"
  | "rounded"
  | "extra-rounded"
  | "classy"
  | "classy-rounded";
type CornerFrameStyle = "square" | "extra-rounded" | "dot";
type CornerDotStyle = "square" | "dot";
type GradientType = "linear" | "radial";
type DownloadFormat = "png" | "svg" | "jpeg";

type QRCodeStylingInstance = {
  append: (element: HTMLElement) => void;
  update: (options: Record<string, unknown>) => void;
  download: (options: { name?: string; extension?: DownloadFormat }) => void;
};

const tabs: { id: QrTab; label: string }[] = [
  { id: "url", label: "URL" },
  { id: "text", label: "Text" },
  { id: "email", label: "Email" },
  { id: "phone", label: "Phone" },
  { id: "sms", label: "SMS" },
  { id: "wifi", label: "WiFi" },
  { id: "vcard", label: "vCard" },
  { id: "location", label: "Location" },
  { id: "event", label: "Event" },
];

const bodyShapes: { id: DotStyle; label: string; icon: string }[] = [
  { id: "square", label: "Square", icon: "■" },
  { id: "dots", label: "Dots", icon: "●" },
  { id: "rounded", label: "Rounded", icon: "▪" },
  { id: "extra-rounded", label: "Extra Rounded", icon: "⬤" },
  { id: "classy", label: "Classy", icon: "◆" },
  { id: "classy-rounded", label: "Classy Rounded", icon: "◈" },
];

const eyeFrames: { id: CornerFrameStyle; label: string; icon: string }[] = [
  { id: "square", label: "Square", icon: "□" },
  { id: "extra-rounded", label: "Rounded", icon: "▢" },
  { id: "dot", label: "Dot", icon: "○" },
];

const eyeBalls: { id: CornerDotStyle; label: string; icon: string }[] = [
  { id: "square", label: "Square", icon: "■" },
  { id: "dot", label: "Dot", icon: "●" },
];

const correctionLevels: ErrorCorrectionLevel[] = ["L", "M", "Q", "H"];

const howItWorksSteps = [
  {
    step: "01",
    icon: Link2,
    title: "Choose Type",
    description: "Pick URL, SMS, WiFi, vCard, Location, Event, and more",
  },
  {
    step: "02",
    icon: ScanLine,
    title: "Customize Live",
    description: "Shapes, colors, logo — preview updates instantly",
  },
  {
    step: "03",
    icon: Download,
    title: "Download",
    description: "Save as PNG, SVG, or JPEG",
  },
];

const DEFAULT_CONTENT = "https://workutilities.com";

function isValidHex(value: string): boolean {
  return /^#([0-9A-Fa-f]{3}|[0-9A-Fa-f]{6})$/.test(value);
}

function ShapePickerButton({
  selected,
  label,
  icon,
  onClick,
}: {
  selected: boolean;
  label: string;
  icon: string;
  onClick: () => void;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      aria-pressed={selected}
      className={`flex flex-col items-center gap-1.5 rounded-xl border px-2 py-3 transition-colors ${
        selected
          ? "border-brand-blue bg-brand-blue/10 text-content-primary"
          : "border-surface-border bg-surface-base text-content-secondary hover:border-brand-blue/40"
      }`}
    >
      <span className="text-xl leading-none" aria-hidden>
        {icon}
      </span>
      <span className="text-center text-[11px] font-medium leading-tight">
        {label}
      </span>
    </button>
  );
}

export default function QrCodeGeneratorPage() {
  const previewRef = useRef<HTMLDivElement>(null);
  const qrRef = useRef<QRCodeStylingInstance | null>(null);
  const logoInputRef = useRef<HTMLInputElement>(null);

  const [activeTab, setActiveTab] = useState<QrTab>("url");
  const [inputs, setInputs] = useState<QrInputs>({
    ...DEFAULT_QR_INPUTS,
    url: DEFAULT_CONTENT,
  });
  const [bodyShape, setBodyShape] = useState<DotStyle>("dots");
  const [eyeFrame, setEyeFrame] = useState<CornerFrameStyle>("square");
  const [eyeBall, setEyeBall] = useState<CornerDotStyle>("dot");
  const [fgColor, setFgColor] = useState("#000000");
  const [fgHex, setFgHex] = useState("#000000");
  const [bgColor, setBgColor] = useState("#FFFFFF");
  const [bgHex, setBgHex] = useState("#FFFFFF");
  const [gradientEnabled, setGradientEnabled] = useState(false);
  const [gradientColor, setGradientColor] = useState("#2563eb");
  const [gradientHex, setGradientHex] = useState("#2563eb");
  const [gradientType, setGradientType] = useState<GradientType>("linear");
  const [gradientRotation, setGradientRotation] = useState(0);
  const [logoDataUrl, setLogoDataUrl] = useState<string | null>(null);
  const [logoName, setLogoName] = useState<string | null>(null);
  const [logoSize, setLogoSize] = useState(0.25);
  const [size, setSize] = useState(300);
  const [errorCorrectionLevel, setErrorCorrectionLevel] =
    useState<ErrorCorrectionLevel>("M");
  const [ecManuallySet, setEcManuallySet] = useState(false);
  const [ready, setReady] = useState(false);

  const payload = useMemo(
    () => buildQrPayload(activeTab, inputs) || DEFAULT_CONTENT,
    [activeTab, inputs]
  );

  const updateInput = <K extends keyof QrInputs>(
    key: K,
    value: QrInputs[K]
  ) => {
    setInputs((current) => ({ ...current, [key]: value }));
  };

  useEffect(() => {
    if (!logoDataUrl || ecManuallySet) return;
    setErrorCorrectionLevel("H");
  }, [logoDataUrl, ecManuallySet]);

  useEffect(() => {
    let cancelled = false;

    async function mountQr() {
      const { default: QRCodeStyling } = await import("qr-code-styling");
      if (cancelled || !previewRef.current) return;

      const container = previewRef.current;
      container.innerHTML = "";
      const instance = new QRCodeStyling({
        width: size,
        height: size,
        type: "canvas",
        data: payload,
        margin: 8,
        qrOptions: { errorCorrectionLevel },
        dotsOptions: {
          type: bodyShape,
          color: fgColor,
        },
        cornersSquareOptions: {
          type: eyeFrame,
          color: fgColor,
        },
        cornersDotOptions: {
          type: eyeBall,
          color: fgColor,
        },
        backgroundOptions: { color: bgColor },
        image: logoDataUrl || undefined,
        imageOptions: {
          hideBackgroundDots: true,
          imageSize: logoSize,
          margin: 5,
          crossOrigin: "anonymous",
        },
      }) as QRCodeStylingInstance;

      instance.append(container);
      qrRef.current = instance;
      setReady(true);
    }

    mountQr();

    return () => {
      cancelled = true;
      qrRef.current = null;
      const container = previewRef.current;
      if (container) container.innerHTML = "";
    };
    // Mount once on client
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    if (!ready || !qrRef.current) return;

    const dotsOptions: Record<string, unknown> = {
      type: bodyShape,
      color: fgColor,
    };

    if (gradientEnabled) {
      dotsOptions.gradient = {
        type: gradientType,
        rotation: (gradientRotation * Math.PI) / 180,
        colorStops: [
          { offset: 0, color: fgColor },
          { offset: 1, color: gradientColor },
        ],
      };
      delete dotsOptions.color;
    }

    qrRef.current.update({
      width: size,
      height: size,
      data: payload,
      qrOptions: { errorCorrectionLevel },
      dotsOptions,
      cornersSquareOptions: {
        type: eyeFrame,
        color: fgColor,
      },
      cornersDotOptions: {
        type: eyeBall,
        color: fgColor,
      },
      backgroundOptions: { color: bgColor },
      image: logoDataUrl || undefined,
      imageOptions: {
        hideBackgroundDots: true,
        imageSize: logoSize,
        margin: 5,
        crossOrigin: "anonymous",
      },
    });
  }, [
    ready,
    payload,
    bodyShape,
    eyeFrame,
    eyeBall,
    fgColor,
    bgColor,
    gradientEnabled,
    gradientColor,
    gradientType,
    gradientRotation,
    logoDataUrl,
    logoSize,
    size,
    errorCorrectionLevel,
  ]);

  const handleLogoUpload = (file: File | undefined) => {
    if (!file || !file.type.startsWith("image/")) return;
    if (file.size > 2 * 1024 * 1024) return;

    const reader = new FileReader();
    reader.onload = () => {
      setLogoDataUrl(reader.result as string);
      setLogoName(file.name);
      if (!ecManuallySet) setErrorCorrectionLevel("H");
    };
    reader.readAsDataURL(file);
  };

  const handleRemoveLogo = () => {
    setLogoDataUrl(null);
    setLogoName(null);
    if (logoInputRef.current) logoInputRef.current.value = "";
  };

  const handleDownload = (extension: DownloadFormat) => {
    qrRef.current?.download({ name: "qr-code", extension });
  };

  const inputClassName =
    "w-full rounded-xl border border-surface-border bg-surface-card px-4 py-3 text-sm text-content-primary outline-none transition-colors focus:border-brand-blue";
  const labelClassName = "mb-2 block text-sm font-medium text-content-primary";
  const sectionTitleClass =
    "mb-3 text-sm font-semibold uppercase tracking-wide text-content-muted";

  return (
    <div className="flex min-h-screen w-full max-w-full flex-col overflow-x-hidden bg-surface-base">
      <Header />
      <main id="main-content" className="flex-1 min-w-0 overflow-x-hidden">
        <div className="px-6 py-6 sm:px-10">
          <Link
            href="/"
            className="inline-flex cursor-pointer items-center gap-1 text-sm text-content-secondary transition-colors hover:text-content-primary"
          >
            ← All Tools
          </Link>
        </div>

        <div className="mx-auto max-w-6xl px-4 pb-16 sm:px-6">
          <div className="pt-4 text-center">
            <div className="mx-auto mb-5 flex h-12 w-12 items-center justify-center rounded-xl bg-tool-convert/10">
              <QrCode className="h-6 w-6 text-tool-convert" strokeWidth={1.75} />
            </div>
            <h1 className="text-2xl font-bold text-content-primary sm:text-3xl">
              Free QR Code Generator — Custom Shapes, Logo &amp; Colors
            </h1>
            <p className="mx-auto mt-3 max-w-lg text-content-secondary">
              Create stylish QR codes with live preview. Customize dots, corners,
              colors, logo, and download as PNG, SVG, or JPEG.
            </p>
            <div className="mt-4 flex justify-center">
              <FavoriteButton slug="qr-code-generator" />
            </div>
          </div>

          <div className="mt-10 grid gap-8 lg:grid-cols-[minmax(0,1fr)_340px] xl:grid-cols-[minmax(0,1fr)_380px]">
            {/* LEFT — Controls */}
            <div className="min-w-0 space-y-6">
              {/* Section 1 — Content */}
              <section className="rounded-2xl border border-surface-border bg-surface-card p-5">
                <h2 className={sectionTitleClass}>Content</h2>
                <div className="mb-4 flex flex-wrap gap-2">
                  {tabs.map((tab) => (
                    <button
                      key={tab.id}
                      type="button"
                      onClick={() => setActiveTab(tab.id)}
                      aria-pressed={activeTab === tab.id}
                      className={`rounded-full px-3.5 py-1.5 text-sm font-medium transition-colors ${
                        activeTab === tab.id
                          ? "bg-tool-convert text-white"
                          : "bg-surface-base text-content-secondary hover:text-content-primary"
                      }`}
                    >
                      {tab.label}
                    </button>
                  ))}
                </div>

                <div className="space-y-4">
                  {activeTab === "url" && (
                    <div>
                      <label htmlFor="qr-url" className={labelClassName}>
                        Website URL
                      </label>
                      <input
                        id="qr-url"
                        type="url"
                        value={inputs.url}
                        onChange={(e) => updateInput("url", e.target.value)}
                        placeholder="https://example.com"
                        className={inputClassName}
                      />
                    </div>
                  )}

                  {activeTab === "text" && (
                    <div>
                      <label htmlFor="qr-text" className={labelClassName}>
                        Plain Text
                      </label>
                      <textarea
                        id="qr-text"
                        value={inputs.text}
                        onChange={(e) => updateInput("text", e.target.value)}
                        placeholder="Enter any text..."
                        rows={4}
                        className={`${inputClassName} resize-y`}
                      />
                    </div>
                  )}

                  {activeTab === "email" && (
                    <>
                      <div>
                        <label htmlFor="qr-email" className={labelClassName}>
                          To
                        </label>
                        <input
                          id="qr-email"
                          type="email"
                          value={inputs.email}
                          onChange={(e) => updateInput("email", e.target.value)}
                          placeholder="hello@example.com"
                          className={inputClassName}
                        />
                      </div>
                      <div>
                        <label htmlFor="qr-email-subject" className={labelClassName}>
                          Subject
                        </label>
                        <input
                          id="qr-email-subject"
                          type="text"
                          value={inputs.emailSubject}
                          onChange={(e) =>
                            updateInput("emailSubject", e.target.value)
                          }
                          className={inputClassName}
                        />
                      </div>
                      <div>
                        <label htmlFor="qr-email-body" className={labelClassName}>
                          Body
                        </label>
                        <textarea
                          id="qr-email-body"
                          value={inputs.emailBody}
                          onChange={(e) =>
                            updateInput("emailBody", e.target.value)
                          }
                          rows={3}
                          className={`${inputClassName} resize-y`}
                        />
                      </div>
                    </>
                  )}

                  {activeTab === "phone" && (
                    <div>
                      <label htmlFor="qr-phone" className={labelClassName}>
                        Phone Number
                      </label>
                      <input
                        id="qr-phone"
                        type="tel"
                        value={inputs.phone}
                        onChange={(e) => updateInput("phone", e.target.value)}
                        placeholder="+91 98765 43210"
                        className={inputClassName}
                      />
                    </div>
                  )}

                  {activeTab === "sms" && (
                    <>
                      <div>
                        <label htmlFor="qr-sms-phone" className={labelClassName}>
                          Phone Number
                        </label>
                        <input
                          id="qr-sms-phone"
                          type="tel"
                          value={inputs.smsPhone}
                          onChange={(e) =>
                            updateInput("smsPhone", e.target.value)
                          }
                          placeholder="+91 98765 43210"
                          className={inputClassName}
                        />
                      </div>
                      <div>
                        <label
                          htmlFor="qr-sms-message"
                          className={labelClassName}
                        >
                          Message
                        </label>
                        <textarea
                          id="qr-sms-message"
                          value={inputs.smsMessage}
                          onChange={(e) =>
                            updateInput(
                              "smsMessage",
                              e.target.value.slice(0, 160)
                            )
                          }
                          rows={3}
                          maxLength={160}
                          placeholder="Your SMS message..."
                          className={`${inputClassName} resize-y`}
                        />
                        <p className="mt-1 text-right text-xs text-content-muted">
                          {inputs.smsMessage.length}/160
                        </p>
                      </div>
                    </>
                  )}

                  {activeTab === "wifi" && (
                    <>
                      <div>
                        <label htmlFor="qr-wifi-ssid" className={labelClassName}>
                          Network Name (SSID)
                        </label>
                        <input
                          id="qr-wifi-ssid"
                          type="text"
                          value={inputs.wifiSsid}
                          onChange={(e) =>
                            updateInput("wifiSsid", e.target.value)
                          }
                          className={inputClassName}
                        />
                      </div>
                      <div>
                        <label
                          htmlFor="qr-wifi-password"
                          className={labelClassName}
                        >
                          Password
                        </label>
                        <input
                          id="qr-wifi-password"
                          type="text"
                          value={inputs.wifiPassword}
                          onChange={(e) =>
                            updateInput("wifiPassword", e.target.value)
                          }
                          disabled={inputs.wifiEncryption === "nopass"}
                          className={inputClassName}
                        />
                      </div>
                      <div>
                        <label
                          htmlFor="qr-wifi-encryption"
                          className={labelClassName}
                        >
                          Encryption
                        </label>
                        <select
                          id="qr-wifi-encryption"
                          value={inputs.wifiEncryption}
                          onChange={(e) =>
                            updateInput(
                              "wifiEncryption",
                              e.target.value as WifiEncryption
                            )
                          }
                          className={inputClassName}
                        >
                          <option value="WPA">WPA/WPA2</option>
                          <option value="WEP">WEP</option>
                          <option value="nopass">None</option>
                        </select>
                      </div>
                    </>
                  )}

                  {activeTab === "vcard" && (
                    <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
                      <div>
                        <label
                          htmlFor="qr-vcard-first"
                          className={labelClassName}
                        >
                          First Name *
                        </label>
                        <input
                          id="qr-vcard-first"
                          type="text"
                          value={inputs.vcardFirstName}
                          onChange={(e) =>
                            updateInput("vcardFirstName", e.target.value)
                          }
                          placeholder="Pavan"
                          required
                          className={inputClassName}
                        />
                      </div>
                      <div>
                        <label
                          htmlFor="qr-vcard-last"
                          className={labelClassName}
                        >
                          Last Name
                        </label>
                        <input
                          id="qr-vcard-last"
                          type="text"
                          value={inputs.vcardLastName}
                          onChange={(e) =>
                            updateInput("vcardLastName", e.target.value)
                          }
                          placeholder="Kumar"
                          className={inputClassName}
                        />
                      </div>
                      <div>
                        <label
                          htmlFor="qr-vcard-org"
                          className={labelClassName}
                        >
                          Organization
                        </label>
                        <input
                          id="qr-vcard-org"
                          type="text"
                          value={inputs.vcardOrg}
                          onChange={(e) =>
                            updateInput("vcardOrg", e.target.value)
                          }
                          placeholder="WebmobileZ"
                          className={inputClassName}
                        />
                      </div>
                      <div>
                        <label
                          htmlFor="qr-vcard-title"
                          className={labelClassName}
                        >
                          Position / Job Title
                        </label>
                        <input
                          id="qr-vcard-title"
                          type="text"
                          value={inputs.vcardTitle}
                          onChange={(e) =>
                            updateInput("vcardTitle", e.target.value)
                          }
                          placeholder="Founder"
                          className={inputClassName}
                        />
                      </div>
                      <div>
                        <label
                          htmlFor="qr-vcard-phone-work"
                          className={labelClassName}
                        >
                          Phone (Work)
                        </label>
                        <input
                          id="qr-vcard-phone-work"
                          type="tel"
                          value={inputs.vcardPhoneWork}
                          onChange={(e) =>
                            updateInput("vcardPhoneWork", e.target.value)
                          }
                          placeholder="+91 80 1234 5678"
                          className={inputClassName}
                        />
                      </div>
                      <div>
                        <label
                          htmlFor="qr-vcard-phone-mobile"
                          className={labelClassName}
                        >
                          Phone (Mobile)
                        </label>
                        <input
                          id="qr-vcard-phone-mobile"
                          type="tel"
                          value={inputs.vcardPhoneMobile}
                          onChange={(e) =>
                            updateInput("vcardPhoneMobile", e.target.value)
                          }
                          placeholder="+91 97033 36209"
                          className={inputClassName}
                        />
                      </div>
                      <div>
                        <label
                          htmlFor="qr-vcard-phone-private"
                          className={labelClassName}
                        >
                          Phone (Private)
                        </label>
                        <input
                          id="qr-vcard-phone-private"
                          type="tel"
                          value={inputs.vcardPhonePrivate}
                          onChange={(e) =>
                            updateInput("vcardPhonePrivate", e.target.value)
                          }
                          placeholder="+91 98765 43210"
                          className={inputClassName}
                        />
                      </div>
                      <div>
                        <label
                          htmlFor="qr-vcard-email"
                          className={labelClassName}
                        >
                          Email
                        </label>
                        <input
                          id="qr-vcard-email"
                          type="email"
                          value={inputs.vcardEmail}
                          onChange={(e) =>
                            updateInput("vcardEmail", e.target.value)
                          }
                          placeholder="pavan@email.com"
                          className={inputClassName}
                        />
                      </div>
                      <div>
                        <label
                          htmlFor="qr-vcard-website"
                          className={labelClassName}
                        >
                          Website
                        </label>
                        <input
                          id="qr-vcard-website"
                          type="url"
                          value={inputs.vcardWebsite}
                          onChange={(e) =>
                            updateInput("vcardWebsite", e.target.value)
                          }
                          placeholder="https://workutilities.com"
                          className={inputClassName}
                        />
                      </div>
                      <div>
                        <label
                          htmlFor="qr-vcard-street"
                          className={labelClassName}
                        >
                          Street Address
                        </label>
                        <input
                          id="qr-vcard-street"
                          type="text"
                          value={inputs.vcardStreet}
                          onChange={(e) =>
                            updateInput("vcardStreet", e.target.value)
                          }
                          placeholder="123 MG Road"
                          className={inputClassName}
                        />
                      </div>
                      <div>
                        <label
                          htmlFor="qr-vcard-city"
                          className={labelClassName}
                        >
                          City
                        </label>
                        <input
                          id="qr-vcard-city"
                          type="text"
                          value={inputs.vcardCity}
                          onChange={(e) =>
                            updateInput("vcardCity", e.target.value)
                          }
                          placeholder="Bengaluru"
                          className={inputClassName}
                        />
                      </div>
                      <div>
                        <label
                          htmlFor="qr-vcard-state"
                          className={labelClassName}
                        >
                          State
                        </label>
                        <input
                          id="qr-vcard-state"
                          type="text"
                          value={inputs.vcardState}
                          onChange={(e) =>
                            updateInput("vcardState", e.target.value)
                          }
                          placeholder="Karnataka"
                          className={inputClassName}
                        />
                      </div>
                      <div>
                        <label
                          htmlFor="qr-vcard-zip"
                          className={labelClassName}
                        >
                          Zipcode
                        </label>
                        <input
                          id="qr-vcard-zip"
                          type="text"
                          value={inputs.vcardZip}
                          onChange={(e) =>
                            updateInput("vcardZip", e.target.value)
                          }
                          placeholder="560001"
                          className={inputClassName}
                        />
                      </div>
                      <div>
                        <label
                          htmlFor="qr-vcard-country"
                          className={labelClassName}
                        >
                          Country
                        </label>
                        <input
                          id="qr-vcard-country"
                          type="text"
                          value={inputs.vcardCountry}
                          onChange={(e) =>
                            updateInput("vcardCountry", e.target.value)
                          }
                          placeholder="India"
                          className={inputClassName}
                        />
                      </div>
                    </div>
                  )}

                  {activeTab === "location" && (
                    <>
                      <div className="grid gap-4 sm:grid-cols-2">
                        <div>
                          <label htmlFor="qr-lat" className={labelClassName}>
                            Latitude
                          </label>
                          <input
                            id="qr-lat"
                            type="number"
                            step="0.000001"
                            value={inputs.latitude}
                            onChange={(e) =>
                              updateInput("latitude", e.target.value)
                            }
                            placeholder="12.971599"
                            className={inputClassName}
                          />
                        </div>
                        <div>
                          <label htmlFor="qr-lng" className={labelClassName}>
                            Longitude
                          </label>
                          <input
                            id="qr-lng"
                            type="number"
                            step="0.000001"
                            value={inputs.longitude}
                            onChange={(e) =>
                              updateInput("longitude", e.target.value)
                            }
                            placeholder="77.594566"
                            className={inputClassName}
                          />
                        </div>
                      </div>
                      <div>
                        <label htmlFor="qr-maps-link" className={labelClassName}>
                          Or paste Google Maps link
                        </label>
                        <input
                          id="qr-maps-link"
                          type="url"
                          value={inputs.mapsLink}
                          onChange={(e) => {
                            const value = e.target.value;
                            updateInput("mapsLink", value);
                            const coords = extractLatLngFromMapsUrl(value);
                            if (coords) {
                              setInputs((current) => ({
                                ...current,
                                mapsLink: value,
                                latitude: coords.lat,
                                longitude: coords.lng,
                              }));
                            }
                          }}
                          placeholder="https://maps.google.com/?q=12.97,77.59"
                          className={inputClassName}
                        />
                        <p className="mt-1 text-xs text-content-muted">
                          Lat/lng auto-fill from maps.google.com/?q= or /@ links
                        </p>
                      </div>
                    </>
                  )}

                  {activeTab === "event" && (
                    <>
                      <div>
                        <label htmlFor="qr-event-name" className={labelClassName}>
                          Event Name
                        </label>
                        <input
                          id="qr-event-name"
                          type="text"
                          value={inputs.eventName}
                          onChange={(e) =>
                            updateInput("eventName", e.target.value)
                          }
                          placeholder="Product launch meetup"
                          className={inputClassName}
                        />
                      </div>
                      <div className="grid gap-4 sm:grid-cols-2">
                        <div>
                          <label
                            htmlFor="qr-event-start"
                            className={labelClassName}
                          >
                            Start Date &amp; Time
                          </label>
                          <input
                            id="qr-event-start"
                            type="datetime-local"
                            value={inputs.eventStart}
                            onChange={(e) =>
                              updateInput("eventStart", e.target.value)
                            }
                            className={inputClassName}
                          />
                        </div>
                        <div>
                          <label
                            htmlFor="qr-event-end"
                            className={labelClassName}
                          >
                            End Date &amp; Time
                          </label>
                          <input
                            id="qr-event-end"
                            type="datetime-local"
                            value={inputs.eventEnd}
                            onChange={(e) =>
                              updateInput("eventEnd", e.target.value)
                            }
                            className={inputClassName}
                          />
                        </div>
                      </div>
                      <div>
                        <label
                          htmlFor="qr-event-location"
                          className={labelClassName}
                        >
                          Location
                        </label>
                        <input
                          id="qr-event-location"
                          type="text"
                          value={inputs.eventLocation}
                          onChange={(e) =>
                            updateInput("eventLocation", e.target.value)
                          }
                          placeholder="Bengaluru, India"
                          className={inputClassName}
                        />
                      </div>
                      <div>
                        <label
                          htmlFor="qr-event-description"
                          className={labelClassName}
                        >
                          Description
                        </label>
                        <textarea
                          id="qr-event-description"
                          value={inputs.eventDescription}
                          onChange={(e) =>
                            updateInput("eventDescription", e.target.value)
                          }
                          rows={3}
                          placeholder="Agenda, RSVP notes..."
                          className={`${inputClassName} resize-y`}
                        />
                      </div>
                    </>
                  )}
                </div>
              </section>

              {/* Section 2 — Body Shape */}
              <section className="rounded-2xl border border-surface-border bg-surface-card p-5">
                <h2 className={sectionTitleClass}>Dot Style</h2>
                <div className="grid grid-cols-3 gap-2 sm:grid-cols-6">
                  {bodyShapes.map((shape) => (
                    <ShapePickerButton
                      key={shape.id}
                      selected={bodyShape === shape.id}
                      label={shape.label}
                      icon={shape.icon}
                      onClick={() => setBodyShape(shape.id)}
                    />
                  ))}
                </div>
              </section>

              {/* Section 3 — Eye Frame */}
              <section className="rounded-2xl border border-surface-border bg-surface-card p-5">
                <h2 className={sectionTitleClass}>Corner Frame</h2>
                <div className="grid grid-cols-3 gap-2">
                  {eyeFrames.map((shape) => (
                    <ShapePickerButton
                      key={shape.id}
                      selected={eyeFrame === shape.id}
                      label={shape.label}
                      icon={shape.icon}
                      onClick={() => setEyeFrame(shape.id)}
                    />
                  ))}
                </div>
              </section>

              {/* Section 4 — Eye Ball */}
              <section className="rounded-2xl border border-surface-border bg-surface-card p-5">
                <h2 className={sectionTitleClass}>Corner Dot</h2>
                <div className="grid grid-cols-2 gap-2 sm:max-w-xs">
                  {eyeBalls.map((shape) => (
                    <ShapePickerButton
                      key={shape.id}
                      selected={eyeBall === shape.id}
                      label={shape.label}
                      icon={shape.icon}
                      onClick={() => setEyeBall(shape.id)}
                    />
                  ))}
                </div>
              </section>

              {/* Section 5 — Colors */}
              <section className="rounded-2xl border border-surface-border bg-surface-card p-5">
                <h2 className={sectionTitleClass}>Colors</h2>
                <div className="space-y-4">
                  <div className="flex flex-wrap items-center gap-3">
                    <label className="w-28 text-sm text-content-primary">
                      QR Color
                    </label>
                    <input
                      type="color"
                      value={fgColor}
                      onChange={(e) => {
                        setFgColor(e.target.value);
                        setFgHex(e.target.value);
                      }}
                      className="h-10 w-12 cursor-pointer rounded border border-surface-border bg-transparent"
                      aria-label="QR color"
                    />
                    <input
                      type="text"
                      value={fgHex}
                      onChange={(e) => {
                        const value = e.target.value;
                        setFgHex(value);
                        if (isValidHex(value)) setFgColor(value);
                      }}
                      className="w-28 rounded-lg border border-surface-border bg-surface-base px-3 py-2 font-mono text-sm"
                      aria-label="QR color hex"
                    />
                  </div>
                  <div className="flex flex-wrap items-center gap-3">
                    <label className="w-28 text-sm text-content-primary">
                      Background
                    </label>
                    <input
                      type="color"
                      value={bgColor}
                      onChange={(e) => {
                        setBgColor(e.target.value);
                        setBgHex(e.target.value);
                      }}
                      className="h-10 w-12 cursor-pointer rounded border border-surface-border bg-transparent"
                      aria-label="Background color"
                    />
                    <input
                      type="text"
                      value={bgHex}
                      onChange={(e) => {
                        const value = e.target.value;
                        setBgHex(value);
                        if (isValidHex(value)) setBgColor(value);
                      }}
                      className="w-28 rounded-lg border border-surface-border bg-surface-base px-3 py-2 font-mono text-sm"
                      aria-label="Background color hex"
                    />
                  </div>

                  <label className="flex cursor-pointer items-center gap-2 text-sm text-content-primary">
                    <input
                      type="checkbox"
                      checked={gradientEnabled}
                      onChange={(e) => setGradientEnabled(e.target.checked)}
                      className="h-4 w-4 rounded border-surface-border"
                    />
                    Enable Gradient on QR
                  </label>

                  {gradientEnabled && (
                    <div className="space-y-3 rounded-xl border border-surface-border bg-surface-base p-4">
                      <div className="flex flex-wrap items-center gap-3">
                        <label className="w-28 text-sm text-content-primary">
                          Second Color
                        </label>
                        <input
                          type="color"
                          value={gradientColor}
                          onChange={(e) => {
                            setGradientColor(e.target.value);
                            setGradientHex(e.target.value);
                          }}
                          className="h-10 w-12 cursor-pointer rounded border border-surface-border bg-transparent"
                        />
                        <input
                          type="text"
                          value={gradientHex}
                          onChange={(e) => {
                            const value = e.target.value;
                            setGradientHex(value);
                            if (isValidHex(value)) setGradientColor(value);
                          }}
                          className="w-28 rounded-lg border border-surface-border bg-surface-card px-3 py-2 font-mono text-sm"
                        />
                      </div>
                      <div className="flex gap-4 text-sm">
                        <label className="flex items-center gap-2">
                          <input
                            type="radio"
                            name="gradient-type"
                            checked={gradientType === "linear"}
                            onChange={() => setGradientType("linear")}
                          />
                          Linear
                        </label>
                        <label className="flex items-center gap-2">
                          <input
                            type="radio"
                            name="gradient-type"
                            checked={gradientType === "radial"}
                            onChange={() => setGradientType("radial")}
                          />
                          Radial
                        </label>
                      </div>
                      {gradientType === "linear" && (
                        <div>
                          <label
                            htmlFor="gradient-rotation"
                            className="mb-2 block text-sm text-content-primary"
                          >
                            Rotation: {gradientRotation}°
                          </label>
                          <input
                            id="gradient-rotation"
                            type="range"
                            min={0}
                            max={360}
                            value={gradientRotation}
                            onChange={(e) =>
                              setGradientRotation(Number(e.target.value))
                            }
                            className="w-full"
                          />
                        </div>
                      )}
                    </div>
                  )}
                </div>
              </section>

              {/* Section 6 — Logo */}
              <section className="rounded-2xl border border-surface-border bg-surface-card p-5">
                <h2 className={sectionTitleClass}>Add Logo to Center</h2>
                <input
                  ref={logoInputRef}
                  type="file"
                  accept="image/*"
                  className="hidden"
                  onChange={(e) => handleLogoUpload(e.target.files?.[0])}
                />
                {!logoDataUrl ? (
                  <button
                    type="button"
                    onClick={() => logoInputRef.current?.click()}
                    className="inline-flex items-center gap-2 rounded-xl border border-dashed border-surface-border px-4 py-3 text-sm text-content-secondary transition-colors hover:border-brand-blue hover:text-content-primary"
                  >
                    <ImagePlus className="h-4 w-4" />
                    Upload logo image
                  </button>
                ) : (
                  <div className="flex items-center gap-3">
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img
                      src={logoDataUrl}
                      alt="Logo preview"
                      className="h-14 w-14 rounded-lg border border-surface-border object-contain bg-white"
                    />
                    <div className="min-w-0 flex-1">
                      <p className="truncate text-sm text-content-primary">
                        {logoName}
                      </p>
                      <button
                        type="button"
                        onClick={handleRemoveLogo}
                        className="mt-1 inline-flex items-center gap-1 text-xs text-content-muted hover:text-tool-pdf"
                      >
                        <X className="h-3 w-3" />
                        Remove logo
                      </button>
                    </div>
                  </div>
                )}
                <div className="mt-4">
                  <label
                    htmlFor="logo-size"
                    className="mb-2 block text-sm text-content-primary"
                  >
                    Logo size: {Math.round(logoSize * 100)}%
                  </label>
                  <input
                    id="logo-size"
                    type="range"
                    min={20}
                    max={40}
                    value={Math.round(logoSize * 100)}
                    onChange={(e) => setLogoSize(Number(e.target.value) / 100)}
                    className="w-full"
                  />
                </div>
              </section>

              {/* Section 7 — Size */}
              <section className="rounded-2xl border border-surface-border bg-surface-card p-5">
                <h2 className={sectionTitleClass}>QR Size</h2>
                <label
                  htmlFor="qr-size"
                  className="mb-2 block text-sm text-content-primary"
                >
                  {size}px
                </label>
                <input
                  id="qr-size"
                  type="range"
                  min={200}
                  max={600}
                  step={10}
                  value={size}
                  onChange={(e) => setSize(Number(e.target.value))}
                  className="w-full"
                />
                <div className="mt-1 flex justify-between text-xs text-content-muted">
                  <span>200px</span>
                  <span>600px</span>
                </div>
              </section>

              {/* Section 8 — Error Correction */}
              <section className="rounded-2xl border border-surface-border bg-surface-card p-5">
                <h2 className={sectionTitleClass}>Error Correction Level</h2>
                <p className="mb-3 text-xs text-content-muted">
                  Higher = more data redundancy. Use H if adding a logo.
                </p>
                <div className="inline-flex rounded-xl border border-surface-border p-1">
                  {correctionLevels.map((level) => (
                    <button
                      key={level}
                      type="button"
                      onClick={() => {
                        setErrorCorrectionLevel(level);
                        setEcManuallySet(true);
                      }}
                      aria-pressed={errorCorrectionLevel === level}
                      className={`rounded-lg px-4 py-2 text-sm font-medium transition-colors ${
                        errorCorrectionLevel === level
                          ? "bg-brand-blue text-white"
                          : "text-content-secondary hover:text-content-primary"
                      }`}
                    >
                      {level}
                    </button>
                  ))}
                </div>
              </section>
            </div>

            {/* RIGHT — Preview */}
            <div className="lg:sticky lg:top-24">
              <div className="rounded-2xl border border-surface-border bg-white p-6 shadow-sm">
                <div className="flex min-h-[220px] items-center justify-center">
                  <div
                    ref={previewRef}
                    className="[&_canvas]:max-w-full [&_canvas]:h-auto"
                    aria-label="QR code preview"
                  />
                </div>
                <p className="mt-3 text-center text-xs text-content-muted">
                  Scan to test →
                </p>
                <div className="mt-5 flex flex-col gap-2 sm:flex-row">
                  <button
                    type="button"
                    onClick={() => handleDownload("png")}
                    className="inline-flex flex-1 items-center justify-center gap-2 rounded-xl bg-brand-blue px-4 py-3 text-sm font-semibold text-white transition-colors hover:bg-brand-blue/90"
                  >
                    <Download className="h-4 w-4" />
                    Download PNG
                  </button>
                  <button
                    type="button"
                    onClick={() => handleDownload("svg")}
                    className="inline-flex flex-1 items-center justify-center gap-2 rounded-xl border border-surface-border bg-surface-card px-4 py-3 text-sm font-medium text-content-primary transition-colors hover:border-brand-blue/40"
                  >
                    Download SVG
                  </button>
                  <button
                    type="button"
                    onClick={() => handleDownload("jpeg")}
                    className="inline-flex flex-1 items-center justify-center gap-2 rounded-xl border border-surface-border bg-surface-card px-4 py-3 text-sm font-medium text-content-primary transition-colors hover:border-brand-blue/40"
                  >
                    Download JPEG
                  </button>
                </div>
              </div>
            </div>
          </div>

          <section className="mt-14">
            <h2 className="mb-6 text-center text-lg font-semibold text-content-primary">
              How It Works
            </h2>
            <div className="grid gap-4 sm:grid-cols-3">
              {howItWorksSteps.map((step) => (
                <div
                  key={step.step}
                  className="rounded-2xl border border-surface-border bg-surface-card p-5 text-center"
                >
                  <div className="mx-auto mb-3 flex h-10 w-10 items-center justify-center rounded-xl bg-tool-convert/10">
                    <step.icon className="h-5 w-5 text-tool-convert" />
                  </div>
                  <p className="text-xs font-semibold text-content-muted">
                    {step.step}
                  </p>
                  <h3 className="mt-1 font-semibold text-content-primary">
                    {step.title}
                  </h3>
                  <p className="mt-2 text-sm text-content-secondary">
                    {step.description}
                  </p>
                </div>
              ))}
            </div>
          </section>

          <div className="mt-12">
            <RelatedTools currentSlug="qr-code-generator" />
          </div>
          <div className="mt-8">
            <ToolSeoContent slug="qr-code-generator" />
          </div>
          <div className="mt-8">
            <ToolFeedback toolName="QR Code Generator" />
          </div>
          <div className="mt-8">
            <DinoGame />
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
}
