"use client";

import { motion } from "framer-motion";
import { cn } from "@/lib/cn";

type TextRevealProps = {
  children: string;
  className?: string;
  delay?: number;
  as?: "h1" | "h2" | "h3" | "p" | "span";
  splitBy?: "words" | "chars" | "lines";
};

export function TextReveal({
  children,
  className,
  delay = 0,
  as: Tag = "p",
  splitBy = "words",
}: TextRevealProps) {
  const units =
    splitBy === "chars"
      ? children.split("")
      : splitBy === "lines"
        ? children.split("\n")
        : children.split(" ");

  const Wrapper = splitBy === "lines" ? "span" : "span";
  const wrapperClass =
    splitBy === "lines"
      ? "flex flex-col items-center"
      : "inline-flex flex-wrap";

  return (
    <Tag className={cn("overflow-hidden", className)} aria-label={children}>
      <span className="sr-only">{children}</span>
      <Wrapper aria-hidden className={wrapperClass}>
        {units.map((unit, index) => (
          <span
            key={`${unit}-${index}`}
            className={cn(
              "overflow-hidden",
              splitBy === "lines" ? "block" : "inline-block",
            )}
          >
            <motion.span
              className={splitBy === "lines" ? "block" : "inline-block"}
              initial={{ y: "110%", opacity: 0 }}
              whileInView={{ y: "0%", opacity: 1 }}
              viewport={{ once: true, margin: "-10%" }}
              transition={{
                duration: 1,
                delay: delay + index * 0.12,
                ease: [0.16, 1, 0.3, 1],
              }}
            >
              {unit}
              {splitBy === "words" && index < units.length - 1 ? "\u00A0" : ""}
            </motion.span>
          </span>
        ))}
      </Wrapper>
    </Tag>
  );
}
