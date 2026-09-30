import { ToolShell } from "@/components/tool-shell/ToolShell";
import ToolClient from "./ToolClient";

export default function Page() {
  return (
    <ToolShell
      slug="ppf-calculator"
      h1={"PPF Calculator India — Maturity & Returns"}
      subtitle={"Calculate Public Provident Fund maturity with year-by-year breakdown, withdrawal rules, and loan eligibility at 7.1% rate."}
    >
      <ToolClient />
    </ToolShell>
  );
}
