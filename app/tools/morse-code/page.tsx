import { ToolShell } from "@/components/tool-shell/ToolShell";
import ToolClient from "./ToolClient";

export default function Page() {
  return (
    <ToolShell
      slug="morse-code"
      h1={"Morse Code Converter"}
      subtitle={"Convert text to Morse code and back with instant translation."}
    >
      <ToolClient />
    </ToolShell>
  );
}
