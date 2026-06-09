import dynamic from "next/dynamic";

const BgRemoveClient = dynamic(() => import("./BgRemoveClient"), {
  ssr: false,
  loading: () => (
    <div className="flex min-h-screen items-center justify-center bg-surface-base text-content-secondary">
      Loading tool...
    </div>
  ),
});

export default function BgRemovePage() {
  return <BgRemoveClient />;
}
