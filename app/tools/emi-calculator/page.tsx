import { ToolShell } from "@/components/tool-shell/ToolShell";
import ToolClient from "./ToolClient";

export default function Page() {
  return (
    <ToolShell
      slug="emi-calculator"
      h1={"EMI Calculator — Calculate Your Loan EMI Instantly"}
      subtitle={"Calculate monthly EMI for home loans, car loans, and personal loans with total interest breakdown."}
    >
      <ToolClient />
    </ToolShell>
  );
}
