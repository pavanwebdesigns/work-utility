import { ToolShell } from "@/components/tool-shell/ToolShell";
import ToolClient from "./ToolClient";

export default function Page() {
  return (
    <ToolShell
      slug="http-status-codes"
      h1={"HTTP Status Codes Reference"}
      subtitle={"Searchable quick-reference for HTTP 1xx–5xx codes with practical context, common causes, and what to do."}
    >
      <ToolClient />
    </ToolShell>
  );
}
