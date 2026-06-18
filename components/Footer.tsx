import Image from "next/image";
import Link from "next/link";

export function Footer() {
  return (
    <footer
      className="border-t border-surface-border bg-surface-base"
      aria-label="Site footer"
    >
      <div className="mx-auto max-w-6xl px-4 py-6 sm:px-10">
        <div className="mb-4 flex flex-col items-center gap-4 sm:flex-row sm:justify-between">
          <Link
            href="/"
            className="cursor-pointer"
            aria-label="WorkUtilities home"
          >
            <Image
              src="/logo-light.svg"
              alt="WorkUtilities"
              width={24}
              height={24}
              className="h-6 w-auto"
            />
          </Link>
          <nav
            className="flex flex-wrap items-center justify-center gap-5 text-sm"
            aria-label="Footer navigation"
          >
            <Link
              href="/blog"
              className="cursor-pointer text-[#8B9ABB] transition-colors hover:text-content-primary"
              aria-label="Blog"
            >
              Blog
            </Link>
            <Link
              href="/about"
              className="cursor-pointer text-[#8B9ABB] transition-colors hover:text-content-primary"
              aria-label="About"
            >
              About
            </Link>
            <Link
              href="/privacy"
              className="cursor-pointer text-[#8B9ABB] transition-colors hover:text-content-primary"
              aria-label="Privacy Policy"
            >
              Privacy
            </Link>
            <Link
              href="/terms"
              className="cursor-pointer text-[#8B9ABB] transition-colors hover:text-content-primary"
              aria-label="Terms and Conditions"
            >
              Terms
            </Link>
            <Link
              href="/contact"
              className="cursor-pointer text-[#8B9ABB] transition-colors hover:text-content-primary"
              aria-label="Contact"
            >
              Contact
            </Link>
          </nav>
        </div>
        <p className="text-center text-xs text-content-secondary">
          © 2026 WorkUtilities.com — Free tools, always.
        </p>
        <p className="mt-1 text-center text-xs text-content-secondary">
          Also by us:{" "}
          <a
            href="https://workprompts.in"
            target="_blank"
            rel="noopener noreferrer"
            className="text-[#8B9ABB] transition-colors hover:text-content-primary"
          >
            WorkPrompts — AI Prompt Directory →
          </a>
        </p>
      </div>
    </footer>
  );
}
