"use client";

import {
  useCallback,
  useEffect,
  useRef,
  useState,
  type PointerEvent as ReactPointerEvent,
} from "react";
import Link from "next/link";
import { Copy, Download, PenLine, RefreshCw, Type, Upload } from "lucide-react";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { RelatedTools } from "@/components/RelatedTools";
import { ToolFeedback } from "@/components/ToolFeedback";
import { ToolSeoContent } from "@/components/ToolSeoContent";
import { DinoGame } from "@/components/DinoGame";
import { ImageCropEditor } from "@/components/ImageCropEditor";
import { FavoriteButton } from "@/components/FavoriteButton";
import {
  CalculatorField,
  CalculatorInput,
  CalculatorSelect,
  ToggleButtonGroup,
} from "@/components/calculator/CalculatorUi";
import {
  CANVAS_HEIGHT,
  CANVAS_WIDTH,
  SIGNATURE_COLORS,
  SIGNATURE_FONTS,
  canvasToBlob,
  copyCanvasToClipboard,
  loadImageToCanvas,
  renderTypedSignature,
  type SignatureFont,
} from "@/lib/signature-maker";

type SignatureMode = "draw" | "type" | "upload";

const GOOGLE_FONTS_HREF =
  "https://fonts.googleapis.com/css2?family=Caveat:wght@400;700&family=Dancing+Script:wght@400;700&family=Great+Vibes&family=Pacifico&family=Satisfy&display=swap";

export default function SignatureMakerPage() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const drawingRef = useRef(false);
  const historyRef = useRef<ImageData[]>([]);
  const [mode, setMode] = useState<SignatureMode>("draw");
  const [penColor, setPenColor] = useState("#000000");
  const [penSize, setPenSize] = useState(3);
  const [typedName, setTypedName] = useState("John Doe");
  const [fontFamily, setFontFamily] = useState<SignatureFont>("Dancing Script");
  const [fontSize, setFontSize] = useState(48);
  const [removeBackground, setRemoveBackground] = useState(true);
  const [uploadFile, setUploadFile] = useState<File | null>(null);
  const [cropSession, setCropSession] = useState<{
    imageSrc: string;
    originalFile: File;
  } | null>(null);
  const [message, setMessage] = useState<string | null>(null);

  const getCanvas = useCallback(() => canvasRef.current, []);

  const saveHistory = useCallback(() => {
    const canvas = getCanvas();
    const ctx = canvas?.getContext("2d");
    if (!canvas || !ctx) return;
    historyRef.current.push(ctx.getImageData(0, 0, canvas.width, canvas.height));
    if (historyRef.current.length > 20) historyRef.current.shift();
  }, [getCanvas]);

  const clearCanvas = useCallback(() => {
    const canvas = getCanvas();
    const ctx = canvas?.getContext("2d");
    if (!canvas || !ctx) return;
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    if (mode === "draw") {
      ctx.fillStyle = "#ffffff";
      ctx.fillRect(0, 0, canvas.width, canvas.height);
    }
    historyRef.current = [];
  }, [getCanvas, mode]);

  useEffect(() => {
    const link = document.createElement("link");
    link.rel = "stylesheet";
    link.href = GOOGLE_FONTS_HREF;
    document.head.appendChild(link);
    return () => {
      document.head.removeChild(link);
    };
  }, []);

  useEffect(() => {
    const canvas = getCanvas();
    const ctx = canvas?.getContext("2d");
    if (!canvas || !ctx) return;

    if (mode === "draw") {
      ctx.fillStyle = "#ffffff";
      ctx.fillRect(0, 0, canvas.width, canvas.height);
      return;
    }

    if (mode === "type") {
      renderTypedSignature(canvas, typedName, fontFamily, fontSize, penColor);
    }
  }, [fontFamily, fontSize, getCanvas, mode, penColor, typedName]);

  const getCanvasPoint = (
    event: ReactPointerEvent<HTMLCanvasElement>
  ): { x: number; y: number } => {
    const canvas = getCanvas();
    if (!canvas) return { x: 0, y: 0 };
    const rect = canvas.getBoundingClientRect();
    const scaleX = canvas.width / rect.width;
    const scaleY = canvas.height / rect.height;
    return {
      x: (event.clientX - rect.left) * scaleX,
      y: (event.clientY - rect.top) * scaleY,
    };
  };

  const startDrawing = (event: ReactPointerEvent<HTMLCanvasElement>) => {
    if (mode !== "draw") return;
    const canvas = getCanvas();
    const ctx = canvas?.getContext("2d");
    if (!canvas || !ctx) return;

    saveHistory();
    drawingRef.current = true;
    canvas.setPointerCapture(event.pointerId);
    const point = getCanvasPoint(event);
    ctx.strokeStyle = penColor;
    ctx.lineWidth = penSize;
    ctx.lineCap = "round";
    ctx.lineJoin = "round";
    ctx.beginPath();
    ctx.moveTo(point.x, point.y);
  };

  const draw = (event: ReactPointerEvent<HTMLCanvasElement>) => {
    if (!drawingRef.current || mode !== "draw") return;
    const ctx = getCanvas()?.getContext("2d");
    if (!ctx) return;
    const point = getCanvasPoint(event);
    ctx.lineTo(point.x, point.y);
    ctx.stroke();
  };

  const stopDrawing = (event: ReactPointerEvent<HTMLCanvasElement>) => {
    if (!drawingRef.current) return;
    drawingRef.current = false;
    getCanvas()?.releasePointerCapture(event.pointerId);
  };

  const undoDrawing = () => {
    const canvas = getCanvas();
    const ctx = canvas?.getContext("2d");
    const previous = historyRef.current.pop();
    if (!canvas || !ctx || !previous) return;
    ctx.putImageData(previous, 0, 0);
  };

  const handleUpload = async (file: File) => {
    setUploadFile(file);
    setCropSession({ imageSrc: URL.createObjectURL(file), originalFile: file });
  };

  const handleCropApply = async (croppedFile: File) => {
    const canvas = getCanvas();
    if (!canvas) return;
    await loadImageToCanvas(croppedFile, canvas, removeBackground);
    if (cropSession) URL.revokeObjectURL(cropSession.imageSrc);
    setCropSession(null);
    setUploadFile(croppedFile);
  };

  const handleCropCancel = () => {
    if (cropSession) URL.revokeObjectURL(cropSession.imageSrc);
    setCropSession(null);
    setUploadFile(null);
  };

  const downloadSignature = async (type: "png" | "jpg") => {
    const canvas = getCanvas();
    if (!canvas) return;
    const blob = await canvasToBlob(
      canvas,
      type === "png" ? "image/png" : "image/jpeg",
      type === "jpg" ? "white" : "transparent"
    );
    const url = URL.createObjectURL(blob);
    const anchor = document.createElement("a");
    anchor.href = url;
    anchor.download = `signature.${type}`;
    anchor.click();
    URL.revokeObjectURL(url);
    setMessage(`Downloaded ${type.toUpperCase()} signature.`);
  };

  const handleCopy = async () => {
    const canvas = getCanvas();
    if (!canvas) return;
    try {
      await copyCanvasToClipboard(canvas);
      setMessage("Signature copied to clipboard.");
    } catch {
      setMessage("Clipboard copy is not supported in this browser.");
    }
  };

  return (
    <div className="flex min-h-screen w-full max-w-full flex-col overflow-x-hidden bg-surface-base">
      <Header />
      <main id="main-content" className="flex-1 min-w-0 overflow-x-hidden">
        <div className="px-6 py-6 sm:px-10">
          <Link href="/" className="inline-flex items-center gap-1 text-sm text-content-secondary transition-colors hover:text-content-primary">
            ← All Tools
          </Link>
        </div>

        <div className="mx-auto max-w-4xl px-4 pb-16 sm:px-6">
          <div className="pt-4 text-center">
            <div className="mx-auto mb-5 flex h-12 w-12 items-center justify-center rounded-xl bg-brand-blue/10">
              <PenLine className="h-6 w-6 text-brand-blue" strokeWidth={1.75} />
            </div>
            <h1 className="text-2xl font-bold text-content-primary sm:text-3xl">
              Signature Maker — Create Your Digital Signature Free
            </h1>
            <p className="mx-auto mt-3 max-w-md text-content-secondary">
              Draw, type, or upload your signature and download PNG/JPG or copy
              to clipboard instantly.
            </p>
            <div className="mt-4 flex justify-center">
              <FavoriteButton slug="signature-maker" />
            </div>
          </div>

          <div className="mx-auto mt-10 max-w-2xl space-y-5">
            <CalculatorField label="Mode" htmlFor="signature-mode">
              <ToggleButtonGroup
                value={mode}
                onChange={setMode}
                ariaLabel="Signature mode"
                options={[
                  { value: "draw", label: "Draw" },
                  { value: "type", label: "Type" },
                  { value: "upload", label: "Upload" },
                ]}
              />
            </CalculatorField>

            {mode === "draw" && (
              <div className="grid gap-4 sm:grid-cols-2">
                <CalculatorField label="Pen Color" htmlFor="pen-color">
                  <div className="flex gap-2">
                    {SIGNATURE_COLORS.map((color) => (
                      <button
                        key={color.value}
                        type="button"
                        onClick={() => setPenColor(color.value)}
                        className={`h-10 flex-1 rounded-lg border ${penColor === color.value ? "border-brand-blue ring-2 ring-brand-blue/40" : "border-surface-border"}`}
                        style={{ backgroundColor: color.value }}
                        aria-label={color.label}
                      />
                    ))}
                  </div>
                </CalculatorField>
                <CalculatorField label={`Pen Thickness: ${penSize}px`} htmlFor="pen-size">
                  <input
                    id="pen-size"
                    type="range"
                    min={1}
                    max={5}
                    value={penSize}
                    onChange={(event) => setPenSize(Number(event.target.value))}
                    className="h-2 w-full cursor-pointer appearance-none rounded-full bg-surface-border accent-brand-blue"
                  />
                </CalculatorField>
                <div className="flex gap-2 sm:col-span-2">
                  <button type="button" onClick={undoDrawing} className="rounded-lg border border-surface-border px-4 py-2 text-sm text-content-secondary hover:text-content-primary">
                    Undo
                  </button>
                  <button type="button" onClick={clearCanvas} className="rounded-lg border border-surface-border px-4 py-2 text-sm text-content-secondary hover:text-content-primary">
                    Clear
                  </button>
                </div>
              </div>
            )}

            {mode === "type" && (
              <div className="grid gap-4 sm:grid-cols-2">
                <CalculatorField label="Your Name" htmlFor="typed-name">
                  <CalculatorInput id="typed-name" value={typedName} onChange={setTypedName} placeholder="John Doe" />
                </CalculatorField>
                <CalculatorField label="Font" htmlFor="signature-font">
                  <CalculatorSelect
                    id="signature-font"
                    value={fontFamily}
                    onChange={(value) => setFontFamily(value as SignatureFont)}
                    options={SIGNATURE_FONTS.map((font) => ({
                      value: font.value,
                      label: font.label,
                    }))}
                    ariaLabel="Signature font"
                  />
                </CalculatorField>
                <CalculatorField label={`Font Size: ${fontSize}px`} htmlFor="font-size">
                  <input
                    id="font-size"
                    type="range"
                    min={24}
                    max={72}
                    value={fontSize}
                    onChange={(event) => setFontSize(Number(event.target.value))}
                    className="h-2 w-full cursor-pointer appearance-none rounded-full bg-surface-border accent-brand-blue"
                  />
                </CalculatorField>
                <CalculatorField label="Color" htmlFor="typed-color">
                  <div className="flex gap-2">
                    {SIGNATURE_COLORS.map((color) => (
                      <button
                        key={color.value}
                        type="button"
                        onClick={() => setPenColor(color.value)}
                        className={`h-10 flex-1 rounded-lg border ${penColor === color.value ? "border-brand-blue ring-2 ring-brand-blue/40" : "border-surface-border"}`}
                        style={{ backgroundColor: color.value }}
                        aria-label={color.label}
                      />
                    ))}
                  </div>
                </CalculatorField>
              </div>
            )}

            {mode === "upload" && (
              <div className="space-y-4">
                <input
                  id="signature-upload"
                  type="file"
                  accept="image/*"
                  className="hidden"
                  onChange={(event) => {
                    const file = event.target.files?.[0];
                    if (file) handleUpload(file);
                    event.target.value = "";
                  }}
                />
                <label
                  htmlFor="signature-upload"
                  className="flex cursor-pointer flex-col items-center justify-center rounded-2xl border-2 border-dashed border-brand-blue/30 bg-surface-card p-8 text-center hover:border-brand-blue"
                >
                  <Upload className="mb-3 h-8 w-8 text-content-muted" />
                  <span className="font-medium text-content-primary">Upload signature image</span>
                  <span className="mt-1 text-sm text-content-secondary">
                    {uploadFile ? uploadFile.name : "PNG, JPG, or WebP"}
                  </span>
                </label>
                <label className="flex cursor-pointer items-center justify-between rounded-xl border border-surface-border bg-surface-card px-4 py-3">
                  <span className="text-sm text-content-primary">Remove light background</span>
                  <input
                    type="checkbox"
                    checked={removeBackground}
                    onChange={(event) => setRemoveBackground(event.target.checked)}
                    className="h-4 w-4 accent-brand-blue"
                  />
                </label>
              </div>
            )}

            {cropSession && (
              <ImageCropEditor
                imageSrc={cropSession.imageSrc}
                aspect={3}
                originalFile={cropSession.originalFile}
                accent="convert"
                onApply={handleCropApply}
                onCancel={handleCropCancel}
              />
            )}

            <div className="overflow-hidden rounded-xl border border-surface-border bg-white">
              <canvas
                ref={canvasRef}
                width={CANVAS_WIDTH}
                height={CANVAS_HEIGHT}
                onPointerDown={startDrawing}
                onPointerMove={draw}
                onPointerUp={stopDrawing}
                onPointerLeave={stopDrawing}
                className="h-auto w-full touch-none"
                aria-label="Signature canvas"
              />
            </div>

            <div className="grid gap-3 sm:grid-cols-2">
              <button type="button" onClick={() => downloadSignature("png")} className="flex items-center justify-center gap-2 rounded-xl bg-brand-blue px-4 py-3 font-semibold text-white">
                <Download className="h-4 w-4" /> Download PNG
              </button>
              <button type="button" onClick={() => downloadSignature("jpg")} className="flex items-center justify-center gap-2 rounded-xl border border-surface-border bg-surface-card px-4 py-3 font-semibold text-content-primary">
                <Download className="h-4 w-4" /> Download JPG
              </button>
              <button type="button" onClick={handleCopy} className="flex items-center justify-center gap-2 rounded-xl border border-surface-border bg-surface-card px-4 py-3 font-semibold text-content-primary sm:col-span-2">
                <Copy className="h-4 w-4" /> Copy to Clipboard
              </button>
            </div>

            {message && (
              <p className="text-center text-sm text-content-secondary">{message}</p>
            )}
          </div>

          <div className="mt-16">
            <h2 className="mb-6 text-center text-lg font-semibold text-content-primary">How It Works</h2>
            <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
              {[
                { step: "01", icon: PenLine, title: "Create", description: "Draw, type, or upload your signature" },
                { step: "02", icon: Type, title: "Customize", description: "Adjust color, font, thickness, or crop" },
                { step: "03", icon: RefreshCw, title: "Export", description: "Download PNG/JPG or copy instantly" },
              ].map((step) => (
                <div key={step.title} className="rounded-xl border border-surface-border bg-surface-card p-5">
                  <div className="mb-3 flex h-10 w-10 items-center justify-center rounded-lg bg-brand-blue/10">
                    <step.icon className="h-5 w-5 text-brand-blue" />
                  </div>
                  <p className="text-2xl font-bold text-content-muted/40">{step.step}</p>
                  <p className="mt-1 font-semibold text-content-primary">{step.title}</p>
                  <p className="mt-1 text-sm text-content-secondary">{step.description}</p>
                </div>
              ))}
            </div>
          </div>

          <RelatedTools currentSlug="signature-maker" />
          <ToolFeedback toolName="Signature Maker" />
          <ToolSeoContent slug="signature-maker" />
          <DinoGame />
        </div>
      </main>
      <Footer />
    </div>
  );
}
