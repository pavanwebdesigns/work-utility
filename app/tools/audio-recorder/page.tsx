import { ToolShell } from "@/components/tool-shell/ToolShell";
import ToolClient from "./ToolClient";

export default function Page() {
  return (
    <ToolShell slug="audio-recorder" subtitle={"Record audio from your microphone, pause and resume as needed, then download sessions as WebM files."}>
      <ToolClient />
    </ToolShell>
  );
}
