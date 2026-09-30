import { ToolShell } from "@/components/tool-shell/ToolShell";
import ToolClient from "./ToolClient";

export default function Page() {
  return (
    <ToolShell slug="401k-vs-roth-ira" h1={"401k vs Roth IRA Calculator 2026"} subtitle={"Compare Traditional 401k, Roth 401k, and Roth IRA side by side. See which wins based on your current vs retirement tax brackets."}>
      <ToolClient />
    </ToolShell>
  );
}
