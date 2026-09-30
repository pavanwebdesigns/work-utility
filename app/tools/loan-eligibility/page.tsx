import { ToolShell } from "@/components/tool-shell/ToolShell";
import ToolClient from "./ToolClient";

export default function Page() {
  return (
    <ToolShell
      slug="loan-eligibility"
      h1={"Loan Eligibility Calculator India — Check Bank Limit"}
      subtitle={"Estimate max loan amount using FOIR guidelines used by most Indian banks."}
    >
      <ToolClient />
    </ToolShell>
  );
}
