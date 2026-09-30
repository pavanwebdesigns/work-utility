import { ToolShell } from "@/components/tool-shell/ToolShell";
import ToolClient from "./ToolClient";

export default function Page() {
  return (
    <ToolShell
      slug="professional-tax-calculator"
      h1={"Professional Tax Calculator India — All States 2026"}
      subtitle={"Calculate state-wise professional tax for all 18 PT-levying states. Maharashtra women's exemption and February quirk included."}
    >
      <ToolClient />
    </ToolShell>
  );
}
