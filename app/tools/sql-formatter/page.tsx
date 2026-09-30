import { ToolShell } from "@/components/tool-shell/ToolShell";
import ToolClient from "./ToolClient";

export default function Page() {
  return (
    <ToolShell
      slug="sql-formatter"
      h1={"SQL Formatter Online Free"}
      subtitle={"Beautify SQL with keyword capitalization, indentation, and line breaks. Minify mode included."}
    >
      <ToolClient />
    </ToolShell>
  );
}
