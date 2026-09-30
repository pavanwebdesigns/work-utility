import { ToolShell } from "@/components/tool-shell/ToolShell";
import ToolClient from "./ToolClient";

export default function Page() {
  return (
    <ToolShell
      slug="pomodoro-timer"
      h1={"Pomodoro Timer — Free Focus Timer Online"}
      subtitle={"25-minute focus sessions with short and long breaks to boost productivity."}
    >
      <ToolClient />
    </ToolShell>
  );
}
