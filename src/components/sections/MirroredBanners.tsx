"use client";

import { useRef, useEffect } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

const BANNERS = [
  {
    eyebrow: "For the Drive",
    heading: "Designed for Your Car",
    body: "Sculpted resin figurines that complement your dashboard. Japanese fragrance oils that transform every journey. Engineered for the road.",
    cta: "Shop Car Fragrances",
    href: "#featured",
    side: "left" as const,
  },
  {
    eyebrow: "For the Everyday",
    heading: "At Home, In Every Room",
    body: "Take the same luxury fragrance experience beyond the car. Our versatile mists and diffusers bring AutoRoma elegance to any space.",
    cta: "Shop Home Fragrances",
    href: "#featured",
    side: "right" as const,
  },
];

function BannerRow({
  banner,
  index,
}: {
  banner: (typeof BANNERS)[0];
  index: number;
}) {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const ctx = gsap.context(() => {
      gsap.fromTo(
        el.querySelectorAll(".banner-animate"),
        { opacity: 0, y: 30 },
        {
          opacity: 1,
          y: 0,
          duration: 0.8,
          stagger: 0.15,
          ease: "power3.out",
          scrollTrigger: {
            trigger: el,
            start: "top 75%",
          },
        }
      );
    }, ref);
    return () => ctx.revert();
  }, []);

  const isLeft = banner.side === "left";

  return (
    <div ref={ref} className="grid grid-cols-1 lg:grid-cols-2 min-h-[420px] max-h-[520px]">
      {/* Image side */}
      <div
        className={`relative min-h-[300px] lg:min-h-full overflow-hidden border border-white/5 ${
          isLeft ? "lg:order-1" : "lg:order-2"
        }`}
      >
        <div className="absolute inset-0 flex items-center justify-center" style={{
          background: `linear-gradient(135deg, rgba(242, 29, 47,0.06), rgba(10,10,10,1) 60%)`,
        }}>
          <div className="relative">
            <div className="w-32 h-40 md:w-40 md:h-52 rounded-sm" style={{
              background: `linear-gradient(180deg, rgba(242, 29, 47,0.15), rgba(139,94,60,0.5))`,
              border: "1px solid rgba(242, 29, 47,0.15)",
            }}>
              <div className="absolute inset-0 flex items-center justify-center">
                <span className="text-[10px] tracking-[0.4em] uppercase text-red/40 font-sans font-medium">
                  {index === 0 ? "Car" : "Home"}
                </span>
              </div>
            </div>
            <div className="absolute -inset-8 -z-10 rounded-full" style={{
              background: `radial-gradient(circle, rgba(242, 29, 47,0.06), transparent 70%)`,
            }} />
          </div>
        </div>
      </div>

      {/* Text side */}
      <div
        className={`flex items-center px-8 md:px-16 py-12 lg:py-0 ${
          isLeft ? "lg:order-2" : "lg:order-1"
        }`}
      >
        <div className="max-w-lg">
          <p className="section-overline banner-animate">{banner.eyebrow}</p>
          <h2 className="section-heading banner-animate" style={{ fontSize: "clamp(2.8rem, 3.5vw, 4rem)" }}>
            {banner.heading}
          </h2>
          <p className="text-[1.5rem] text-white/40 font-sans font-light leading-relaxed banner-animate">
            {banner.body}
          </p>
          <div className="mt-8 banner-animate">
            <a href={banner.href} className="btn-primary">
              {banner.cta}
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}

export default function MirroredBanners() {
  return (
    <section className="border-t border-white/5">
      <div className="mx-auto max-w-7xl">
        <div className="flex flex-col divide-y divide-white/5">
          {BANNERS.map((banner, i) => (
            <BannerRow key={i} banner={banner} index={i} />
          ))}
        </div>
      </div>
    </section>
  );
}
