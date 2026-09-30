import { ToolShell } from "@/components/tool-shell/ToolShell";
import ToolClient from "./ToolClient";

export default function Page() {
  return (
    <ToolShell
      slug="pdf-merge"
      h1={"PDF Merge"}
      subtitle={"Combine multiple PDF files into one document. Runs entirely in your browser."}
    >
      <ToolClient />
    </ToolShell>
  );
}
