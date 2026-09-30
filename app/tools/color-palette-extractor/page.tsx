import { ToolShell } from "@/components/tool-shell/ToolShell";
import ToolClient from "./ToolClient";

export default function Page() {
  return (
    <ToolShell
      slug="color-palette-extractor"
      h1={"Color Palette Extractor Online Free"}
      subtitle={"Upload an image and get dominant colors with HEX and RGB codes. Click to copy."}
    >
      <ToolClient />
    </ToolShell>
  );
}
