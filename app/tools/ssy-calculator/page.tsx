import { ToolShell } from "@/components/tool-shell/ToolShell";
import ToolClient from "./ToolClient";

export default function Page() {
  return (
    <ToolShell
      slug="ssy-calculator"
      h1={"SSY Calculator — Sukanya Samriddhi Yojana Returns"}
      subtitle={"Calculate SSY maturity amount, interest earned, partial withdrawal at 18, and year-by-year growth at the current 8.2% rate."}
    >
      <ToolClient />
    </ToolShell>
  );
}
