import { ToolShell } from "@/components/tool-shell/ToolShell";
import ToolClient from "./ToolClient";

export default function Page() {
  return (
    <ToolShell
      slug="sip-calculator"
      h1={"SIP Calculator — Calculate Mutual Fund SIP Returns"}
      subtitle={"Estimate SIP maturity value, total invested amount, and returns with a year-by-year growth chart."}
    >
      <ToolClient />
    </ToolShell>
  );
}
