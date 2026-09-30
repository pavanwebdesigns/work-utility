import { ToolShell } from "@/components/tool-shell/ToolShell";
import ToolClient from "./ToolClient";

export default function Page() {
  return (
    <ToolShell
      slug="image-compress"
      h1={"Image Compress"}
      subtitle={"Compress JPG, PNG, and WebP images without visible quality loss. Runs entirely in your browser."}
    >
      <ToolClient />
    </ToolShell>
  );
}
