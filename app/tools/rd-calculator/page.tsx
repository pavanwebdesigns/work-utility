import { ToolShell } from "@/components/tool-shell/ToolShell";
import ToolClient from "./ToolClient";

export default function Page() {
  return (
    <ToolShell
      slug="rd-calculator"
      h1={"RD Calculator India — Recurring Deposit Returns"}
      subtitle={"Calculate recurring deposit maturity with quarterly compounding, year-by-year breakdown, TDS notes, and RD vs FD comparison."}
    >
      <ToolClient />
    </ToolShell>
  );
}
