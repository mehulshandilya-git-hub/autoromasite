"use client";

import { useState, useEffect } from "react";
import { FiSearch, FiUser, FiShoppingBag, FiMenu, FiX } from "react-icons/fi";

const NAV_LINKS = [
  { label: "Home", href: "#" },
  { label: "Collections", href: "#featured" },
  { label: "Shop by Design", href: "#shop-by-design" },
  { label: "About", href: "#story" },
  { label: "Contact", href: "#footer" },
];

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <header
      className={`sticky top-0 z-[60] transition-all duration-300 ${
        scrolled
          ? "bg-ink/95 backdrop-blur-md border-b border-white/10"
          : "bg-transparent"
      }`}
    >
      <div className="mx-auto flex h-16 items-center justify-between px-6 md:px-12 lg:px-24">
        {/* Logo */}
        <a href="#" className="inline-flex items-center gap-0.5 shrink-0">
          <span
            className="text-xl md:text-2xl tracking-[0.2em] uppercase"
            style={{ fontFamily: "var(--font-montserrat)", fontWeight: 300 }}
          >
            <span className="text-red" style={{ fontWeight: 400 }}>Auto</span>
            <span className="text-white">Roma</span>
          </span>
        </a>

        {/* Desktop nav */}
        <nav className="hidden md:flex items-center gap-1">
          {NAV_LINKS.map((link) => (
            <a
              key={link.label}
              href={link.href}
              className="px-4 py-2 text-[1.3rem] tracking-[0.02em] text-white/70 hover:text-white transition-colors font-sans"
            >
              {link.label}
            </a>
          ))}
        </nav>

        {/* Right icons */}
        <div className="flex items-center gap-3 md:gap-4">
          <button className="text-white/70 hover:text-white transition-colors" aria-label="Search">
            <FiSearch className="w-5 h-5" strokeWidth={1.5} />
          </button>
          <button className="text-white/70 hover:text-white transition-colors hidden sm:block" aria-label="Account">
            <FiUser className="w-5 h-5" strokeWidth={1.5} />
          </button>
          <button className="text-white/70 hover:text-white transition-colors relative" aria-label="Cart">
            <FiShoppingBag className="w-5 h-5" strokeWidth={1.5} />
            <span className="absolute -top-1.5 -right-1.5 w-4 h-4 rounded-full bg-red text-[9px] font-medium flex items-center justify-center text-ink">
              0
            </span>
          </button>

          {/* Mobile hamburger */}
          <button
            className="md:hidden text-white/70 hover:text-white transition-colors ml-2"
            onClick={() => setMobileOpen(!mobileOpen)}
            aria-label="Menu"
          >
            {mobileOpen ? <FiX className="w-5 h-5" /> : <FiMenu className="w-5 h-5" />}
          </button>
        </div>
      </div>

      {/* Mobile nav */}
      {mobileOpen && (
        <div className="md:hidden absolute top-16 left-0 right-0 bg-ink/98 backdrop-blur-md border-b border-white/10">
          <nav className="flex flex-col px-6 py-6 gap-1">
            {NAV_LINKS.map((link) => (
              <a
                key={link.label}
                href={link.href}
                className="px-4 py-3 text-[1.3rem] text-white/70 hover:text-white transition-colors"
                onClick={() => setMobileOpen(false)}
              >
                {link.label}
              </a>
            ))}
          </nav>
        </div>
      )}
    </header>
  );
}
