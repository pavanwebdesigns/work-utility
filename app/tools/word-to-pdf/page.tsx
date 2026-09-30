import { ToolShell } from "@/components/tool-shell/ToolShell";
import ToolClient from "./ToolClient";

export default function Page() {
  return (
    <ToolShell
      slug="word-to-pdf"
      h1={"Word to PDF"}
      subtitle={"Convert Word documents to PDF with full formatting preserved — fonts, tables, images, and layout."}
    >
      <ToolClient />
    </ToolShell>
  );
}
