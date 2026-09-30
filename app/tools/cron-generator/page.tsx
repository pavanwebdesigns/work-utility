import { ToolShell } from "@/components/tool-shell/ToolShell";
import ToolClient from "./ToolClient";

export default function Page() {
  return (
    <ToolShell
      slug="cron-generator"
      h1={"Cron Expression Generator Online Free — Visual Builder"}
      subtitle={"Build cron schedules visually, see a plain-English description, and preview the next five run times."}
    >
      <ToolClient />
    </ToolShell>
  );
}
