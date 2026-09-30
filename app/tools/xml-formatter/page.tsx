import { ToolShell } from "@/components/tool-shell/ToolShell";
import ToolClient from "./ToolClient";

export default function Page() {
  return (
    <ToolShell
      slug="xml-formatter"
      h1={"XML Formatter & Validator"}
      subtitle={"Format, beautify, minify, and validate XML data instantly."}
    >
      <ToolClient />
    </ToolShell>
  );
}
