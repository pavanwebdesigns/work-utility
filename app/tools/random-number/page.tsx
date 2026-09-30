import { ToolShell } from "@/components/tool-shell/ToolShell";
import ToolClient from "./ToolClient";

export default function Page() {
  return (
    <ToolShell
      slug="random-number"
      h1={"Random Number Generator"}
      subtitle={"Generate random numbers, lists, UUIDs, and dice rolls instantly."}
    >
      <ToolClient />
    </ToolShell>
  );
}
