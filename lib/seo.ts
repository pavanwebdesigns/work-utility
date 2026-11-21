import type { Metadata } from "next";
import { isIndexable } from "@/lib/index-policy";

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

/** Shared robots helper for every public page. Admin/API keep their own rules. */
export function robotsFor(pathOrUrl: string): {
  index: boolean;
  follow: true;
} {
  return {
    index: isIndexable(pathOrUrl),
    follow: true,
  };
}

/** Attach robots from the page URL so layouts never hand-code index/noindex. */
export function withRobots(url: string, metadata: Metadata): Metadata {
  return {
    ...metadata,
    robots: robotsFor(url),
  };
}

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
