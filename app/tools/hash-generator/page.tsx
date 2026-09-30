import { ToolShell } from "@/components/tool-shell/ToolShell";
import ToolClient from "./ToolClient";

export default function Page() {
  return (
    <ToolShell
      slug="hash-generator"
      h1={"Hash Generator — MD5 SHA-256 Free Online"}
      subtitle={"Generate MD5, SHA-1, SHA-256, and SHA-512 hashes instantly in your browser."}
    >
      <ToolClient />
    </ToolShell>
  );
}
