import { ToolShell } from "@/components/tool-shell/ToolShell";
import ToolClient from "./ToolClient";

export default function Page() {
  return (
    <ToolShell
      slug="tax-regime-comparison"
      h1={"Old vs New Tax Regime Comparison"}
      subtitle={"Enter your salary once — see old and new regime tax side by side with a clear verdict."}
    >
      <ToolClient />
    </ToolShell>
  );
}
