import { ToolShell } from "@/components/tool-shell/ToolShell";
import ToolClient from "./ToolClient";

export default function Page() {
  return (
    <ToolShell slug="cgpa-to-percentage" h1={"CGPA to Percentage Converter — Free Online Calculator"} subtitle={"Convert CGPA to percentage using VTU, CBSE, and 4-point scale formulas. Reverse converter included."}>
      <ToolClient />
    </ToolShell>
  );
}
