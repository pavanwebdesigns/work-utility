import type { Metadata } from "next";

const OG_IMAGE = {
  url: "/og-default.png",
  width: 1200,
  height: 630,
  alt: "WorkUtilities — Free tools for Indian students, jobs & documents",
} as const;

type OpenGraph = NonNullable<Metadata["openGraph"]>;

type BuildOpenGraphInput = {
  title: string;
  description: string;
  url: string;
  type?: "website" | "article";
  publishedTime?: string;
  modifiedTime?: string;
  authors?: string[];
};

export function buildOpenGraph({
  title,
  description,
  url,
  type = "website",
  ...extra
}: BuildOpenGraphInput): OpenGraph {
  return {
    title,
    description,
    url,
    type,
    ...extra,
    siteName: "WorkUtilities",
    images: [OG_IMAGE],
  };
}
