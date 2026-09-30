import { ToolShell } from "@/components/tool-shell/ToolShell";
import ToolClient from "./ToolClient";

export default function Page() {
  return (
    <ToolShell slug="advance-tax-calculator" subtitle={"Calculate advance tax liability, eligibility, and installment schedule for June, September, December, and March due dates."}>
      <ToolClient />
    </ToolShell>
  );
}
