import { ToolShell } from "@/components/tool-shell/ToolShell";
import ToolClient from "./ToolClient";

export default function Page() {
  return (
    <ToolShell
      slug="timestamp-converter"
      h1={"Unix Timestamp Converter — Epoch to Date"}
      subtitle={"Live current epoch time plus instant timestamp ↔ date conversion."}
    >
      <ToolClient />
    </ToolShell>
  );
}
