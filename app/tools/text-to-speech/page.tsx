import { ToolShell } from "@/components/tool-shell/ToolShell";
import ToolClient from "./ToolClient";

export default function Page() {
  return (
    <ToolShell
      slug="text-to-speech"
      h1={"Text to Speech Online Free"}
      subtitle={"Type or paste text and listen with your browser's built-in voices. Playback only — uses Web Speech API."}
    >
      <ToolClient />
    </ToolShell>
  );
}
