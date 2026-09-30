import { ToolShell } from "@/components/tool-shell/ToolShell";
import ToolClient from "./ToolClient";

export default function Page() {
  return (
    <ToolShell slug="calorie-deficit-calculator" h1={"Calorie Deficit Calculator Free"} subtitle={"Calculate BMR, maintenance calories (TDEE), and a daily target using the Mifflin-St Jeor formula."}>
      <ToolClient />
    </ToolShell>
  );
}
