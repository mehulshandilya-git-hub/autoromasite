"use client";

import { useState, useEffect } from "react";

const ANNOUNCEMENTS = [
  "Free Shipping All Over India \u00b7 15% Sale on Your First Order",
  "Buy 4 Get 1 Free \u2014 Mix & Match Any Fragrances",
];

export default function AnnouncementBar() {
  const [current, setCurrent] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrent((prev) => (prev + 1) % ANNOUNCEMENTS.length);
    }, 4000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="bg-ink border-b border-white/5 text-white text-center py-2.5 px-4 overflow-hidden">
      <div className="relative h-[1.8rem]">
        {ANNOUNCEMENTS.map((text, i) => (
          <p
            key={i}
            className="absolute inset-0 flex items-center justify-center text-[1.1rem] tracking-[0.08em] font-sans font-medium transition-all duration-500"
            style={{
              opacity: i === current ? 1 : 0,
              transform: `translateY(${i === current ? 0 : i < current ? -12 : 12}px)`,
              pointerEvents: i === current ? "auto" : "none",
            }}
          >
            {text}
          </p>
        ))}
      </div>
    </div>
  );
}
