"use client";

import { useRef, useEffect } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import SectionWrapper from "@/components/ui/SectionWrapper";
import TextReveal from "@/components/ui/TextReveal";
import PixelParticles from "@/components/ui/PixelParticles";

gsap.registerPlugin(ScrollTrigger);

export default function BeginningSection() {
  const contentRef = useRef<HTMLDivElement>(null);
  const statsRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const content = contentRef.current;
    const stats = statsRef.current;
    if (!content || !stats) return;

    gsap.fromTo(
      content.children,
      { y: 50, opacity: 0 },
      {
        y: 0,
        opacity: 1,
        duration: 0.8,
        stagger: 0.15,
        ease: "power3.out",
        scrollTrigger: {
          trigger: content,
          start: "top 75%",
        },
      }
    );

    gsap.fromTo(
      stats.children,
      { scale: 0.8, opacity: 0 },
      {
        scale: 1,
        opacity: 1,
        duration: 0.6,
        stagger: 0.1,
        ease: "back.out(1.7)",
        scrollTrigger: {
          trigger: stats,
          start: "top 80%",
        },
      }
    );
  }, []);

  const pillars = [
    {
      icon: "🏗️",
      title: "Clean Architecture",
      text: "Building systems that scale gracefully and remain maintainable through every iteration.",
    },
    {
      icon: "💬",
      title: "Communication",
      text: "Bridging developers, stakeholders, and users with clarity from planning to deployment.",
    },
    {
      icon: "🔍",
      title: "Attention to Detail",
      text: "Every pixel, every edge case, every test — because great software lives in the details.",
    },
  ];

  const stats = [
    { label: "Lifecycle Stages", value: "Full" },
    { label: "Tech Realms", value: "10+" },
    { label: "Quests Completed", value: "50+" },
    { label: "Bugs Slain", value: "∞" },
  ];

  return (
    <SectionWrapper id="beginning" className="bg-navy-950">
      <PixelParticles count={15} />

      <div className="relative mx-auto max-w-7xl px-6">
        <div className="mb-4 font-pixel text-[9px] tracking-[0.3em] text-grass-400">
          LEVEL 01 — ORIGIN STORY
        </div>

        <TextReveal
          as="h2"
          id="beginning-heading"
          className="mb-6 font-pixel text-xl text-white sm:text-2xl md:text-3xl"
        >
          The Beginning
        </TextReveal>

        <div ref={contentRef} className="mb-16 grid gap-12 lg:grid-cols-2">
          <div>
            <p className="mb-6 font-body text-lg leading-relaxed text-gray-300">
              Every great adventure starts with a single step. Mine began with curiosity —
              a desire to understand how things work, and a passion for building things
              that matter.
            </p>
            <p className="mb-6 font-body text-lg leading-relaxed text-gray-400">
              I don&apos;t only write code. I work across the complete software lifecycle —
              from requirement analysis and backlog management, through architecture and
              development, to testing, documentation, and deployment.
            </p>
            <p className="font-body text-lg leading-relaxed text-gray-400">
              I believe great software is built through clean architecture, clear
              communication, and relentless attention to detail. Every project is a quest,
              and I enjoy solving problems from planning all the way to production.
            </p>
          </div>

          <div className="pixel-border relative rounded-lg bg-navy-800/50 p-8 glow-purple">
            <div className="mb-4 font-pixel text-[8px] text-gold-400">▶ CHARACTER LORE</div>
            <div className="space-y-4 font-body text-sm leading-relaxed text-gray-300">
              <p>
                <span className="text-cyan-400">Class:</span> Software Developer
              </p>
              <p>
                <span className="text-cyan-400">Alignment:</span> Professional but Playful
              </p>
              <p>
                <span className="text-cyan-400">Traits:</span> Creative, Curious, Always Learning
              </p>
              <p>
                <span className="text-cyan-400">Hobbies:</span> Pixel Art, Retro Games, Fantasy Adventures
              </p>
              <p>
                <span className="text-cyan-400">Special Ability:</span> Full Lifecycle Mastery
              </p>
            </div>
          </div>
        </div>

        <div className="mb-16 grid gap-6 md:grid-cols-3">
          {pillars.map((pillar) => (
            <div
              key={pillar.title}
              className="inventory-slot rounded-lg p-6"
            >
              <span className="mb-3 block text-2xl">{pillar.icon}</span>
              <h3 className="mb-2 font-pixel text-[10px] text-gold-400">{pillar.title}</h3>
              <p className="font-body text-sm text-gray-400">{pillar.text}</p>
            </div>
          ))}
        </div>

        <div ref={statsRef} className="grid grid-cols-2 gap-4 md:grid-cols-4">
          {stats.map((stat) => (
            <div
              key={stat.label}
              className="pixel-border rounded-lg bg-navy-800/30 p-6 text-center"
            >
              <div className="mb-1 font-pixel text-xl text-cyan-400 sm:text-2xl">{stat.value}</div>
              <div className="font-body text-xs text-gray-500">{stat.label}</div>
            </div>
          ))}
        </div>
      </div>
    </SectionWrapper>
  );
}
