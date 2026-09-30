import { ToolShell } from "@/components/tool-shell/ToolShell";
import ToolClient from "./ToolClient";

export default function Page() {
  return (
    <ToolShell
      slug="nps-calculator"
      h1={"NPS Calculator India — Pension & Corpus Estimate"}
      subtitle={"Calculate NPS retirement corpus, lump sum withdrawal, monthly pension, and tax savings under Section 80CCD with year-by-year growth."}
    >
      <ToolClient />
    </ToolShell>
  );
}
