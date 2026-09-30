import { ToolShell } from "@/components/tool-shell/ToolShell";
import ToolClient from "./ToolClient";

export default function Page() {
  return (
    <ToolShell
      slug="regex-tester"
      h1={"Regex Tester — Regular Expression Debugger"}
      subtitle={"Test and debug regular expressions with live match highlighting."}
    >
      <ToolClient />
    </ToolShell>
  );
}
