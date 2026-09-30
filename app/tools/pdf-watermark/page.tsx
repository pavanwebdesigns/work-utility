import { ToolShell } from "@/components/tool-shell/ToolShell";
import ToolClient from "./ToolClient";

export default function Page() {
  return (
    <ToolShell
      slug="pdf-watermark"
      h1={"Add Watermark to PDF Online Free"}
      subtitle={"Add text or image watermarks with adjustable opacity and placement. Applied to every page in your browser."}
    >
      <ToolClient />
    </ToolShell>
  );
}
