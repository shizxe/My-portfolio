"use client";

import { useRef, useEffect } from "react";
import gsap from "gsap";
import PixelBackground from "./PixelBackground";
import PixelCharacter from "./PixelCharacter";
import DragonFlyby from "./DragonFlyby";
import WordCycle from "./WordCycle";
import PixelButton from "@/components/ui/PixelButton";
import PixelParticles from "@/components/ui/PixelParticles";

export default function HeroSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const headlineRef = useRef<HTMLHeadingElement>(null);
  const subRef = useRef<HTMLParagraphElement>(null);
  const ctaRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const tl = gsap.timeline({ delay: 0.3 });

    if (headlineRef.current) {
      const chars = headlineRef.current.querySelectorAll(".char");
      tl.fromTo(
        chars,
        { y: 60, opacity: 0, rotateX: -40 },
        {
          y: 0,
          opacity: 1,
          rotateX: 0,
          duration: 0.8,
          stagger: 0.04,
          ease: "power4.out",
        }
      );
    }

    if (subRef.current) {
      tl.fromTo(
        subRef.current,
        { y: 30, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.8, ease: "power3.out" },
        "-=0.3"
      );
    }

    if (ctaRef.current) {
      tl.fromTo(
        ctaRef.current.children,
        { y: 20, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 0.6,
          stagger: 0.15,
          ease: "back.out(1.7)",
        },
        "-=0.2"
      );
    }
  }, []);

  const headline = "Hi, I'm Thi Ha";

  return (
    <section
      id="hero"
      ref={sectionRef}
      className="relative flex min-h-screen items-center overflow-hidden"
      aria-label="Hero section"
    >
      {/* <PixelBackground /> */}
      <PixelParticles count={25} />
      {/* <DragonFlyby /> */}

      <div className="relative z-10 mx-auto flex w-full max-w-7xl flex-col items-center gap-8 px-6 pt-24 lg:flex-row lg:gap-16 lg:pt-0">
        <div className="flex-1 text-center lg:text-left">
          <p className="mb-4 font-pixel text-[9px] tracking-[0.3em] text-purple-500 sm:text-[10px]">
            ▶ NEW GAME
          </p>

          <h1
            ref={headlineRef}
            className="mb-4 font-pixel text-2xl leading-relaxed text-white sm:text-3xl md:text-4xl lg:text-5xl"
          >
            {headline.split("").map((char, i) => (
              <span
                key={i}
                className="char inline-block"
                style={{ perspective: "600px" }}
              >
                {char === " " ? "\u00A0" : char}
              </span>
            ))}
          </h1>

          <p
            ref={subRef}
            className="mb-2 font-body text-lg text-gray-400 sm:text-xl"
          >
            I don&apos;t only write code.
          </p>
          <p className="mb-8 font-body text-lg text-gray-300 sm:text-xl">
            I&apos;m a <WordCycle />
          </p>

          <div
            ref={ctaRef}
            className="flex flex-col items-center gap-4 sm:flex-row lg:justify-start"
          >
            <PixelButton href="#beginning" variant="primary">
              Start the Adventure
            </PixelButton>
            <PixelButton href="#quests" variant="secondary">
              View My Quests
            </PixelButton>
          </div>
        </div>

        {/* <div className="flex-shrink-0">
          <PixelCharacter />
        </div> */}
      </div>

      {/* Scroll indicator */}
      <div className="absolute bottom-8 left-1/2 z-10 -translate-x-1/2 animate-float">
        <div className="flex flex-col items-center gap-2">
          <span className="font-pixel text-[7px] tracking-widest text-purple-500/60">
            SCROLL
          </span>
          <div className="h-8 w-[2px] bg-gradient-to-b from-purple-500/60 to-transparent" />
        </div>
      </div>
    </section>
  );
}
