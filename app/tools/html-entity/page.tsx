import { ToolShell } from "@/components/tool-shell/ToolShell";
import ToolClient from "./ToolClient";

export default function Page() {
  return (
    <ToolShell
      slug="html-entity"
      h1={"HTML Entity Encoder / Decoder"}
      subtitle={"Encode and decode HTML entities for safe web content."}
    >
      <ToolClient />
    </ToolShell>
  );
}
