import { ToolShell } from "@/components/tool-shell/ToolShell";
import ToolClient from "./ToolClient";

export default function Page() {
  return (
    <ToolShell
      slug="qr-code-generator"
      h1={"Free QR Code Generator — Custom Shapes, Logo & Colors"}
      subtitle={"Create stylish QR codes with live preview. Customize dots, corners, colors, logo, and download as PNG, SVG, or JPEG."}
    >
      <ToolClient />
    </ToolShell>
  );
}
