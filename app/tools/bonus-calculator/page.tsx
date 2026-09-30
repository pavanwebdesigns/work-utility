import { ToolShell } from "@/components/tool-shell/ToolShell";
import ToolClient from "./ToolClient";

export default function Page() {
  return (
    <ToolShell slug="bonus-calculator" h1={"Bonus Calculator India — Payment of Bonus Act"} subtitle={"Calculate statutory bonus with ₹7,000 wage ceiling, eligibility check, and minimum 8.33% / maximum 20% rates."}>
      <ToolClient />
    </ToolShell>
  );
}
