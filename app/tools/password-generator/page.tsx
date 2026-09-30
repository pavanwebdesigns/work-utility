import { ToolShell } from "@/components/tool-shell/ToolShell";
import ToolClient from "./ToolClient";

export default function Page() {
  return (
    <ToolShell
      slug="password-generator"
      h1={"Password Generator — Create Strong Random Passwords Free"}
      subtitle={"Generate secure random passwords or memorable passphrases with a real-time strength meter. Runs entirely in your browser."}
    >
      <ToolClient />
    </ToolShell>
  );
}
