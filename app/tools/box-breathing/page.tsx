import { ToolShell } from "@/components/tool-shell/ToolShell";
import ToolClient from "./ToolClient";

export default function Page() {
  return (
    <ToolShell slug="box-breathing" h1={"Box Breathing Timer Online — 4-4-4-4 Guided Exercise"} subtitle={"Follow the animated square through inhale, hold, exhale, and hold phases. Adjust timing or try the 4-7-8 preset."}>
      <ToolClient />
    </ToolShell>
  );
}
