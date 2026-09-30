import { ToolShell } from "@/components/tool-shell/ToolShell";
import ToolClient from "./ToolClient";

export default function Page() {
  return (
    <ToolShell
      slug="gpa-calculator"
      h1={"GPA Calculator Free — Calculate Your 4.0 Scale GPA"}
      subtitle={"Add courses with letter grades and credit hours to calculate your weighted GPA on the standard 4.0 scale."}
    >
      <ToolClient />
    </ToolShell>
  );
}
