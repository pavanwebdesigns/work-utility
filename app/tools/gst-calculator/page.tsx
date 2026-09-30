import { ToolShell } from "@/components/tool-shell/ToolShell";
import ToolClient from "./ToolClient";

export default function Page() {
  return (
    <ToolShell
      slug="gst-calculator"
      h1={"GST Calculator — Calculate GST Amount Free"}
      subtitle={"Add or remove GST from any amount with CGST and SGST split for Indian tax rates."}
    >
      <ToolClient />
    </ToolShell>
  );
}
