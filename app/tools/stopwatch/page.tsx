import { ToolShell } from "@/components/tool-shell/ToolShell";
import ToolClient from "./ToolClient";

export default function Page() {
  return (
    <ToolShell
      slug="stopwatch"
      h1={"Stopwatch Online — Free Timer with Laps"}
      subtitle={"Precise stopwatch with lap timer and centisecond accuracy."}
    >
      <ToolClient />
    </ToolShell>
  );
}
