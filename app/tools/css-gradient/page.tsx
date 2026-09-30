import { ToolShell } from "@/components/tool-shell/ToolShell";
import ToolClient from "./ToolClient";

export default function Page() {
  return (
    <ToolShell
      slug="css-gradient"
      h1={"CSS Gradient Generator Online Free"}
      subtitle={"Build linear, radial, or conic gradients visually and copy ready-to-use CSS."}
    >
      <ToolClient />
    </ToolShell>
  );
}
