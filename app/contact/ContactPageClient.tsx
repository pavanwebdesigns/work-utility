"use client";

import { FormEvent, useState } from "react";
import Link from "next/link";
import { Mail } from "lucide-react";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";

export default function ContactPageClient() {
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setSubmitted(true);
  };

  return (
    <div className="flex min-h-screen flex-col bg-surface-base">
      <Header />
      <main className="flex-1">
        <div className="mx-auto max-w-2xl px-4 py-8 sm:px-6 sm:py-12">
          <Link
            href="/"
            className="inline-flex items-center gap-1 text-sm text-content-secondary transition-colors hover:text-content-primary"
          >
            ← Home
          </Link>
          <h1 className="mt-8 text-2xl font-bold text-content-primary sm:text-3xl">
            Contact & Tool Requests
          </h1>
          <p className="mt-3 text-content-secondary">
            Have a question or want to suggest a new tool? We&apos;d love to
            hear from you.
          </p>

          <section className="mt-10">
            <h2 className="text-lg font-semibold text-content-primary">
              Request a New Tool
            </h2>
            <div className="mt-4 rounded-xl border border-surface-border bg-surface-card p-5 sm:p-6">
              {submitted ? (
                <p className="text-center text-content-secondary">
                  Thanks! We&apos;ll review your request.
                </p>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-4">
                  <div>
                    <label
                      htmlFor="tool-name"
                      className="mb-1 block text-sm text-content-secondary"
                    >
                      Tool name
                    </label>
                    <input
                      id="tool-name"
                      type="text"
                      required
                      placeholder="e.g. Excel to PDF"
                      className="w-full rounded-lg border border-surface-border bg-surface-elevated px-3 py-2 text-content-primary"
                    />
                  </div>
                  <div>
                    <label
                      htmlFor="use-case"
                      className="mb-1 block text-sm text-content-secondary"
                    >
                      Use case
                    </label>
                    <textarea
                      id="use-case"
                      rows={3}
                      placeholder="How would you use this tool?"
                      className="w-full rounded-lg border border-surface-border bg-surface-elevated px-3 py-2 text-content-primary"
                    />
                  </div>
                  <div>
                    <label
                      htmlFor="email"
                      className="mb-1 block text-sm text-content-secondary"
                    >
                      Email (optional)
                    </label>
                    <input
                      id="email"
                      type="email"
                      placeholder="your@email.com"
                      className="w-full rounded-lg border border-surface-border bg-surface-elevated px-3 py-2 text-content-primary"
                    />
                  </div>
                  <button
                    type="submit"
                    className="w-full rounded-xl bg-brand-blue px-4 py-3 font-semibold text-white transition-colors hover:bg-[#2563EB]"
                  >
                    Submit Request
                  </button>
                </form>
              )}
            </div>
          </section>

          <section className="mt-10">
            <h2 className="text-lg font-semibold text-content-primary">
              General Contact
            </h2>
            <div className="mt-4 flex items-center gap-3 rounded-xl border border-surface-border bg-surface-card p-5">
              <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-brand-blue/10">
                <Mail className="h-5 w-5 text-brand-blue" />
              </div>
              <a
                href="mailto:hello@workutilities.com"
                className="text-content-secondary transition-colors hover:text-content-primary"
              >
                hello@workutilities.com
              </a>
            </div>
          </section>
        </div>
      </main>
      <Footer />
    </div>
  );
}
