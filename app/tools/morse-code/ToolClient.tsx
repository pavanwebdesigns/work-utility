"use client";

import { useMemo, useState } from "react";
import { ChevronDown, Copy, Radio, Type } from "lucide-react";
import { MORSE_ALPHABET, morseToText, textToMorse } from "@/lib/morse-code";

const howItWorksSteps = [
  { step: "01", icon: Type, title: "Type", description: "Enter text or Morse code" },
  { step: "02", icon: Radio, title: "Convert", description: "See instant translation" },
  { step: "03", icon: Copy, title: "Copy", description: "Copy the converted output" },
];

export default function MorseCodePage() {
  const [mode, setMode] = useState<"encode" | "decode">("encode");
  const [input, setInput] = useState("");
  const [copied, setCopied] = useState(false);
  const [showRef, setShowRef] = useState(false);

  const output = useMemo(() => {
    if (!input) return "";
    return mode === "encode" ? textToMorse(input) : morseToText(input);
  }, [input, mode]);

  const handleCopy = async () => {
    if (!output) return;
    await navigator.clipboard.writeText(output);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <>
<div className="mt-8 flex justify-center gap-2">
            {(["encode", "decode"] as const).map((m) => (
              <button key={m} type="button" onClick={() => setMode(m)} className={`rounded-xl px-5 py-2 text-sm font-medium capitalize ${mode === m ? "bg-tool-img2pdf text-white" : "border border-surface-border bg-surface-card text-content-primary"}`}>
                {m === "encode" ? "Text to Morse" : "Morse to Text"}
              </button>
            ))}
          </div>
          <div className="mt-8 grid grid-cols-1 gap-4 md:grid-cols-2">
            <textarea value={input} onChange={(e) => setInput(e.target.value)} placeholder={mode === "encode" ? "Type text..." : "Paste Morse code (dots and dashes)..."} className="min-h-40 rounded-xl border border-surface-border bg-surface-card px-4 py-4 font-mono text-sm outline-none focus:border-tool-img2pdf" />
            <textarea readOnly value={output} placeholder="Output..." className="min-h-40 rounded-xl border border-surface-border bg-surface-elevated px-4 py-4 font-mono text-sm" />
          </div>
          <button type="button" onClick={handleCopy} disabled={!output} className="mt-4 flex items-center gap-2 rounded-xl bg-tool-img2pdf px-5 py-3 text-sm font-semibold text-white disabled:opacity-50"><Copy className="h-4 w-4" />{copied ? "Copied!" : "Copy Output"}</button>
          <button type="button" onClick={() => setShowRef(!showRef)} className="mt-6 flex w-full items-center justify-between rounded-xl border border-surface-border bg-surface-card px-4 py-3 text-sm font-medium text-content-primary">
            Morse Alphabet Reference
            <ChevronDown className={`h-4 w-4 transition-transform ${showRef ? "rotate-180" : ""}`} />
          </button>
          {showRef && (
            <div className="mt-2 overflow-x-auto rounded-xl border border-surface-border bg-surface-card p-4">
              <table className="w-full text-sm"><thead><tr className="text-left text-content-secondary"><th className="pb-2">Char</th><th className="pb-2">Code</th></tr></thead>
                <tbody>{MORSE_ALPHABET.map((r) => (<tr key={r.char} className="border-t border-surface-border/50"><td className="py-1.5 font-mono">{r.char}</td><td className="py-1.5 font-mono text-tool-img2pdf">{r.code}</td></tr>))}</tbody>
              </table>
            </div>
          )}
          <div className="mt-16">
            <h2 className="mb-6 text-center text-lg font-semibold text-content-primary">How It Works</h2>
            <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">{howItWorksSteps.map((s) => (<div key={s.title} className="rounded-xl border border-surface-border bg-surface-card p-5"><div className="mb-3 flex h-10 w-10 items-center justify-center rounded-lg bg-tool-img2pdf/10"><s.icon className="h-5 w-5 text-tool-img2pdf" /></div><p className="text-xs font-semibold text-tool-img2pdf">{s.step}</p><p className="mt-1 font-semibold">{s.title}</p><p className="mt-1 text-sm text-content-secondary">{s.description}</p></div>))}</div>
          </div>
    </>
  );
}

