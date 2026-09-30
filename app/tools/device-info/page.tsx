import { ToolShell } from "@/components/tool-shell/ToolShell";
import ToolClient from "./ToolClient";

export default function Page() {
  return (
    <ToolShell
      slug="device-info"
      h1={"Device & Browser Info Checker Online Free"}
      subtitle={"View your browser, OS, screen, and viewport details. Copy the full report for bug reports."}
    >
      <ToolClient />
    </ToolShell>
  );
}
