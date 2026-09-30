import { ToolShell } from "@/components/tool-shell/ToolShell";
import ToolClient from "./ToolClient";

export default function Page() {
  return (
    <ToolShell
      slug="json-formatter"
      h1={"JSON Formatter"}
      subtitle={"Format, validate, and minify JSON instantly. Paste your data and get clean output in seconds."}
    >
      <ToolClient />
    </ToolShell>
  );
}
