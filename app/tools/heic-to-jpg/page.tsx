import { ToolShell } from "@/components/tool-shell/ToolShell";
import ToolClient from "./ToolClient";

export default function Page() {
  return (
    <ToolShell
      slug="heic-to-jpg"
      h1={"HEIC to JPG"}
      subtitle={"Convert iPhone HEIC photos to JPG or PNG instantly. Runs in your browser — no upload to any server."}
    >
      <ToolClient />
    </ToolShell>
  );
}
