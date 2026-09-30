import { ToolShell } from "@/components/tool-shell/ToolShell";
import ToolClient from "./ToolClient";

export default function Page() {
  return (
    <ToolShell
      slug="gst-threshold-checker"
      h1={"GST Registration Checker for Freelancers"}
      subtitle={"Do you need GST registration? Check ₹20 lakh threshold, special states, inter-state, and export rules."}
    >
      <ToolClient />
    </ToolShell>
  );
}
