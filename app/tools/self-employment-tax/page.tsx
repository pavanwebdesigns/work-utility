import { ToolShell } from "@/components/tool-shell/ToolShell";
import ToolClient from "./ToolClient";

export default function Page() {
  return (
    <ToolShell
      slug="self-employment-tax"
      h1={"Self-Employment Tax Calculator"}
      subtitle={"Calculate SE tax, federal income tax, total burden, and quarterly payment amounts with 2026 due dates."}
    >
      <ToolClient />
    </ToolShell>
  );
}
