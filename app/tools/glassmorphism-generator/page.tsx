import { ToolShell } from "@/components/tool-shell/ToolShell";
import ToolClient from "./ToolClient";

export default function Page() {
  return (
    <ToolShell
      slug="glassmorphism-generator"
      h1={"Glassmorphism CSS Generator"}
      subtitle={"Generate frosted glass CSS with live preview. Copy pure CSS, Tailwind classes, or CSS variables — Firefox fallback included."}
    >
      <ToolClient />
    </ToolShell>
  );
}
