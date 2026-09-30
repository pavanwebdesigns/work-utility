import { ToolShell } from "@/components/tool-shell/ToolShell";
import ToolClient from "./ToolClient";

export default function Page() {
  return (
    <ToolShell
      slug="pdf-page-numbers"
      h1={"Add Page Numbers to PDF Online Free"}
      subtitle={"Choose position, starting number, and format. Number every page in your browser — no upload to server."}
    >
      <ToolClient />
    </ToolShell>
  );
}
