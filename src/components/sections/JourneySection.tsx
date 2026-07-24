"use client";

import { useRef, useEffect, useState } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import SectionWrapper from "@/components/ui/SectionWrapper";
import TextReveal from "@/components/ui/TextReveal";
import PixelParticles from "@/components/ui/PixelParticles";
import { journeyCheckpoints } from "@/lib/data";

gsap.registerPlugin(ScrollTrigger);

export default function JourneySection() {
  const mapRef = useRef<HTMLDivElement>(null);
  const pathRef = useRef<SVGPathElement>(null);
  const [activeCheckpoint, setActiveCheckpoint] = useState(journeyCheckpoints[0]);

  useEffect(() => {
    const path = pathRef.current;
    if (!path) return;

    const length = path.getTotalLength();
    path.style.strokeDasharray = `${length}`;
    path.style.strokeDashoffset = `${length}`;

    gsap.to(path, {
      strokeDashoffset: 0,
      duration: 2.5,
      ease: "power2.inOut",
      scrollTrigger: {
        trigger: mapRef.current,
        start: "top 70%",
      },
    });

    const markers = mapRef.current?.querySelectorAll(".checkpoint-marker");
    markers?.forEach((marker, i) => {
      gsap.fromTo(
        marker,
        { scale: 0, opacity: 0 },
        {
          scale: 1,
          opacity: 1,
          duration: 0.5,
          delay: 0.3 + i * 0.2,
          ease: "back.out(2)",
          scrollTrigger: {
            trigger: mapRef.current,
            start: "top 70%",
          },
        }
      );
    });
  }, []);

  const pathD = journeyCheckpoints.reduce((acc, cp, i) => {
    const x = cp.x;
    const y = cp.y;
    if (i === 0) return `M ${x} ${y}`;
    const prev = journeyCheckpoints[i - 1];
    const cpx = (prev.x + x) / 2;
    return `${acc} Q ${cpx} ${prev.y - 10} ${x} ${y}`;
  }, "");

  return (
    <SectionWrapper id="journey" className="bg-navy-900">
      <PixelParticles count={12} />

      <div className="relative mx-auto max-w-7xl px-6">
        <div className="mb-4 font-pixel text-[9px] tracking-[0.3em] text-purple-500">
          LEVEL 04 — WORLD MAP
        </div>

        <TextReveal
          as="h2"
          id="journey-heading"
          className="mb-4 font-pixel text-xl text-white sm:text-2xl md:text-3xl"
        >
          The Journey
        </TextReveal>

        <p className="mb-12 max-w-2xl font-body text-gray-400">
          Every checkpoint marks a chapter in my adventure — from first steps to
          full-stack mastery across the complete software lifecycle.
        </p>

        <div className="grid gap-8 lg:grid-cols-5">
          {/* Adventure map */}
          <div
            ref={mapRef}
            className="relative aspect-[16/10] overflow-hidden rounded-xl border-2 border-purple-600/20 bg-navy-950 lg:col-span-3"
          >
            {/* Map background */}
            <div
              className="absolute inset-0 opacity-30"
              style={{
                backgroundImage: `
                  radial-gradient(circle at 20% 80%, rgba(74,140,92,0.15) 0%, transparent 50%),
                  radial-gradient(circle at 80% 20%, rgba(139,107,184,0.1) 0%, transparent 50%)
                `,
              }}
            />

            <svg viewBox="0 0 100 100" className="absolute inset-0 h-full w-full" preserveAspectRatio="none">
              <path
                ref={pathRef}
                d={pathD}
                fill="none"
                stroke="rgba(139,107,184,0.4)"
                strokeWidth="0.5"
                strokeDasharray="2 1"
              />
            </svg>

            {journeyCheckpoints.map((cp, i) => (
              <button
                key={cp.id}
                className={`checkpoint-marker absolute z-10 -translate-x-1/2 -translate-y-1/2 transition-transform hover:scale-125 ${
                  activeCheckpoint.id === cp.id ? "scale-125" : ""
                }`}
                style={{ left: `${cp.x}%`, top: `${cp.y}%` }}
                onClick={() => setActiveCheckpoint(cp)}
                aria-label={`Checkpoint: ${cp.title}`}
              >
                <div
                  className={`flex h-8 w-8 items-center justify-center rounded-full border-2 font-pixel text-[7px] sm:h-10 sm:w-10 sm:text-[8px] ${
                    activeCheckpoint.id === cp.id
                      ? "border-cyan-400 bg-cyan-500/20 text-cyan-400 glow-cyan"
                      : "border-purple-500/50 bg-navy-800 text-purple-400"
                  }`}
                >
                  {i + 1}
                </div>
              </button>
            ))}
          </div>

          {/* Checkpoint detail */}
          <div className="pixel-border rounded-xl bg-navy-800/50 p-6 lg:col-span-2">
            <div className="mb-2 font-pixel text-[8px] text-gold-400">
              CHECKPOINT {journeyCheckpoints.indexOf(activeCheckpoint) + 1}
            </div>
            <div className="mb-1 font-pixel text-lg text-cyan-400">{activeCheckpoint.year}</div>
            <h3 className="mb-1 font-pixel text-[11px] text-white">{activeCheckpoint.title}</h3>
            <p className="mb-1 font-body text-sm text-purple-400">{activeCheckpoint.role}</p>
            <p className="mb-4 font-body text-sm leading-relaxed text-gray-400">
              {activeCheckpoint.description}
            </p>
            <div className="space-y-2">
              <div className="font-pixel text-[7px] text-grass-400">ACHIEVEMENTS UNLOCKED</div>
              {activeCheckpoint.achievements.map((a) => (
                <div key={a} className="flex items-center gap-2 font-body text-xs text-gray-300">
                  <span className="text-gold-400">★</span> {a}
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </SectionWrapper>
  );
}
