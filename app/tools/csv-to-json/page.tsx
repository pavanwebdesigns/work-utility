import { ToolShell } from "@/components/tool-shell/ToolShell";
import ToolClient from "./ToolClient";

export default function Page() {
  return (
    <ToolShell
      slug="csv-to-json"
      h1={"CSV to JSON Converter — Free Online"}
      subtitle={"Paste CSV data or upload a file for instant JSON conversion."}
    >
      <ToolClient />
    </ToolShell>
  );
}
