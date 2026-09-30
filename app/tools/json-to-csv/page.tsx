import { ToolShell } from "@/components/tool-shell/ToolShell";
import ToolClient from "./ToolClient";

export default function Page() {
  return (
    <ToolShell
      slug="json-to-csv"
      h1={"JSON to CSV Converter Online Free"}
      subtitle={"Paste a JSON array of objects and download spreadsheet-ready CSV."}
    >
      <ToolClient />
    </ToolShell>
  );
}
