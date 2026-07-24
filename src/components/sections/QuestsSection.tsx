"use client";

import { useRef, useEffect } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import SectionWrapper from "@/components/ui/SectionWrapper";
import TextReveal from "@/components/ui/TextReveal";
import PixelParticles from "@/components/ui/PixelParticles";
import { quests, difficultyColors } from "@/lib/data";

gsap.registerPlugin(ScrollTrigger);

export default function QuestsSection() {
  const cardsRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const cards = cardsRef.current;
    if (!cards) return;

    const cardEls = cards.querySelectorAll(".quest-card");

    cardEls.forEach((card, i) => {
      gsap.fromTo(
        card,
        { x: i % 2 === 0 ? -60 : 60, opacity: 0, rotateY: i % 2 === 0 ? -5 : 5 },
        {
          x: 0,
          opacity: 1,
          rotateY: 0,
          duration: 0.9,
          ease: "power3.out",
          scrollTrigger: {
            trigger: card,
            start: "top 85%",
          },
        }
      );
    });
  }, []);

  return (
    <SectionWrapper id="quests" className="bg-navy-950">
      <PixelParticles count={18} />

      <div className="relative mx-auto max-w-7xl px-6">
        <div className="mb-4 font-pixel text-[9px] tracking-[0.3em] text-cyan-400">
          LEVEL 03 — MAIN QUESTS
        </div>

        <TextReveal
          as="h2"
          id="quests-heading"
          className="mb-4 font-pixel text-xl text-white sm:text-2xl md:text-3xl"
        >
          The Quests
        </TextReveal>

        <p className="mb-12 max-w-2xl font-body text-gray-400">
          Every project is an epic quest. Here are the adventures I&apos;ve embarked on —
          each with its own challenges, strategies, and hard-won victories.
        </p>

        <div ref={cardsRef} className="grid gap-8 md:grid-cols-2">
          {quests.map((quest) => (
            <article
              key={quest.id}
              className="quest-card group relative overflow-hidden rounded-xl p-6 md:p-8"
            >
              {/* Quest header */}
              <div className="mb-4 flex items-start justify-between">
                <div>
                  <span
                    className="mb-2 inline-block rounded px-2 py-1 font-pixel text-[7px]"
                    style={{
                      background: `${difficultyColors[quest.difficulty]}22`,
                      color: difficultyColors[quest.difficulty],
                      border: `1px solid ${difficultyColors[quest.difficulty]}44`,
                    }}
                  >
                    {quest.difficulty.toUpperCase()}
                  </span>
                  <h3 className="font-pixel text-[11px] text-white sm:text-xs">{quest.title}</h3>
                </div>
                <div className="text-right">
                  <div className="font-pixel text-[8px] text-gold-400">+{quest.xp} XP</div>
                </div>
              </div>

              {/* Screenshot placeholder */}
              <div
                className="mb-4 h-32 overflow-hidden rounded-lg border border-purple-600/20 sm:h-40"
                style={{
                  background: `linear-gradient(135deg, ${quest.color}15, ${quest.color}05)`,
                }}
              >
                <div className="flex h-full items-center justify-center">
                  <div className="grid grid-cols-4 gap-1 p-4 opacity-40">
                    {Array.from({ length: 16 }).map((_, i) => (
                      <div
                        key={i}
                        className="h-3 w-3 rounded-sm"
                        style={{
                          background: quest.color,
                          opacity: 0.3 + (i % 4) * 0.15,
                        }}
                      />
                    ))}
                  </div>
                </div>
              </div>

              {/* Tech stack */}
              <div className="mb-4 flex flex-wrap gap-2">
                {quest.techStack.map((tech) => (
                  <span
                    key={tech}
                    className="rounded border border-navy-700 bg-navy-800/50 px-2 py-1 font-body text-[10px] text-gray-400"
                  >
                    {tech}
                  </span>
                ))}
              </div>

              {/* Quest details */}
              <div className="space-y-3 font-body text-sm">
                <div>
                  <span className="font-pixel text-[7px] text-red-400/80">⚔ CHALLENGE</span>
                  <p className="mt-1 text-gray-400">{quest.challenge}</p>
                </div>
                <div>
                  <span className="font-pixel text-[7px] text-cyan-400/80">🛡 SOLUTION</span>
                  <p className="mt-1 text-gray-400">{quest.solution}</p>
                </div>
                <div>
                  <span className="font-pixel text-[7px] text-grass-400/80">🏆 RESULT</span>
                  <p className="mt-1 text-gray-300">{quest.result}</p>
                </div>
              </div>

              {/* Hover glow */}
              <div
                className="pointer-events-none absolute inset-0 opacity-0 transition-opacity duration-500 group-hover:opacity-100"
                style={{
                  background: `radial-gradient(circle at 50% 50%, ${quest.color}08, transparent 70%)`,
                }}
              />
            </article>
          ))}
        </div>
      </div>
    </SectionWrapper>
  );
}
