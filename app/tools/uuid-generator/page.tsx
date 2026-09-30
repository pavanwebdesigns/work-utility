import { ToolShell } from "@/components/tool-shell/ToolShell";
import ToolClient from "./ToolClient";

export default function Page() {
  return (
    <ToolShell
      slug="uuid-generator"
      h1={"UUID Generator Online Free — v4 UUIDs Instantly"}
      subtitle={"Generate random UUID v4 identifiers. Create one or hundreds at once, with formatting options and one-click copy."}
    >
      <ToolClient />
    </ToolShell>
  );
}
