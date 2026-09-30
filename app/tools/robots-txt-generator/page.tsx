import { ToolShell } from "@/components/tool-shell/ToolShell";
import ToolClient from "./ToolClient";

export default function Page() {
  return (
    <ToolShell
      slug="robots-txt-generator"
      h1={"robots.txt Generator"}
      subtitle={"Build a valid robots.txt with user-agent rules, allow/disallow paths, and sitemap URL. Copy or download instantly."}
    >
      <ToolClient />
    </ToolShell>
  );
}
