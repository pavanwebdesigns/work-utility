import { ToolShell } from "@/components/tool-shell/ToolShell";
import ToolClient from "./ToolClient";

export default function Page() {
  return (
    <ToolShell
      slug="gratuity-calculator"
      h1={"Gratuity Calculator — India"}
      subtitle={"Calculate gratuity amount on retirement or resignation as per Payment of Gratuity Act."}
    >
      <ToolClient />
    </ToolShell>
  );
}
