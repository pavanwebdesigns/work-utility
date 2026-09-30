import { ToolShell } from "@/components/tool-shell/ToolShell";
import ToolClient from "./ToolClient";

export default function Page() {
  return (
    <ToolShell slug="capital-gains-calculator" h1={"Capital Gains Tax Calculator India"} subtitle={"Calculate STCG and LTCG on equity, property, gold, and debt funds — auto-classified by holding period."}>
      <ToolClient />
    </ToolShell>
  );
}
