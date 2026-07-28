"use client";

import { useEffect, useRef, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import gsap from "gsap";

interface LoaderProps {
  onComplete: () => void;
}

export default function IntroLoader({ onComplete }: LoaderProps) {
  const [phase, setPhase] = useState<"logo" | "tagline" | "fade">("logo");
  const containerRef = useRef<HTMLDivElement>(null);
  const logoRef = useRef<HTMLDivElement>(null);
  const particlesRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const tl = gsap.timeline({
      onComplete: () => {
        setTimeout(() => onComplete(), 200);
      },
    });

    tl.to({}, { duration: 1.2 })
      .call(() => setPhase("tagline"))
      .to({}, { duration: 1.8 })
      .call(() => setPhase("fade"))
      .to(containerRef.current, {
        opacity: 0,
        duration: 1.0,
        ease: "power2.inOut",
      });

    return () => {
      tl.kill();
    };
  }, [onComplete]);

  useEffect(() => {
    if (!particlesRef.current) return;
    const particles: HTMLElement[] = [];
    for (let i = 0; i < 40; i++) {
      const p = document.createElement("div");
      p.className = "absolute rounded-full";
      const size = Math.random() * 4 + 1;
      p.style.width = `${size}px`;
      p.style.height = `${size}px`;
      p.style.left = `${Math.random() * 100}%`;
      p.style.top = `${Math.random() * 100}%`;
      p.style.background = `radial-gradient(circle, rgba(242, 29, 47,${Math.random() * 0.6 + 0.2}), transparent)`;
      p.style.boxShadow = `0 0 ${size * 3}px rgba(242, 29, 47,0.3)`;
      particlesRef.current.appendChild(p);
      particles.push(p);

      gsap.to(p, {
        y: -200 - Math.random() * 300,
        x: (Math.random() - 0.5) * 100,
        opacity: 0,
        duration: 3 + Math.random() * 4,
        repeat: -1,
        delay: Math.random() * 3,
        ease: "none",
      });
    }
    return () => {
      particles.forEach((p) => p.remove());
    };
  }, []);

  return (
    <AnimatePresence>
      <motion.div
        ref={containerRef}
        className="fixed inset-0 z-[9999] flex items-center justify-center bg-black"
        initial={{ opacity: 1 }}
      >
        {/* Volumetric light sweep */}
        <div
          className="absolute inset-0 opacity-20"
          style={{
            background:
              "radial-gradient(ellipse 600px 400px at 50% 50%, rgba(242, 29, 47,0.15), transparent)",
          }}
        />

        {/* Particles */}
        <div ref={particlesRef} className="absolute inset-0 overflow-hidden" />

        {/* Logo */}
        <div className="relative flex flex-col items-center gap-8">
          <motion.div
            ref={logoRef}
            initial={{ opacity: 0, scale: 0.8, filter: "blur(20px)" }}
            animate={{ opacity: 1, scale: 1, filter: "blur(0px)" }}
            transition={{ duration: 1.5, ease: [0.16, 1, 0.3, 1] }}
            className="relative"
          >
            <h1
              className="text-6xl md:text-8xl font-light tracking-[0.3em] uppercase"
              style={{ fontFamily: "var(--font-geist-sans)" }}
            >
              <span className="red-gradient">Auto</span>
              <span className="text-white">Roma</span>
            </h1>
            <motion.div
              initial={{ scaleX: 0 }}
              animate={{ scaleX: 1 }}
              transition={{ duration: 1.2, delay: 0.5, ease: [0.16, 1, 0.3, 1] }}
              className="mt-4 h-[1px] mx-auto origin-center"
              style={{
                background: "linear-gradient(90deg, transparent, #f21d2f, transparent)",
                width: "80%",
              }}
            />
          </motion.div>

          {/* Tagline */}
          <AnimatePresence>
            {phase === "tagline" || phase === "fade" ? (
              <motion.p
                initial={{ opacity: 0, y: 20, filter: "blur(10px)" }}
                animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
                exit={{ opacity: 0 }}
                transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1] }}
                className="text-sm md:text-base tracking-[0.5em] uppercase text-white/60 font-light"
              >
                Luxury Has A New Fragrance
              </motion.p>
            ) : null}
          </AnimatePresence>
        </div>

        {/* Bottom subtle gradient */}
        <div
          className="absolute bottom-0 left-0 right-0 h-32"
          style={{
            background: "linear-gradient(to top, rgba(242, 29, 47,0.03), transparent)",
          }}
        />
      </motion.div>
    </AnimatePresence>
  );
}
