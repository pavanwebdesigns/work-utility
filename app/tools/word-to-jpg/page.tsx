import { ToolShell } from "@/components/tool-shell/ToolShell";
import ToolClient from "./ToolClient";

export default function Page() {
  return (
    <ToolShell
      slug="word-to-jpg"
      h1={"Word to JPG Converter Online Free"}
      subtitle={"Upload a DOCX file and download it as a JPG image in your browser."}
    >
      <ToolClient />
    </ToolShell>
  );
}
