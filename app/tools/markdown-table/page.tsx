import { ToolShell } from "@/components/tool-shell/ToolShell";
import ToolClient from "./ToolClient";

export default function Page() {
  return (
    <ToolShell
      slug="markdown-table"
      h1={"Markdown Table Generator"}
      subtitle={"Build Markdown tables with a visual grid editor or paste CSV data. Column alignment, live preview, and HTML export."}
    >
      <ToolClient />
    </ToolShell>
  );
}
