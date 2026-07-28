"use client";

import { useRef, useEffect } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { FiHeart } from "react-icons/fi";
import { PRODUCTS } from "@/lib/constants";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

const allProducts = [...PRODUCTS.mistCollection, ...PRODUCTS.hangingCollection];

function ProductCard({ product, index }: { product: (typeof allProducts)[0]; index: number }) {
  return (
    <div className="product-card group relative flex flex-col">
      {/* Image area */}
      <div className="relative aspect-[3/4] overflow-hidden bg-ink-soft border border-white/5">
        <div className="absolute inset-0 transition-transform duration-600 group-hover:scale-105">
          <img
            src={product.image}
            alt={product.name}
            className="w-full h-full object-cover"
            loading="lazy"
          />
        </div>

        {/* Wishlist button */}
        <button
          className="absolute top-3 right-3 w-8 h-8 flex items-center justify-center rounded-full bg-black/40 text-white/60 hover:text-red hover:bg-black/60 transition-all z-10"
          aria-label="Add to wishlist"
        >
          <FiHeart className="w-4 h-4" strokeWidth={1.5} />
        </button>

        {/* Badge */}
        <div className="absolute top-3 left-3 bg-red text-ink text-[9px] font-sans font-semibold uppercase tracking-[0.1em] px-2.5 py-1">
          {index < 4 ? "Mist" : "Hanging"}
        </div>
      </div>

      {/* Info */}
      <div className="flex flex-col pt-4 pb-2">
        <span className="text-[1.2rem] font-sans font-medium text-red uppercase tracking-[0.08em]">
          {product.name}
        </span>
        <p className="text-[1.3rem] font-sans text-white/50 mt-0.5 line-clamp-1">
          {product.description}
        </p>
        <div className="flex items-center gap-2 mt-2">
          <span className="text-[1.6rem] font-sans font-medium text-white">
            Rs. {product.price}
          </span>
        </div>

        {/* Scent notes */}
        <div className="flex flex-wrap gap-1.5 mt-3">
          {product.notes.map((note) => (
            <span
              key={note}
              className="text-[9px] font-sans uppercase tracking-[0.1em] px-2 py-1 border border-white/10 text-white/40"
            >
              {note}
            </span>
          ))}
        </div>
      </div>

      {/* Add to Cart button */}
      <button className="btn-primary w-full mt-3 py-3 px-4 text-[1.1rem]">
        Add to Cart
      </button>
    </div>
  );
}

export default function FeaturedProducts() {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!ref.current) return;
    const ctx = gsap.context(() => {
      gsap.fromTo(
        ".product-card",
        { opacity: 0, y: 40 },
        {
          opacity: 1,
          y: 0,
          duration: 0.8,
          stagger: 0.12,
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
    <section id="featured" ref={ref} className="section-padding">
      <div className="mx-auto max-w-7xl">
        {/* Section header */}
        <div className="text-center mb-14">
          <p className="section-overline">Best Selling</p>
          <h2 className="section-heading">Best Selling Fragrances</h2>
          <p className="section-subheading">
            The premium car fragrances our customers love most. Each crafted with
            Japanese fragrance oils for an unforgettable drive.
          </p>
        </div>

        {/* Product grid */}
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {allProducts.map((product, i) => (
            <ProductCard key={product.id} product={product} index={i} />
          ))}
        </div>

        {/* Bottom CTA */}
        <div className="flex justify-center mt-14">
          <a href="#" className="btn-secondary">
            Shop All Fragrances
          </a>
        </div>
      </div>
    </section>
  );
}
