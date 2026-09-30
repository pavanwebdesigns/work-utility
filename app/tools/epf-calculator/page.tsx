import { ToolShell } from "@/components/tool-shell/ToolShell";
import ToolClient from "./ToolClient";

export default function Page() {
  return (
    <ToolShell
      slug="epf-calculator"
      h1={"EPF Calculator — Provident Fund Maturity"}
      subtitle={"Estimate your Employee Provident Fund maturity with employer and employee contributions."}
    >
      <ToolClient />
    </ToolShell>
  );
}
