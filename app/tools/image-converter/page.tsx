import { ToolShell } from "@/components/tool-shell/ToolShell";
import ToolClient from "./ToolClient";

export default function Page() {
  return (
    <ToolShell
      slug="image-converter"
      h1={"Image Converter"}
      subtitle={"Convert images between JPG, PNG, and WebP formats. Runs entirely in your browser."}
    >
      <ToolClient />
    </ToolShell>
  );
}
