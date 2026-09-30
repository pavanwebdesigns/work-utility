"use client";

import { memo } from "react";
import Link from "next/link";
import { ChevronDown } from "lucide-react";
import {
  getToolSeoContent,
  type ToolSeoSlug,
} from "@/lib/tool-seo-content";
import { SoftwareApplicationJsonLd } from "@/components/SoftwareApplicationJsonLd";

type ToolSeoContentProps = {
  slug: ToolSeoSlug;
};

export const ToolSeoContent = memo(function ToolSeoContent({
  slug,
}: ToolSeoContentProps) {
  const content = getToolSeoContent(slug);

  const faqJsonLd = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: content.faqs.map((faq) => ({
      "@type": "Question",
      name: faq.question,
      acceptedAnswer: {
        "@type": "Answer",
        text: faq.answer,
      },
    })),
  };

  return (
    <div className="mt-12 border-t border-surface-border pt-12">
      <SoftwareApplicationJsonLd slug={slug} />
      <section>
        <h2 className="text-lg font-semibold text-content-primary sm:text-xl">
          {content.aboutTitle}
        </h2>
        <div className="mt-4 space-y-4 text-sm leading-relaxed text-content-secondary sm:text-base">
          {content.aboutParagraphs.map((paragraph) => (
            <p key={paragraph.slice(0, 48)}>{paragraph}</p>
          ))}
        </div>
        {content.blogGuide && (
          <p className="mt-4 text-sm text-content-secondary">
            Read the full guide:{" "}
            <Link
              href={content.blogGuide.href}
              className="font-medium text-brand-blue hover:underline"
            >
              {content.blogGuide.title}
            </Link>
          </p>
        )}
      </section>

      <section className="mt-12">
        <h2 className="text-lg font-semibold text-content-primary sm:text-xl">
          {content.whenToUseTitle}
        </h2>
        <div className="mt-4 grid gap-3 sm:grid-cols-2">
          {content.useCases.map((item) => (
            <div
              key={item.title}
              className="rounded-xl border border-surface-border bg-surface-card p-4 sm:p-5"
            >
              <h3 className="font-medium text-content-primary">{item.title}</h3>
              <p className="mt-2 text-sm leading-relaxed text-content-secondary">
                {item.description}
              </p>
            </div>
          ))}
        </div>
      </section>

      <section className="mt-12">
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd) }}
        />
        <h2 className="text-lg font-semibold text-content-primary sm:text-xl">
          Frequently Asked Questions
        </h2>
        <div className="mt-4 space-y-3">
          {content.faqs.map((faq, index) => (
            <details
              key={faq.question}
              open={index === 0 ? true : undefined}
              className="group overflow-hidden rounded-xl border border-surface-border bg-surface-card"
            >
              <summary className="flex w-full cursor-pointer list-none items-center justify-between gap-4 px-4 py-4 text-left marker:content-none sm:px-5 [&::-webkit-details-marker]:hidden">
                <span className="font-medium text-content-primary">
                  {faq.question}
                </span>
                <ChevronDown className="h-5 w-5 shrink-0 text-content-muted transition-transform group-open:rotate-180" />
              </summary>
              <div className="border-t border-surface-border px-4 pb-4 pt-3 sm:px-5">
                <p className="text-sm leading-relaxed text-content-secondary">
                  {faq.answer}
                </p>
              </div>
            </details>
          ))}
        </div>
      </section>
    </div>
  );
});
