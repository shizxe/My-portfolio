"use client";

import { useRef, useEffect } from "react";
// import { useTranslations } from "next-intl";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { TextReveal } from "@/components/cinematic/TextReveal";
import { ParallaxLayer } from "@/components/cinematic/ParallaxLayer";
import { ChapterOverline } from "@/components/ui/ChapterOverline";
import { useReducedMotion } from "@/hooks/useReducedMotion";

gsap.registerPlugin(ScrollTrigger);

export function ChapterLearning() {
  // const t = useTranslations("learning");
  const sectionRef = useRef<HTMLElement>(null);
  const transformRef = useRef<HTMLDivElement>(null);
  const reducedMotion = useReducedMotion();

  useEffect(() => {
    const section = sectionRef.current;
    const transform = transformRef.current;
    if (!section || !transform || reducedMotion) return;

    const books = transform.querySelector("[data-books]");
    const code = transform.querySelector("[data-code]");
    const ideas = transform.querySelector("[data-ideas]");
    const apps = transform.querySelector("[data-apps]");

    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: section,
        start: "top top",
        end: "+=180%",
        pin: true,
        scrub: 1,
      },
    });

    tl.fromTo(
      books,
      { opacity: 1, scale: 1 },
      { opacity: 0, scale: 0.8, y: -40 },
      0
    )
      .fromTo(
        code,
        { opacity: 0, scale: 1.1 },
        { opacity: 1, scale: 1, y: 0 },
        0.2
      )
      .fromTo(ideas, { opacity: 1, x: 0 }, { opacity: 0, x: -60 }, 0.45)
      .fromTo(apps, { opacity: 0, x: 60 }, { opacity: 1, x: 0 }, 0.55);

    return () => {
      tl.scrollTrigger?.kill();
      tl.kill();
    };
  }, [reducedMotion]);

  return (
    <section
      ref={sectionRef}
      id="learning"
      className="relative min-h-screen bg-surface"
      aria-labelledby="learning-heading"
    >
      <ParallaxLayer
        speed={0.9}
        className="absolute -right-20 top-20 h-96 w-96 rounded-full bg-accent/5 blur-3xl"
      />

      <div className="flex min-h-screen flex-col items-center justify-center px-6 py-32 md:px-10">
        <ChapterOverline>LEVEL 03 — MAIN QUESTS</ChapterOverline>

        <h2
          id="learning-heading"
          className="max-w-4xl text-center font-serif text-[clamp(2rem,5vw,4.5rem)] leading-tight text-cream"
        >
          <TextReveal>LEVEL 03 — MAIN QUESTS</TextReveal>
        </h2>

        <p className="mt-6 max-w-xl text-center text-lg text-subtle">
          LEVEL 03 — MAIN QUESTS
        </p>

        <div
          ref={transformRef}
          className="relative mt-24 grid w-full max-w-4xl gap-16 md:grid-cols-2"
        >
          <div className="relative flex h-48 items-center justify-center">
            <span
              data-books
              className="absolute font-serif text-6xl text-muted/40 md:text-8xl"
            >
              LEVEL 03 — MAIN QUESTS
            </span>
            <span
              data-code
              className="absolute font-mono text-2xl text-accent opacity-0 md:text-4xl"
            >
              LEVEL 03 — MAIN QUESTS
            </span>
          </div>

          <div className="relative flex h-48 items-center justify-center">
            <span
              data-ideas
              className="absolute font-serif text-5xl italic text-muted/40 md:text-7xl"
            >
              LEVEL 03 — MAIN QUESTS
            </span>
            <span
              data-apps
              className="absolute rounded border border-accent/30 bg-elevated/80 px-8 py-4 font-sans text-sm uppercase tracking-[0.3em] text-cream opacity-0"
            >
              App.vue
            </span>
          </div>
        </div>

        <blockquote className="mt-20 max-w-2xl border-l border-accent/40 pl-6 font-serif text-xl italic text-subtle md:text-2xl">
          LEVEL 03 — MAIN QUESTS
        </blockquote>
      </div>
    </section>
  );
}
