"use client";

import { useRef, useEffect } from "react";
import gsap from "gsap";

export default function HeroSection() {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!ref.current) return;
    const ctx = gsap.context(() => {
      gsap.fromTo(
        ".hero-content > *",
        { opacity: 0, y: 40 },
        {
          opacity: 1,
          y: 0,
          duration: 1.2,
          stagger: 0.2,
          ease: "power3.out",
          delay: 0.5,
        }
      );
    }, ref);
    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={ref}
      className="relative flex items-center justify-center min-h-screen overflow-hidden"
    >
      {/* Background video */}
      <video
        autoPlay
        muted
        loop
        playsInline
        className="absolute inset-0 w-full h-full object-cover"
      >
        <source src="/videos/bg.mp4" type="video/mp4" />
      </video>
      <div className="absolute inset-0 bg-gradient-to-b from-black/40 via-black/20 to-black/60" />

      {/* Decorative gold gradient */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-[60vw] h-[40vh] opacity-20" style={{
        background: "radial-gradient(ellipse, rgba(242, 29, 47,0.2), transparent 70%)",
        pointerEvents: "none",
      }} />

      {/* Content */}
      <div className="hero-content relative z-10 text-center px-6 max-w-4xl mx-auto">
        <p className="section-overline mb-4">Premium Car Fragrances</p>
        <h1
          className="text-[clamp(4rem,8vw,10rem)] font-display font-light leading-[1.05] tracking-[0.01em] text-white mb-6"
        >
          Fresh Air.
          <br />
          <span className="text-red">Natural Comfort.</span>
        </h1>
        <p className="text-[1.5rem] md:text-[1.7rem] text-white/60 font-sans font-light max-w-[62ch] mx-auto mb-10 leading-relaxed">
          Transform every drive into a sensory journey with AutoRoma premium
          car fragrances. Crafted for those who demand more from the road.
        </p>
        <div className="flex flex-wrap items-center justify-center gap-4">
          <a href="#featured" className="btn-primary">
            Explore Collection
          </a>
          <a href="#story" className="btn-secondary">
            Our Story
          </a>
        </div>
      </div>

      {/* Scroll indicator */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 text-white/30">
        <span className="text-[1rem] tracking-[0.15em] uppercase font-sans font-medium">
          Scroll
        </span>
        <div className="scroll-indicator w-[1px] h-8 bg-gradient-to-b from-red/60 to-transparent" />
      </div>
    </section>
  );
}
