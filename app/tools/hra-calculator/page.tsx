import { ToolShell } from "@/components/tool-shell/ToolShell";
import ToolClient from "./ToolClient";

export default function Page() {
  return (
    <ToolShell
      slug="hra-calculator"
      h1={"HRA Calculator — Tax Exemption Free Online"}
      subtitle={"Calculate exempt and taxable HRA as per Indian income tax rules."}
    >
      <ToolClient />
    </ToolShell>
  );
}
