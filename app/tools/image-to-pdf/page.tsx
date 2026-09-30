import { ToolShell } from "@/components/tool-shell/ToolShell";
import ToolClient from "./ToolClient";

export default function Page() {
  return (
    <ToolShell
      slug="image-to-pdf"
      h1={"Image to PDF"}
      subtitle={"Combine multiple JPG, PNG images into a single PDF. Each image gets its own page. Runs in your browser."}
    >
      <ToolClient />
    </ToolShell>
  );
}
