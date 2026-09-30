import { ToolShell } from "@/components/tool-shell/ToolShell";
import ToolClient from "./ToolClient";

export default function Page() {
  return (
    <ToolShell
      slug="freelancer-tax-calculator"
      h1={"Section 44ADA Freelancer Tax Calculator"}
      subtitle={"Calculate presumptive tax under Section 44ADA, check ₹50L/₹75L eligibility, and compare with regular books — free, no signup."}
    >
      <ToolClient />
    </ToolShell>
  );
}
