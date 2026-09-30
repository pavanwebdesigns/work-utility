import { ToolShell } from "@/components/tool-shell/ToolShell";
import ToolClient from "./ToolClient";

export default function Page() {
  return (
    <ToolShell
      slug="fd-calculator"
      h1={"FD Returns Calculator — Calculate Fixed Deposit Maturity Amount"}
      subtitle={"Calculate fixed deposit maturity value, interest earned, and year-by-year growth with compounding options."}
    >
      <ToolClient />
    </ToolShell>
  );
}
