"use client";
import { useState, useEffect } from "react";

export function StickyNav() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const onScroll = () => {
      // Appear after the portal zone (~300vh = 3 viewport heights)
      setVisible(window.scrollY > window.innerHeight * 2.5);
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <div
      className="fixed top-0 inset-x-0 z-50 h-12 flex items-center justify-between px-8 border-b border-white/[0.06]"
      style={{
        background: "rgba(0,0,0,0.82)",
        backdropFilter: "blur(12px)",
        WebkitBackdropFilter: "blur(12px)",
        opacity: visible ? 1 : 0,
        transform: visible ? "translateY(0)" : "translateY(-100%)",
        pointerEvents: visible ? "auto" : "none",
        transition: "opacity 0.4s ease, transform 0.4s cubic-bezier(0.16,1,0.3,1)",
      }}
    >
      <span className="text-sm font-black text-white tracking-tight">
        Found It<span style={{ color: "#2563EB" }}>!</span>
      </span>
      <a
        href="#waitlist"
        className="text-[11px] font-mono tracking-[0.2em] uppercase text-white/40 hover:text-white/70 transition-colors"
      >
        Join waitlist
      </a>
    </div>
  );
}
