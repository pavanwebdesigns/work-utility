import { ToolShell } from "@/components/tool-shell/ToolShell";
import ToolClient from "./ToolClient";

export default function Page() {
  return (
    <ToolShell
      slug="lorem-ipsum"
      h1={"Lorem Ipsum Generator"}
      subtitle={"Generate placeholder lorem ipsum text for designs, mockups, and prototypes."}
    >
      <ToolClient />
    </ToolShell>
  );
}
