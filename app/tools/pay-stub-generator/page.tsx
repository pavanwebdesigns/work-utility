import { ToolShell } from "@/components/tool-shell/ToolShell";
import ToolClient from "./ToolClient";

export default function Page() {
  return (
    <ToolShell
      slug="pay-stub-generator"
      h1={"Pay Stub Generator — US Paycheck Creator"}
      subtitle={"Generate a professional US pay stub with earnings and deductions. Preview instantly and print or save as PDF."}
    >
      <ToolClient />
    </ToolShell>
  );
}
