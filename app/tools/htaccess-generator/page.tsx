import { ToolShell } from "@/components/tool-shell/ToolShell";
import ToolClient from "./ToolClient";

export default function Page() {
  return (
    <ToolShell
      slug="htaccess-generator"
      h1={".htaccess Generator"}
      subtitle={"Build Apache .htaccess rules for HTTPS redirects, caching, GZIP, error pages, and security — with live preview and download."}
    >
      <ToolClient />
    </ToolShell>
  );
}
