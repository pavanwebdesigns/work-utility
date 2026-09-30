import { ToolShell } from "@/components/tool-shell/ToolShell";
import ToolClient from "./ToolClient";

export default function Page() {
  return (
    <ToolShell
      slug="currency-converter"
      h1={"Currency Converter Online Free"}
      subtitle={"Live mid-market exchange rates from the European Central Bank."}
    >
      <ToolClient />
    </ToolShell>
  );
}
