import { ToolShell } from "@/components/tool-shell/ToolShell";
import ToolClient from "./ToolClient";

export default function Page() {
  return (
    <ToolShell
      slug="keyword-density"
      h1={"Keyword Density Checker"}
      subtitle={"Analyze keyword frequency and density in your content for SEO."}
    >
      <ToolClient />
    </ToolShell>
  );
}
