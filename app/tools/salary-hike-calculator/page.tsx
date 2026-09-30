import { ToolShell } from "@/components/tool-shell/ToolShell";
import ToolClient from "./ToolClient";

export default function Page() {
  return (
    <ToolShell
      slug="salary-hike-calculator"
      h1={"Salary Hike Calculator — Know Your New Salary Instantly"}
      subtitle={"Calculate new salary after appraisal or find hike percentage from your target salary."}
    >
      <ToolClient />
    </ToolShell>
  );
}
