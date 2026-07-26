"use client";

import { useRef, useEffect, type ReactNode } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { cn } from "@/lib/cn";
import { useReducedMotion } from "@/hooks/useReducedMotion";

gsap.registerPlugin(ScrollTrigger);

type ParallaxLayerProps = {
  children?: ReactNode;
  speed?: number;
  className?: string;
  direction?: "y" | "x";
};

export function ParallaxLayer({
  children,
  speed = 0.3,
  className,
  direction = "y",
}: ParallaxLayerProps) {
  const ref = useRef<HTMLDivElement>(null);
  const reducedMotion = useReducedMotion();

  useEffect(() => {
    const element = ref.current;
    if (!element || reducedMotion) return;

    const axis = direction === "y" ? "y" : "x";
    const distance = 120 * speed;

    const animation = gsap.fromTo(
      element,
      { [axis]: -distance },
      {
        [axis]: distance,
        ease: "none",
        scrollTrigger: {
          trigger: element,
          start: "top bottom",
          end: "bottom top",
          scrub: true,
        },
      },
    );

    return () => {
      animation.scrollTrigger?.kill();
      animation.kill();
    };
  }, [speed, direction, reducedMotion]);

  return (
    <div ref={ref} className={cn("will-change-transform", className)}>
      {children}
    </div>
  );
}
