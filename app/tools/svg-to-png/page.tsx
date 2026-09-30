import { ToolShell } from "@/components/tool-shell/ToolShell";
import ToolClient from "./ToolClient";

export default function Page() {
  return (
    <ToolShell
      slug="svg-to-png"
      h1={"SVG to PNG Converter Online Free"}
      subtitle={"Upload or paste SVG, choose resolution and background, download PNG in your browser."}
    >
      <ToolClient />
    </ToolShell>
  );
}
