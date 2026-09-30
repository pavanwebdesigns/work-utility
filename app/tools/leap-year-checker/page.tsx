import { ToolShell } from "@/components/tool-shell/ToolShell";
import ToolClient from "./ToolClient";

export default function Page() {
  return (
    <ToolShell
      slug="leap-year-checker"
      h1={"Leap Year Checker — Is This Year a Leap Year?"}
      subtitle={"Enter any year to see if it's a leap year, with the exact rule explained plus next and previous leap years."}
    >
      <ToolClient />
    </ToolShell>
  );
}
