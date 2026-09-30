import { ToolShell } from "@/components/tool-shell/ToolShell";
import ToolClient from "./ToolClient";

export default function Page() {
  return (
    <ToolShell
      slug="w2-vs-1099-calculator"
      h1={"W-2 vs 1099 Tax Calculator"}
      subtitle={"Find the minimum 1099 rate needed to match your W-2 take-home pay — after SE tax, benefits, and expenses."}
    >
      <ToolClient />
    </ToolShell>
  );
}
