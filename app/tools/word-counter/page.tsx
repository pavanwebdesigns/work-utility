import { ToolShell } from "@/components/tool-shell/ToolShell";
import ToolClient from "./ToolClient";

export default function Page() {
  return (
    <ToolShell
      slug="word-counter"
      h1={"Word Counter Online — Free & Instant"}
      subtitle={"Count words, characters, sentences, reading time, keyword density, and social media limits as you type. Private, fast, and free."}
    >
      <ToolClient />
    </ToolShell>
  );
}
