"use client";

import { useRef, useEffect } from "react";
import gsap from "gsap";

interface PixelParticlesProps {
  count?: number;
  className?: string;
}

export default function PixelParticles({ count = 30, className = "" }: PixelParticlesProps) {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    const particles: HTMLDivElement[] = [];

    for (let i = 0; i < count; i++) {
      const p = document.createElement("div");
      const size = Math.random() > 0.7 ? 3 : 2;
      p.className = "absolute rounded-sm";
      p.style.width = `${size}px`;
      p.style.height = `${size}px`;
      p.style.left = `${Math.random() * 100}%`;
      p.style.top = `${Math.random() * 100}%`;
      p.style.background =
        Math.random() > 0.5
          ? "rgba(94, 196, 212, 0.6)"
          : Math.random() > 0.5
            ? "rgba(139, 107, 184, 0.5)"
            : "rgba(212, 168, 83, 0.4)";
      p.style.opacity = `${0.2 + Math.random() * 0.6}`;
      container.appendChild(p);
      particles.push(p);

      gsap.to(p, {
        y: `-=${20 + Math.random() * 40}`,
        x: `+=${(Math.random() - 0.5) * 30}`,
        opacity: 0.1 + Math.random() * 0.5,
        duration: 3 + Math.random() * 4,
        repeat: -1,
        yoyo: true,
        ease: "sine.inOut",
        delay: Math.random() * 3,
      });
    }

    return () => particles.forEach((p) => p.remove());
  }, [count]);

  return (
    <div
      ref={containerRef}
      className={`pointer-events-none absolute inset-0 overflow-hidden ${className}`}
      aria-hidden="true"
    />
  );
}
