import { ToolShell } from "@/components/tool-shell/ToolShell";
import ToolClient from "./ToolClient";

export default function Page() {
  return (
    <ToolShell
      slug="favicon-generator"
      h1={"Favicon Generator Online Free"}
      subtitle={"Upload an image and get favicon.ico, all standard PNG sizes, and ready-to-paste HTML link tags."}
    >
      <ToolClient />
    </ToolShell>
  );
}
