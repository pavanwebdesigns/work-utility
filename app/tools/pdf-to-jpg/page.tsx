import { ToolShell } from "@/components/tool-shell/ToolShell";
import ToolClient from "./ToolClient";

export default function Page() {
  return (
    <ToolShell
      slug="pdf-to-jpg"
      h1={"PDF to JPG"}
      subtitle={"Convert PDF pages to high-quality JPG images. Download as a ZIP file."}
    >
      <ToolClient />
    </ToolShell>
  );
}
