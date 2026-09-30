import { ToolShell } from "@/components/tool-shell/ToolShell";
import ToolClient from "./ToolClient";

export default function Page() {
  return (
    <ToolShell
      slug="discount-calculator"
      h1={"Discount Calculator — Find Sale Price Free"}
      subtitle={"Calculate discount amount, percentage off, and final sale price instantly."}
    >
      <ToolClient />
    </ToolShell>
  );
}
