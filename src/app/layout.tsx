import type { Metadata } from "next";
import { Press_Start_2P, DM_Sans } from "next/font/google";
import "./globals.css";
import Navigation from "@/components/layout/Navigation";
import MouseGlow from "@/components/layout/MouseGlow";
import SmoothScroll from "@/components/layout/SmoothScroll";

const pixelFont = Press_Start_2P({
  weight: "400",
  subsets: ["latin"],
  variable: "--font-pixel",
  display: "swap",
});

const bodyFont = DM_Sans({
  subsets: ["latin"],
  variable: "--font-sans",
  display: "swap",
});

export const metadata: Metadata = {
  title: "Thi Ha — Pixel Quest Portfolio",
  description:
    "Software Developer portfolio — a cinematic pixel fantasy adventure through code, quests, and the complete software lifecycle.",
  keywords: [
    "Software Developer",
    "Full Stack",
    "Next.js",
    "React",
    "TypeScript",
    "Laravel",
    "Portfolio",
  ],
  authors: [{ name: "Thi Ha" }],
  openGraph: {
    title: "Thi Ha — Pixel Quest Portfolio",
    description: "Enter a pixel fantasy world and explore my developer journey.",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${pixelFont.variable} ${bodyFont.variable}`}>
      <body className="bg-navy-950 text-gray-100 antialiased">
        <SmoothScroll>
          <MouseGlow />
          <Navigation />
          <main>{children}</main>
        </SmoothScroll>
      </body>
    </html>
  );
}
