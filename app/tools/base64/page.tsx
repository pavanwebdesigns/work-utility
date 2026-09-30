import { ToolShell } from "@/components/tool-shell/ToolShell";
import ToolClient from "./ToolClient";

export default function Page() {
  return (
    <ToolShell slug="base64" h1={"Base64 Encoder"} subtitle={"Encode and decode Base64 text or files instantly. Private, browser-only processing."}>
      <ToolClient />
    </ToolShell>
  );
}
