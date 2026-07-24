"use client";

import { useEffect, useState } from "react";

export default function DragonFlyby() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const scheduleNext = () => {
      const delay = 8000 + Math.random() * 12000;
      return setTimeout(() => {
        setVisible(true);
        setTimeout(() => {
          setVisible(false);
          scheduleNext();
        }, 6000);
      }, delay);
    };

    const initial = setTimeout(() => {
      setVisible(true);
      setTimeout(() => {
        setVisible(false);
        scheduleNext();
      }, 6000);
    }, 4000);

    return () => clearTimeout(initial);
  }, []);

  if (!visible) return null;

  return (
    <div
      className="pointer-events-none fixed z-30"
      style={{
        top: "15%",
        animation: "dragon-fly 6s linear forwards",
      }}
      aria-hidden="true"
    >
      <svg width="48" height="32" viewBox="0 0 48 32" className="pixel-art opacity-70">
        {/* Body */}
        <rect x="16" y="12" width="20" height="8" fill="#6b4c9a" />
        <rect x="12" y="14" width="8" height="6" fill="#8b6bb8" />
        {/* Head */}
        <rect x="36" y="10" width="10" height="8" fill="#6b4c9a" />
        <rect x="44" y="12" width="4" height="4" fill="#d4a853" />
        {/* Eye */}
        <rect x="40" y="12" width="2" height="2" fill="#5ec4d4" />
        {/* Wing */}
        <rect x="18" y="4" width="12" height="8" fill="#4a3570" opacity="0.8" />
        <rect x="22" y="2" width="8" height="4" fill="#5a4580" opacity="0.6" />
        {/* Tail */}
        <rect x="4" y="16" width="10" height="4" fill="#6b4c9a" />
        <rect x="2" y="18" width="4" height="4" fill="#8b6bb8" />
        {/* Fire */}
        <rect x="46" y="14" width="4" height="2" fill="#d4a853" opacity="0.8" />
        <rect x="48" y="13" width="2" height="4" fill="#f0c674" opacity="0.6" />
      </svg>
    </div>
  );
}
