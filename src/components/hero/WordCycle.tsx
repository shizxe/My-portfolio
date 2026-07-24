"use client";

import { useEffect, useRef, useState } from "react";
import gsap from "gsap";
import { heroRoles } from "@/lib/data";

export default function WordCycle() {
  const [index, setIndex] = useState(0);
  const wordRef = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    const interval = setInterval(() => {
      setIndex((prev) => (prev + 1) % heroRoles.length);
    }, 2800);
    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    const word = wordRef.current;
    if (!word) return;

    gsap.fromTo(
      word,
      { y: 20, opacity: 0, filter: "blur(4px)" },
      { y: 0, opacity: 1, filter: "blur(0px)", duration: 0.6, ease: "power3.out" }
    );
  }, [index]);

  return (
    <span
      ref={wordRef}
      className="inline-block bg-gradient-to-r from-cyan-400 via-purple-500 to-gold-400 bg-clip-text font-pixel text-lg text-transparent sm:text-xl md:text-2xl"
      aria-live="polite"
    >
      {heroRoles[index]}.
    </span>
  );
}
