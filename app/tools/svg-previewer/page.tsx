import { ToolShell } from "@/components/tool-shell/ToolShell";
import ToolClient from "./ToolClient";

export default function Page() {
  return (
    <ToolShell
      slug="svg-previewer"
      h1={"SVG Code Previewer Online Free — Live Preview & Editor"}
      subtitle={"Edit SVG markup on the left and see a sanitized live preview on the right. Prettify, copy, or download your code."}
    >
      <ToolClient />
    </ToolShell>
  );
}
