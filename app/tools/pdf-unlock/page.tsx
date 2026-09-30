import { ToolShell } from "@/components/tool-shell/ToolShell";
import ToolClient from "./ToolClient";

export default function Page() {
  return (
    <ToolShell
      slug="pdf-unlock"
      h1={"Remove PDF Password"}
      subtitle={"Unlock password-protected PDFs when you know the password."}
    >
      <ToolClient />
    </ToolShell>
  );
}
