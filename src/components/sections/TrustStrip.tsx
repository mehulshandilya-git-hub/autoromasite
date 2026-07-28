"use client";

import { useRef, useEffect } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { FiClock, FiStar, FiShield, FiTruck } from "react-icons/fi";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

const TRUST_ITEMS = [
  { icon: FiClock, label: "Lasts up to 45 days" },
  { icon: FiStar, label: "Premium Japanese Oils" },
  { icon: FiShield, label: "Pregnancy & Kid Safe" },
  { icon: FiTruck, label: "Free Shipping Across India" },
];

export default function TrustStrip() {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const ctx = gsap.context(() => {
      gsap.fromTo(
        el.querySelectorAll(".trust-item"),
        { opacity: 0, y: 20 },
        {
          opacity: 1,
          y: 0,
          duration: 0.8,
          stagger: 0.15,
          ease: "power3.out",
          scrollTrigger: {
            trigger: ref.current,
            start: "top 85%",
          },
        }
      );
    }, ref);
    return () => ctx.revert();
  }, []);

  return (
    <div
      ref={ref}
      className="border-y border-white/5 bg-ink"
    >
      <div className="mx-auto max-w-7xl px-6 md:px-12 lg:px-24">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 py-10 md:py-12">
          {TRUST_ITEMS.map((item) => (
            <div
              key={item.label}
              className="trust-item flex flex-col items-center text-center gap-3"
            >
              <item.icon className="w-6 h-6 text-red" strokeWidth={1.5} />
              <span className="text-[1.2rem] font-sans font-medium text-white/80 uppercase tracking-[0.08em]">
                {item.label}
              </span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
