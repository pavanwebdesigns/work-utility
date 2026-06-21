import removeBackground from "https://unpkg.com/@imgly/background-removal@1.7.0/dist/index.mjs";

const PUBLIC_PATH =
  "https://unpkg.com/@imgly/background-removal@1.7.0/dist/";

self.onmessage = async (event) => {
  const { imageBlob } = event.data;

  try {
    self.postMessage({ type: "STATUS", payload: "Removing background..." });

    const resultBlob = await removeBackground(imageBlob, {
      proxyToWorker: false,
      publicPath: PUBLIC_PATH,
      model: "isnet_fp16",
      output: {
        format: "image/png",
        quality: 1,
        type: "foreground",
      },
      progress: (_key, current, total) => {
        if (total > 0) {
          const pct = Math.round((current / total) * 100);
          self.postMessage({ type: "PROGRESS", payload: pct });
        }
      },
    });

    self.postMessage({ type: "SUCCESS", payload: resultBlob });
  } catch (err) {
    self.postMessage({
      type: "ERROR",
      payload:
        err instanceof Error
          ? err.message
          : "Background removal failed. Please try a different image.",
    });
  }
};
