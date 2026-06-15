"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { ArrowRight, ChevronDown, Menu, Search, X } from "lucide-react";
import { MegaMenuDesktop, MegaMenuMobile } from "@/components/MegaMenu";
import PWAInstallButton from "@/components/PWAInstallButton";
import { ToolsSearch } from "@/components/ToolsSearch";
import { useCurrency } from "@/lib/currency-context";

function CurrencyToggle({ className = "" }: { className?: string }) {
  const { currency, setCurrency } = useCurrency();

  return (
    <div
      className={`flex items-center gap-0.5 rounded-lg border border-surface-border bg-surface-card p-0.5 ${className}`}
    >
      <button
        type="button"
        onClick={() => setCurrency("INR")}
        className={`rounded-md px-2.5 py-1 text-xs font-semibold transition-all ${
          currency === "INR"
            ? "bg-surface-elevated text-content-primary"
            : "text-content-muted hover:text-content-secondary"
        }`}
      >
        ₹ INR
      </button>
      <button
        type="button"
        onClick={() => setCurrency("USD")}
        className={`rounded-md px-2.5 py-1 text-xs font-semibold transition-all ${
          currency === "USD"
            ? "bg-surface-elevated text-content-primary"
            : "text-content-muted hover:text-content-secondary"
        }`}
      >
        $ USD
      </button>
    </div>
  );
}

export function Header() {
  const pathname = usePathname();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const menuRef = useRef<HTMLDivElement>(null);
  const timeoutRef = useRef<NodeJS.Timeout | null>(null);

  const handleMouseEnter = () => {
    if (timeoutRef.current) clearTimeout(timeoutRef.current);
    setIsMenuOpen(true);
  };

  const handleMouseLeave = () => {
    timeoutRef.current = setTimeout(() => {
      setIsMenuOpen(false);
    }, 150);
  };

  const closeMenus = () => {
    setIsMenuOpen(false);
    setIsMobileMenuOpen(false);
    setIsSearchOpen(false);
  };

  useEffect(() => {
    closeMenus();
  }, [pathname]);

  useEffect(() => {
    return () => {
      if (timeoutRef.current) clearTimeout(timeoutRef.current);
    };
  }, []);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 0);
    };

    handleScroll();
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        if (isSearchOpen) {
          setIsSearchOpen(false);
          return;
        }
        closeMenus();
      }
    };

    document.addEventListener("keydown", handleKeyDown);
    return () => document.removeEventListener("keydown", handleKeyDown);
  }, [isSearchOpen]);

  useEffect(() => {
    if (!isMenuOpen) return;

    const previousOverflowX = document.body.style.overflowX;
    document.body.style.overflowX = "hidden";

    const handleMouseDown = (event: MouseEvent) => {
      if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
        setIsMenuOpen(false);
      }
    };

    document.addEventListener("mousedown", handleMouseDown);
    return () => {
      document.body.style.overflowX = previousOverflowX;
      document.removeEventListener("mousedown", handleMouseDown);
    };
  }, [isMenuOpen]);

  return (
    <>
      <header
        className={`fixed left-0 right-0 top-0 z-50 h-16 border-b backdrop-blur-md transition-colors ${
          isScrolled
            ? "border-surface-border bg-surface-base/90"
            : "border-transparent bg-surface-base/85"
        }`}
      >
        <div className="mx-auto flex h-full max-w-6xl items-center justify-between px-4 sm:px-10">
          <div className="flex items-center gap-3">
            <Link
              href="/"
              className="cursor-pointer"
              aria-label="WorkUtilities home"
            >
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

          <nav
            className="hidden items-center gap-4 md:flex"
            role="navigation"
            aria-label="Main navigation"
          >
            <div
              ref={menuRef}
              className="relative"
              onMouseEnter={handleMouseEnter}
              onMouseLeave={handleMouseLeave}
            >
              <button
                type="button"
                className="flex cursor-pointer items-center gap-1 text-sm text-content-secondary transition-colors hover:text-content-primary"
                aria-expanded={isMenuOpen}
                aria-haspopup="true"
                aria-label="Browse tools"
                onClick={() => setIsMenuOpen((open) => !open)}
              >
                Tools
                <ChevronDown
                  className={`h-4 w-4 transition-transform ${isMenuOpen ? "rotate-180" : ""}`}
                />
              </button>

              {isMenuOpen && (
                <div
                  onMouseEnter={handleMouseEnter}
                  onMouseLeave={handleMouseLeave}
                  className="fixed left-0 right-0 top-16 z-50 max-w-[100vw] overflow-x-hidden px-4 pt-2 sm:px-6 lg:px-8 xl:px-10"
                >
                  <div className="mx-auto w-full max-w-[900px]">
                    <MegaMenuDesktop onNavigate={() => setIsMenuOpen(false)} />
                  </div>
                </div>
              )}
            </div>

            <button
              type="button"
              onClick={() => setIsSearchOpen(true)}
              className="rounded-lg p-2 text-content-secondary transition-colors hover:bg-surface-elevated hover:text-content-primary"
              aria-label="Search tools"
            >
              <Search className="h-[18px] w-[18px]" />
            </button>

            <CurrencyToggle className="hidden md:flex" />

            <Link
              href="/blog"
              className="cursor-pointer text-sm text-content-secondary transition-colors hover:text-content-primary"
              aria-label="Guides and blog"
            >
              Guides
            </Link>

            <PWAInstallButton />
          </nav>

          <div className="flex items-center gap-2 md:hidden">
            <button
              type="button"
              onClick={() => setIsSearchOpen(true)}
              className="rounded-lg p-2 text-content-primary"
              aria-label="Search tools"
            >
              <Search className="h-5 w-5" />
            </button>
            <button
              type="button"
              className="cursor-pointer"
              aria-label={isMobileMenuOpen ? "Close menu" : "Open menu"}
              aria-expanded={isMobileMenuOpen}
              onClick={() => setIsMobileMenuOpen((open) => !open)}
            >
              <Menu className="h-6 w-6 text-content-primary" />
            </button>
          </div>
        </div>
      </header>

      <div className="h-16 shrink-0" aria-hidden="true" />

      <ToolsSearch isOpen={isSearchOpen} onClose={() => setIsSearchOpen(false)} />

      {isMobileMenuOpen && (
        <div className="fixed inset-0 z-[55] overflow-y-auto bg-surface-base md:hidden">
          <div className="flex items-center justify-between border-b border-surface-border p-4">
            <Link
              href="/"
              aria-label="WorkUtilities home"
              onClick={closeMenus}
            >
              <Image
                src="/logo-light.svg"
                alt="WorkUtilities"
                width={120}
                height={32}
                className="max-h-8 w-auto"
              />
            </Link>
            <button
              type="button"
              className="cursor-pointer"
              aria-label="Close menu"
              onClick={() => setIsMobileMenuOpen(false)}
            >
              <X className="h-6 w-6 text-content-primary" />
            </button>
          </div>

          <div className="p-4">
            <MegaMenuMobile onNavigate={closeMenus} />

            <div className="mt-4 space-y-2 border-t border-surface-border pt-4">
              <CurrencyToggle className="w-full justify-center" />

              <Link
                href="/blog"
                className="flex cursor-pointer items-center justify-between rounded-xl px-3 py-3 text-sm font-medium text-content-primary transition-colors hover:bg-surface-elevated"
                onClick={closeMenus}
              >
                Guides
                <ArrowRight className="h-4 w-4 text-content-muted" />
              </Link>
              <Link
                href="/tools"
                className="flex cursor-pointer items-center justify-between rounded-xl px-3 py-3 text-sm font-medium text-brand-blue transition-colors hover:bg-surface-elevated"
                onClick={closeMenus}
              >
                All Tools
                <ArrowRight className="h-4 w-4" />
              </Link>

              <div className="pt-2">
                <PWAInstallButton className="w-full justify-center" />
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
