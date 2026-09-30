import { ToolShell } from "@/components/tool-shell/ToolShell";
import ToolClient from "./ToolClient";

export default function Page() {
  return (
    <ToolShell
      slug="number-to-words"
      h1={"Number to Words Converter — Free Online"}
      subtitle={"Convert numbers to words in English with Indian or International number systems."}
    >
      <ToolClient />
    </ToolShell>
  );
}
