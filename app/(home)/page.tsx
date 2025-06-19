import { HeroSection } from "@/components/sections/home/hero-section";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Homepage",
};

export default function Home() {
  return (
    <div className="max-w-screen font-source">
      <HeroSection />
    </div>
  );
}
