"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";

export default function GameCursor() {
  const cursorRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const cursor = cursorRef.current;

    if (!cursor) return;

    const moveCursor = (e: MouseEvent) => {
      gsap.to(cursor, {
        x: e.clientX,
        y: e.clientY,
        duration: 0.15,
        ease: "power3.out",
      });
    };

    const clickEffect = (e: MouseEvent) => {
      createMagicBurst(e.clientX, e.clientY);
    };

    window.addEventListener("mousemove", moveCursor);

    window.addEventListener("click", clickEffect);

    return () => {
      window.removeEventListener("mousemove", moveCursor);

      window.removeEventListener("click", clickEffect);
    };
  }, []);

  return (
    <div
      ref={cursorRef}
      className="
      pointer-events-none
      fixed
      left-0
      top-0
      z-[99999]
      hidden
      h-4
      w-4
      rounded-full
      bg-cyan-400
      shadow-[0_0_20px_#22d3ee]
      md:block
      "
    />
  );
}

function createMagicBurst(x: number, y: number) {
  // magic circle

  const ring = document.createElement("div");

  ring.className = `
pointer-events-none
fixed
z-[99998]
border-2
border-cyan-400
rounded-full
`;

  ring.style.left = `${x}px`;
  ring.style.top = `${y}px`;

  ring.style.width = "8px";
  ring.style.height = "8px";

  document.body.appendChild(ring);

  gsap.to(ring, {
    width: 120,
    height: 120,

    x: -56,
    y: -56,

    opacity: 0,

    duration: 0.7,

    ease: "power3.out",

    onComplete() {
      ring.remove();
    },
  });

  // particles

  const colors = ["#22d3ee", "#a855f7", "#facc15", "#4ade80"];

  for (let i = 0; i < 14; i++) {
    const particle = document.createElement("div");

    particle.className = `
 pointer-events-none
 fixed
 z-[99999]
 w-2
 h-2
 `;

    particle.style.background =
      colors[Math.floor(Math.random() * colors.length)];

    particle.style.left = `${x}px`;
    particle.style.top = `${y}px`;

    document.body.appendChild(particle);

    const angle = Math.random() * Math.PI * 2;

    const distance = 40 + Math.random() * 80;

    gsap.to(particle, {
      x: Math.cos(angle) * distance,

      y: Math.sin(angle) * distance,

      scale: 0,

      opacity: 0,

      duration: 0.8,

      ease: "power4.out",

      onComplete() {
        particle.remove();
      },
    });
  }
}
