import { ToolShell } from "@/components/tool-shell/ToolShell";
import ToolClient from "./ToolClient";

export default function Page() {
  return (
    <ToolShell
      slug="bg-remove"
      h1={"Background Remover"}
      subtitle={"Remove the background from any image with AI. Runs entirely in your browser — no uploads, unlimited free use."}
    >
      <ToolClient />
    </ToolShell>
  );
}
