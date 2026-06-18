export type SvgToPngOptions = {
  width: number;
  height: number;
  background: "transparent" | string;
};

function loadSvgImage(svgContent: string): Promise<HTMLImageElement> {
  return new Promise((resolve, reject) => {
    const blob = new Blob([svgContent], { type: "image/svg+xml" });
    const url = URL.createObjectURL(blob);
    const img = new Image();
    img.onload = () => {
      URL.revokeObjectURL(url);
      resolve(img);
    };
    img.onerror = () => {
      URL.revokeObjectURL(url);
      reject(new Error("Unable to render SVG"));
    };
    img.src = url;
  });
}

export function parseSvgDimensions(svg: string): { width: number; height: number } {
  const viewBox = svg.match(/viewBox=["']([^"']+)["']/i);
  if (viewBox) {
    const parts = viewBox[1].trim().split(/[\s,]+/).map(Number);
    if (parts.length === 4 && parts[2] > 0 && parts[3] > 0) {
      return { width: parts[2], height: parts[3] };
    }
  }
  const w = svg.match(/\bwidth=["'](\d+(?:\.\d+)?)/i);
  const h = svg.match(/\bheight=["'](\d+(?:\.\d+)?)/i);
  return {
    width: w ? parseFloat(w[1]) : 512,
    height: h ? parseFloat(h[1]) : 512,
  };
}

export async function convertSvgToPng(
  svgContent: string,
  options: SvgToPngOptions,
): Promise<Blob> {
  const img = await loadSvgImage(svgContent);
  const canvas = document.createElement("canvas");
  canvas.width = options.width;
  canvas.height = options.height;
  const ctx = canvas.getContext("2d")!;

  if (options.background !== "transparent") {
    ctx.fillStyle = options.background;
    ctx.fillRect(0, 0, canvas.width, canvas.height);
  }

  ctx.drawImage(img, 0, 0, options.width, options.height);

  return new Promise((resolve, reject) => {
    canvas.toBlob(
      (blob) => (blob ? resolve(blob) : reject(new Error("PNG export failed"))),
      "image/png",
    );
  });
}

export async function readFileAsText(file: File): Promise<string> {
  return file.text();
}
