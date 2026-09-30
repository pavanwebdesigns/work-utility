import { ToolShell } from "@/components/tool-shell/ToolShell";
import ToolClient from "./ToolClient";

export default function Page() {
  return (
    <ToolShell slug="character-counter" subtitle={"Count characters, words, sentences, and paragraphs in real time. Private, fast, and free."}>
      <ToolClient />
    </ToolShell>
  );
}
