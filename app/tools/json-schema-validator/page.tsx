"use client";

import { useCallback, useEffect, useState } from "react";
import Link from "next/link";
import { Braces, Check, Copy, Eraser, Wand2 } from "lucide-react";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { RelatedTools } from "@/components/RelatedTools";
import { ToolFeedback } from "@/components/ToolFeedback";
import { ToolSeoContent } from "@/components/ToolSeoContent";
import { DinoGame } from "@/components/DinoGame";
import { FavoriteButton } from "@/components/FavoriteButton";
import { LastUpdatedBadge } from "@/components/LastUpdatedBadge";
import { CalculatorSelect } from "@/components/calculator/CalculatorUi";
import {
  DEFAULT_PERSON_DATA,
  DEFAULT_PERSON_SCHEMA,
  SCHEMA_EXAMPLES,
  prettyPrintJson,
  validateJsonSchema,
  type SchemaDraft,
} from "@/lib/json-schema-validator";

const EXAMPLE_OPTIONS = [
  { value: "person", label: "Person object" },
  { value: "product", label: "Product schema" },
  { value: "api", label: "API response" },
  { value: "registration", label: "User registration" },
];

export default function JsonSchemaValidatorPage() {
  const [schemaText, setSchemaText] = useState(DEFAULT_PERSON_SCHEMA);
  const [dataText, setDataText] = useState(DEFAULT_PERSON_DATA);
  const [draft, setDraft] = useState<SchemaDraft>("draft-7");
  const [result, setResult] = useState<ReturnType<typeof validateJsonSchema> | null>(null);
  const [copiedPath, setCopiedPath] = useState<string | null>(null);

  const runValidation = useCallback(() => {
    setResult(validateJsonSchema(schemaText, dataText, draft));
  }, [schemaText, dataText, draft]);

  useEffect(() => {
    const timer = setTimeout(runValidation, 300);
    return () => clearTimeout(timer);
  }, [runValidation]);

  const handleFormat = (target: "schema" | "data") => {
    try {
      if (target === "schema") {
        setSchemaText(prettyPrintJson(schemaText));
      } else {
        setDataText(prettyPrintJson(dataText));
      }
    } catch {
      /* invalid JSON */
    }
  };

  const loadExample = (key: string) => {
    const ex = SCHEMA_EXAMPLES[key];
    if (ex) {
      setSchemaText(ex.schema);
      setDataText(ex.data);
    }
  };

  const copyPath = async (path: string) => {
    await navigator.clipboard.writeText(path);
    setCopiedPath(path);
    setTimeout(() => setCopiedPath(null), 1500);
  };

  return (
    <div className="flex min-h-screen w-full max-w-full flex-col overflow-x-hidden bg-surface-base">
      <Header />
      <main id="main-content" className="min-w-0 flex-1 overflow-x-hidden">
        <div className="px-6 py-6 sm:px-10">
          <Link href="/" className="inline-flex items-center gap-1 text-sm text-content-secondary hover:text-content-primary">
            ← All Tools
          </Link>
        </div>

        <div className="mx-auto max-w-5xl px-4 pb-16 sm:px-6">
          <div className="pt-4 text-center">
            <div className="mx-auto mb-5 flex h-12 w-12 items-center justify-center rounded-xl bg-tool-blue/10">
              <Braces className="h-6 w-6 text-tool-blue" strokeWidth={1.75} />
            </div>
            <h1 className="text-2xl font-bold text-content-primary sm:text-3xl">
              JSON Schema Validator
            </h1>
            <p className="mx-auto mt-3 max-w-lg text-content-secondary">
              Validate JSON data against a JSON Schema in real-time. Human-readable errors, Draft 7 and 2020-12.
            </p>
            <LastUpdatedBadge />
            <div className="mt-4 flex justify-center">
              <FavoriteButton slug="json-schema-validator" />
            </div>
          </div>

          <div className="mx-auto mt-8 flex max-w-xl flex-col gap-4 sm:flex-row sm:items-end">
            <div className="flex-1">
              <label className="mb-1 block text-sm text-content-secondary">Schema draft</label>
              <CalculatorSelect
                id="draft"
                value={draft}
                onChange={(v) => setDraft(v as SchemaDraft)}
                options={[
                  { value: "draft-7", label: "JSON Schema Draft 7" },
                  { value: "draft-2020-12", label: "Draft 2020-12" },
                ]}
              />
            </div>
            <div className="flex-1">
              <label className="mb-1 block text-sm text-content-secondary">Load example</label>
              <CalculatorSelect
                id="example"
                value="person"
                onChange={loadExample}
                options={EXAMPLE_OPTIONS}
              />
            </div>
          </div>

          <div className="mx-auto mt-6 grid gap-6 lg:grid-cols-2">
            <div>
              <div className="mb-2 flex items-center justify-between">
                <label className="text-sm font-medium text-content-primary">JSON Schema</label>
                <div className="flex gap-2">
                  <button type="button" onClick={() => handleFormat("schema")} className="text-xs text-brand-blue hover:underline">
                    <Wand2 className="mr-1 inline h-3 w-3" />Format
                  </button>
                  <button type="button" onClick={() => setSchemaText("")} className="text-xs text-content-muted hover:text-content-primary">
                    <Eraser className="mr-1 inline h-3 w-3" />Clear
                  </button>
                </div>
              </div>
              <textarea
                value={schemaText}
                onChange={(e) => setSchemaText(e.target.value)}
                rows={15}
                spellCheck={false}
                className="w-full rounded-xl border border-surface-border bg-surface-card p-4 font-mono text-sm text-content-primary focus:border-brand-blue focus:outline-none"
              />
            </div>
            <div>
              <div className="mb-2 flex items-center justify-between">
                <label className="text-sm font-medium text-content-primary">JSON Data to Validate</label>
                <div className="flex gap-2">
                  <button type="button" onClick={() => handleFormat("data")} className="text-xs text-brand-blue hover:underline">
                    <Wand2 className="mr-1 inline h-3 w-3" />Format
                  </button>
                  <button type="button" onClick={() => setDataText("")} className="text-xs text-content-muted hover:text-content-primary">
                    <Eraser className="mr-1 inline h-3 w-3" />Clear
                  </button>
                </div>
              </div>
              <textarea
                value={dataText}
                onChange={(e) => setDataText(e.target.value)}
                rows={15}
                spellCheck={false}
                className="w-full rounded-xl border border-surface-border bg-surface-card p-4 font-mono text-sm text-content-primary focus:border-brand-blue focus:outline-none"
              />
            </div>
          </div>

          {result && (
            <div className="mx-auto mt-8 max-w-5xl">
              {result.schemaError && (
                <div className="rounded-xl border border-red-500/30 bg-red-500/5 px-4 py-3 text-sm text-red-300">
                  Schema error: {result.schemaError}
                </div>
              )}
              {result.dataError && (
                <div className="rounded-xl border border-red-500/30 bg-red-500/5 px-4 py-3 text-sm text-red-300">
                  Data JSON error: {result.dataError}
                </div>
              )}
              {!result.schemaError && !result.dataError && result.valid && (
                <div className="rounded-xl border border-tool-convert/30 bg-tool-convert/5 px-4 py-4 text-center text-sm font-medium text-content-primary">
                  <Check className="mb-1 inline h-5 w-5 text-tool-convert" /> Valid — JSON data matches the schema
                </div>
              )}
              {!result.schemaError && !result.dataError && !result.valid && (
                <div className="space-y-3">
                  <div className="rounded-xl border border-red-500/30 bg-red-500/5 px-4 py-3 text-center text-sm font-medium text-content-primary">
                    ❌ {result.errors.length} validation error{result.errors.length !== 1 ? "s" : ""} found
                  </div>
                  {result.errors.map((err, i) => (
                    <div key={i} className="rounded-xl border border-surface-border bg-surface-card p-4">
                      <div className="flex items-start justify-between gap-2">
                        <p className="font-mono text-xs text-brand-blue">{err.path}</p>
                        <button
                          type="button"
                          onClick={() => copyPath(err.path)}
                          className="shrink-0 text-xs text-content-muted hover:text-content-primary"
                        >
                          <Copy className="inline h-3 w-3" />
                          {copiedPath === err.path ? " Copied" : " Copy path"}
                        </button>
                      </div>
                      <p className="mt-2 text-sm text-content-secondary">{err.plainEnglish}</p>
                      <p className="mt-1 text-xs text-content-muted">{err.message}</p>
                    </div>
                  ))}
                </div>
              )}
            </div>
          )}

          <div className="mt-16 grid grid-cols-1 gap-4 sm:grid-cols-3">
            {[
              { icon: Braces, title: "Real-time", desc: "Validates as you type" },
              { icon: Check, title: "Draft 7 & 2020", desc: "Both schema versions" },
              { icon: Copy, title: "Readable errors", desc: "Plain English messages" },
            ].map((item) => (
              <div key={item.title} className="rounded-xl border border-surface-border bg-surface-card p-5">
                <item.icon className="h-5 w-5 text-tool-blue" />
                <p className="mt-2 font-semibold text-content-primary">{item.title}</p>
                <p className="mt-1 text-sm text-content-secondary">{item.desc}</p>
              </div>
            ))}
          </div>

          <RelatedTools currentSlug="json-schema-validator" />
          <ToolFeedback toolName="JSON Schema Validator" />
          <ToolSeoContent slug="json-schema-validator" />
          <DinoGame />
        </div>
      </main>
      <Footer />
    </div>
  );
}
