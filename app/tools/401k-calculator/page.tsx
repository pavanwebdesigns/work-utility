import { ToolShell } from "@/components/tool-shell/ToolShell";
import ToolClient from "./ToolClient";

export default function Page() {
  return (
    <ToolShell slug="401k-calculator" subtitle={"Project your 401k balance at retirement with 2026 IRS limits, employer match impact, and year-by-year growth table."}>
      <ToolClient />
    </ToolShell>
  );
}
