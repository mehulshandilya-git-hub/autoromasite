"use client";

import { useRef, useEffect } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

import { PRODUCTS } from "@/lib/constants";
import { useCart } from "@/context/CartContext";
import { useWishlist } from "@/context/WishlistContext";
import type { CartItem } from "@/context/CartContext";

const allProducts = [...PRODUCTS.mistCollection, ...PRODUCTS.hangingCollection];

function ProductSlide({
  product,
  index,
}: {
  product: (typeof allProducts)[0];
  index: number;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const { addItem } = useCart();
  const { toggleItem, isWishlisted } = useWishlist();
  const wishlisted = isWishlisted(product.id);

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
            <div className="relative mx-auto w-[280px] h-[360px] overflow-hidden border border-white/10">
              <img
                src={product.image}
                alt={product.name}
                className="w-full h-full object-cover"
              />
              <button
                onClick={() =>
                  toggleItem({
                    id: product.id,
                    name: product.name,
                    price: product.price,
                    image: product.image,
                    notes: product.notes,
                    accentColor: product.accentColor,
                    description: product.description,
                  })
                }
                className="absolute top-4 right-4 w-12 h-12 flex items-center justify-center rounded-full bg-black/60 text-white/70 hover:text-red hover:bg-black/80 transition-all z-10"
                aria-label={wishlisted ? "Remove from wishlist" : "Add to wishlist"}
              >
                <svg
                  className="w-6 h-6"
                  viewBox="0 0 24 24"
                  fill={wishlisted ? "#f21d2f" : "none"}
                  stroke="currentColor"
                  strokeWidth="1.5"
                >
                  <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z" />
                </svg>
              </button>
            </div>

            <div
              className="absolute -right-4 bottom-12 px-5 py-3 text-center"
              style={{ background: "#050608", border: "1px solid rgba(255,255,255,0.15)" }}
            >
              <span className="block text-2xl font-semibold text-white font-sans">
                Rs. {product.price}
              </span>
              <span className="block text-[9px] tracking-[0.2em] uppercase text-white/30 font-sans">
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
              onClick={() =>
                addItem({
                  id: product.id,
                  name: product.name,
                  price: product.price,
                  image: product.image,
                  notes: product.notes,
                  accentColor: product.accentColor,
                  description: product.description,
                })
              }
              className="px-10 py-4 text-[1.2rem] uppercase tracking-[0.2em] font-bold font-sans text-white transition-all duration-300 bg-red hover:bg-red-dark"
            >
              Add to Bag
            </button>
            <button className="px-10 py-4 text-[1.2rem] uppercase tracking-[0.2em] font-bold font-sans text-white/60 border border-white/20 hover:border-white/50 hover:text-white transition-all duration-300">
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
