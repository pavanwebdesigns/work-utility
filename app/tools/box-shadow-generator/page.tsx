import { ToolShell } from "@/components/tool-shell/ToolShell";
import ToolClient from "./ToolClient";

export default function Page() {
  return (
    <ToolShell slug="box-shadow-generator" subtitle={"Generate multi-layer CSS box shadows with live preview. Copy pure CSS or Tailwind classes with Apple-style presets."}>
      <ToolClient />
    </ToolShell>
  );
}
