"use client";

import { useRef, useEffect, type ReactNode } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { cn } from "@/lib/cn";
import { useReducedMotion } from "@/hooks/useReducedMotion";

gsap.registerPlugin(ScrollTrigger);

type PinnedSectionProps = {
  children: ReactNode;
  pinDuration?: string | number;
  className?: string;
  id?: string;
};

export function PinnedSection({
  children,
  pinDuration = "+=150%",
  className,
  id,
}: PinnedSectionProps) {
  const containerRef = useRef<HTMLElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);
  const reducedMotion = useReducedMotion();

  useEffect(() => {
    const container = containerRef.current;
    const content = contentRef.current;
    if (!container || !content || reducedMotion) return;

    const trigger = ScrollTrigger.create({
      trigger: container,
      start: "top top",
      end: pinDuration,
      pin: content,
      pinSpacing: true,
      anticipatePin: 1,
    });

    return () => trigger.kill();
  }, [pinDuration, reducedMotion]);

  return (
    <section ref={containerRef} id={id} className={cn("relative", className)}>
      <div ref={contentRef}>{children}</div>
    </section>
  );
}
