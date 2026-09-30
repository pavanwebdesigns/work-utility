import { ToolShell } from "@/components/tool-shell/ToolShell";
import ToolClient from "./ToolClient";

export default function Page() {
  return (
    <ToolShell
      slug="json-schema-validator"
      h1={"JSON Schema Validator"}
      subtitle={"Validate JSON data against a JSON Schema in real-time. Human-readable errors, Draft 7 and 2020-12."}
    >
      <ToolClient />
    </ToolShell>
  );
}
