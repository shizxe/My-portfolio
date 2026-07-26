"use client";

import { cn } from "@/lib/cn";

type ChapterOverlineProps = {
  children: React.ReactNode;
  className?: string;
};

export function ChapterOverline({ children, className }: ChapterOverlineProps) {
  return (
    <p
      className={cn(
        "mb-6 text-[11px] uppercase tracking-[0.45em] text-accent",
        className
      )}
    >
      {children}
    </p>
  );
}
