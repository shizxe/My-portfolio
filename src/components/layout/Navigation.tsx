"use client";

import { useEffect, useRef, useState } from "react";
import gsap from "gsap";
import { navLinks } from "@/lib/data";

export default function Navigation() {
  const navRef = useRef<HTMLElement>(null);
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 80);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    if (!navRef.current) return;
    gsap.fromTo(
      navRef.current,
      { y: -80, opacity: 0 },
      { y: 0, opacity: 1, duration: 1, delay: 0.5, ease: "power3.out" }
    );
  }, []);

  const handleNavClick = (href: string) => {
    setMenuOpen(false);
    const el = document.querySelector(href);
    el?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <nav
      ref={navRef}
      className={`fixed left-0 right-0 top-0 z-50 transition-all duration-500 ${
        scrolled
          ? "border-b border-purple-600/20 bg-navy-950/80 py-3 backdrop-blur-xl"
          : "bg-transparent py-5"
      }`}
      role="navigation"
      aria-label="Main navigation"
    >
      <div className="mx-auto flex max-w-7xl items-center justify-between px-6">
        <a
          href="#hero"
          className="font-pixel text-[10px] tracking-wider text-gold-400 transition-colors hover:text-cyan-400 sm:text-xs"
          onClick={(e) => {
            e.preventDefault();
            handleNavClick("#hero");
          }}
        >
          THI.HA
        </a>

        <ul className="hidden items-center gap-8 md:flex">
          {navLinks.map((link) => (
            <li key={link.href}>
              <button
                onClick={() => handleNavClick(link.href)}
                className="group relative font-body text-sm text-gray-400 transition-colors hover:text-cyan-400"
              >
                {link.label}
                <span className="absolute -bottom-1 left-0 h-[2px] w-0 bg-cyan-500 transition-all duration-300 group-hover:w-full" />
              </button>
            </li>
          ))}
        </ul>

        <button
          className="font-pixel text-[8px] text-purple-500 md:hidden"
          onClick={() => setMenuOpen(!menuOpen)}
          aria-expanded={menuOpen}
          aria-label="Toggle menu"
        >
          {menuOpen ? "CLOSE" : "MENU"}
        </button>
      </div>

      {menuOpen && (
        <div className="border-t border-purple-600/20 bg-navy-950/95 px-6 py-4 backdrop-blur-xl md:hidden">
          <ul className="flex flex-col gap-4">
            {navLinks.map((link) => (
              <li key={link.href}>
                <button
                  onClick={() => handleNavClick(link.href)}
                  className="font-body text-sm text-gray-300 hover:text-cyan-400"
                >
                  {link.label}
                </button>
              </li>
            ))}
          </ul>
        </div>
      )}
    </nav>
  );
}
