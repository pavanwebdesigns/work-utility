import { ToolShell } from "@/components/tool-shell/ToolShell";
import ToolClient from "./ToolClient";

export default function Page() {
  return (
    <ToolShell
      slug="pdf-compress"
      h1={"PDF Compress"}
      subtitle={"Reduce your PDF file size while maintaining quality. Fast compression powered by our secure PDF service."}
    >
      <ToolClient />
    </ToolShell>
  );
}
