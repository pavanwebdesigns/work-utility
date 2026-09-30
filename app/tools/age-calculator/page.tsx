import { ToolShell } from "@/components/tool-shell/ToolShell";
import ToolClient from "./ToolClient";

export default function Page() {
  return (
    <ToolShell slug="age-calculator" h1={"Age Calculator — Find Your Exact Age Instantly"} subtitle={"Enter your date of birth and optional cutoff date to get exact age in years, months, days, and more."}>
      <ToolClient />
    </ToolShell>
  );
}
