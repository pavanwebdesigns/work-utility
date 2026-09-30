import { ToolShell } from "@/components/tool-shell/ToolShell";
import ToolClient from "./ToolClient";

export default function Page() {
  return (
    <ToolShell
      slug="ip-lookup"
      h1={"IP Address Lookup — Find Location & ISP"}
      subtitle={"See your public IP or look up any IPv4 address — country, city, ISP, timezone."}
    >
      <ToolClient />
    </ToolShell>
  );
}
