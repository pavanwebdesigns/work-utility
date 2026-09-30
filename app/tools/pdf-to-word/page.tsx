import { ToolShell } from "@/components/tool-shell/ToolShell";
import ToolClient from "./ToolClient";

export default function Page() {
  return (
    <ToolShell
      slug="pdf-to-word"
      h1={"PDF to Word"}
      subtitle={"Convert your PDF to an editable Word document. Text and structure preserved."}
    >
      <ToolClient />
    </ToolShell>
  );
}
