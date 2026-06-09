type RemoveBackground = typeof import("@imgly/background-removal").removeBackground;

const BG_REMOVAL_CDN =
  "https://unpkg.com/@imgly/background-removal@1.7.0/dist/index.mjs";

let removeBackgroundPromise: Promise<RemoveBackground> | null = null;

async function loadRemoveBackground(): Promise<RemoveBackground> {
  if (!removeBackgroundPromise) {
    removeBackgroundPromise = import(/* webpackIgnore: true */ BG_REMOVAL_CDN).then(
      (mod: { removeBackground: RemoveBackground }) => mod.removeBackground
    );
  }
  return removeBackgroundPromise;
}

export async function removeBg(file: File): Promise<Blob> {
  const removeBackground = await loadRemoveBackground();

  const blob = await removeBackground(file, {
    publicPath:
      "https://unpkg.com/@imgly/background-removal@1.4.5/dist/",
    output: {
      format: "image/png",
      quality: 1,
    },
  });

  return blob;
}

export function formatFileSize(bytes: number): string {
  if (bytes < 1024) return bytes + " B";
  if (bytes < 1024 * 1024) return (bytes / 1024).toFixed(1) + " KB";
  return (bytes / (1024 * 1024)).toFixed(2) + " MB";
}
