import { ToolShell } from "@/components/tool-shell/ToolShell";
import ToolClient from "./ToolClient";

export default function Page() {
  return (
    <ToolShell slug="aspect-ratio" subtitle={"Calculate image aspect ratios and find width or height for any ratio instantly."}>
      <ToolClient />
    </ToolShell>
  );
}
