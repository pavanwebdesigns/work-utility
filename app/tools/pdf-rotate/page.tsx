import { ToolShell } from "@/components/tool-shell/ToolShell";
import ToolClient from "./ToolClient";

export default function Page() {
  return (
    <ToolShell
      slug="pdf-rotate"
      h1={"Rotate PDF Pages Online Free"}
      subtitle={"Fix sideways or upside-down scanned pages. Rotate individual pages or the whole document — runs in your browser."}
    >
      <ToolClient />
    </ToolShell>
  );
}
