import type { Metadata } from "next";
import { blogSeoMetadata } from "../posts";

type Props = {
  params: { slug: string };
};

export function generateMetadata({ params }: Props): Metadata {
  const seo = blogSeoMetadata[params.slug];

  if (!seo) {
    return {
      title: "Guide Not Found | WorkUtilities",
    };
  }

  return {
    title: {
      absolute: seo.title,
    },
    description: seo.description,
    keywords: seo.keywords,
    alternates: {
      canonical: `https://workutilities.com/blog/${params.slug}`,
    },
  };
}

export default function BlogPostLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
