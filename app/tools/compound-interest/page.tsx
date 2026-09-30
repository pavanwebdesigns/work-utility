import { ToolShell } from "@/components/tool-shell/ToolShell";
import ToolClient from "./ToolClient";

export default function Page() {
  return (
    <ToolShell
      slug="compound-interest"
      h1={"Compound Interest Calculator"}
      subtitle={"Calculate how your investment grows with compound interest and optional monthly contributions."}
    >
      <ToolClient />
    </ToolShell>
  );
}
