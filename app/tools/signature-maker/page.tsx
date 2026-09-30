import { ToolShell } from "@/components/tool-shell/ToolShell";
import ToolClient from "./ToolClient";

export default function Page() {
  return (
    <ToolShell
      slug="signature-maker"
      h1={"Signature Maker — Create Your Digital Signature Free"}
      subtitle={"Draw, type, or upload your signature and download PNG/JPG or copy to clipboard instantly."}
    >
      <ToolClient />
    </ToolShell>
  );
}
