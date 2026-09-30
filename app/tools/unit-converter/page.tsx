import { ToolShell } from "@/components/tool-shell/ToolShell";
import ToolClient from "./ToolClient";

export default function Page() {
  return (
    <ToolShell
      slug="unit-converter"
      h1={"Unit Converter — Convert Any Unit Free Online"}
      subtitle={"Convert length, weight, temperature, area, volume, speed, and data units instantly with real-time results."}
    >
      <ToolClient />
    </ToolShell>
  );
}
