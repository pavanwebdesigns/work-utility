const ortModule = await import(
  /* webpackIgnore: true */
  "/onnxruntime-web/ort.webgpu.bundle.min.mjs"
);

const ort = ortModule.default ?? ortModule;
export default ort;
