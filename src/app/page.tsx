"use client";

import { useState, useCallback } from "react";
import IntroLoader from "@/components/ui/IntroLoader";
import CustomCursor from "@/components/ui/CustomCursor";
import Navbar from "@/components/ui/Navbar";
import SmoothScroll from "@/components/ui/SmoothScroll";
import AnnouncementBar from "@/components/sections/AnnouncementBar";
import HeroSection from "@/components/sections/HeroSection";
import TrustStrip from "@/components/sections/TrustStrip";
import FeaturedProducts from "@/components/sections/FeaturedProducts";
import BrandStory from "@/components/sections/BrandStory";
import ShopByDesign from "@/components/sections/ShopByDesign";
import ShopByFragrance from "@/components/sections/ShopByFragrance";
import MirroredBanners from "@/components/sections/MirroredBanners";
import Footer from "@/components/sections/Footer";
import CollectionSlide from "@/components/sections/CollectionSlide";

export default function Home() {
  const [isLoading, setIsLoading] = useState(true);

  const handleLoaderComplete = useCallback(() => {
    setIsLoading(false);
  }, []);

  return (
    <>
      {isLoading && <IntroLoader onComplete={handleLoaderComplete} />}
      <CustomCursor />

      {!isLoading && (
        <SmoothScroll>
          <main className="bg-background">
            <AnnouncementBar />
            <Navbar />
            <HeroSection />
            <TrustStrip />
            <FeaturedProducts />
            <BrandStory />
            <MirroredBanners />
            <ShopByDesign />
            <section className="border-t border-white/5">
              <CollectionSlide />
            </section>
            <ShopByFragrance />
            <Footer />
          </main>
        </SmoothScroll>
      )}
    </>
  );
}
