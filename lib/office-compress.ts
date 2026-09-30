import JSZip from "jszip";

export type OfficeCompressLevel = "light" | "recommended" | "strong";

export type OfficeImageAction = "recompressed" | "resized" | "converted" | "skipped";

export type OfficePart = "word" | "ppt" | "xl";

export type OfficeImageResult = {
  name: string;
  before: number;
  after: number;
  action: OfficeImageAction;
};

export type OfficeCompressProgress = {
  done: number;
  total: number;
  stage: string;
};

export type OfficeCompressResult = {
  blob: Blob;
  originalBytes: number;
  outputBytes: number;
  images: OfficeImageResult[];
  notes: string[];
  unchanged: boolean;
};

export type OfficeImageInfo = {
  width: number;
  height: number;
  hasAlpha: boolean;
  /** Full decode kept so encoding can reuse it instead of decoding again. */
  bitmap?: ImageBitmap;
};

export type InspectImageFn = (
  bytes: Uint8Array,
  mime: string,
) => Promise<OfficeImageInfo | null>;

export type EncodeImageArgs = {
  bytes: Uint8Array;
  mime: string;
  width: number;
  height: number;
  hasAlpha: boolean;
  maxEdge: number;
  quality: number;
  outputMime: "image/jpeg" | "image/png";
  /** Present when inspect already decoded this image. */
  bitmap?: ImageBitmap;
};

export type EncodeImageFn = (args: EncodeImageArgs) => Promise<Uint8Array | null>;

export type OfficeCompressOptions = {
  level: OfficeCompressLevel;
  removeEmbeddedFonts?: boolean;
  /** Injected in tests. The browser uses canvas when omitted. */
  inspectImage?: InspectImageFn;
  encodeImage?: EncodeImageFn;
};

const LEVELS: Record<OfficeCompressLevel, { maxEdge: number; quality: number }> = {
  light: { maxEdge: 2400, quality: 0.85 },
  recommended: { maxEdge: 1600, quality: 0.75 },
  strong: { maxEdge: 1200, quality: 0.6 },
};

const MIN_IMAGE_BYTES = 20 * 1024;
const ALREADY_OPTIMIZED_RATIO = 0.98;
const SKIP_EXTENSIONS = new Set(["gif", "emf", "wmf", "svg", "tif", "tiff", "bmp"]);
const WORD_MIME = "application/vnd.openxmlformats-officedocument.wordprocessingml.document";

const ZIP_MAGIC = [0x50, 0x4b, 0x03, 0x04];
const CFB_MAGIC = [0xd0, 0xcf, 0x11, 0xe0];

export class OfficeCompressError extends Error {
  constructor(message: string) {
    super(message);
    this.name = "OfficeCompressError";
  }
}

export function officeLevelSettings(level: OfficeCompressLevel) {
  return LEVELS[level];
}

export async function compressOfficeFile(
  file: File | ArrayBuffer,
  options: OfficeCompressOptions,
  onProgress?: (progress: OfficeCompressProgress) => void,
): Promise<OfficeCompressResult> {
  const original = await readInputBytes(file);
  const mime = inputMime(file);

  if (startsWith(original, CFB_MAGIC)) {
    throw new OfficeCompressError(
      "This file is password-protected or in old .doc format",
    );
  }
  if (!startsWith(original, ZIP_MAGIC)) {
    throw new OfficeCompressError("This file is not a Word document.");
  }

  const level = LEVELS[options.level] ?? LEVELS.recommended;
  const inspectImage =
    options.inspectImage ??
    ((imageBytes: Uint8Array, imageMime: string) =>
      inspectImageWithCanvas(imageBytes, imageMime, level.maxEdge));
  const encodeImage = options.encodeImage ?? encodeImageWithCanvas;

  let zip: JSZip;
  try {
    zip = await JSZip.loadAsync(original);
  } catch {
    throw new OfficeCompressError("This file is not a Word document.");
  }

  const part = detectOfficePart(zip);
  if (part !== "word" || !zip.file("word/document.xml")) {
    throw new OfficeCompressError("This file is not a Word document.");
  }

  const notes: string[] = [];
  const images: OfficeImageResult[] = [];
  const mediaPaths = listMedia(zip, part);
  let structuralChange = false;

  onProgress?.({ done: 0, total: mediaPaths.length, stage: "Reading document" });

  for (let index = 0; index < mediaPaths.length; index++) {
    const path = mediaPaths[index];
    onProgress?.({
      done: index + 1,
      total: mediaPaths.length,
      stage: `Optimizing image ${index + 1} of ${mediaPaths.length}`,
    });

    const entry = zip.file(path);
    if (!entry) continue;
    const bytes = await entry.async("uint8array");
    const fileName = path.split("/").pop() ?? path;
    const extension = extensionOf(fileName);

    if (SKIP_EXTENSIONS.has(extension) || bytes.byteLength < MIN_IMAGE_BYTES) {
      images.push({
        name: fileName,
        before: bytes.byteLength,
        after: bytes.byteLength,
        action: "skipped",
      });
      continue;
    }

    if (extension !== "jpg" && extension !== "jpeg" && extension !== "png") {
      images.push({
        name: fileName,
        before: bytes.byteLength,
        after: bytes.byteLength,
        action: "skipped",
      });
      continue;
    }

    const mimeType = extension === "png" ? "image/png" : "image/jpeg";
    const info = await inspectImage(bytes, mimeType);
    if (!info) {
      images.push(skippedImage(fileName, bytes.byteLength));
      continue;
    }

    try {
      const longEdge = Math.max(info.width, info.height);
      const oversized = longEdge > level.maxEdge;
      const convertToJpeg =
        extension === "png" &&
        !info.hasAlpha &&
        (options.level === "recommended" || options.level === "strong");

      if (extension === "png" && !convertToJpeg && !oversized) {
        images.push(skippedImage(fileName, bytes.byteLength));
        continue;
      }

      const outputMime = convertToJpeg ? "image/jpeg" : mimeType;
      let encoded: Uint8Array | null = null;
      try {
        encoded = await encodeImage({
          bytes,
          mime: mimeType,
          width: info.width,
          height: info.height,
          hasAlpha: info.hasAlpha,
          maxEdge: level.maxEdge,
          quality: level.quality,
          outputMime,
          bitmap: info.bitmap,
        });
      } catch {
        encoded = null;
      }

      if (!encoded || encoded.byteLength >= bytes.byteLength) {
        images.push(skippedImage(fileName, bytes.byteLength));
        continue;
      }

      const action: OfficeImageAction = convertToJpeg
        ? "converted"
        : oversized
          ? "resized"
          : "recompressed";

      if (convertToJpeg) {
        const nextName = uniqueJpegName(zip, part, fileName);
        const nextPath = `${part}/media/${nextName}`;
        zip.remove(path);
        zip.file(nextPath, encoded);
        await renameMediaReferences(zip, fileName, nextName);
        await ensureJpegContentType(zip);
        images.push({
          name: nextName,
          before: bytes.byteLength,
          after: encoded.byteLength,
          action,
        });
      } else {
        zip.file(path, encoded);
        images.push({
          name: fileName,
          before: bytes.byteLength,
          after: encoded.byteLength,
          action,
        });
      }
    } finally {
      info.bitmap?.close();
    }
  }

  if (await removeThumbnail(zip)) structuralChange = true;

  if (options.removeEmbeddedFonts) {
    const removed = await removeEmbeddedFonts(zip);
    if (removed) {
      structuralChange = true;
      notes.push("Text may look different on computers without these fonts");
    }
  }

  onProgress?.({
    done: mediaPaths.length,
    total: mediaPaths.length,
    stage: "Packing document",
  });

  const changedImage = images.some((image) => image.action !== "skipped");
  if (!changedImage && !structuralChange) {
    notes.push("This document is already optimized");
    return originalResult(original, mime, images, notes, true);
  }

  let packed: Uint8Array;
  try {
    packed = await packZip(zip);
    await assertPackageIntegrity(packed);
  } catch {
    notes.push("Couldn't compress this file safely — original returned");
    return originalResult(original, mime, images, notes, false);
  }

  if (packed.byteLength >= original.byteLength * ALREADY_OPTIMIZED_RATIO) {
    notes.push("This document is already optimized");
    return originalResult(original, mime, images, notes, true);
  }

  return {
    blob: toBlob(packed, mime),
    originalBytes: original.byteLength,
    outputBytes: packed.byteLength,
    images,
    notes,
    unchanged: false,
  };
}

async function readInputBytes(file: File | ArrayBuffer): Promise<Uint8Array> {
  if (file instanceof ArrayBuffer) return new Uint8Array(file);
  const buffer = await file.arrayBuffer();
  return new Uint8Array(buffer);
}

function inputMime(file: File | ArrayBuffer): string {
  if (typeof File !== "undefined" && file instanceof File && file.type) return file.type;
  return WORD_MIME;
}

function startsWith(bytes: Uint8Array, magic: number[]): boolean {
  if (bytes.byteLength < magic.length) return false;
  return magic.every((value, index) => bytes[index] === value);
}

function detectOfficePart(zip: JSZip): OfficePart | null {
  const names = Object.keys(zip.files);
  if (names.some((name) => name.startsWith("word/"))) return "word";
  if (names.some((name) => name.startsWith("ppt/"))) return "ppt";
  if (names.some((name) => name.startsWith("xl/"))) return "xl";
  return null;
}

function listMedia(zip: JSZip, part: OfficePart): string[] {
  const prefix = `${part}/media/`;
  return Object.keys(zip.files)
    .filter((name) => name.startsWith(prefix) && !name.endsWith("/") && !zip.files[name].dir)
    .sort();
}

function extensionOf(fileName: string): string {
  const dot = fileName.lastIndexOf(".");
  return dot === -1 ? "" : fileName.slice(dot + 1).toLowerCase();
}

function skippedImage(name: string, size: number): OfficeImageResult {
  return { name, before: size, after: size, action: "skipped" };
}

function uniqueJpegName(zip: JSZip, part: OfficePart, fileName: string): string {
  const dot = fileName.lastIndexOf(".");
  const base = dot === -1 ? fileName : fileName.slice(0, dot);
  let name = `${base}.jpeg`;
  let suffix = 1;
  while (zip.file(`${part}/media/${name}`)) {
    name = `${base}-${suffix}.jpeg`;
    suffix += 1;
  }
  return name;
}

function mediaTargetSuffix(fileName: string): string {
  return `media/${fileName}`;
}

function renamedMediaTarget(target: string, fromName: string, toName: string): string | null {
  const rawSuffix = mediaTargetSuffix(fromName);
  if (target.endsWith(rawSuffix)) {
    return `${target.slice(0, target.length - fromName.length)}${toName}`;
  }

  const encodedFrom = encodeURIComponent(fromName);
  const encodedSuffix = mediaTargetSuffix(encodedFrom);
  if (encodedFrom !== fromName && target.endsWith(encodedSuffix)) {
    return `${target.slice(0, target.length - encodedFrom.length)}${encodeURIComponent(toName)}`;
  }

  return null;
}

function rewriteRelationshipTargets(xml: string, fromName: string, toName: string): string {
  return xml.replace(/\bTarget="([^"]*)"/g, (match, target: string) => {
    const next = renamedMediaTarget(target, fromName, toName);
    return next === null ? match : `Target="${next}"`;
  });
}

async function renameMediaReferences(zip: JSZip, fromName: string, toName: string) {
  const relPaths = Object.keys(zip.files).filter((name) => name.endsWith(".rels"));
  for (const relPath of relPaths) {
    const file = zip.file(relPath);
    if (!file) continue;
    const xml = await file.async("string");
    const next = rewriteRelationshipTargets(xml, fromName, toName);
    if (next !== xml) zip.file(relPath, next);
  }
}

async function ensureJpegContentType(zip: JSZip) {
  const file = zip.file("[Content_Types].xml");
  if (!file) return;
  const xml = await file.async("string");
  if (/Extension="jpeg"/i.test(xml)) return;
  const tag = '<Default Extension="jpeg" ContentType="image/jpeg"/>';
  const next = xml.includes("<Types")
    ? xml.replace(/<Types\b[^>]*>/, (open) => `${open}${tag}`)
    : xml;
  zip.file("[Content_Types].xml", next);
}

async function removeThumbnail(zip: JSZip): Promise<boolean> {
  const thumbnails = Object.keys(zip.files).filter((name) =>
    /^docProps\/thumbnail\./i.test(name),
  );
  if (thumbnails.length === 0) return false;
  for (const path of thumbnails) zip.remove(path);

  const rels = zip.file("_rels/.rels");
  if (rels) {
    const xml = await rels.async("string");
    zip.file("_rels/.rels", stripRelationships(xml, /thumbnail/i));
  }

  const contentTypes = zip.file("[Content_Types].xml");
  if (contentTypes) {
    const xml = await contentTypes.async("string");
    const next = xml.replace(/<Override\b[^>]*\/>/g, (tag) =>
      /thumbnail/i.test(tag) ? "" : tag,
    );
    zip.file("[Content_Types].xml", next);
  }
  return true;
}

async function removeEmbeddedFonts(zip: JSZip): Promise<boolean> {
  const fonts = Object.keys(zip.files).filter(
    (name) => name.startsWith("word/fonts/") && !name.endsWith("/"),
  );
  if (fonts.length === 0) return false;
  for (const path of fonts) zip.remove(path);

  const rels = zip.file("word/_rels/fontTable.xml.rels");
  if (rels) {
    const xml = await rels.async("string");
    zip.file("word/_rels/fontTable.xml.rels", stripRelationships(xml, /\/fonts\//i));
  }

  const fontTable = zip.file("word/fontTable.xml");
  if (fontTable) {
    const xml = await fontTable.async("string");
    zip.file("word/fontTable.xml", xml.replace(/<w:embed[^>]*\/>/g, ""));
  }
  return true;
}

function stripRelationships(xml: string, targetPattern: RegExp): string {
  return xml.replace(/<Relationship\b[^>]*\/>/g, (tag) => {
    const target = tag.match(/Target="([^"]+)"/);
    if (target && targetPattern.test(target[1])) return "";
    return tag;
  });
}

async function packZip(zip: JSZip): Promise<Uint8Array> {
  const contentTypes = await zip.file("[Content_Types].xml")?.async("uint8array");
  const ordered = new JSZip();
  if (contentTypes) ordered.file("[Content_Types].xml", contentTypes);

  const names = Object.keys(zip.files)
    .filter((name) => name !== "[Content_Types].xml" && !zip.files[name].dir)
    .sort();
  for (const name of names) {
    const file = zip.file(name);
    if (!file) continue;
    ordered.file(name, await file.async("uint8array"));
  }

  return ordered.generateAsync({
    type: "uint8array",
    compression: "DEFLATE",
    compressionOptions: { level: 9 },
  });
}

async function assertPackageIntegrity(bytes: Uint8Array) {
  const zip = await JSZip.loadAsync(bytes);
  const relPaths = Object.keys(zip.files).filter((name) => name.endsWith(".rels"));
  for (const relPath of relPaths) {
    const xml = await zip.file(relPath)!.async("string");
    const tags = xml.match(/<Relationship\b[^>]*\/>/g) ?? [];
    for (const tag of tags) {
      if (/TargetMode="External"/.test(tag)) continue;
      const target = tag.match(/Target="([^"]+)"/)?.[1];
      if (!target) throw new Error("Missing relationship target");
      const resolved = resolveRelationshipTarget(relPath, target);
      if (!zip.file(resolved)) {
        throw new Error(`Missing relationship target ${resolved}`);
      }
    }
  }

  const contentTypes = zip.file("[Content_Types].xml");
  if (contentTypes) {
    const xml = await contentTypes.async("string");
    const overrides = xml.match(/<Override\b[^>]*\/>/g) ?? [];
    for (const tag of overrides) {
      const partName = tag.match(/PartName="([^"]+)"/)?.[1];
      if (!partName) continue;
      const path = partName.replace(/^\//, "");
      if (!zip.file(path)) throw new Error(`Missing content type part ${path}`);
    }
  }

  if (!zip.file("word/document.xml")) {
    throw new Error("Missing word/document.xml");
  }

  await convertDocxToHtml(bytes);
}

type MammothBrowser = {
  convertToHtml?: (input: { arrayBuffer: ArrayBuffer }) => Promise<unknown>;
  default?: {
    convertToHtml: (input: { arrayBuffer: ArrayBuffer }) => Promise<unknown>;
  };
};

async function convertDocxToHtml(bytes: Uint8Array): Promise<void> {
  const loaded = (await import("mammoth/mammoth.browser.js")) as MammothBrowser;
  const convert = loaded.convertToHtml ?? loaded.default?.convertToHtml;
  if (!convert) throw new Error("Could not load the document checker");
  await convert({ arrayBuffer: toArrayBuffer(bytes) });
}

function resolveRelationshipTarget(relsPath: string, target: string): string {
  if (target.startsWith("/")) return decodeURIComponent(target.slice(1));
  const parts = relsPath.split("/");
  const relsIndex = parts.lastIndexOf("_rels");
  const stack = relsIndex > 0 ? parts.slice(0, relsIndex) : [];
  for (const part of decodeURIComponent(target).split("/")) {
    if (part === "..") stack.pop();
    else if (part !== "." && part !== "") stack.push(part);
  }
  return stack.join("/");
}

function originalResult(
  original: Uint8Array,
  mime: string,
  images: OfficeImageResult[],
  notes: string[],
  unchanged: boolean,
): OfficeCompressResult {
  return {
    blob: toBlob(original, mime),
    originalBytes: original.byteLength,
    outputBytes: original.byteLength,
    images,
    notes,
    unchanged,
  };
}

function toBlob(bytes: Uint8Array, mime: string): Blob {
  const copy = new Uint8Array(bytes.byteLength);
  copy.set(bytes);
  return new Blob([copy], { type: mime });
}

const PNG_SIGNATURE = [0x89, 0x50, 0x4e, 0x47, 0x0d, 0x0a, 0x1a, 0x0a];
const ALPHA_SAMPLE_EDGE = 512;

type PngHeader = {
  width: number;
  height: number;
  colorType: number;
  hasTrns: boolean;
};

function readUint32(bytes: Uint8Array, offset: number): number {
  return (
    ((bytes[offset] << 24) |
      (bytes[offset + 1] << 16) |
      (bytes[offset + 2] << 8) |
      bytes[offset + 3]) >>>
    0
  );
}

function readPngHeader(bytes: Uint8Array): PngHeader | null {
  if (bytes.byteLength < 8 + 8 + 13) return null;
  if (!PNG_SIGNATURE.every((value, index) => bytes[index] === value)) return null;

  let offset = 8;
  let header: PngHeader | null = null;
  let hasTrns = false;
  while (offset + 8 <= bytes.byteLength) {
    const length = readUint32(bytes, offset);
    const dataStart = offset + 8;
    if (dataStart + length + 4 > bytes.byteLength) break;
    const type = String.fromCharCode(
      bytes[offset + 4],
      bytes[offset + 5],
      bytes[offset + 6],
      bytes[offset + 7],
    );
    if (type === "IHDR" && length >= 13) {
      const width = readUint32(bytes, dataStart);
      const height = readUint32(bytes, dataStart + 4);
      if (width === 0 || height === 0) return null;
      header = { width, height, colorType: bytes[dataStart + 9], hasTrns: false };
    } else if (type === "tRNS") {
      hasTrns = true;
    } else if (type === "IDAT") {
      break;
    }
    offset = dataStart + length + 4;
  }

  if (!header) return null;
  header.hasTrns = hasTrns;
  return header;
}

/** Color type 0 or 2 and no tRNS means the file has no alpha channel. */
function pngIsDeclaredOpaque(bytes: Uint8Array): boolean {
  const header = readPngHeader(bytes);
  if (!header || header.hasTrns) return false;
  return header.colorType === 0 || header.colorType === 2;
}

function pngNeedsPixelAlphaCheck(bytes: Uint8Array): boolean {
  const header = readPngHeader(bytes);
  if (!header) return false;
  return header.colorType === 4 || header.colorType === 6 || header.hasTrns;
}

async function inspectImageWithCanvas(
  bytes: Uint8Array,
  mime: string,
  maxEdge: number,
): Promise<OfficeImageInfo | null> {
  if (mime === "image/png") {
    const header = readPngHeader(bytes);
    if (header && pngIsDeclaredOpaque(bytes)) {
      return { width: header.width, height: header.height, hasAlpha: false };
    }
    if (header && pngNeedsPixelAlphaCheck(bytes)) {
      const bitmap = await decodeImage(bytes, mime, scaledSize(header.width, header.height, maxEdge));
      if (!bitmap) return null;
      return {
        width: bitmap.width,
        height: bitmap.height,
        hasAlpha: await pixelsHaveAlpha(bitmap),
        bitmap,
      };
    }
  }

  const bitmap = await decodeImage(bytes, mime);
  if (!bitmap) return null;
  return { width: bitmap.width, height: bitmap.height, hasAlpha: false, bitmap };
}

async function encodeImageWithCanvas(args: EncodeImageArgs): Promise<Uint8Array | null> {
  const owned = !args.bitmap;
  const target = scaledSize(args.width, args.height, args.maxEdge);
  const bitmap = args.bitmap ?? (await decodeImage(args.bytes, args.mime, target));
  if (!bitmap) return null;

  try {
    const longEdge = Math.max(bitmap.width, bitmap.height);
    const scale = longEdge > args.maxEdge ? args.maxEdge / longEdge : 1;
    const width = Math.max(1, Math.round(bitmap.width * scale));
    const height = Math.max(1, Math.round(bitmap.height * scale));
    const canvas = createCanvas(width, height);
    const context = canvas.getContext("2d");
    if (!context) return null;
    if (args.outputMime === "image/jpeg") {
      context.fillStyle = "#ffffff";
      context.fillRect(0, 0, width, height);
    }
    context.drawImage(bitmap, 0, 0, width, height);
    const blob = await canvasToBlob(canvas, args.outputMime, args.quality);
    if (!blob) return null;
    return new Uint8Array(await blob.arrayBuffer());
  } finally {
    if (owned) bitmap.close();
  }
}

function scaledSize(width: number, height: number, maxEdge: number): { width: number; height: number } {
  const longEdge = Math.max(width, height);
  const scale = longEdge > maxEdge ? maxEdge / longEdge : 1;
  return {
    width: Math.max(1, Math.round(width * scale)),
    height: Math.max(1, Math.round(height * scale)),
  };
}

async function decodeImage(
  bytes: Uint8Array,
  mime: string,
  resize?: { width: number; height: number },
): Promise<ImageBitmap | null> {
  if (typeof createImageBitmap === "undefined") return null;
  const blob = new Blob([toArrayBuffer(bytes)], { type: mime });
  const options: ImageBitmapOptions = { imageOrientation: "from-image" };
  if (resize) {
    options.resizeWidth = resize.width;
    options.resizeHeight = resize.height;
    options.resizeQuality = "high";
  }
  try {
    return await createImageBitmap(blob, options);
  } catch {
    try {
      return await createImageBitmap(blob);
    } catch {
      return null;
    }
  }
}

async function pixelsHaveAlpha(bitmap: ImageBitmap): Promise<boolean> {
  try {
    const longEdge = Math.max(bitmap.width, bitmap.height);
    const scale = longEdge > ALPHA_SAMPLE_EDGE ? ALPHA_SAMPLE_EDGE / longEdge : 1;
    const width = Math.max(1, Math.round(bitmap.width * scale));
    const height = Math.max(1, Math.round(bitmap.height * scale));
    const canvas = createCanvas(width, height);
    const context = canvas.getContext("2d");
    if (!context) return true;
    context.drawImage(bitmap, 0, 0, width, height);
    const data = context.getImageData(0, 0, width, height).data;
    for (let index = 3; index < data.length; index += 4) {
      if (data[index] < 255) return true;
    }
    return false;
  } catch {
    return true;
  }
}

function createCanvas(width: number, height: number): OffscreenCanvas | HTMLCanvasElement {
  if (typeof OffscreenCanvas !== "undefined") return new OffscreenCanvas(width, height);
  const canvas = document.createElement("canvas");
  canvas.width = width;
  canvas.height = height;
  return canvas;
}

function canvasToBlob(
  canvas: OffscreenCanvas | HTMLCanvasElement,
  type: string,
  quality: number,
): Promise<Blob | null> {
  if (canvas instanceof OffscreenCanvas) {
    return canvas.convertToBlob({ type, quality });
  }
  return new Promise((resolve) => {
    canvas.toBlob((blob) => resolve(blob), type, quality);
  });
}

function toArrayBuffer(bytes: Uint8Array): ArrayBuffer {
  const copy = new Uint8Array(bytes.byteLength);
  copy.set(bytes);
  return copy.buffer;
}
