"use client";

import { useRef, useEffect } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

import { PRODUCTS } from "@/lib/constants";

const allProducts = [...PRODUCTS.mistCollection, ...PRODUCTS.hangingCollection];

function ProductSlide({
  product,
  index,
}: {
  product: (typeof allProducts)[0];
  index: number;
}) {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!ref.current) return;
    const el = ref.current;

    const ctx = gsap.context(() => {
      gsap.fromTo(
        el.querySelector(".product-image"),
        { opacity: 0, x: -80, filter: "blur(15px)" },
        {
          opacity: 1,
          x: 0,
          filter: "blur(0px)",
          duration: 1,
          ease: "power3.out",
          scrollTrigger: {
            trigger: el,
            start: "top 60%",
            end: "top 20%",
            toggleActions: "play none none reverse",
          },
        }
      );

      gsap.fromTo(
        el.querySelector(".product-info"),
        { opacity: 0, x: 80, filter: "blur(15px)" },
        {
          opacity: 1,
          x: 0,
          filter: "blur(0px)",
          duration: 1,
          ease: "power3.out",
          scrollTrigger: {
            trigger: el,
            start: "top 55%",
            end: "top 15%",
            toggleActions: "play none none reverse",
          },
        }
      );
    }, ref);

    return () => ctx.revert();
  }, []);

  return (
    <div
      ref={ref}
      className="min-h-screen flex items-center px-6 md:px-12 lg:px-24"
    >
      <div className="w-full max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-20 items-center">
        {/* LEFT — Product Image */}
        <div className="product-image flex justify-center lg:justify-end">
          <div className="relative w-full max-w-sm">
            {/* Bottle */}
            <div
              className="relative mx-auto"
              style={{ width: "200px", height: "320px" }}
            >
              {/* Main body */}
              <div
                className="absolute bottom-0 left-1/2 -translate-x-1/2 rounded-sm"
                style={{
                  width: "140px",
                  height: "220px",
                  background: `linear-gradient(180deg, ${product.accentColor}15 0%, ${product.color} 40%, ${product.color} 100%)`,
                  border: `1px solid ${product.accentColor}20`,
                  boxShadow: `0 30px 80px ${product.color}80, 0 0 40px ${product.accentColor}15`,
                }}
              >
                {/* Label accent line */}
                <div
                  className="absolute top-1/3 left-6 right-6 h-[1px]"
                  style={{ background: `${product.accentColor}40` }}
                />
                {/* Brand */}
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-center">
                  <span
                    className="text-[8px] tracking-[0.4em] uppercase font-bold block"
                    style={{ color: product.accentColor }}
                  >
                    AutoRoma
                  </span>
                  <span
                    className="text-[6px] tracking-[0.2em] uppercase block mt-1 opacity-50"
                    style={{ color: product.accentColor }}
                  >
                    {product.name}
                  </span>
                </div>
              </div>

              {/* Neck */}
              <div
                className="absolute left-1/2 -translate-x-1/2 rounded-t-sm"
                style={{
                  width: "30px",
                  height: "50px",
                  bottom: "220px",
                  background: product.accentColor,
                  boxShadow: `0 -5px 20px ${product.accentColor}40`,
                }}
              />

              {/* Cap */}
              <div
                className="absolute left-1/2 -translate-x-1/2"
                style={{
                  width: "40px",
                  height: "30px",
                  bottom: "270px",
                  background: `linear-gradient(180deg, ${product.accentColor}, ${product.accentColor}cc)`,
                  borderRadius: "2px 2px 0 0",
                }}
              />

              {/* Ambient glow */}
              <div
                className="absolute -inset-16 -z-10 rounded-full"
                style={{
                  background: `radial-gradient(circle, ${product.accentColor}12, transparent 70%)`,
                }}
              />
            </div>

            {/* Price tag floating */}
            <div
              className="absolute -right-2 bottom-16 px-4 py-2 text-center"
              style={{
                background: "#050608",
                border: `1px solid ${product.accentColor}30`,
              }}
            >
              <span className="block text-xl font-semibold text-white font-inter">
                ₹{product.price}
              </span>
              <span className="block text-[8px] tracking-[0.2em] uppercase text-white/30 font-inter">
                MRP Inclusive
              </span>
            </div>
          </div>
        </div>

        {/* RIGHT — Product Info */}
        <div className="product-info space-y-6">
          {/* Number */}
          <span className="text-[10px] tracking-[0.3em] uppercase text-red/60 font-inter font-bold">
            {String(index + 1).padStart(2, "0")} / {String(allProducts.length).padStart(2, "0")}
          </span>

          {/* Name */}
          <h2 className="font-display text-4xl sm:text-5xl lg:text-6xl font-light text-white leading-[1.1]">
            {product.name}
          </h2>

          {/* Description */}
          <p className="text-sm sm:text-base text-white/40 font-inter font-light leading-relaxed max-w-md">
            {product.description}
          </p>

          {/* Scent notes */}
          <div className="flex flex-wrap gap-2">
            {product.notes.map((note) => (
              <span
                key={note}
                className="text-[9px] sm:text-[10px] uppercase tracking-[0.2em] font-bold px-4 py-2 font-inter"
                style={{
                  color: product.accentColor,
                  border: `1px solid ${product.accentColor}25`,
                  background: `${product.accentColor}08`,
                }}
              >
                {note}
              </span>
            ))}
          </div>

          {/* CTA */}
          <div className="flex items-center gap-5 pt-4">
            <button
              className="px-8 py-3.5 text-[11px] uppercase tracking-[0.2em] font-bold font-inter text-black transition-all duration-300 hover:shadow-[0_0_30px_rgba(242, 29, 47,0.25)]"
              style={{
                background: `linear-gradient(135deg, ${product.accentColor}, ${product.accentColor}cc)`,
              }}
            >
              Add to Bag
            </button>
            <button className="px-8 py-3.5 text-[11px] uppercase tracking-[0.2em] font-bold font-inter text-white/60 border border-white/10 hover:border-white/30 hover:text-white transition-all duration-300">
              Details
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default function CollectionSlide() {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!containerRef.current) return;

    const ctx = gsap.context(() => {
      gsap.fromTo(
        ".collection-header",
        { opacity: 0, y: 40 },
        {
          opacity: 1,
          y: 0,
          duration: 1,
          ease: "power3.out",
          scrollTrigger: {
            trigger: ".collection-header",
            start: "top 70%",
          },
        }
      );
    }, containerRef);

    return () => ctx.revert();
  }, []);

  return (
    <div ref={containerRef}>
      {/* Section header */}
      <div className="collection-header text-center pt-20 pb-10 px-6 opacity-0">
        <span className="text-[10px] sm:text-xs font-inter font-bold uppercase tracking-[0.25em] text-red block">
          Our Collection
        </span>
        <h2 className="mt-3 font-display text-3xl sm:text-4xl lg:text-5xl font-light text-white">
          Crafted for Every Journey
        </h2>
      </div>

      {/* Products — one per screen */}
      {allProducts.map((product, i) => (
        <ProductSlide key={product.id} product={product} index={i} />
      ))}
    </div>
  );
}
