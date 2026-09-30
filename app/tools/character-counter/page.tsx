import { ToolShell } from "@/components/tool-shell/ToolShell";
import ToolClient from "./ToolClient";

export default function Page() {
  return (
    <ToolShell slug="character-counter" h1={"Character Counter — Free Online Tool"} subtitle={"Count characters, words, sentences, and paragraphs in real time. Private, fast, and free."}>
      <ToolClient />
    </ToolShell>
  );
}
