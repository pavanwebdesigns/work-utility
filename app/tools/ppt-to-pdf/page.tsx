import { ToolShell } from "@/components/tool-shell/ToolShell";
import ToolClient from "./ToolClient";

export default function Page() {
  return (
    <ToolShell
      slug="ppt-to-pdf"
      h1={"PPT to PDF"}
      subtitle={"Convert PowerPoint presentations to PDF instantly. Each slide becomes a PDF page — runs in your browser."}
    >
      <ToolClient />
    </ToolShell>
  );
}
