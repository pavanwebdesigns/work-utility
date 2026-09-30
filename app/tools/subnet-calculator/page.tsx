import { ToolShell } from "@/components/tool-shell/ToolShell";
import ToolClient from "./ToolClient";

export default function Page() {
  return (
    <ToolShell
      slug="subnet-calculator"
      h1={"Subnet Calculator Online Free — CIDR IP Range Tool"}
      subtitle={"Enter a CIDR block to see network details, usable host range, and binary representations."}
    >
      <ToolClient />
    </ToolShell>
  );
}
