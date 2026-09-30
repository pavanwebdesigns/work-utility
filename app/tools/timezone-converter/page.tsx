import { ToolShell } from "@/components/tool-shell/ToolShell";
import ToolClient from "./ToolClient";

export default function Page() {
  return (
    <ToolShell
      slug="timezone-converter"
      h1={"Time Zone Converter"}
      subtitle={"Convert time between time zones and compare multiple cities instantly."}
    >
      <ToolClient />
    </ToolShell>
  );
}
