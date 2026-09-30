import { ToolShell } from "@/components/tool-shell/ToolShell";
import ToolClient from "./ToolClient";

export default function Page() {
  return (
    <ToolShell
      slug="income-tax-calculator"
      h1={"Income Tax Calculator — Old Regime vs New Regime 2025-26"}
      subtitle={"Compare income tax under old and new regime with slab-wise breakdown, rebate, cess, and take-home estimate."}
    >
      <ToolClient />
    </ToolShell>
  );
}
