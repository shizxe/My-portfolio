"use client";

import { useEffect, useRef, type DependencyList, type ReactNode } from "react";
import gsap from "gsap";

export function useGsapContext<T extends HTMLElement>(
  callback: (ctx: gsap.Context) => void,
  deps: DependencyList = []
) {
  const ref = useRef<T>(null);

  useEffect(() => {
    if (!ref.current) return;

    const ctx = gsap.context(() => {}, ref.current);

    callback(ctx);

    return () => ctx.revert();
  }, deps);

  return ref;
}

export function useReducedMotion() {
  const prefersReduced = useRef(false);

  useEffect(() => {
    const mq = window.matchMedia("(prefers-reduced-motion: reduce)");

    prefersReduced.current = mq.matches;

    const handler = (e: MediaQueryListEvent) => {
      prefersReduced.current = e.matches;
    };

    // Support older browsers
    if (mq.addEventListener) {
      mq.addEventListener("change", handler);
      return () => mq.removeEventListener("change", handler);
    } else {
      mq.addListener(handler);
      return () => mq.removeListener(handler);
    }
  }, []);

  return prefersReduced;
}

export function splitTextToSpans(text: string, className = ""): ReactNode[] {
  return text.split("").map((char, index) => (
    <span
      key={`${char}-${index}`}
      className={`inline-block ${className}`}
      style={{
        display: char === " " ? "inline" : "inline-block",
      }}
    >
      {char === " " ? "\u00A0" : char}
    </span>
  ));
}
