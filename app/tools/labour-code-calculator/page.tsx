import { ToolShell } from "@/components/tool-shell/ToolShell";
import ToolClient from "./ToolClient";

export default function Page() {
  return (
    <ToolShell
      slug="labour-code-calculator"
      h1={"New Labour Code 2026 Salary Calculator"}
      subtitle={"Compare your current salary structure with the New Labour Code 50% basic rule — see take-home, PF, and gratuity impact in real time."}
    >
      <ToolClient />
    </ToolShell>
  );
}
