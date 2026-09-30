import { ToolShell } from "@/components/tool-shell/ToolShell";
import ToolClient from "./ToolClient";

export default function Page() {
  return (
    <ToolShell
      slug="esi-calculator"
      h1={"ESI Calculator India — Employee State Insurance"}
      subtitle={"Calculate ESI contributions — employee 0.75% and employer 3.25%. Check ₹21,000 eligibility and understand ESI benefits."}
    >
      <ToolClient />
    </ToolShell>
  );
}
