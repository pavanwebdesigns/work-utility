import { ToolShell } from "@/components/tool-shell/ToolShell";
import ToolClient from "./ToolClient";

export default function Page() {
  return (
    <ToolShell
      slug="mortgage-calculator"
      h1={"Mortgage Calculator — Monthly Payment & Amortization"}
      subtitle={"Calculate PITI monthly payment, PMI, total interest, payoff date, and full amortization schedule with extra-payment simulator."}
    >
      <ToolClient />
    </ToolShell>
  );
}
