"use client";

import { useRef, useEffect } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

export default function PixelBackground() {
  const bgRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const bg = bgRef.current;
    if (!bg) return;

    gsap.to(bg.querySelector(".clouds-layer"), {
      x: -30,
      duration: 20,
      repeat: -1,
      yoyo: true,
      ease: "sine.inOut",
    });

    gsap.to(bg.querySelector(".mountains-layer"), {
      y: -15,
      scrollTrigger: {
        trigger: bg,
        start: "top top",
        end: "bottom top",
        scrub: 1.5,
      },
    });

    gsap.to(bg.querySelector(".castle-layer"), {
      y: -25,
      scrollTrigger: {
        trigger: bg,
        start: "top top",
        end: "bottom top",
        scrub: 2,
      },
    });

    gsap.to(bg.querySelector(".stars-layer"), {
      opacity: 0.3,
      scrollTrigger: {
        trigger: bg,
        start: "top top",
        end: "50% top",
        scrub: true,
      },
    });
  }, []);

  return (
    <div ref={bgRef} className="absolute inset-0 overflow-hidden" aria-hidden="true">
      {/* Sky gradient */}
      <div
        className="absolute inset-0"
        style={{
          background:
            "linear-gradient(180deg, #060912 0%, #0a0e1a 30%, #111827 60%, #1a2235 100%)",
        }}
      />

      {/* Stars */}
      <div className="stars-layer absolute inset-0">
        {Array.from({ length: 60 }).map((_, i) => (
          <div
            key={i}
            className="absolute animate-twinkle rounded-full bg-white"
            style={{
              width: i % 5 === 0 ? 2 : 1,
              height: i % 5 === 0 ? 2 : 1,
              left: `${(i * 17 + 7) % 100}%`,
              top: `${(i * 13 + 3) % 45}%`,
              animationDelay: `${(i % 10) * 0.5}s`,
              opacity: 0.3 + (i % 3) * 0.2,
            }}
          />
        ))}
      </div>

      {/* Clouds */}
      <div className="clouds-layer absolute inset-x-0 top-[8%] h-[20%] opacity-40">
        <Cloud x="5%" y="10%" w={80} />
        <Cloud x="35%" y="30%" w={100} />
        <Cloud x="65%" y="5%" w={70} />
        <Cloud x="85%" y="25%" w={90} />
      </div>

      {/* Mountains */}
      <div className="mountains-layer absolute bottom-[25%] left-0 right-0 h-[35%]">
        <svg viewBox="0 0 1440 320" className="absolute bottom-0 w-[120%] -left-[10%]" preserveAspectRatio="none">
          <path
            d="M0,320 L0,200 L120,140 L240,200 L360,100 L480,180 L600,80 L720,160 L840,60 L960,140 L1080,90 L1200,170 L1320,110 L1440,180 L1440,320 Z"
            fill="#1a2235"
            opacity="0.7"
          />
          <path
            d="M0,320 L0,240 L200,180 L400,240 L600,150 L800,220 L1000,160 L1200,230 L1440,190 L1440,320 Z"
            fill="#111827"
            opacity="0.9"
          />
        </svg>
      </div>

      {/* Castle silhouette */}
      <div className="castle-layer absolute bottom-[28%] left-1/2 -translate-x-1/2 opacity-60">
        <svg width="120" height="100" viewBox="0 0 120 100" className="pixel-art">
          <rect x="40" y="40" width="40" height="60" fill="#2a2040" />
          <rect x="30" y="50" width="15" height="50" fill="#2a2040" />
          <rect x="75" y="50" width="15" height="50" fill="#2a2040" />
          <rect x="25" y="35" width="10" height="15" fill="#3a3050" />
          <rect x="40" y="25" width="10" height="25" fill="#3a3050" />
          <rect x="55" y="15" width="10" height="35" fill="#3a3050" />
          <rect x="70" y="25" width="10" height="25" fill="#3a3050" />
          <rect x="85" y="35" width="10" height="15" fill="#3a3050" />
          <rect x="52" y="65" width="16" height="20" fill="#1a1525" />
          <rect x="20" y="70" width="8" height="8" fill="#8b6bb8" opacity="0.6" />
          <rect x="92" y="70" width="8" height="8" fill="#8b6bb8" opacity="0.6" />
          <rect x="56" y="45" width="8" height="8" fill="#5ec4d4" opacity="0.5" />
        </svg>
      </div>

      {/* Grass ground */}
      <div
        className="absolute bottom-0 left-0 right-0 h-[25%]"
        style={{
          background: "linear-gradient(180deg, #1a2235 0%, #2a4030 40%, #3a5840 70%, #4a6848 100%)",
        }}
      >
        <div className="absolute inset-x-0 top-0 flex gap-1 px-2">
          {Array.from({ length: 80 }).map((_, i) => (
            <div
              key={i}
              className="h-2 w-1 bg-grass-500 opacity-60"
              style={{
                marginLeft: `${i % 3 === 0 ? 2 : 0}px`,
                height: `${4 + (i % 4) * 2}px`,
              }}
            />
          ))}
        </div>
      </div>
    </div>
  );
}

function Cloud({ x, y, w }: { x: string; y: string; w: number }) {
  return (
    <svg
      className="absolute pixel-art opacity-50"
      style={{ left: x, top: y, width: w }}
      viewBox="0 0 100 40"
    >
      <rect x="20" y="20" width="60" height="15" fill="#3a4560" rx="0" />
      <rect x="10" y="25" width="25" height="12" fill="#3a4560" />
      <rect x="65" y="25" width="25" height="12" fill="#3a4560" />
      <rect x="35" y="15" width="30" height="12" fill="#4a5570" />
    </svg>
  );
}
