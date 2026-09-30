import { ToolShell } from "@/components/tool-shell/ToolShell";
import ToolClient from "./ToolClient";

export default function Page() {
  return (
    <ToolShell
      slug="excel-to-pdf"
      h1={"Excel to PDF"}
      subtitle={"Convert Excel spreadsheets to PDF instantly. All sheets included. Runs in your browser — private and free."}
    >
      <ToolClient />
    </ToolShell>
  );
}
