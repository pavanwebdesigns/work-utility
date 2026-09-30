import { ToolShell } from "@/components/tool-shell/ToolShell";
import ToolClient from "./ToolClient";

export default function Page() {
  return (
    <ToolShell
      slug="word-compress"
      h1={"Compress Word Document"}
      subtitle={"Reduce DOCX file size by compressing images — free, private, in your browser."}
    >
      <ToolClient />
    </ToolShell>
  );
}
