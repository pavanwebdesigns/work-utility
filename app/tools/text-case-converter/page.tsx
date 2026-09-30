import { ToolShell } from "@/components/tool-shell/ToolShell";
import ToolClient from "./ToolClient";

export default function Page() {
  return (
    <ToolShell
      slug="text-case-converter"
      h1={"Text Case Converter"}
      subtitle={"Convert text to uppercase, lowercase, title case, camelCase, and more — all at once."}
    >
      <ToolClient />
    </ToolShell>
  );
}
