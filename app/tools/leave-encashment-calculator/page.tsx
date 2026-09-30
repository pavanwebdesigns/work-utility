import { ToolShell } from "@/components/tool-shell/ToolShell";
import ToolClient from "./ToolClient";

export default function Page() {
  return (
    <ToolShell
      slug="leave-encashment-calculator"
      h1={"Leave Encashment Calculator India"}
      subtitle={"Calculate leave encashment amount and tax exemption. Budget 2023 raised retirement exemption to ₹25 lakhs."}
    >
      <ToolClient />
    </ToolShell>
  );
}
