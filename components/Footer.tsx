import Image from "next/image";
import Link from "next/link";

export function Footer() {
  return (
    <footer className="border-t border-surface-border bg-surface-base">
      <div className="mx-auto max-w-6xl px-4 py-6 sm:px-10">
        <div className="mb-4 flex flex-col items-center gap-4 sm:flex-row sm:justify-between">
          <Link href="/" className="cursor-pointer">
            <Image
              src="/logo-light.svg"
              alt="WorkUtilities"
              width={24}
              height={24}
              className="h-6 w-auto"
            />
          </Link>
          <nav className="flex flex-wrap items-center justify-center gap-5 text-sm">
            <Link
              href="/about"
              className="text-[#8B9ABB] transition-colors hover:text-content-primary"
            >
              About
            </Link>
            <Link
              href="/privacy"
              className="text-[#8B9ABB] transition-colors hover:text-content-primary"
            >
              Privacy
            </Link>
            <Link
              href="/contact"
              className="text-[#8B9ABB] transition-colors hover:text-content-primary"
            >
              Contact
            </Link>
          </nav>
        </div>
        <p className="text-center text-xs text-content-secondary">
          © 2026 WorkUtilities.com — Free tools, always.
        </p>
      </div>
    </footer>
  );
}
