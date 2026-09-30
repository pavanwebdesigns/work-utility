import { ToolShell } from "@/components/tool-shell/ToolShell";
import ToolClient from "./ToolClient";

export default function Page() {
  return (
    <ToolShell
      slug="jwt-decoder"
      h1={"JWT Decoder — JSON Web Token Inspector"}
      subtitle={"Decode, inspect, and verify JWT tokens entirely in your browser — color-coded like jwt.io with signature verification built in."}
    >
      <ToolClient />
    </ToolShell>
  );
}
