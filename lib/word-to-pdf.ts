function getPdfApiBaseUrl(): string {
  const baseUrl = process.env.NEXT_PUBLIC_PDF_API_URL;
  if (!baseUrl) {
    throw new Error("Conversion service is not configured");
  }
  return baseUrl.replace(/\/$/, "");
}

export async function convertWordToPdf(file: File): Promise<Blob> {
  const formData = new FormData();
  formData.append("file", file);

  const response = await fetch(
    `${getPdfApiBaseUrl()}/api/convert/word-to-pdf`,
    {
      method: "POST",
      body: formData,
    }
  );

  if (!response.ok) {
    let message = "Conversion failed";
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
