"use client";

import { useRef, useEffect } from "react";
import gsap from "gsap";

interface PixelButtonProps {
  children: React.ReactNode;
  href?: string;
  onClick?: () => void;
  variant?: "primary" | "secondary";
  className?: string;
  type?: "button" | "submit" | "reset";
}

export default function PixelButton({
  children,
  href,
  onClick,
  variant = "primary",
  className = "",
  type = "button",
}: PixelButtonProps) {
  const btnRef = useRef<HTMLAnchorElement & HTMLButtonElement>(null);

  useEffect(() => {
    const btn = btnRef.current;
    if (!btn) return;

    const onEnter = () => {
      gsap.to(btn, { y: -3, scale: 1.03, duration: 0.3, ease: "back.out(2)" });
      spawnParticles(btn);
    };
    const onLeave = () => {
      gsap.to(btn, { y: 0, scale: 1, duration: 0.3, ease: "power2.out" });
    };

    btn.addEventListener("mouseenter", onEnter);
    btn.addEventListener("mouseleave", onLeave);
    return () => {
      btn.removeEventListener("mouseenter", onEnter);
      btn.removeEventListener("mouseleave", onLeave);
    };
  }, []);

  const baseStyles =
    "relative inline-flex items-center justify-center px-6 py-3 font-pixel text-[9px] tracking-wider transition-colors sm:text-[10px] sm:px-8 sm:py-4";
  const variants = {
    primary:
      "bg-purple-600/80 text-white border-2 border-purple-500/50 hover:bg-purple-500/90 glow-purple",
    secondary:
      "bg-transparent text-cyan-400 border-2 border-cyan-500/40 hover:border-cyan-400/70 hover:bg-cyan-500/10",
  };

  const handleClick = (e: React.MouseEvent) => {
    if (href?.startsWith("#")) {
      e.preventDefault();
      document.querySelector(href)?.scrollIntoView({ behavior: "smooth" });
    }
    onClick?.();
  };

  if (href) {
    return (
      <a
        ref={btnRef}
        href={href}
        onClick={handleClick}
        className={`${baseStyles} ${variants[variant]} ${className}`}
      >
        {children}
      </a>
    );
  }

  return (
    <button
      ref={btnRef}
      type={type}
      onClick={onClick}
      className={`${baseStyles} ${variants[variant]} ${className}`}
    >
      {children}
    </button>
  );
}

function spawnParticles(el: HTMLElement) {
  const rect = el.getBoundingClientRect();
  for (let i = 0; i < 6; i++) {
    const p = document.createElement("div");
    p.className = "pointer-events-none fixed z-[9999] h-1 w-1 bg-cyan-400";
    p.style.left = `${rect.left + rect.width / 2}px`;
    p.style.top = `${rect.top + rect.height / 2}px`;
    document.body.appendChild(p);

    gsap.to(p, {
      x: (Math.random() - 0.5) * 60,
      y: (Math.random() - 0.5) * 60 - 20,
      opacity: 0,
      duration: 0.6,
      ease: "power2.out",
      onComplete: () => p.remove(),
    });
  }
}
