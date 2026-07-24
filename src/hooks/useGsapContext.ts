"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";

export function useGsapContext<T extends HTMLElement>(
  callback: (ctx: gsap.Context) => void,
  deps: unknown[] = []
) {
  const ref = useRef<T>(null);

  useEffect(() => {
    if (!ref.current) return;

    const ctx = gsap.context(() => {
      callback(ctx);
    }, ref);

    return () => ctx.revert();
    // eslint-disable-next-line react-hooks/exhaustive-deps
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

    mq.addEventListener("change", handler);
    return () => mq.removeEventListener("change", handler);
  }, []);

  return prefersReduced;
}

export function splitTextToSpans(text: string, className?: string) {
  return text.split("").map((char, i) => (
    <span
      key={`${char}-${i}`}
      className={`inline-block ${className ?? ""}`}
      style={{ display: char === " " ? "inline" : "inline-block" }}
    >
      {char === " " ? "\u00A0" : char}
    </span>
  ));
}
