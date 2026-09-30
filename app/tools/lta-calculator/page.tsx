import { ToolShell } from "@/components/tool-shell/ToolShell";
import ToolClient from "./ToolClient";

export default function Page() {
  return (
    <ToolShell
      slug="lta-calculator"
      h1={"LTA Calculator — Leave Travel Allowance"}
      subtitle={"Calculate LTA tax exemption for your annual Leave Travel Allowance."}
    >
      <ToolClient />
    </ToolShell>
  );
}
