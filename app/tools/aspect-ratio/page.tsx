import { ToolShell } from "@/components/tool-shell/ToolShell";
import ToolClient from "./ToolClient";

export default function Page() {
  return (
    <ToolShell slug="aspect-ratio" h1={"Aspect Ratio Calculator"} subtitle={"Calculate image aspect ratios and find width or height for any ratio instantly."}>
      <ToolClient />
    </ToolShell>
  );
}
