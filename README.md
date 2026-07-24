# Pixel Quest Portfolio

An immersive, cinematic portfolio website with a **Modern Pixel Fantasy** theme — built as an RPG adventure through the software development journey of Thi Ha.

## Features

- **Cinematic scroll storytelling** with Lenis smooth scrolling and GSAP ScrollTrigger
- **RPG-themed sections**: The Beginning, My Inventory, The Quests, The Journey, The Final Portal
- **Interactive inventory UI** with weapons, armor, potions, and artifacts
- **Quest cards** with difficulty ratings, tech stacks, and animated reveals
- **Adventure map timeline** with animated checkpoints
- **Magical portal contact form** with particle effects
- **Pixel art visuals** — character, dragon flyby, castle, mountains
- **Micro-interactions** — mouse glow, button particles, hover lifts

## Tech Stack

- Next.js 15 (App Router)
- React 19 + TypeScript
- Tailwind CSS 4
- GSAP + ScrollTrigger
- Lenis (smooth scroll)
- Framer Motion (available for future use)

## Getting Started

```bash
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

## Build

```bash
npm run build
npm start
```

## Project Structure

```
src/
├── app/              # Next.js app router
├── components/
│   ├── hero/         # Hero section & pixel visuals
│   ├── layout/       # Navigation, smooth scroll, mouse glow
│   ├── sections/     # RPG-themed content sections
│   └── ui/           # Reusable UI components
├── hooks/            # GSAP & animation hooks
└── lib/              # Data & content
```

## Customization

Edit `src/lib/data.ts` to update:
- Skills/inventory items
- Project quests
- Career journey checkpoints
- Hero role cycling words

---

Built with creativity, clean architecture, and a love for pixel worlds. ✨
