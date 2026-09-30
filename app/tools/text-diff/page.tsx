import { ToolShell } from "@/components/tool-shell/ToolShell";
import ToolClient from "./ToolClient";

export default function Page() {
  return (
    <ToolShell
      slug="text-diff"
      h1={"Text Diff Checker — Compare Text Online Free"}
      subtitle={"Compare two texts and highlight added, removed, and unchanged lines."}
    >
      <ToolClient />
    </ToolShell>
  );
}
