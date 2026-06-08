import Image from "next/image";
import Link from "next/link";

export function Header() {
  return (
    <header className="sticky top-0 z-50 h-14 border-b border-surface-border bg-surface-base/85 backdrop-blur-md md:h-16">
      <div className="mx-auto flex h-full max-w-6xl items-center px-4 sm:px-10">
        <div className="flex items-center gap-3">
          <Link href="/" className="cursor-pointer">
            <Image
              src="/logo-light.svg"
              alt="WorkUtilities"
              width={120}
              height={32}
              className="max-h-8 w-auto"
              priority
            />
          </Link>
          <span
            className="hidden text-[13px] md:inline"
            style={{ color: "#1F2D45" }}
          >
            |
          </span>
          <span className="hidden text-sm text-content-secondary md:block">
            Your everyday productivity workspace
          </span>
        </div>
      </div>
    </header>
  );
}
