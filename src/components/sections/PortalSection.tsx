"use client";

import { useRef, useEffect, useState, FormEvent } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import SectionWrapper from "@/components/ui/SectionWrapper";
import TextReveal from "@/components/ui/TextReveal";
import PixelButton from "@/components/ui/PixelButton";

gsap.registerPlugin(ScrollTrigger);

export default function PortalSection() {
  const portalRef = useRef<HTMLDivElement>(null);
  const formRef = useRef<HTMLFormElement>(null);
  const [portalOpen, setPortalOpen] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  useEffect(() => {
    const portal = portalRef.current;
    if (!portal) return;

    ScrollTrigger.create({
      trigger: portal,
      start: "top 70%",
      onEnter: () => {
        setPortalOpen(true);
        gsap.fromTo(
          ".portal-ring",
          { scale: 0, opacity: 0, rotation: -180 },
          { scale: 1, opacity: 1, rotation: 0, duration: 1.5, ease: "power3.out" }
        );
        gsap.fromTo(
          ".portal-particle",
          { scale: 0, opacity: 0 },
          {
            scale: 1,
            opacity: 1,
            duration: 0.6,
            stagger: 0.05,
            delay: 0.5,
            ease: "back.out(2)",
          }
        );
        if (formRef.current) {
          gsap.fromTo(
            formRef.current,
            { y: 30, opacity: 0 },
            { y: 0, opacity: 1, duration: 0.8, delay: 1, ease: "power3.out" }
          );
        }
      },
    });
  }, []);

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    setSubmitted(true);

    const form = formRef.current;
    if (form) {
      gsap.to(form, {
        scale: 0.95,
        opacity: 0,
        duration: 0.4,
        onComplete: () => {
          gsap.fromTo(
            ".success-message",
            { scale: 0.8, opacity: 0 },
            { scale: 1, opacity: 1, duration: 0.6, ease: "back.out(2)" }
          );
        },
      });
    }

    // Pixel explosion
    for (let i = 0; i < 20; i++) {
      const p = document.createElement("div");
      p.className = "pointer-events-none fixed z-[9999] h-2 w-2";
      p.style.background = i % 3 === 0 ? "#5ec4d4" : i % 3 === 1 ? "#8b6bb8" : "#d4a853";
      p.style.left = "50%";
      p.style.top = "50%";
      document.body.appendChild(p);

      gsap.to(p, {
        x: (Math.random() - 0.5) * 300,
        y: (Math.random() - 0.5) * 300,
        opacity: 0,
        rotation: Math.random() * 360,
        duration: 1 + Math.random(),
        ease: "power2.out",
        onComplete: () => p.remove(),
      });
    }
  };

  return (
    <SectionWrapper id="portal" className="bg-navy-950">
      <div ref={portalRef} className="relative mx-auto max-w-3xl px-6 text-center">
        <div className="mb-4 font-pixel text-[9px] tracking-[0.3em] text-gold-400">
          FINAL LEVEL — THE PORTAL
        </div>

        <TextReveal
          as="h2"
          id="portal-heading"
          className="mb-4 font-pixel text-xl text-white sm:text-2xl md:text-3xl"
        >
          The Final Portal
        </TextReveal>

        <p className="mb-12 font-body text-gray-400">
          Every adventure needs a destination. Step through the portal and let&apos;s
          start something legendary together.
        </p>

        {/* Portal visual */}
        <div className="relative mx-auto mb-12 flex h-48 w-48 items-center justify-center sm:h-56 sm:w-56">
          {/* Outer ring */}
          <div
            className="portal-ring absolute inset-0 rounded-full border-2 border-purple-500/30"
            style={{ animation: portalOpen ? "portal-spin 8s linear infinite" : "none" }}
          />
          <div
            className="portal-ring absolute inset-3 rounded-full border border-cyan-500/20"
            style={{ animation: portalOpen ? "portal-spin 6s linear infinite reverse" : "none" }}
          />
          <div
            className="portal-ring absolute inset-6 rounded-full border border-gold-400/15"
            style={{ animation: portalOpen ? "portal-pulse 3s ease-in-out infinite" : "none" }}
          />

          {/* Portal glow */}
          <div
            className="absolute inset-8 rounded-full"
            style={{
              background:
                "radial-gradient(circle, rgba(139,107,184,0.3) 0%, rgba(94,196,212,0.15) 50%, transparent 70%)",
              animation: portalOpen ? "portal-pulse 2s ease-in-out infinite" : "none",
            }}
          />

          {/* Particles around portal */}
          {Array.from({ length: 12 }).map((_, i) => (
            <div
              key={i}
              className="portal-particle absolute h-1.5 w-1.5 rounded-full bg-cyan-400"
              style={{
                transform: `rotate(${i * 30}deg) translateY(-90px)`,
                opacity: portalOpen ? 0.6 : 0,
              }}
            />
          ))}

          <span className="relative z-10 text-3xl">🌀</span>
        </div>

        {!submitted ? (
          <form
            ref={formRef}
            onSubmit={handleSubmit}
            className="mx-auto max-w-md space-y-4 opacity-0"
            aria-label="Contact form"
          >
            <div>
              <label htmlFor="name" className="mb-1 block text-left font-pixel text-[8px] text-gray-500">
                ADVENTURER NAME
              </label>
              <input
                id="name"
                name="name"
                type="text"
                required
                className="w-full rounded border-2 border-navy-700 bg-navy-800/50 px-4 py-3 font-body text-sm text-white outline-none transition-colors focus:border-purple-500/60"
                placeholder="Your name"
              />
            </div>
            <div>
              <label htmlFor="email" className="mb-1 block text-left font-pixel text-[8px] text-gray-500">
                SCROLL ADDRESS
              </label>
              <input
                id="email"
                name="email"
                type="email"
                required
                className="w-full rounded border-2 border-navy-700 bg-navy-800/50 px-4 py-3 font-body text-sm text-white outline-none transition-colors focus:border-purple-500/60"
                placeholder="your@email.com"
              />
            </div>
            <div>
              <label htmlFor="message" className="mb-1 block text-left font-pixel text-[8px] text-gray-500">
                YOUR QUEST
              </label>
              <textarea
                id="message"
                name="message"
                required
                rows={4}
                className="w-full resize-none rounded border-2 border-navy-700 bg-navy-800/50 px-4 py-3 font-body text-sm text-white outline-none transition-colors focus:border-purple-500/60"
                placeholder="Tell me about your project..."
              />
            </div>
            <PixelButton type="submit" variant="primary" className="w-full">
              Send Through Portal
            </PixelButton>
          </form>
        ) : (
          <div className="success-message mx-auto max-w-md rounded-xl border-2 border-grass-500/30 bg-grass-500/10 p-8">
            <span className="mb-4 block text-4xl">🏆</span>
            <h3 className="mb-2 font-pixel text-[10px] text-grass-400">QUEST ACCEPTED!</h3>
            <p className="font-body text-sm text-gray-300">
              Your message has traveled through the portal. I&apos;ll respond faster than a
              speed potion wears off.
            </p>
          </div>
        )}
      </div>
    </SectionWrapper>
  );
}

export function Footer() {
  return (
    <footer className="border-t border-purple-600/10 bg-navy-950 py-12" role="contentinfo">
      <div className="mx-auto max-w-7xl px-6 text-center">
        <p className="mb-4 font-pixel text-[9px] text-purple-500">
          ■ QUEST COMPLETE ■
        </p>
        <p className="mb-2 font-body text-sm text-gray-500">
          Built with Next.js, TypeScript, Tailwind CSS & GSAP
        </p>
        <p className="font-pixel text-[8px] text-gray-600">
          © {new Date().getFullYear()} THI HA — ALL RIGHTS RESERVED
        </p>
        <p className="mt-4 font-body text-xs text-gray-600">
          Thanks for completing this adventure. Game saved. ✨
        </p>
      </div>
    </footer>
  );
}
