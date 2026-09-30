import { ToolShell } from "@/components/tool-shell/ToolShell";
import ToolClient from "./ToolClient";

export default function Page() {
  return (
    <ToolShell
      slug="dns-lookup"
      h1={"DNS Lookup Tool Online Free"}
      subtitle={"Query A, AAAA, CNAME, MX, TXT, NS, and SOA records via Cloudflare DNS."}
    >
      <ToolClient />
    </ToolShell>
  );
}
