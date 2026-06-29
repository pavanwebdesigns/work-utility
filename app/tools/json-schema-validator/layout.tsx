import type { Metadata } from "next";

export const metadata: Metadata = {
  title: {
    absolute: "JSON Schema Validator Online Free — Draft 7 & 2020",
  },
  description:
    "Validate JSON data against a JSON Schema in real-time. Supports Draft 7 and Draft 2020-12. Human-readable error messages with path. Free, browser-based.",
  keywords:
    "JSON Schema validator online, validate JSON against schema, Ajv validator",
  openGraph: {
    title: "JSON Schema Validator Online Free — Draft 7 & 2020",
    description:
      "Validate JSON data against JSON Schema with human-readable errors.",
    url: "https://workutilities.com/tools/json-schema-validator",
    siteName: "WorkUtilities",
    type: "website",
  },
  alternates: {
    canonical: "https://workutilities.com/tools/json-schema-validator",
  },
};

export default function JsonSchemaValidatorLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
