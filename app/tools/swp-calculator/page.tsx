import { ToolShell } from "@/components/tool-shell/ToolShell";
import ToolClient from "./ToolClient";

export default function Page() {
  return (
    <ToolShell
      slug="swp-calculator"
      h1={"SWP Calculator — Systematic Withdrawal Plan"}
      subtitle={"Calculate how long your corpus lasts with monthly SWP withdrawals, or how much corpus you need for target monthly income."}
    >
      <ToolClient />
    </ToolShell>
  );
}
