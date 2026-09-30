import { ToolShell } from "@/components/tool-shell/ToolShell";
import ToolClient from "./ToolClient";

export default function Page() {
  return (
    <ToolShell
      slug="notice-period-calculator"
      h1={"Notice Period Calculator — Calculate Your Last Working Day"}
      subtitle={"Find your last working day, days remaining, and optional notice buyout amount from your resignation date."}
    >
      <ToolClient />
    </ToolShell>
  );
}
