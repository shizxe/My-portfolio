"use client";

import { useRef, useEffect } from "react";
import gsap from "gsap";

export default function PixelCharacter() {
  const charRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const char = charRef.current;
    if (!char) return;

    gsap.fromTo(
      char,
      { x: -60, opacity: 0 },
      { x: 0, opacity: 1, duration: 1.2, delay: 1, ease: "power3.out" }
    );

    gsap.to(char, {
      y: -8,
      duration: 2,
      repeat: -1,
      yoyo: true,
      ease: "sine.inOut",
      delay: 2,
    });
  }, []);

  return (
    <div ref={charRef} className="relative animate-float" aria-hidden="true">
      <svg
        width="80"
        height="96"
        viewBox="0 0 80 96"
        className="pixel-art drop-shadow-[0_0_20px_rgba(139,107,184,0.4)]"
      >
        {/* Shadow */}
        <ellipse cx="40" cy="92" rx="20" ry="4" fill="rgba(0,0,0,0.3)" />

        {/* Body */}
        <rect x="28" y="44" width="24" height="28" fill="#5ec4d4" />
        <rect x="30" y="46" width="20" height="4" fill="#7dd3e0" />

        {/* Belt */}
        <rect x="28" y="60" width="24" height="4" fill="#d4a853" />

        {/* Head */}
        <rect x="30" y="20" width="20" height="20" fill="#f0c674" />
        <rect x="32" y="22" width="16" height="4" fill="#f5d99a" />

        {/* Hair */}
        <rect x="28" y="16" width="24" height="8" fill="#4a3570" />
        <rect x="26" y="18" width="4" height="8" fill="#4a3570" />
        <rect x="50" y="18" width="4" height="8" fill="#4a3570" />

        {/* Eyes */}
        <rect x="34" y="28" width="4" height="4" fill="#0a0e1a" />
        <rect x="42" y="28" width="4" height="4" fill="#0a0e1a" />
        <rect x="35" y="28" width="2" height="2" fill="#fff" />
        <rect x="43" y="28" width="2" height="2" fill="#fff" />

        {/* Smile */}
        <rect x="36" y="34" width="2" height="2" fill="#0a0e1a" />
        <rect x="40" y="35" width="4" height="2" fill="#0a0e1a" />
        <rect x="44" y="34" width="2" height="2" fill="#0a0e1a" />

        {/* Arms */}
        <rect x="20" y="46" width="8" height="16" fill="#f0c674" />
        <rect x="52" y="46" width="8" height="16" fill="#f0c674" />

        {/* Legs */}
        <rect x="30" y="72" width="8" height="16" fill="#3a4560" />
        <rect x="42" y="72" width="8" height="16" fill="#3a4560" />
        <rect x="28" y="86" width="12" height="4" fill="#2a3050" />
        <rect x="40" y="86" width="12" height="4" fill="#2a3050" />

        {/* Sword */}
        <rect x="54" y="30" width="4" height="24" fill="#c0c8d0" />
        <rect x="52" y="52" width="8" height="4" fill="#d4a853" />
        <rect x="54" y="56" width="4" height="8" fill="#8b6bb8" />
        <rect x="55" y="28" width="2" height="4" fill="#5ec4d4" />
      </svg>

      {/* Level badge */}
      <div className="absolute -right-2 -top-2 flex h-8 w-8 items-center justify-center border-2 border-gold-500 bg-navy-900 font-pixel text-[7px] text-gold-400">
        Lv
        <br />
        99
      </div>
    </div>
  );
}
