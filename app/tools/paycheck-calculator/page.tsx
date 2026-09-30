import { ToolShell } from "@/components/tool-shell/ToolShell";
import ToolClient from "./ToolClient";

export default function Page() {
  return (
    <ToolShell
      slug="paycheck-calculator"
      h1={"Paycheck Calculator 2026 — Estimate Your Take-Home Pay"}
      subtitle={"Estimate net pay after 2026 federal tax, FICA, pre-tax deductions, and a simplified state tax estimate."}
    >
      <ToolClient />
    </ToolShell>
  );
}
