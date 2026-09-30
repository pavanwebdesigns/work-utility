import { ToolShell } from "@/components/tool-shell/ToolShell";
import ToolClient from "./ToolClient";

export default function Page() {
  return (
    <ToolShell slug="color-picker" h1={"Color Picker"} subtitle={"Pick colors and get HEX, RGB, and HSL values instantly. Save your favorite colors to a palette."}>
      <ToolClient />
    </ToolShell>
  );
}
