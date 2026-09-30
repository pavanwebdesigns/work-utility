import { ToolShell } from "@/components/tool-shell/ToolShell";
import ToolClient from "./ToolClient";

export default function Page() {
  return (
    <ToolShell
      slug="percentage-calculator"
      h1={"Percentage Calculator — Free Online % Calculator"}
      subtitle={"Calculate percentage of a number, find what percent one value is of another, percentage change, and add or subtract percentages."}
    >
      <ToolClient />
    </ToolShell>
  );
}
