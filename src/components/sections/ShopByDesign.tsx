"use client";

import { useRef, useEffect } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { PRODUCTS } from "@/lib/constants";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

const designs = [
  { name: "Mars Boy", color: "#f21d2f", id: "mars-boy" },
  { name: "Happy Dog", color: "#8B5E3C", id: "happy-dog" },
  { name: "Feather", color: "#D4A43A", id: "feather" },
  { name: "Starfish", color: "#C9A0DC", id: "starfish" },
  { name: "Shell Baby", color: "#ff3d4d", id: "shell-baby" },
];

export default function ShopByDesign() {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!ref.current) return;
    const ctx = gsap.context(() => {
      gsap.fromTo(
        ".sbd-card",
        { opacity: 0, y: 30, scale: 0.9 },
        {
          opacity: 1,
          y: 0,
          scale: 1,
          duration: 0.8,
          stagger: 0.1,
          ease: "power3.out",
          scrollTrigger: {
            trigger: ref.current,
            start: "top 75%",
          },
        }
      );
    }, ref);
    return () => ctx.revert();
  }, []);

  return (
    <section id="shop-by-design" ref={ref} className="section-padding">
      <div className="mx-auto max-w-7xl">
        {/* Section header */}
        <div className="text-center mb-14">
          <p className="section-overline">Collectible Designs</p>
          <h2 className="section-heading">Shop by Design</h2>
          <p className="section-subheading">
            Five sculpted figurines, each with its own fragrance lineup. Find the
            design that speaks to your style.
          </p>
        </div>

        {/* Circular cards grid */}
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-8 md:gap-10">
          {designs.map((design) => (
            <a
              key={design.id}
              href="#featured"
              className="sbd-card group flex flex-col items-center text-center gap-4 cursor-pointer"
            >
              <div className="relative w-full aspect-square rounded-full overflow-hidden border-2 border-white/10 group-hover:border-red/40 transition-all duration-300 group-hover:shadow-[0_0_40px_rgba(242, 29, 47,0.15)] group-hover:-translate-y-1">
                <div
                  className="w-full h-full flex items-center justify-center transition-transform duration-600 group-hover:scale-105"
                  style={{
                    background: `radial-gradient(circle, ${design.color}25, ${design.color}08)`,
                  }}
                >
                  <div className="w-16 h-16 md:w-20 md:h-20 rounded-full" style={{
                    background: `radial-gradient(circle, ${design.color}40, ${design.color}15)`,
                    border: `2px solid ${design.color}30`,
                  }}>
                    <div className="w-full h-full flex items-center justify-center">
                      <span className="text-[8px] tracking-[0.3em] uppercase text-red/50 font-sans font-medium">
                        {design.name.charAt(0)}
                      </span>
                    </div>
                  </div>
                </div>
              </div>
              <span className="text-[1.4rem] font-sans font-medium text-white/80 group-hover:text-red transition-colors">
                {design.name}
              </span>
            </a>
          ))}
        </div>
      </div>
    </section>
  );
}
