import { getSoftwareApplicationJsonLd } from "@/lib/tool-structured-data";

type SoftwareApplicationJsonLdProps = {
  slug: string;
};

export function SoftwareApplicationJsonLd({ slug }: SoftwareApplicationJsonLdProps) {
  const jsonLd = getSoftwareApplicationJsonLd(slug);

  if (!jsonLd) {
    return null;
  }

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
    />
  );
}
