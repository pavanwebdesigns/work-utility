import { ToolShell } from "@/components/tool-shell/ToolShell";
import ToolClient from "./ToolClient";

export default function Page() {
  return (
    <ToolShell
      slug="inflation-calculator"
      h1={"Inflation Calculator"}
      subtitle={"Calculate the value of money over time adjusted for inflation."}
    >
      <ToolClient />
    </ToolShell>
  );
}
