import { ToolShell } from "@/components/tool-shell/ToolShell";
import ToolClient from "./ToolClient";

export default function Page() {
  return (
    <ToolShell slug="binary-converter" h1={"Binary Converter — Decimal Hex Octal Free"} subtitle={"Convert between binary, decimal, hexadecimal, and octal number systems instantly."}>
      <ToolClient />
    </ToolShell>
  );
}
