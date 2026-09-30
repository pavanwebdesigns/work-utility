import { ToolShell } from "@/components/tool-shell/ToolShell";
import ToolClient from "./ToolClient";

export default function Page() {
  return (
    <ToolShell
      slug="dividend-yield-calculator"
      h1={"Dividend Yield Calculator India"}
      subtitle={"Calculate current yield, yield on cost, annual dividend income, TDS impact, and compare with FD returns."}
    >
      <ToolClient />
    </ToolShell>
  );
}
