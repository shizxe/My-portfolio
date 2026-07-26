"use client";

import { useRef, useEffect, useState } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import SectionWrapper from "@/components/ui/SectionWrapper";
import TextReveal from "@/components/ui/TextReveal";
import PixelParticles from "@/components/ui/PixelParticles";
import { inventoryCategories, type InventoryItem } from "@/lib/data";
import { useReducedMotion } from "@/hooks/useReducedMotion";

gsap.registerPlugin(ScrollTrigger);

export default function InventorySection() {
  const gridRef = useRef<HTMLDivElement>(null);
  const [activeCategory, setActiveCategory] = useState(
    inventoryCategories[0].id
  );
  const [selectedItem, setSelectedItem] = useState<InventoryItem | null>(null);

  const sectionRef = useRef<HTMLElement>(null);
  const workshopRef = useRef<HTMLDivElement>(null);
  const reducedMotion = useReducedMotion();

  useEffect(() => {
    const section = sectionRef.current;
    const workshop = workshopRef.current;
    if (!section || !workshop || reducedMotion) return;

    const items = workshop.querySelectorAll("[data-skill]");
    const layers = workshop.querySelectorAll("[data-layer]");
    const diagram = workshop.querySelector("[data-diagram]");

    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: workshop,
        start: "top top+=80",
        end: "+=120%",
        pin: true,
        scrub: true,
        anticipatePin: 1,
        invalidateOnRefresh: true,
      },
    });

    items.forEach((item, i) => {
      tl.fromTo(
        item,
        { opacity: 0, y: 40, rotateX: -20 },
        { opacity: 1, y: 0, rotateX: 0, duration: 0.15 },
        i * 0.08
      );
    });

    tl.fromTo(
      layers,
      { opacity: 0, scale: 0.9 },
      { opacity: 1, scale: 1, stagger: 0.1, duration: 0.3 },
      0.5
    );

    tl.fromTo(
      diagram,
      { clipPath: "inset(100% 0 0 0)" },
      { clipPath: "inset(0% 0 0 0)", duration: 0.4 },
      0.7
    );

    return () => {
      tl.scrollTrigger?.kill();
      tl.kill();
    };
  }, [reducedMotion]);
  useEffect(() => {
    const grid = gridRef.current;
    if (!grid) return;

    gsap.fromTo(
      grid.children,
      { y: 40, opacity: 0, scale: 0.9 },
      {
        y: 0,
        opacity: 1,
        scale: 1,
        duration: 0.6,
        stagger: 0.08,
        ease: "back.out(1.4)",
        scrollTrigger: {
          trigger: grid,
          start: "top 80%",
        },
      }
    );
  }, [activeCategory]);

  const category = inventoryCategories.find((c) => c.id === activeCategory)!;

  const handleItemClick = (item: InventoryItem) => {
    setSelectedItem(item);
    gsap.fromTo(
      ".item-detail",
      { scale: 0.9, opacity: 0 },
      { scale: 1, opacity: 1, duration: 0.4, ease: "back.out(2)" }
    );
  };

  return (
    <SectionWrapper id="inventory" className="bg-navy-900">
      <PixelParticles count={40} />
      <section ref={sectionRef}>
        <div ref={workshopRef}>
          <div className="relative mx-auto max-w-7xl px-6">
            <div className="mb-4 font-pixel text-[9px] tracking-[0.3em] text-gold-400">
              LEVEL 02 — EQUIPMENT
            </div>

            <TextReveal
              as="h2"
              id="inventory-heading"
              className="mb-4 font-pixel text-xl text-white sm:text-2xl md:text-3xl"
            >
              My Inventory
            </TextReveal>

            <p className="mb-12 max-w-2xl font-body text-gray-400">
              Every adventurer needs the right gear. Here&apos;s what I carry
              into battle — languages, frameworks, tools, and the soft skills
              that make the difference.
            </p>
            {/* Category tabs */}
            <div data-skill className="mb-8 flex flex-wrap gap-3">
              {inventoryCategories.map((cat) => (
                <button
                  key={cat.id}
                  onClick={() => {
                    setActiveCategory(cat.id);
                    setSelectedItem(null);
                  }}
                  className={`flex items-center gap-2 rounded border-2 px-4 py-2 font-pixel text-[8px] transition-all sm:text-[9px] ${
                    activeCategory === cat.id
                      ? "border-purple-500 bg-purple-600/20 text-white glow-purple"
                      : "border-navy-700 bg-navy-800/50 text-gray-400 hover:border-purple-500/50"
                  }`}
                >
                  <span>{cat.icon}</span>
                  {cat.title}
                  <span className="text-[7px] opacity-60">
                    ({cat.subtitle})
                  </span>
                </button>
              ))}
            </div>

            <div className="grid gap-8 lg:grid-cols-3">
              {/* Items grid */}
              <div
                ref={gridRef}
                data-layer
                className="grid grid-cols-2 gap-4 lg:col-span-2"
              >
                {category.items.map((item) => (
                  <button
                    key={item.id}
                    onClick={() => handleItemClick(item)}
                    className={`inventory-slot group rounded-lg p-4 text-left ${
                      selectedItem?.id === item.id
                        ? "border-cyan-400/60 glow-cyan"
                        : ""
                    }`}
                  >
                    <div className="mb-3 flex items-center justify-between">
                      <span className="text-2xl transition-transform group-hover:scale-110">
                        {item.icon}
                      </span>
                      <span className="font-pixel text-[7px] text-gold-400">
                        Lv.{item.level}
                      </span>
                    </div>
                    <h3 className="mb-2 font-pixel text-[8px] text-white sm:text-[9px]">
                      {item.name}
                    </h3>
                    {/* Progress bar */}
                    <div className="h-2 overflow-hidden rounded bg-navy-950">
                      <div
                        className="h-full rounded transition-all duration-1000"
                        style={{
                          width: `${item.level}%`,
                          background: `linear-gradient(90deg, ${category.color}, ${category.color}88)`,
                        }}
                      />
                    </div>
                  </button>
                ))}
              </div>

              {/* Detail panel */}
              <div
                data-diagram
                className="pixel-border item-detail rounded-lg bg-navy-800/50 p-6"
              >
                {selectedItem ? (
                  <>
                    <div className="mb-4 text-4xl">{selectedItem.icon}</div>
                    <h3 className="mb-2 font-pixel text-[10px] text-gold-400">
                      {selectedItem.name}
                    </h3>
                    <p className="mb-4 font-body text-sm text-gray-300">
                      {selectedItem.description}
                    </p>
                    <div className="mb-2 flex justify-between font-pixel text-[8px]">
                      <span className="text-gray-500">POWER</span>
                      <span className="text-cyan-400">
                        {selectedItem.level}/100
                      </span>
                    </div>
                    <div className="h-3 overflow-hidden rounded bg-navy-950">
                      <div
                        className="detail-bar h-full rounded bg-gradient-to-r from-purple-600 to-cyan-500"
                        style={{ width: "0%" }}
                        ref={(el) => {
                          if (el) {
                            gsap.to(el, {
                              width: `${selectedItem.level}%`,
                              duration: 1,
                              ease: "power2.out",
                            });
                          }
                        }}
                      />
                    </div>
                  </>
                ) : (
                  <div className="flex h-full flex-col items-center justify-center text-center">
                    <span className="mb-4 text-4xl opacity-30">🎒</span>
                    <p className="font-pixel text-[8px] text-gray-500">
                      SELECT AN ITEM
                      <br />
                      TO INSPECT
                    </p>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </section>
    </SectionWrapper>
  );
}
