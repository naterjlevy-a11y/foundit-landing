"use client";
import { useRef, useState } from "react";
import { motion, useScroll, useTransform, AnimatePresence } from "framer-motion";
import { GlassLens } from "@/components/intro/GlassLens";
import { useMagnetic } from "@/components/cursor/CustomCursor";

function PrimaryCTA() {
  const mag = useMagnetic(0.45);
  const [hovered, setHovered] = useState(false);
  return (
    <motion.a
      href="#waitlist"
      ref={mag.ref as React.RefObject<HTMLAnchorElement>}
      style={{ ...mag.style, boxShadow: "0 0 40px rgba(37,99,235,0.4), 0 8px 24px rgba(37,99,235,0.25)" }}
      onMouseMove={mag.onMouseMove as unknown as React.MouseEventHandler<HTMLAnchorElement>}
      onMouseLeave={(e) => {
        (mag.onMouseLeave as unknown as React.MouseEventHandler<HTMLAnchorElement>)(e);
        setHovered(false);
      }}
      onMouseEnter={() => setHovered(true)}
      data-magnetic
      className="relative px-8 py-4 rounded-full bg-[#2563EB] text-white text-[15px] font-bold tracking-wide overflow-hidden h-14 min-w-[200px] flex items-center justify-center"
    >
      <AnimatePresence mode="wait">
        <motion.span
          key={hovered ? "h" : "d"}
          initial={{ opacity: 0, y: hovered ? 8 : -8 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: hovered ? -8 : 8 }}
          transition={{ duration: 0.15 }}
          className="absolute inset-0 flex items-center justify-center"
        >
          {hovered ? "Join the waitlist →" : "Get early access"}
        </motion.span>
      </AnimatePresence>
    </motion.a>
  );
}

export function Hero() {
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollY } = useScroll();

  const glassY      = useTransform(scrollY, [0, 700], [0, -100]);
  const headlineY   = useTransform(scrollY, [0, 700], [0, -50]);
  const subtextY    = useTransform(scrollY, [0, 700], [0, -20]);
  const sectionOpacity = useTransform(scrollY, [0, 500], [1, 0]);

  return (
    <section
      ref={containerRef}
      className="relative min-h-screen flex flex-col items-center justify-center overflow-hidden"
      style={{ paddingTop: "64px" }}
    >
      {/* Background atmosphere */}
      <div className="absolute inset-0 pointer-events-none">
        {/* Top center radial glow */}
        <div style={{
          position: "absolute", top: "-10%", left: "50%", transform: "translateX(-50%)",
          width: "80vw", maxWidth: "900px", height: "60vh",
          background: "radial-gradient(ellipse 100% 100%, rgba(20,40,160,0.14) 0%, transparent 70%)",
          filter: "blur(40px)",
        }} />
        {/* Subtle grid lines */}
        <div style={{
          position: "absolute", inset: 0,
          backgroundImage: `
            linear-gradient(rgba(255,255,255,0.015) 1px, transparent 1px),
            linear-gradient(90deg, rgba(255,255,255,0.015) 1px, transparent 1px)
          `,
          backgroundSize: "80px 80px",
          maskImage: "radial-gradient(ellipse 80% 80% at 50% 50%, black 20%, transparent 80%)",
        }} />
      </div>

      {/* Eyebrow */}
      <motion.div
        initial={{ opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
        style={{ y: subtextY }}
        className="flex items-center gap-3 mb-12 md:mb-16"
      >
        <div className="h-px w-10 bg-white/15" />
        <span className="text-[10px] font-mono tracking-[0.4em] uppercase text-white/30">
          macOS · Apple Silicon · Now in beta
        </span>
        <div className="h-px w-10 bg-white/15" />
      </motion.div>

      {/* Main composition: FIND [glass] IT. */}
      <motion.div
        style={{ y: headlineY, opacity: sectionOpacity }}
        className="relative flex flex-col items-center"
      >
        {/* Desktop split */}
        <div className="hidden md:flex items-center justify-center gap-10 lg:gap-16">
          <motion.span
            initial={{ opacity: 0, x: -40 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 1.1, delay: 0.15, ease: [0.16, 1, 0.3, 1] }}
            className="font-black text-white select-none"
            style={{
              fontSize: "clamp(80px, 11vw, 150px)",
              lineHeight: 0.9,
              letterSpacing: "-0.05em",
            }}
          >
            FIND
          </motion.span>

          <motion.div
            initial={{ opacity: 0, scale: 0.82 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 1.3, delay: 0.25, ease: [0.16, 1, 0.3, 1] }}
            style={{ y: glassY }}
          >
            <GlassLens
              style={{ width: "clamp(200px, 26vw, 340px)", height: "clamp(200px, 26vw, 340px)" }}
            />
          </motion.div>

          <motion.span
            initial={{ opacity: 0, x: 40 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 1.1, delay: 0.15, ease: [0.16, 1, 0.3, 1] }}
            className="font-black select-none"
            style={{
              fontSize: "clamp(80px, 11vw, 150px)",
              lineHeight: 0.9,
              letterSpacing: "-0.05em",
              color: "#2563EB",
              textShadow: "0 0 80px rgba(37,99,235,0.5)",
            }}
          >
            IT.
          </motion.span>
        </div>

        {/* Mobile layout: glass then headline */}
        <div className="flex md:hidden flex-col items-center gap-8">
          <motion.div
            initial={{ opacity: 0, scale: 0.82 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 1.3, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
          >
            <GlassLens style={{ width: "220px", height: "220px" }} />
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.9, delay: 0.4, ease: [0.16, 1, 0.3, 1] }}
            className="font-black text-center select-none"
            style={{ fontSize: "72px", lineHeight: 0.9, letterSpacing: "-0.05em" }}
          >
            <span className="text-white">FIND </span>
            <span style={{ color: "#2563EB" }}>IT.</span>
          </motion.h1>
        </div>
      </motion.div>

      {/* Subtext + CTAs */}
      <motion.div
        initial={{ opacity: 0, y: 24 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1, delay: 0.55, ease: [0.16, 1, 0.3, 1] }}
        style={{ y: subtextY }}
        className="flex flex-col items-center mt-14 md:mt-20 px-6"
      >
        <p className="text-center text-white/45 font-light mb-2" style={{ fontSize: "clamp(16px, 2vw, 22px)", maxWidth: "520px", lineHeight: 1.5 }}>
          Natural-language file search for macOS.
        </p>
        <p className="text-center text-white/25 font-light mb-12" style={{ fontSize: "clamp(13px, 1.5vw, 17px)", maxWidth: "420px" }}>
          Under 200ms · 100% local · Free to start
        </p>

        <div className="flex flex-col sm:flex-row items-center gap-4">
          <PrimaryCTA />
          <a
            href="#how-it-works"
            className="text-[13px] font-medium text-white/40 hover:text-white/70 transition-colors tracking-wide flex items-center gap-2"
          >
            See how it works
            <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
              <path d="M7 2L7 12M7 12L3 8M7 12L11 8" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </a>
        </div>
      </motion.div>

      {/* Scroll indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.4, duration: 0.8 }}
        className="absolute bottom-10 flex flex-col items-center gap-2"
      >
        <motion.div
          animate={{ y: [0, 6, 0] }}
          transition={{ duration: 1.8, repeat: Infinity, ease: "easeInOut" }}
          className="w-px h-8 bg-gradient-to-b from-white/30 to-transparent rounded-full"
        />
        <span className="text-[9px] font-mono tracking-[0.35em] uppercase text-white/20">scroll</span>
      </motion.div>
    </section>
  );
}
