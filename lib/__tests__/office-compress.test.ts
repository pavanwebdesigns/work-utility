import { Document, Header, ImageRun, Packer, Paragraph, TextRun } from "docx";
import JSZip from "jszip";
import mammoth from "mammoth";
import {
  OfficeCompressError,
  compressOfficeFile,
  type EncodeImageArgs,
  type OfficeImageInfo,
} from "@/lib/office-compress";

const TINY_JPEG = Uint8Array.from([
  0xff, 0xd8, 0xff, 0xe0, 0x00, 0x10, 0x4a, 0x46, 0x49, 0x46, 0x00, 0x01,
  0x01, 0x00, 0x00, 0x01, 0x00, 0x01, 0x00, 0x00, 0xff, 0xdb, 0x00, 0x43, 0x00,
  0x08, 0x06, 0x06, 0x07, 0x06, 0x05, 0x08, 0x07, 0x07, 0x07, 0x09, 0x09, 0x08,
  0x0a, 0x0c, 0x14, 0x0d, 0x0c, 0x0b, 0x0b, 0x0c, 0x19, 0x12, 0x13, 0x0f, 0x14,
  0x1d, 0x1a, 0x1f, 0x1e, 0x1d, 0x1a, 0x1c, 0x1c, 0x20, 0x24, 0x2e, 0x27, 0x20,
  0x22, 0x2c, 0x23, 0x1c, 0x1c, 0x28, 0x37, 0x29, 0x2c, 0x30, 0x31, 0x34, 0x34,
  0x34, 0x1f, 0x27, 0x39, 0x3d, 0x38, 0x32, 0x3c, 0x2e, 0x33, 0x34, 0x32, 0xff,
  0xc0, 0x00, 0x0b, 0x08, 0x00, 0x01, 0x00, 0x01, 0x01, 0x01, 0x11, 0x00, 0xff,
  0xc4, 0x00, 0x14, 0x00, 0x01, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00,
  0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x08, 0xff, 0xda, 0x00, 0x08, 0x01,
  0x01, 0x00, 0x00, 0x3f, 0x00, 0x7f, 0xff, 0xd9,
]);

function largeJpeg(seedStart = 0x12345678): Uint8Array {
  const comment = new Uint8Array(24_000);
  let seed = seedStart;
  for (let index = 0; index < comment.length; index++) {
    seed = (Math.imul(seed, 1664525) + 1013904223) >>> 0;
    comment[index] = seed & 0xff;
  }
  comment[0] = seedStart & 0xff;
  const header = new Uint8Array(4);
  header[0] = 0xff;
  header[1] = 0xfe;
  header[2] = (comment.byteLength + 2) >> 8;
  header[3] = (comment.byteLength + 2) & 0xff;
  const out = new Uint8Array(2 + header.byteLength + comment.byteLength + (TINY_JPEG.byteLength - 2));
  out.set(TINY_JPEG.subarray(0, 2), 0);
  out.set(header, 2);
  out.set(comment, 6);
  out.set(TINY_JPEG.subarray(2), 6 + comment.byteLength);
  return out;
}

function imageRun(data: Uint8Array, type: "jpg" | "png") {
  return new ImageRun({
    type,
    data,
    transformation: { width: 120, height: 80 },
  });
}

async function packDoc(children: Paragraph[], header?: Paragraph): Promise<ArrayBuffer> {
  const doc = new Document({
    sections: [
      {
        headers: header
          ? { default: new Header({ children: [header] }) }
          : undefined,
        children,
      },
    ],
  });
  const buffer = await Packer.toBuffer(doc);
  return buffer.buffer.slice(buffer.byteOffset, buffer.byteOffset + buffer.byteLength);
}

function mockCodec(info: OfficeImageInfo) {
  const calls: EncodeImageArgs[] = [];
  return {
    calls,
    inspectImage: async () => info,
    encodeImage: async (args: EncodeImageArgs) => {
      calls.push(args);
      return new Uint8Array(64);
    },
  };
}

async function unzip(blob: Blob) {
  const bytes = new Uint8Array(await blob.arrayBuffer());
  return JSZip.loadAsync(bytes);
}

describe("compressOfficeFile", () => {
  test("1. large JPEGs shrink, stay within the level edge, and still parse", async () => {
    const input = await packDoc([
      new Paragraph({
        children: [
          imageRun(largeJpeg(1), "jpg"),
          imageRun(largeJpeg(2), "jpg"),
          imageRun(largeJpeg(3), "jpg"),
        ],
      }),
    ]);
    const codec = mockCodec({ width: 3000, height: 2000, hasAlpha: false });
    const result = await compressOfficeFile(
      input,
      { level: "recommended", ...codec },
    );

    expect(result.outputBytes).toBeLessThan(result.originalBytes);
    expect(result.unchanged).toBe(false);
    expect(codec.calls).toHaveLength(3);
    expect(codec.calls.every((call) => call.maxEdge === 1600 && call.quality === 0.75)).toBe(true);
    expect(codec.calls.every((call) => Math.max(call.width, call.height) > call.maxEdge)).toBe(true);
    expect(result.images.filter((image) => image.action === "resized")).toHaveLength(3);

    const zip = await unzip(result.blob);
    const media = Object.keys(zip.files).filter((name) => name.startsWith("word/media/") && !zip.files[name].dir);
    expect(media).toHaveLength(3);
    await expect(mammoth.convertToHtml({ buffer: Buffer.from(await result.blob.arrayBuffer()) })).resolves.toBeTruthy();
  });

  test("2. opaque PNG becomes JPEG and relationships stay intact", async () => {
    const png = largeJpeg();
    const input = await packDoc([
      new Paragraph({ children: [imageRun(png, "png")] }),
    ]);
    const codec = mockCodec({ width: 2000, height: 1200, hasAlpha: false });
    const result = await compressOfficeFile(input, { level: "recommended", ...codec });

    expect(result.images.some((image) => image.action === "converted" && image.name.endsWith(".jpeg"))).toBe(true);
    const zip = await unzip(result.blob);
    const rels = await zip.file("word/_rels/document.xml.rels")!.async("string");
    const contentTypes = await zip.file("[Content_Types].xml")!.async("string");
    expect(rels).toContain("media/");
    expect(rels).not.toMatch(/\.png"/);
    expect(rels).toContain(".jpeg");
    expect(contentTypes).toMatch(/Extension="jpeg"/);
    const targets = [...rels.matchAll(/Target="([^"]+)"/g)].map((match) => match[1]);
    for (const target of targets) {
      expect(zip.file(`word/${target}`)).toBeTruthy();
    }
    expect(Object.keys(zip.files).some((name) => name.endsWith(".png"))).toBe(false);
  });

  test("3. transparent PNG stays PNG", async () => {
    const png = largeJpeg();
    const input = await packDoc([
      new Paragraph({ children: [imageRun(png, "png")] }),
    ]);
    const codec = mockCodec({ width: 400, height: 200, hasAlpha: true });
    const result = await compressOfficeFile(input, { level: "strong", ...codec });

    expect(codec.calls).toHaveLength(0);
    expect(result.images.every((image) => image.action === "skipped")).toBe(true);
    const zip = await unzip(result.blob);
    const media = Object.keys(zip.files).filter((name) => name.startsWith("word/media/"));
    expect(media.some((name) => name.endsWith(".png"))).toBe(true);
    expect(media.some((name) => name.endsWith(".jpeg"))).toBe(false);
  });

  test("4. header image relationships are updated", async () => {
    const png = largeJpeg();
    const input = await packDoc(
      [new Paragraph({ children: [new TextRun("Body")] })],
      new Paragraph({ children: [imageRun(png, "png")] }),
    );
    const codec = mockCodec({ width: 2200, height: 400, hasAlpha: false });
    const result = await compressOfficeFile(input, { level: "recommended", ...codec });
    const zip = await unzip(result.blob);
    const headerRelsName = Object.keys(zip.files).find(
      (name) => name.startsWith("word/_rels/header") && name.endsWith(".rels"),
    );
    expect(headerRelsName).toBeTruthy();
    const rels = await zip.file(headerRelsName!)!.async("string");
    expect(rels).toContain(".jpeg");
    expect(rels).not.toMatch(/\.png"/);
    const targets = [...rels.matchAll(/Target="([^"]+)"/g)].map((match) => match[1]);
    for (const target of targets) {
      const path = target.startsWith("/") ? target.slice(1) : `word/${target.replace(/^\.\.\//, "")}`;
      expect(zip.file(path) ?? zip.file(target)).toBeTruthy();
    }
  });

  test("5. a document with no images is returned unchanged", async () => {
    const input = await packDoc([
      new Paragraph({ children: [new TextRun("No images here")] }),
    ]);
    const codec = mockCodec({ width: 3000, height: 2000, hasAlpha: false });
    const result = await compressOfficeFile(input, { level: "recommended", ...codec });
    expect(result.unchanged).toBe(true);
    expect(result.notes.join(" ")).toMatch(/already optimized/);
    expect(result.outputBytes).toBe(result.originalBytes);
    expect(codec.calls).toHaveLength(0);
    const output = new Uint8Array(await result.blob.arrayBuffer());
    expect(Buffer.from(output).equals(Buffer.from(input))).toBe(true);
  });

  test("6. random bytes and legacy CFB files throw a friendly error", async () => {
    await expect(
      compressOfficeFile(Uint8Array.from([1, 2, 3, 4, 5]).buffer, { level: "recommended" }),
    ).rejects.toThrow(OfficeCompressError);
    await expect(
      compressOfficeFile(Uint8Array.from([1, 2, 3, 4, 5]).buffer, { level: "recommended" }),
    ).rejects.toThrow(/not a Word document/);

    const cfb = new Uint8Array(16);
    cfb.set([0xd0, 0xcf, 0x11, 0xe0]);
    await expect(compressOfficeFile(cfb.buffer, { level: "strong" })).rejects.toThrow(
      /password-protected or in old \.doc format/,
    );
  });

  test("7. output is never larger than the input", async () => {
    const fixtures = [
      await packDoc([
        new Paragraph({
          children: [
            imageRun(largeJpeg(4), "jpg"),
            imageRun(largeJpeg(5), "jpg"),
            imageRun(largeJpeg(6), "jpg"),
          ],
        }),
      ]),
      await packDoc([new Paragraph({ children: [imageRun(largeJpeg(7), "png")] })]),
      await packDoc([new Paragraph({ children: [new TextRun("plain")] })]),
    ];
    for (const input of fixtures) {
      const result = await compressOfficeFile(input, {
        level: "strong",
        ...mockCodec({ width: 3000, height: 2000, hasAlpha: false }),
      });
      expect(result.outputBytes).toBeLessThanOrEqual(result.originalBytes);
    }
  });

  test("8. compression still succeeds when Buffer is missing", async () => {
    const input = await packDoc([
      new Paragraph({ children: [imageRun(largeJpeg(8), "jpg")] }),
    ]);
    const previous = globalThis.Buffer;
    globalThis.Buffer = undefined as unknown as BufferConstructor;
    jest.resetModules();
    try {
      const { compressOfficeFile: compressWithoutBuffer } = await import("@/lib/office-compress");
      const result = await compressWithoutBuffer(input, {
        level: "recommended",
        ...mockCodec({ width: 3000, height: 2000, hasAlpha: false }),
      });
      expect(result.unchanged).toBe(false);
      expect(result.outputBytes).toBeLessThan(result.originalBytes);
      expect(result.notes.join(" ")).not.toMatch(/original returned/);
    } finally {
      globalThis.Buffer = previous;
      jest.resetModules();
    }
  });

  test("9. PNG to JPEG rename does not overwrite an existing JPEG", async () => {
    const input = await renameMedia(
      await packDoc([
        new Paragraph({
          children: [imageRun(largeJpeg(9), "png"), imageRun(largeJpeg(10), "jpg")],
        }),
      ]),
      ["image1.png", "image1.jpeg"],
    );
    const result = await compressOfficeFile(input, {
      level: "recommended",
      inspectImage: async () => ({ width: 2000, height: 1200, hasAlpha: false }),
      encodeImage: async (args) => {
        const out = new Uint8Array(64);
        out[0] = args.bytes[6] ?? 0;
        return out;
      },
    });

    const zip = await unzip(result.blob);
    const media = mediaFiles(zip);
    expect(media).toEqual(expect.arrayContaining(["word/media/image1.jpeg", "word/media/image1-1.jpeg"]));
    expect(media.some((name) => name.endsWith(".png"))).toBe(false);
    const jpeg = await zip.file("word/media/image1.jpeg")!.async("uint8array");
    const renamed = await zip.file("word/media/image1-1.jpeg")!.async("uint8array");
    expect(Buffer.from(jpeg).equals(Buffer.from(renamed))).toBe(false);
    await expectTargetsResolve(zip);
  });

  test("10. only the matching media target is renamed", async () => {
    const input = await renameMedia(
      await packDoc([
        new Paragraph({
          children: [
            imageRun(largeJpeg(1), "png"),
            imageRun(largeJpeg(11), "png"),
            imageRun(largeJpeg(12), "png"),
          ],
        }),
      ]),
      ["image1.png", "image11.png", "myimage1.png"],
    );
    const zipIn = await JSZip.loadAsync(input);
    const relPath = "word/_rels/document.xml.rels";
    const relsIn = await zipIn.file(relPath)!.async("string");
    zipIn.file(
      relPath,
      relsIn.replace(
        "</Relationships>",
        "<!-- keep image1.png myimage1.png --></Relationships>",
      ),
    );
    const marked = await zipIn.generateAsync({ type: "arraybuffer" });

    const result = await compressOfficeFile(marked, {
      level: "recommended",
      inspectImage: async (bytes) => ({
        width: 400,
        height: 200,
        hasAlpha: bytes[6] !== 1,
      }),
      encodeImage: async () => new Uint8Array(64),
    });

    const zip = await unzip(result.blob);
    const rels = await zip.file(relPath)!.async("string");
    expect(rels).toContain('Target="media/image1.jpeg"');
    expect(rels).toContain('Target="media/image11.png"');
    expect(rels).toContain('Target="media/myimage1.png"');
    expect(rels).toContain("<!-- keep image1.png myimage1.png -->");
    expect(rels).not.toContain('Target="media/image11.jpeg"');
    expect(rels).not.toContain('Target="media/myimage1.jpeg"');
    await expectTargetsResolve(zip);
  });

  test("11. opaque PNG alpha is read from the header without decoding", async () => {
    const input = await packDoc([
      new Paragraph({ children: [imageRun(pngBytes({ width: 2400, height: 1600, colorType: 2 }), "png")] }),
    ]);
    let decoded = 0;
    const previous = globalThis.createImageBitmap;
    globalThis.createImageBitmap = (async () => {
      decoded += 1;
      throw new Error("decode");
    }) as typeof createImageBitmap;
    try {
      const calls: EncodeImageArgs[] = [];
      const result = await compressOfficeFile(input, {
        level: "recommended",
        encodeImage: async (args) => {
          calls.push(args);
          return new Uint8Array(64);
        },
      });
      expect(decoded).toBe(0);
      expect(calls).toHaveLength(1);
      expect(calls[0].hasAlpha).toBe(false);
      expect(calls[0].width).toBe(2400);
      expect(calls[0].height).toBe(1600);
      expect(result.images.some((image) => image.action === "converted")).toBe(true);
    } finally {
      globalThis.createImageBitmap = previous;
    }
  });

  test("12. PNG color type 6 checks pixels and does not assume it is opaque", async () => {
    const input = await packDoc([
      new Paragraph({ children: [imageRun(pngBytes({ width: 800, height: 600, colorType: 6 }), "png")] }),
    ]);
    let decoded = 0;
    const previous = globalThis.createImageBitmap;
    globalThis.createImageBitmap = (async () => {
      decoded += 1;
      return { width: 800, height: 600, close() {} } as ImageBitmap;
    }) as typeof createImageBitmap;
    try {
      const result = await compressOfficeFile(input, {
        level: "recommended",
        encodeImage: async () => new Uint8Array(64),
      });
      expect(decoded).toBe(1);
      expect(result.images.every((image) => image.action === "skipped")).toBe(true);
      const zip = await unzip(result.blob);
      expect(mediaFiles(zip).some((name) => name.endsWith(".png"))).toBe(true);
    } finally {
      globalThis.createImageBitmap = previous;
    }
  });
});

function pngBytes(options: { width: number; height: number; colorType: number; trns?: boolean }): Uint8Array {
  const ihdr = new Uint8Array(13);
  const view = new DataView(ihdr.buffer);
  view.setUint32(0, options.width);
  view.setUint32(4, options.height);
  ihdr[8] = 8;
  ihdr[9] = options.colorType;
  const padding = new Uint8Array(24_000);
  padding[0] = options.colorType;
  const chunks = [
    chunk("IHDR", ihdr),
    options.trns ? chunk("tRNS", new Uint8Array([0])) : null,
    chunk("tEXt", padding),
    chunk("IEND", new Uint8Array()),
  ].filter((part): part is Uint8Array => part !== null);
  const signature = Uint8Array.from([0x89, 0x50, 0x4e, 0x47, 0x0d, 0x0a, 0x1a, 0x0a]);
  const size = signature.byteLength + chunks.reduce((sum, part) => sum + part.byteLength, 0);
  const out = new Uint8Array(size);
  out.set(signature, 0);
  let offset = signature.byteLength;
  for (const part of chunks) {
    out.set(part, offset);
    offset += part.byteLength;
  }
  return out;
}

function chunk(type: string, data: Uint8Array): Uint8Array {
  const out = new Uint8Array(12 + data.byteLength);
  new DataView(out.buffer).setUint32(0, data.byteLength);
  out[4] = type.charCodeAt(0);
  out[5] = type.charCodeAt(1);
  out[6] = type.charCodeAt(2);
  out[7] = type.charCodeAt(3);
  out.set(data, 8);
  return out;
}

async function renameMedia(input: ArrayBuffer, names: string[]): Promise<ArrayBuffer> {
  const zip = await JSZip.loadAsync(input);
  const media = Object.keys(zip.files)
    .filter((name) => name.startsWith("word/media/") && !zip.files[name].dir)
    .sort();
  if (media.length !== names.length) {
    throw new Error(`expected ${names.length} media files, found ${media.length}`);
  }
  const relPaths = Object.keys(zip.files).filter((name) => name.endsWith(".rels"));
  for (let index = 0; index < media.length; index++) {
    const oldName = media[index].split("/").pop() ?? media[index];
    const data = await zip.file(media[index])!.async("uint8array");
    zip.remove(media[index]);
    zip.file(`word/media/${names[index]}`, data);
    for (const relPath of relPaths) {
      const xml = await zip.file(relPath)!.async("string");
      if (!xml.includes(oldName)) continue;
      zip.file(relPath, xml.split(oldName).join(names[index]));
    }
  }
  return zip.generateAsync({ type: "arraybuffer" });
}

function mediaFiles(zip: JSZip): string[] {
  return Object.keys(zip.files).filter((name) => name.startsWith("word/media/") && !zip.files[name].dir);
}

async function expectTargetsResolve(zip: JSZip) {
  const relPaths = Object.keys(zip.files).filter((name) => name.endsWith(".rels"));
  for (const relPath of relPaths) {
    const xml = await zip.file(relPath)!.async("string");
    const targets = [...xml.matchAll(/\bTarget="([^"]+)"/g)].map((match) => match[1]);
    for (const target of targets) {
      if (target.startsWith("http")) continue;
      const owner = relPath.split("/").slice(0, -2);
      const parts = [...owner];
      for (const part of decodeURIComponent(target).split("/")) {
        if (part === "..") parts.pop();
        else if (part !== "." && part !== "") parts.push(part);
      }
      expect(zip.file(parts.join("/"))).toBeTruthy();
    }
  }
}
