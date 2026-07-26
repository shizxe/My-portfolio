"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";

export default function WeaponCursor() {
  const weaponRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const weapon = weaponRef.current;

    if (!weapon) return;

    const move = (e: MouseEvent) => {
      gsap.to(weapon, {
        x: e.clientX,
        y: e.clientY,
        duration: 0.15,
        ease: "power3.out",
      });
    };

    const click = () => {
      gsap
        .timeline()
        .to(weapon, {
          scale: 1.4,
          duration: 0.1,
          ease: "power2.out",
        })
        .to(weapon, {
          scale: 1,
          duration: 0.3,
          ease: "elastic.out(1,0.3)",
        });
    };

    window.addEventListener("mousemove", move);

    window.addEventListener("click", click);

    return () => {
      window.removeEventListener("mousemove", move);

      window.removeEventListener("click", click);
    };
  }, []);

  return (
    <div
      ref={weaponRef}
      className="
      pointer-events-none
      fixed
      left-0
      top-0
      z-99999
      hidden
      md:block
      "
    >
      <div
        className="
        text-3xl
        rotate-[-140deg]
        drop-shadow-[0_0_12px_rgba(34,211,238,0.9)]
        "
      >
        ➤
      </div>
    </div>
  );
}
