"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import Link from "next/link";
import {
  Download,
  Link2,
  QrCode,
  ScanLine,
  Upload,
} from "lucide-react";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { RelatedTools } from "@/components/RelatedTools";
import { ToolFeedback } from "@/components/ToolFeedback";
import { DinoGame } from "@/components/DinoGame";
import {
  buildQrPayload,
  DEFAULT_QR_INPUTS,
  downloadPng,
  downloadSvg,
  generateQrPng,
  generateQrSvg,
  type ErrorCorrectionLevel,
  type QrInputs,
  type QrTab,
  type WifiEncryption,
} from "@/lib/qr-code-generator";

const tabs: { id: QrTab; label: string }[] = [
  { id: "url", label: "URL" },
  { id: "text", label: "Text" },
  { id: "email", label: "Email" },
  { id: "phone", label: "Phone" },
  { id: "sms", label: "SMS" },
  { id: "whatsapp", label: "WhatsApp" },
  { id: "wifi", label: "WiFi" },
  { id: "vcard", label: "VCard" },
  { id: "location", label: "Location" },
  { id: "facebook", label: "Facebook" },
  { id: "twitter", label: "Twitter" },
  { id: "youtube", label: "YouTube" },
];

const correctionLevels: {
  value: ErrorCorrectionLevel;
  label: string;
}[] = [
  { value: "L", label: "L — Low (~7%)" },
  { value: "M", label: "M — Medium (~15%)" },
  { value: "Q", label: "Q — Quartile (~25%)" },
  { value: "H", label: "H — High (~30%)" },
];

const howItWorksSteps = [
  {
    step: "01",
    icon: Link2,
    title: "Choose Type",
    description: "Pick URL, WiFi, VCard, WhatsApp, and more",
  },
  {
    step: "02",
    icon: ScanLine,
    title: "Customize",
    description: "Set colors, size, logo, and watch the preview update",
  },
  {
    step: "03",
    icon: Download,
    title: "Download",
    description: "Save your QR code as PNG or SVG",
  },
];

export default function QrCodeGeneratorPage() {
  const logoInputRef = useRef<HTMLInputElement>(null);
  const [activeTab, setActiveTab] = useState<QrTab>("url");
  const [inputs, setInputs] = useState<QrInputs>(DEFAULT_QR_INPUTS);
  const [foreground, setForeground] = useState("#000000");
  const [background, setBackground] = useState("#FFFFFF");
  const [size, setSize] = useState(400);
  const [errorCorrectionLevel, setErrorCorrectionLevel] =
    useState<ErrorCorrectionLevel>("M");
  const [logoDataUrl, setLogoDataUrl] = useState<string | null>(null);
  const [logoName, setLogoName] = useState<string | null>(null);
  const [qrDataUrl, setQrDataUrl] = useState<string | null>(null);
  const [isGenerating, setIsGenerating] = useState(false);

  const options = useMemo(
    () => ({
      foreground,
      background,
      size,
      errorCorrectionLevel,
      logoDataUrl,
    }),
    [foreground, background, size, errorCorrectionLevel, logoDataUrl]
  );

  const payload = useMemo(
    () => buildQrPayload(activeTab, inputs),
    [activeTab, inputs]
  );

  useEffect(() => {
    if (!payload) {
      setQrDataUrl(null);
      setIsGenerating(false);
      return;
    }

    let cancelled = false;
    setIsGenerating(true);

    generateQrPng(payload, options)
      .then((dataUrl) => {
        if (!cancelled) setQrDataUrl(dataUrl);
      })
      .catch(() => {
        if (!cancelled) setQrDataUrl(null);
      })
      .finally(() => {
        if (!cancelled) setIsGenerating(false);
      });

    return () => {
      cancelled = true;
    };
  }, [payload, options]);

  const updateInput = <K extends keyof QrInputs>(
    key: K,
    value: QrInputs[K]
  ) => {
    setInputs((current) => ({ ...current, [key]: value }));
  };

  const handleLogoUpload = (file: File | undefined) => {
    if (!file) return;
    if (!file.type.startsWith("image/")) return;
    if (file.size > 512 * 1024) return;

    const reader = new FileReader();
    reader.onload = () => {
      setLogoDataUrl(reader.result as string);
      setLogoName(file.name);
    };
    reader.readAsDataURL(file);
  };

  const handleRemoveLogo = () => {
    setLogoDataUrl(null);
    setLogoName(null);
    if (logoInputRef.current) logoInputRef.current.value = "";
  };

  const handleDownloadPng = () => {
    if (!qrDataUrl) return;
    downloadPng(qrDataUrl);
  };

  const handleDownloadSvg = async () => {
    if (!payload) return;
    const svg = await generateQrSvg(payload, options);
    downloadSvg(svg);
  };

  const inputClassName =
    "w-full rounded-xl border border-surface-border bg-surface-card px-4 py-3 text-sm text-content-primary outline-none transition-colors focus:border-brand-blue";

  const labelClassName = "mb-2 block text-sm font-medium text-content-primary";

  return (
    <div className="flex min-h-screen flex-col bg-surface-base">
      <Header />
      <main id="main-content" className="flex-1">
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
              Free QR Code Generator — URL, WhatsApp, WiFi &amp; More
            </h1>
            <p className="mx-auto mt-3 max-w-lg text-content-secondary">
              Create customizable QR codes for URLs, WiFi, contacts, social
              links, and more. Download as PNG or SVG.
            </p>
          </div>

          <div className="mt-8 flex gap-2 overflow-x-auto border-b border-surface-border pb-3">
            {tabs.map((tab) => (
              <button
                key={tab.id}
                type="button"
                onClick={() => setActiveTab(tab.id)}
                aria-pressed={activeTab === tab.id}
                aria-label={`Generate ${tab.label} QR code`}
                className={`shrink-0 cursor-pointer rounded-full px-4 py-2 text-sm font-medium transition-colors ${
                  activeTab === tab.id
                    ? "bg-tool-convert text-white"
                    : "bg-surface-card text-content-secondary hover:text-content-primary"
                }`}
              >
                {tab.label}
              </button>
            ))}
          </div>

          <div className="mt-8 flex flex-col gap-8 lg:flex-row lg:items-start">
            <div className="min-w-0 flex-1 space-y-6">
              <div className="space-y-4 rounded-xl border border-surface-border bg-surface-card p-5">
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
                      rows={5}
                      className={`${inputClassName} resize-y`}
                    />
                  </div>
                )}

                {activeTab === "email" && (
                  <>
                    <div>
                      <label htmlFor="qr-email" className={labelClassName}>
                        Email Address
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
                        Subject (optional)
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
                        Message (optional)
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
                      <label htmlFor="qr-sms-message" className={labelClassName}>
                        Message (optional)
                      </label>
                      <textarea
                        id="qr-sms-message"
                        value={inputs.smsMessage}
                        onChange={(e) =>
                          updateInput("smsMessage", e.target.value)
                        }
                        rows={3}
                        className={`${inputClassName} resize-y`}
                      />
                    </div>
                  </>
                )}

                {activeTab === "whatsapp" && (
                  <>
                    <div>
                      <label htmlFor="qr-wa-phone" className={labelClassName}>
                        WhatsApp Number
                      </label>
                      <input
                        id="qr-wa-phone"
                        type="tel"
                        value={inputs.whatsappPhone}
                        onChange={(e) =>
                          updateInput("whatsappPhone", e.target.value)
                        }
                        placeholder="919876543210"
                        className={inputClassName}
                      />
                    </div>
                    <div>
                      <label htmlFor="qr-wa-message" className={labelClassName}>
                        Prefilled Message (optional)
                      </label>
                      <textarea
                        id="qr-wa-message"
                        value={inputs.whatsappMessage}
                        onChange={(e) =>
                          updateInput("whatsappMessage", e.target.value)
                        }
                        rows={3}
                        className={`${inputClassName} resize-y`}
                      />
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
                        placeholder="My WiFi Network"
                        className={inputClassName}
                      />
                    </div>
                    <div>
                      <label htmlFor="qr-wifi-password" className={labelClassName}>
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
                      <label htmlFor="qr-wifi-encryption" className={labelClassName}>
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
                        className={`${inputClassName} cursor-pointer`}
                      >
                        <option value="WPA">WPA / WPA2</option>
                        <option value="WEP">WEP</option>
                        <option value="nopass">No Password</option>
                      </select>
                    </div>
                    <label className="flex cursor-pointer items-center gap-2 text-sm text-content-secondary">
                      <input
                        type="checkbox"
                        checked={inputs.wifiHidden}
                        onChange={(e) =>
                          updateInput("wifiHidden", e.target.checked)
                        }
                        className="cursor-pointer"
                      />
                      Hidden network
                    </label>
                  </>
                )}

                {activeTab === "vcard" && (
                  <>
                    <div>
                      <label htmlFor="qr-vcard-name" className={labelClassName}>
                        Full Name
                      </label>
                      <input
                        id="qr-vcard-name"
                        type="text"
                        value={inputs.vcardName}
                        onChange={(e) =>
                          updateInput("vcardName", e.target.value)
                        }
                        placeholder="John Doe"
                        className={inputClassName}
                      />
                    </div>
                    <div>
                      <label htmlFor="qr-vcard-phone" className={labelClassName}>
                        Phone
                      </label>
                      <input
                        id="qr-vcard-phone"
                        type="tel"
                        value={inputs.vcardPhone}
                        onChange={(e) =>
                          updateInput("vcardPhone", e.target.value)
                        }
                        className={inputClassName}
                      />
                    </div>
                    <div>
                      <label htmlFor="qr-vcard-email" className={labelClassName}>
                        Email
                      </label>
                      <input
                        id="qr-vcard-email"
                        type="email"
                        value={inputs.vcardEmail}
                        onChange={(e) =>
                          updateInput("vcardEmail", e.target.value)
                        }
                        className={inputClassName}
                      />
                    </div>
                    <div>
                      <label htmlFor="qr-vcard-company" className={labelClassName}>
                        Company
                      </label>
                      <input
                        id="qr-vcard-company"
                        type="text"
                        value={inputs.vcardCompany}
                        onChange={(e) =>
                          updateInput("vcardCompany", e.target.value)
                        }
                        className={inputClassName}
                      />
                    </div>
                  </>
                )}

                {activeTab === "location" && (
                  <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                    <div>
                      <label htmlFor="qr-lat" className={labelClassName}>
                        Latitude
                      </label>
                      <input
                        id="qr-lat"
                        type="text"
                        value={inputs.latitude}
                        onChange={(e) =>
                          updateInput("latitude", e.target.value)
                        }
                        placeholder="28.6139"
                        className={inputClassName}
                      />
                    </div>
                    <div>
                      <label htmlFor="qr-lng" className={labelClassName}>
                        Longitude
                      </label>
                      <input
                        id="qr-lng"
                        type="text"
                        value={inputs.longitude}
                        onChange={(e) =>
                          updateInput("longitude", e.target.value)
                        }
                        placeholder="77.2090"
                        className={inputClassName}
                      />
                    </div>
                  </div>
                )}

                {activeTab === "facebook" && (
                  <div>
                    <label htmlFor="qr-facebook" className={labelClassName}>
                      Facebook Profile or Page URL
                    </label>
                    <input
                      id="qr-facebook"
                      type="url"
                      value={inputs.facebookUrl}
                      onChange={(e) =>
                        updateInput("facebookUrl", e.target.value)
                      }
                      placeholder="https://facebook.com/yourpage"
                      className={inputClassName}
                    />
                  </div>
                )}

                {activeTab === "twitter" && (
                  <div>
                    <label htmlFor="qr-twitter" className={labelClassName}>
                      Twitter / X Profile URL
                    </label>
                    <input
                      id="qr-twitter"
                      type="url"
                      value={inputs.twitterUrl}
                      onChange={(e) =>
                        updateInput("twitterUrl", e.target.value)
                      }
                      placeholder="https://x.com/username"
                      className={inputClassName}
                    />
                  </div>
                )}

                {activeTab === "youtube" && (
                  <div>
                    <label htmlFor="qr-youtube" className={labelClassName}>
                      YouTube Channel or Video URL
                    </label>
                    <input
                      id="qr-youtube"
                      type="url"
                      value={inputs.youtubeUrl}
                      onChange={(e) =>
                        updateInput("youtubeUrl", e.target.value)
                      }
                      placeholder="https://youtube.com/@channel"
                      className={inputClassName}
                    />
                  </div>
                )}
              </div>

              <div className="space-y-5 rounded-xl border border-surface-border bg-surface-card p-5">
                <h2 className="text-sm font-semibold uppercase tracking-widest text-content-secondary">
                  Customize
                </h2>

                <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                  <div>
                    <label htmlFor="qr-fg" className={labelClassName}>
                      Foreground
                    </label>
                    <div className="flex items-center gap-3">
                      <input
                        id="qr-fg"
                        type="color"
                        value={foreground}
                        onChange={(e) => setForeground(e.target.value)}
                        aria-label="QR foreground color"
                        className="h-10 w-14 cursor-pointer rounded-lg border border-surface-border bg-transparent"
                      />
                      <span className="text-sm text-content-muted">
                        {foreground}
                      </span>
                    </div>
                  </div>
                  <div>
                    <label htmlFor="qr-bg" className={labelClassName}>
                      Background
                    </label>
                    <div className="flex items-center gap-3">
                      <input
                        id="qr-bg"
                        type="color"
                        value={background}
                        onChange={(e) => setBackground(e.target.value)}
                        aria-label="QR background color"
                        className="h-10 w-14 cursor-pointer rounded-lg border border-surface-border bg-transparent"
                      />
                      <span className="text-sm text-content-muted">
                        {background}
                      </span>
                    </div>
                  </div>
                </div>

                <div>
                  <label htmlFor="qr-size" className={labelClassName}>
                    Size: {size}px
                  </label>
                  <input
                    id="qr-size"
                    type="range"
                    min={200}
                    max={1000}
                    step={10}
                    value={size}
                    onChange={(e) => setSize(Number(e.target.value))}
                    aria-label="QR code size"
                    className="w-full cursor-pointer accent-brand-blue"
                  />
                  <div className="mt-1 flex justify-between text-xs text-content-muted">
                    <span>200px</span>
                    <span>1000px</span>
                  </div>
                </div>

                <div>
                  <label htmlFor="qr-ecl" className={labelClassName}>
                    Error Correction
                  </label>
                  <select
                    id="qr-ecl"
                    value={errorCorrectionLevel}
                    onChange={(e) =>
                      setErrorCorrectionLevel(
                        e.target.value as ErrorCorrectionLevel
                      )
                    }
                    className={`${inputClassName} cursor-pointer`}
                  >
                    {correctionLevels.map((level) => (
                      <option key={level.value} value={level.value}>
                        {level.label}
                      </option>
                    ))}
                  </select>
                </div>

                <div>
                  <p className={labelClassName}>Logo (optional, max 20%)</p>
                  <input
                    ref={logoInputRef}
                    type="file"
                    accept="image/*"
                    className="hidden"
                    aria-label="Upload logo for QR code center"
                    onChange={(e) =>
                      handleLogoUpload(e.target.files?.[0])
                    }
                  />
                  <div className="flex flex-wrap items-center gap-3">
                    <button
                      type="button"
                      onClick={() => logoInputRef.current?.click()}
                      aria-label="Upload logo image"
                      className="flex cursor-pointer items-center gap-2 rounded-xl border border-surface-border bg-surface-elevated px-4 py-2.5 text-sm font-medium text-content-primary transition-colors hover:border-brand-blue/40"
                    >
                      <Upload className="h-4 w-4" />
                      Upload Logo
                    </button>
                    {logoName && (
                      <>
                        <span className="truncate text-sm text-content-secondary">
                          {logoName}
                        </span>
                        <button
                          type="button"
                          onClick={handleRemoveLogo}
                          aria-label="Remove logo"
                          className="cursor-pointer text-sm text-tool-pdf hover:underline"
                        >
                          Remove
                        </button>
                      </>
                    )}
                  </div>
                </div>
              </div>
            </div>

            <div className="flex w-full flex-col items-center lg:w-[420px] lg:shrink-0">
              <div
                className="flex w-full items-center justify-center rounded-xl border border-surface-border p-6"
                style={{ backgroundColor: background }}
              >
                {qrDataUrl ? (
                  // eslint-disable-next-line @next/next/no-img-element
                  <img
                    src={qrDataUrl}
                    alt="Generated QR code preview"
                    className="max-w-full"
                    style={{
                      width: Math.min(size, 360),
                      height: Math.min(size, 360),
                    }}
                  />
                ) : (
                  <div className="py-12 text-center">
                    <QrCode className="mx-auto h-12 w-12 text-content-muted/40" />
                    <p className="mt-3 text-sm text-content-muted">
                      {isGenerating
                        ? "Generating..."
                        : "Enter content to generate a QR code"}
                    </p>
                  </div>
                )}
              </div>

              <div className="mt-4 flex w-full flex-col gap-3">
                <button
                  type="button"
                  onClick={handleDownloadPng}
                  disabled={!qrDataUrl}
                  aria-label="Download QR code as PNG"
                  className="flex cursor-pointer items-center justify-center gap-2 rounded-xl bg-tool-convert px-5 py-3 text-sm font-semibold text-white transition-colors hover:bg-[#059669] disabled:cursor-not-allowed disabled:opacity-50"
                >
                  <Download className="h-4 w-4" />
                  Download PNG
                </button>
                <button
                  type="button"
                  onClick={handleDownloadSvg}
                  disabled={!payload}
                  aria-label="Download QR code as SVG"
                  className="flex cursor-pointer items-center justify-center gap-2 rounded-xl border border-surface-border bg-surface-card px-5 py-3 text-sm font-semibold text-content-primary transition-colors hover:border-brand-blue/40 disabled:cursor-not-allowed disabled:opacity-50"
                >
                  <Download className="h-4 w-4" />
                  Download SVG
                </button>
              </div>
            </div>
          </div>

          <div className="mt-16">
            <h2 className="mb-6 text-center text-lg font-semibold text-content-primary">
              How It Works
            </h2>
            <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
              {howItWorksSteps.map((step) => (
                <div
                  key={step.title}
                  className="rounded-xl border border-surface-border bg-surface-card p-5"
                >
                  <div className="mb-3 flex h-10 w-10 items-center justify-center rounded-lg bg-tool-convert/10">
                    <step.icon
                      className="h-5 w-5 text-tool-convert"
                      strokeWidth={1.75}
                    />
                  </div>
                  <p className="text-2xl font-bold text-content-muted/40">
                    {step.step}
                  </p>
                  <p className="mt-1 font-semibold text-content-primary">
                    {step.title}
                  </p>
                  <p className="mt-1 text-sm text-content-secondary">
                    {step.description}
                  </p>
                </div>
              ))}
            </div>
          </div>

          <RelatedTools currentSlug="qr-code-generator" />
          <ToolFeedback toolName="QR Code Generator" />
          <DinoGame />
        </div>
      </main>
      <Footer />
    </div>
  );
}
