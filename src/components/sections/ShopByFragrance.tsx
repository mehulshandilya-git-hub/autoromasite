"use client";

import { useRef, useEffect } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { FiWind, FiDroplet, FiSun, FiCoffee, FiHeart } from "react-icons/fi";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

const families = [
  { name: "Floral", tagline: "Soft & elegant", icon: FiHeart, color: "#C9A0DC" },
  { name: "Fresh", tagline: "Clean & calming", icon: FiWind, color: "#6FCF97" },
  { name: "Woody", tagline: "Warm & grounded", icon: FiCoffee, color: "#8B5E3C" },
  { name: "Citrus", tagline: "Bright & zesty", icon: FiSun, color: "#F2C94C" },
  { name: "Sweet", tagline: "Rich & indulgent", icon: FiDroplet, color: "#E8D5A3" },
];

export default function ShopByFragrance() {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!ref.current) return;
    const ctx = gsap.context(() => {
      gsap.fromTo(
        ".frag-card",
        { opacity: 0, y: 30 },
        {
          opacity: 1,
          y: 0,
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
    <section ref={ref} className="section-padding border-t border-white/5">
      <div className="mx-auto max-w-7xl">
        {/* Section header */}
        <div className="text-center mb-14">
          <p className="section-overline">Fragrance Families</p>
          <h2 className="section-heading">Find Your Fragrance Family</h2>
          <p className="section-subheading">
            Five families. Fifteen Japanese-crafted scents. Whether you prefer
            fresh florals or warm woods, there&apos;s a fragrance waiting for you.
          </p>
        </div>

        {/* Cards grid */}
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-5">
          {families.map((family) => (
            <a
              key={family.name}
              href="#featured"
              className="frag-card group relative flex flex-col items-center text-center p-8 border border-white/10 hover:border-gold/30 transition-all duration-250 hover:-translate-y-1 hover:shadow-[0_10px_40px_rgba(0,0,0,0.3)]"
            >
              {/* Icon */}
              <div className="mb-5 transition-transform duration-250 group-hover:scale-110" style={{ color: family.color }}>
                <family.icon className="w-10 h-10" strokeWidth={1} />
              </div>

              {/* Name */}
              <h3 className="text-[1.6rem] font-display font-normal text-white mb-1.5">
                {family.name}
              </h3>

              {/* Tagline */}
              <p className="text-[1.2rem] font-sans text-white/40 mb-5">
                {family.tagline}
              </p>

              {/* CTA underline */}
              <span className="inline-flex items-center gap-1 text-[1.2rem] font-sans font-medium text-gold/60 group-hover:text-gold transition-colors">
                Shop
                <span className="inline-block transition-transform duration-250 group-hover:translate-x-1">→</span>
              </span>

              {/* Hover underline */}
              <span className="absolute bottom-0 left-0 right-0 h-[2px] bg-gold scale-x-0 group-hover:scale-x-100 transition-transform duration-450 origin-left" />
            </a>
          ))}
        </div>
      </div>
    </section>
  );
}
