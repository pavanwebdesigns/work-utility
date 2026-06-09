import { Suspense } from "react";
import { PhotoResizerClient } from "./PhotoResizerClient";

function PhotoResizerFallback() {
  return (
    <div className="flex min-h-screen items-center justify-center bg-surface-base">
      <p className="text-sm text-content-secondary">Loading photo resizer...</p>
    </div>
  );
}

export default function PhotoResizerPage() {
  return (
    <Suspense fallback={<PhotoResizerFallback />}>
      <PhotoResizerClient />
    </Suspense>
  );
}
