import { ToolShell } from "@/components/tool-shell/ToolShell";
import ToolClient from "./ToolClient";

export default function Page() {
  return (
    <ToolShell
      slug="roman-numeral-converter"
      h1={"Roman Numeral Converter — Number to Roman & Back"}
      subtitle={"Convert numbers to Roman numerals or Roman numerals to numbers instantly. Supports standard notation from 1 to 3999."}
    >
      <ToolClient />
    </ToolShell>
  );
}
