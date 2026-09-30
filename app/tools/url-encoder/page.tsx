import { ToolShell } from "@/components/tool-shell/ToolShell";
import ToolClient from "./ToolClient";

export default function Page() {
  return (
    <ToolShell
      slug="url-encoder"
      h1={"URL Encoder"}
      subtitle={"Encode and decode URLs instantly. Convert special characters for safe URL usage."}
    >
      <ToolClient />
    </ToolShell>
  );
}
