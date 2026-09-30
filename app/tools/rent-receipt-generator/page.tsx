import { ToolShell } from "@/components/tool-shell/ToolShell";
import ToolClient from "./ToolClient";

export default function Page() {
  return (
    <ToolShell
      slug="rent-receipt-generator"
      h1={"Rent Receipt Generator — Create & Download Rent Receipt PDF Free"}
      subtitle={"Generate professional rent receipts for HRA claims. Download PDF for one or multiple months instantly."}
    >
      <ToolClient />
    </ToolShell>
  );
}
