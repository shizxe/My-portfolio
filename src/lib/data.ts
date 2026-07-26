export interface InventoryItem {
  id: string;
  name: string;
  icon: string;
  level: number;
  description: string;
}

export interface InventoryCategory {
  id: string;
  title: string;
  subtitle: string;
  icon: string;
  color: string;
  items: InventoryItem[];
}

export interface Quest {
  id: string;
  title: string;
  difficulty: "Easy" | "Normal" | "Hard" | "Legendary";
  techStack: string[];
  challenge: string;
  solution: string;
  result: string;
  xp: number;
  color: string;
}

export interface JourneyCheckpoint {
  id: string;
  year: string;
  title: string;
  role: string;
  description: string;
  achievements: string[];
  x: number;
  y: number;
}

export const heroRoles = [
  "Developer",
  "Problem Solver",
  "Tester",
  "Architect",
  "Documenter",
  "Backlog Manager",
  "Builder",
];

export const inventoryCategories: InventoryCategory[] = [
  {
    id: "weapons",
    title: "Weapons",
    subtitle: "Languages",
    icon: "⚔️",
    color: "#d4a853",
    items: [
      {
        id: "w1",
        name: "TypeScript Blade",
        icon: "🔷",
        level: 95,
        description: "Primary weapon for type-safe, scalable applications.",
      },
      {
        id: "w2",
        name: "Python Staff",
        icon: "🐍",
        level: 88,
        description: "Versatile magic for backend services and automation.",
      },
      {
        id: "w3",
        name: "PHP Hammer",
        icon: "🔨",
        level: 85,
        description: "Forged in Laravel — reliable and battle-tested.",
      },
      {
        id: "w4",
        name: "SQL Scroll",
        icon: "📜",
        level: 90,
        description: "Ancient knowledge of database architecture.",
      },
    ],
  },
  {
    id: "armor",
    title: "Armor",
    subtitle: "Frameworks",
    icon: "🛡️",
    color: "#5ec4d4",
    items: [
      {
        id: "a1",
        name: "Next.js Plate",
        icon: "▲",
        level: 92,
        description: "Full-stack armor for modern web experiences.",
      },
      {
        id: "a2",
        name: "React Gauntlets",
        icon: "⚛️",
        level: 94,
        description: "Component-driven combat at its finest.",
      },
      {
        id: "a3",
        name: "Vue Cloak",
        icon: "💚",
        level: 82,
        description: "Elegant and reactive protection layer.",
      },
      {
        id: "a4",
        name: "Laravel Shield",
        icon: "🔴",
        level: 90,
        description: "Enterprise-grade backend fortress.",
      },
    ],
  },
  {
    id: "potions",
    title: "Potions",
    subtitle: "Tools",
    icon: "🧪",
    color: "#6db87a",
    items: [
      {
        id: "p1",
        name: "Git Elixir",
        icon: "🌿",
        level: 93,
        description: "Version control for every adventure branch.",
      },
      {
        id: "p2",
        name: "Docker Flask",
        icon: "🐳",
        level: 80,
        description: "Containerize your deployments with ease.",
      },
      {
        id: "p3",
        name: "Postman Potion",
        icon: "📮",
        level: 88,
        description: "Test APIs before they reach production.",
      },
      {
        id: "p4",
        name: "Jest Brew",
        icon: "🧃",
        level: 85,
        description: "Quality assurance in every sip.",
      },
    ],
  },
  {
    id: "artifacts",
    title: "Artifacts",
    subtitle: "Soft Skills",
    icon: "💎",
    color: "#8b6bb8",
    items: [
      {
        id: "ar1",
        name: "Communication Crystal",
        icon: "💬",
        level: 95,
        description: "Bridge the gap between teams and stakeholders.",
      },
      {
        id: "ar2",
        name: "Analysis Orb",
        icon: "🔮",
        level: 92,
        description: "Transform requirements into clear roadmaps.",
      },
      {
        id: "ar3",
        name: "Refactor Ring",
        icon: "💍",
        level: 90,
        description: "Improve code without breaking the quest.",
      },
      {
        id: "ar4",
        name: "Debug Compass",
        icon: "🧭",
        level: 94,
        description: "Never lost when tracking down bugs.",
      },
    ],
  },
];

export const quests: Quest[] = [
  {
    id: "q1",
    title: "The API Kingdom",
    difficulty: "Hard",
    techStack: ["Laravel", "PostgreSQL", "Redis", "Docker"],
    challenge:
      "Build a scalable REST API serving 50k+ daily requests with complex authorization layers.",
    solution:
      "Designed clean architecture with repository pattern, Redis caching, and comprehensive test coverage.",
    result: "40% faster response times and 99.9% uptime over 12 months.",
    xp: 2500,
    color: "#5ec4d4",
  },
  {
    id: "q2",
    title: "The Frontend Realm",
    difficulty: "Legendary",
    techStack: ["Next.js", "TypeScript", "Tailwind", "GSAP"],
    challenge:
      "Create an immersive, performant web experience with cinematic scroll storytelling.",
    solution:
      "Component-driven architecture with lazy loading, GSAP ScrollTrigger, and optimized assets.",
    result: "Lighthouse score 95+ with memorable user engagement.",
    xp: 3200,
    color: "#8b6bb8",
  },
  {
    id: "q3",
    title: "The Migration Quest",
    difficulty: "Hard",
    techStack: ["Vue", "Laravel", "MySQL", "PHPUnit"],
    challenge:
      "Migrate legacy monolith to modular architecture without downtime.",
    solution:
      "Strangler fig pattern with feature flags, parallel testing, and staged rollouts.",
    result: "Zero-downtime migration with 60% reduction in bug reports.",
    xp: 2800,
    color: "#d4a853",
  },
  {
    id: "q4",
    title: "The QA Trials",
    difficulty: "Normal",
    techStack: ["Jest", "Cypress", "Postman", "GitHub Actions"],
    challenge:
      "Establish automated testing pipeline from zero coverage to production confidence.",
    solution:
      "Unit, integration, and E2E test suites with CI/CD integration and documentation.",
    result: "85% code coverage and 70% fewer production incidents.",
    xp: 1800,
    color: "#6db87a",
  },
];

export const journeyCheckpoints: JourneyCheckpoint[] = [
  {
    id: "j1",
    year: "2019",
    title: "First Steps",
    role: "Junior Developer",
    description:
      "Entered the pixel world — learned the fundamentals of web development and discovered a passion for clean code.",
    achievements: [
      "Built first full-stack app",
      "Learned Git workflows",
      "Joined dev community",
    ],
    x: 10,
    y: 80,
  },
  {
    id: "j2",
    year: "2020",
    title: "The Backend Path",
    role: "Backend Developer",
    description:
      "Ventured into server-side realms with Laravel and API design, mastering database architecture.",
    achievements: [
      "REST API mastery",
      "Database optimization",
      "Authentication systems",
    ],
    x: 28,
    y: 55,
  },
  {
    id: "j3",
    year: "2022",
    title: "Full-Stack Awakening",
    role: "Full-Stack Developer",
    description:
      "Bridged frontend and backend — React, Next.js, and TypeScript became daily companions.",
    achievements: [
      "Next.js projects",
      "TypeScript adoption",
      "Performance optimization",
    ],
    x: 50,
    y: 35,
  },
  {
    id: "j4",
    year: "2023",
    title: "The Quality Forge",
    role: "Software Engineer",
    description:
      "Expanded into QA, testing, documentation, and requirement analysis — the complete lifecycle.",
    achievements: [
      "Test automation",
      "Technical documentation",
      "Agile backlog management",
    ],
    x: 72,
    y: 50,
  },
  {
    id: "j5",
    year: "2025",
    title: "Current Quest",
    role: "Software Developer",
    description:
      "Building complete software systems — from planning and architecture through deployment and beyond.",
    achievements: [
      "End-to-end ownership",
      "Clean architecture",
      "Creative problem solving",
    ],
    x: 90,
    y: 20,
  },
];

export const navLinks = [
  { id: "beginning", href: "#beginning", label: "The Beginning" },
  { id: "inventory", href: "#inventory", label: "My Inventory" },
  { id: "quests", href: "#quests", label: "The Quests" },
  { id: "journey", href: "#journey", label: "The Journey" },
  { id: "portal", href: "#portal", label: "The Final Portal" },
];

export const difficultyColors: Record<Quest["difficulty"], string> = {
  Easy: "#6db87a",
  Normal: "#5ec4d4",
  Hard: "#d4a853",
  Legendary: "#8b6bb8",
};
