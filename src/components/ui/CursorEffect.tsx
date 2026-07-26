"use client";

import { useEffect } from "react";
import gsap from "gsap";

export default function CursorClickEffect() {
  useEffect(() => {
    const handleClick = (e: MouseEvent) => {
      spawnClickParticles(e.clientX, e.clientY);
    };

    document.addEventListener("click", handleClick);

    return () => {
      document.removeEventListener("click", handleClick);
    };
  }, []);

  return null;
}

function spawnClickParticles(x: number, y: number) {
  const colors = [
    "bg-cyan-400",
    "bg-purple-400",
    "bg-yellow-400",
    "bg-green-400",
  ];

  for (let i = 0; i < 12; i++) {
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

    const angle = Math.random() * Math.PI * 2;
    const distance = 40 + Math.random() * 50;

    gsap.to(particle, {
      x: Math.cos(angle) * distance,
      y: Math.sin(angle) * distance,
      opacity: 0,
      scale: 0,
      duration: 0.8,
      ease: "power3.out",
      onComplete() {
        particle.remove();
      },
    });
  }
}
