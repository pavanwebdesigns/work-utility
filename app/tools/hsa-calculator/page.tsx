import { ToolShell } from "@/components/tool-shell/ToolShell";
import ToolClient from "./ToolClient";

export default function Page() {
  return (
    <ToolShell
      slug="hsa-calculator"
      h1={"HSA Calculator 2026"}
      subtitle={"Calculate HSA contribution limits, tax savings, and projected retirement balance with triple tax advantage."}
    >
      <ToolClient />
    </ToolShell>
  );
}
