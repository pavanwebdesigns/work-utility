import { ToolShell } from "@/components/tool-shell/ToolShell";
import ToolClient from "./ToolClient";

export default function Page() {
  return (
    <ToolShell
      slug="ctc-calculator"
      h1={"CTC to In-Hand Salary Calculator — Free Online Tool"}
      subtitle={"Estimate monthly take-home salary from annual CTC with PF, professional tax, and income tax deductions."}
    >
      <ToolClient />
    </ToolShell>
  );
}
