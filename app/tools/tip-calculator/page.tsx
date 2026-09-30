import { ToolShell } from "@/components/tool-shell/ToolShell";
import ToolClient from "./ToolClient";

export default function Page() {
  return (
    <ToolShell
      slug="tip-calculator"
      h1={"Tip Calculator — Split Bills Free Online"}
      subtitle={"Calculate tip amount and split the total bill between friends instantly."}
    >
      <ToolClient />
    </ToolShell>
  );
}
