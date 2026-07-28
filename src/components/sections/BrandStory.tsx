"use client";

import { useRef, useEffect } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

export default function BrandStory() {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!ref.current) return;
    const ctx = gsap.context(() => {
      gsap.fromTo(
        ".story-image",
        { opacity: 0, x: -60 },
        {
          opacity: 1,
          x: 0,
          duration: 1,
          ease: "power3.out",
          scrollTrigger: {
            trigger: ref.current,
            start: "top 70%",
          },
        }
      );
      gsap.fromTo(
        ".story-text > *",
        { opacity: 0, y: 30 },
        {
          opacity: 1,
          y: 0,
          duration: 0.8,
          stagger: 0.15,
          ease: "power3.out",
          scrollTrigger: {
            trigger: ref.current,
            start: "top 65%",
          },
        }
      );
    }, ref);
    return () => ctx.revert();
  }, []);

  return (
    <section id="story" ref={ref} className="section-padding">
      <div className="mx-auto max-w-7xl">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-center">
          {/* Image */}
          <div className="story-image relative">
            <div className="aspect-square max-w-lg mx-auto lg:mx-0 overflow-hidden border border-white/5">
              <div
                className="w-full h-full flex items-center justify-center"
                style={{
                  background: "linear-gradient(135deg, rgba(242, 29, 47,0.08), rgba(10,10,10,1) 60%)",
                }}
              >
                {/* Stylized product display */}
                <div className="relative">
                  <div className="w-40 h-56 md:w-48 md:h-64 rounded-sm" style={{
                    background: "linear-gradient(180deg, rgba(242, 29, 47,0.2), rgba(139,94,60,0.6))",
                    border: "1px solid rgba(242, 29, 47,0.2)",
                  }}>
                    <div className="absolute top-1/3 left-6 right-6 h-[1px]" style={{ background: "rgba(242, 29, 47,0.3)" }} />
                    <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-center">
                      <span className="text-[8px] tracking-[0.4em] uppercase block text-red/60">AutoRoma</span>
                    </div>
                  </div>
                  {/* Ambient glow */}
                  <div className="absolute -inset-10 -z-10 rounded-full" style={{
                    background: "radial-gradient(circle, rgba(242, 29, 47,0.08), transparent 70%)",
                  }} />
                </div>
              </div>
            </div>
          </div>

          {/* Text */}
          <div className="story-text space-y-6">
            <p className="section-overline">Our Story</p>
            <h2 className="section-heading">
              Born from a simple belief.
            </h2>
            <p className="text-[1.5rem] md:text-[1.7rem] text-white/50 font-sans font-light leading-relaxed">
              AutoRoma was born from a simple belief: your car deserves the same
              luxury as your home. Every fragrance is an invitation to elevate
              your daily drive.
            </p>
            <p className="text-[1.5rem] md:text-[1.7rem] text-white/40 font-sans font-light leading-relaxed">
              We partner with master perfumers and use only the finest
              Japanese fragrance oils to create scents that transform your
              vehicle into a sanctuary of sophistication.
            </p>
            <a href="#" className="btn-secondary inline-flex mt-4">
              Read Our Story
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
