"use client";

import { useRef, useEffect } from "react";
import gsap from "gsap";

interface SectionWrapperProps {
  id: string;
  children: React.ReactNode;
  className?: string;
  label?: string;
}

export default function SectionWrapper({
  id,
  children,
  className = "",
  label,
}: SectionWrapperProps) {
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const section = sectionRef.current;
    if (!section) return;

    gsap.fromTo(
      section,
      { opacity: 0 },
      {
        opacity: 1,
        duration: 0.5,
        scrollTrigger: {
          trigger: section,
          start: "top 90%",
          end: "top 20%",
          toggleActions: "play none none reverse",
        },
      }
    );
  }, []);

  return (
    <section
      id={id}
      ref={sectionRef}
      className={`relative min-h-screen py-24 md:py-32 ${className}`}
      aria-labelledby={label ? `${id}-heading` : undefined}
    >
      {children}
    </section>
  );
}
