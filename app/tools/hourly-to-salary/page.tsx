import { ToolShell } from "@/components/tool-shell/ToolShell";
import ToolClient from "./ToolClient";

export default function Page() {
  return (
    <ToolShell
      slug="hourly-to-salary"
      h1={"Hourly to Salary Calculator"}
      subtitle={"Convert hourly wage to annual, monthly, or weekly salary instantly."}
    >
      <ToolClient />
    </ToolShell>
  );
}
