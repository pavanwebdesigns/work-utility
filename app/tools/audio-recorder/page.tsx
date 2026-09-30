import { ToolShell } from "@/components/tool-shell/ToolShell";
import ToolClient from "./ToolClient";

export default function Page() {
  return (
    <ToolShell slug="audio-recorder" h1={"Online Audio Recorder Free — Record from Browser"} subtitle={"Record audio from your microphone, pause and resume as needed, then download sessions as WebM files."}>
      <ToolClient />
    </ToolShell>
  );
}
