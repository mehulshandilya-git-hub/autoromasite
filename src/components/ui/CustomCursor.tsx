"use client";

import { useEffect, useRef, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useMousePosition } from "@/hooks/useAnimation";

export default function CustomCursor() {
  const { position, smoothPosition } = useMousePosition();
  const [isHovering, setIsHovering] = useState(false);
  const [isPressed, setIsPressed] = useState(false);
  const [trail, setTrail] = useState<{ x: number; y: number; id: number }[]>([]);
  const trailIdRef = useRef(0);

  useEffect(() => {
    const handleMouseOver = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      if (
        target.closest("button") ||
        target.closest("a") ||
        target.closest("[data-cursor-hover]") ||
        target.closest("[data-cursor-magnetic]")
      ) {
        setIsHovering(true);
      } else {
        setIsHovering(false);
      }
    };
    const handleMouseDown = () => setIsPressed(true);
    const handleMouseUp = () => setIsPressed(false);

    window.addEventListener("mouseover", handleMouseOver);
    window.addEventListener("mousedown", handleMouseDown);
    window.addEventListener("mouseup", handleMouseUp);
    return () => {
      window.removeEventListener("mouseover", handleMouseOver);
      window.removeEventListener("mousedown", handleMouseDown);
      window.removeEventListener("mouseup", handleMouseUp);
    };
  }, []);

  useEffect(() => {
    const interval = setInterval(() => {
      trailIdRef.current += 1;
      setTrail((prev) => [
        ...prev.slice(-12),
        { x: smoothPosition.x, y: smoothPosition.y, id: trailIdRef.current },
      ]);
    }, 40);
    return () => clearInterval(interval);
  }, [smoothPosition]);

  useEffect(() => {
    setTrail((prev) => prev.filter((t) => Date.now() - t.id * 40 < 500));
  }, [trail]);

  const cursorSize = isHovering ? 60 : isPressed ? 32 : 20;

  return (
    <div className="pointer-events-none fixed inset-0 z-[10000]">
      <AnimatePresence>
        {trail.map((point) => (
          <motion.div
            key={point.id}
            initial={{ opacity: 0.4, scale: 1 }}
            animate={{ opacity: 0, scale: 0 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.5 }}
            className="absolute rounded-full"
            style={{
              left: point.x - 3,
              top: point.y - 3,
              width: 6,
              height: 6,
              background: "radial-gradient(circle, rgba(242, 29, 47,0.6), transparent)",
            }}
          />
        ))}
      </AnimatePresence>

      {/* Outer glow ring */}
      <motion.div
        className="absolute rounded-full"
        animate={{
          x: smoothPosition.x - cursorSize / 2,
          y: smoothPosition.y - cursorSize / 2,
          width: cursorSize,
          height: cursorSize,
          scale: isPressed ? 0.85 : 1,
        }}
        transition={{ type: "tween", duration: 0.15, ease: "easeOut" }}
        style={{
          border: "1px solid rgba(242, 29, 47, 0.5)",
          boxShadow: isHovering
            ? "0 0 30px rgba(242, 29, 47, 0.4), 0 0 60px rgba(242, 29, 47, 0.1)"
            : "0 0 15px rgba(242, 29, 47, 0.2)",
        }}
      />

      {/* Inner dot */}
      <motion.div
        className="absolute rounded-full"
        animate={{
          x: position.x - 4,
          y: position.y - 4,
          scale: isPressed ? 0.5 : 1,
        }}
        transition={{ type: "tween", duration: 0.05 }}
        style={{
          width: 8,
          height: 8,
          background: "radial-gradient(circle, #f21d2f, #a80f1d)",
          boxShadow: "0 0 10px rgba(242, 29, 47, 0.6)",
        }}
      />
    </div>
  );
}
