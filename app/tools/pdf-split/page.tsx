import { ToolShell } from "@/components/tool-shell/ToolShell";
import ToolClient from "./ToolClient";

export default function Page() {
  return (
    <ToolShell
      slug="pdf-split"
      h1={"PDF Split"}
      subtitle={"Extract pages from a PDF or split into individual files. Runs in your browser."}
    >
      <ToolClient />
    </ToolShell>
  );
}
