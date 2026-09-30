import { ToolShell } from "@/components/tool-shell/ToolShell";
import ToolClient from "./ToolClient";

export default function Page() {
  return (
    <ToolShell
      slug="days-between-dates"
      h1={"Days Between Dates Calculator — Free Date Difference Tool"}
      subtitle={"Calculate the exact number of days between two dates, with a calendar breakdown and countdown framing."}
    >
      <ToolClient />
    </ToolShell>
  );
}
