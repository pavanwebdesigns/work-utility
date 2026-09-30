import { ToolShell } from "@/components/tool-shell/ToolShell";
import ToolClient from "./ToolClient";

export default function Page() {
  return (
    <ToolShell slug="bmi-calculator" subtitle={"Calculate your Body Mass Index with metric or imperial units. Instant category results."}>
      <ToolClient />
    </ToolShell>
  );
}
