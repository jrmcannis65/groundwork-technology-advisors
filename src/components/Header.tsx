"use client";

import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { useState, useEffect } from "react";

const navLinks = [
  { href: "/", label: "Home" },
  { href: "/services/", label: "Services" },
  { href: "/how-we-work/", label: "How we work" },
  { href: "/about/", label: "About" },
  { href: "/perspectives/", label: "Perspectives" },
  { href: "/contact/", label: "Contact" },
  { href: "/diagnostic/", label: "Diagnostic" },
];

export default function Header() {
  const pathname = usePathname();
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    setMenuOpen(false);
  }, [pathname]);

  const isActive = (href: string) => {
    if (href === "/") return pathname === "/" || pathname === "";
    return pathname.startsWith(href.replace(/\/$/, ""));
  };

  return (
    <header
      style={{
        backgroundColor: "var(--color-navy)",
        borderBottom: "1.5px solid var(--color-blue)",
      }}
      className="sticky top-0 z-50"
    >
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link href="/" className="flex items-center">
            <Image
              src="/gta_logo_reversed.svg"
              alt="Groundwork Technology Advisors"
              width={260}
              height={40}
              priority
            />
          </Link>

          {/* Desktop nav */}
          <nav className="hidden md:flex items-center gap-1">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className={`nav-link ${isActive(link.href) ? "nav-link-active" : ""}`}
              >
                {link.label}
              </Link>
            ))}
            <Link
              href="/scorecard/"
              className="nav-scorecard-btn"
              style={{ marginLeft: "8px" }}
            >
              Scorecard
            </Link>
          </nav>

          {/* Mobile hamburger */}
          <button
            type="button"
            onClick={() => setMenuOpen(!menuOpen)}
            className="md:hidden p-2 rounded transition-colors"
            style={{ color: "rgba(255,255,255,0.8)" }}
            aria-label="Toggle navigation menu"
            aria-expanded={menuOpen}
          >
            {menuOpen ? (
              <svg className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" d="M6 18 18 6M6 6l12 12" />
              </svg>
            ) : (
              <svg className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5" />
              </svg>
            )}
          </button>
        </div>
      </div>

      {/* Mobile menu */}
      {menuOpen && (
        <div
          style={{ borderTop: "1px solid rgba(255,255,255,0.1)", backgroundColor: "var(--color-navy)" }}
          className="md:hidden"
        >
          <nav className="max-w-6xl mx-auto px-4 py-2 flex flex-col gap-1">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className={`nav-link ${isActive(link.href) ? "nav-link-active" : ""}`}
              >
                {link.label}
              </Link>
            ))}
            <Link href="/scorecard/" className="nav-link" style={{ color: "var(--color-ltblue)" }}>
              Scorecard
            </Link>
          </nav>
        </div>
      )}
    </header>
  );
}
