import { ToolShell } from "@/components/tool-shell/ToolShell";
import ToolClient from "./ToolClient";

export default function Page() {
  return (
    <ToolShell
      slug="crypto-tracker"
      h1={"Crypto Price Tracker Online Free"}
      subtitle={"Live cryptocurrency prices with 24h change, market cap, and volume."}
    >
      <ToolClient />
    </ToolShell>
  );
}
