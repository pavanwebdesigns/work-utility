function getPdfApiBaseUrl(): string {
  const baseUrl = process.env.NEXT_PUBLIC_PDF_API_URL;
  if (!baseUrl) {
    throw new Error("PDF API is not configured");
  }
  return baseUrl.replace(/\/$/, "");
}

export function downloadBlob(blob: Blob, filename: string) {
  const url = URL.createObjectURL(blob);
  const anchor = document.createElement("a");
  anchor.href = url;
  anchor.download = filename;
  anchor.click();
  URL.revokeObjectURL(url);
}

export async function convertToWord(file: File): Promise<void> {
  const formData = new FormData();
  formData.append("file", file);

  const response = await fetch(`${getPdfApiBaseUrl()}/to-word`, {
    method: "POST",
    body: formData,
  });

  if (!response.ok) {
    throw new Error("Conversion failed");
  }

  const blob = await response.blob();
  downloadBlob(blob, file.name.replace(".pdf", ".docx"));
}

export async function convertToJPG(file: File, allPages: boolean): Promise<void> {
  const formData = new FormData();
  formData.append("file", file);
  formData.append("page", allPages ? "-1" : "0");
  formData.append("dpi", "150");

  const response = await fetch(`${getPdfApiBaseUrl()}/to-jpg`, {
    method: "POST",
    body: formData,
  });

  if (!response.ok) {
    throw new Error("Conversion failed");
  }

  const blob = await response.blob();
  downloadBlob(blob, file.name.replace(".pdf", "_pages.zip"));
}

export async function unlockPDF(file: File, password: string): Promise<void> {
  const formData = new FormData();
  formData.append("file", file);
  formData.append("password", password);

  const response = await fetch(`${getPdfApiBaseUrl()}/unlock`, {
    method: "POST",
    body: formData,
  });

  if (response.status === 400) {
    throw new Error("Incorrect password");
  }

  if (!response.ok) {
    throw new Error("Unlock failed");
  }

  const blob = await response.blob();
  downloadBlob(blob, file.name.replace(".pdf", "_unlocked.pdf"));
}

export async function compressPDF(
  file: File,
  quality: number
): Promise<{ originalSize: number; compressedSize: number }> {
  const formData = new FormData();
  formData.append("file", file);
  formData.append("quality", quality.toString());

  const response = await fetch(`${getPdfApiBaseUrl()}/compress`, {
    method: "POST",
    body: formData,
  });

  if (!response.ok) {
    throw new Error("Compression failed");
  }

  const originalSize = parseInt(response.headers.get("X-Original-Size") || "0", 10);
  const compressedSize = parseInt(
    response.headers.get("X-Compressed-Size") || "0",
    10
  );

  const blob = await response.blob();
  downloadBlob(blob, file.name.replace(".pdf", "_compressed.pdf"));

  return { originalSize, compressedSize };
}

export async function removeBackground(file: File): Promise<Blob> {
  const formData = new FormData();
  formData.append("file", file);

  const response = await fetch(`${getPdfApiBaseUrl()}/api/bg-remove`, {
    method: "POST",
    body: formData,
  });

  if (!response.ok) {
    let message = "Background removal failed — try a different image";
    try {
      const error = await response.json();
      if (typeof error.detail === "string") {
        message = error.detail;
      }
    } catch {
      // ignore JSON parse errors
    }
    throw new Error(message);
  }

  return response.blob();
}

export function formatFileSize(bytes: number): string {
  if (bytes < 1024) return bytes + " B";
  if (bytes < 1024 * 1024) return (bytes / 1024).toFixed(1) + " KB";
  return (bytes / (1024 * 1024)).toFixed(2) + " MB";
}

export function calcSavingsPercent(
  originalSize: number,
  compressedSize: number
): number {
  if (originalSize <= 0) return 0;
  return Math.round(((originalSize - compressedSize) / originalSize) * 100);
}
