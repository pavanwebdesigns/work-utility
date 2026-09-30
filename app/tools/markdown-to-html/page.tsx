import { ToolShell } from "@/components/tool-shell/ToolShell";
import ToolClient from "./ToolClient";

export default function Page() {
  return (
    <ToolShell
      slug="markdown-to-html"
      h1={"Markdown to HTML"}
      subtitle={"Convert Markdown to HTML with live preview. Copy clean HTML output instantly."}
    >
      <ToolClient />
    </ToolShell>
  );
}
