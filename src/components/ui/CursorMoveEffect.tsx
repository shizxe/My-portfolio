"use client";

import { useEffect } from "react";
import gsap from "gsap";

export default function CursorMoveEffect() {
  useEffect(() => {
    const handleMove = (e: MouseEvent) => {
      spawnMoveParticles(e.clientX, e.clientY);
    };

    document.addEventListener("mousemove", handleMove);

    return () => {
      document.removeEventListener("mousemove", handleMove);
    };
  }, []);

  return null;
}

function spawnMoveParticles(x: number, y: number) {
  const colors = [
    "bg-cyan-400",
    "bg-purple-400",
    "bg-yellow-400",
    "bg-green-400",
  ];

  const particle = document.createElement("div");

  particle.className = `
    pointer-events-none
    fixed
    z-[99999]
    w-2
    h-2
    ${colors[Math.floor(Math.random() * colors.length)]}
  `;

  particle.style.left = `${x}px`;
  particle.style.top = `${y}px`;

  document.body.appendChild(particle);

  gsap.to(particle, {
    x: (Math.random() - 0.5) * 30,
    y: (Math.random() - 0.5) * 30,

    opacity: 0,

    scale: 0,

    duration: 0.6,

    ease: "power2.out",

    onComplete() {
      particle.remove();
    },
  });
}
