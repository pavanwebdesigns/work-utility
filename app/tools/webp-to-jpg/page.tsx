import { ToolShell } from "@/components/tool-shell/ToolShell";
import ToolClient from "./ToolClient";

export default function Page() {
  return (
    <ToolShell
      slug="webp-to-jpg"
      h1={"WebP to JPG"}
      subtitle={"Convert WebP images to JPG or PNG instantly. Private, browser-only conversion — no signup needed."}
    >
      <ToolClient />
    </ToolShell>
  );
}
