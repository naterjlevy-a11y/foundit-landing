"use client";
import { useState } from "react";
import { motion, MotionValue, AnimatePresence } from "framer-motion";
import { useMagnetic } from "@/components/cursor/CustomCursor";

interface HeroRevealProps {
  opacity: MotionValue<number>;
  y: MotionValue<number>;
}

function SubmitButton() {
  const magnetic = useMagnetic(0.5);
  const [hovered, setHovered] = useState(false);
  return (
    <motion.button
      {...(magnetic as object)}
      ref={magnetic.ref as React.RefObject<HTMLButtonElement>}
      data-magnetic
      type="submit"
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      className="relative rounded-xl bg-[#2563EB] text-white text-sm font-bold tracking-wide overflow-hidden flex-shrink-0 h-12 min-w-[160px]"
      style={{
        boxShadow: "0 0 40px rgba(37,99,235,0.35), 0 4px 16px rgba(37,99,235,0.25)",
      }}
    >
      <AnimatePresence mode="wait">
        <motion.span
          key={hovered ? "h" : "d"}
          initial={{ opacity: 0, y: hovered ? 8 : -8 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: hovered ? -8 : 8 }}
          transition={{ duration: 0.16 }}
          className="absolute inset-0 flex items-center justify-center px-6"
        >
          {hovered ? "Get Found It! →" : "Get early access"}
        </motion.span>
      </AnimatePresence>
    </motion.button>
  );
}

export function HeroReveal({ opacity, y }: HeroRevealProps) {
  return (
    <motion.div
      style={{ opacity, y }}
      className="flex flex-col items-center text-center px-6 w-full max-w-5xl mx-auto select-none"
    >
      {/* Eyebrow */}
      <div className="mb-10 flex items-center gap-3">
        <div className="h-px w-12 bg-white/10" />
        <span className="text-[10px] font-mono tracking-[0.4em] uppercase text-white/30">
          macOS &nbsp;·&nbsp; Apple Silicon &nbsp;·&nbsp; Now in beta
        </span>
        <div className="h-px w-12 bg-white/10" />
      </div>

      {/* Main headline */}
      <div className="relative mb-8">
        <h1
          className="text-[clamp(72px,13vw,152px)] font-black text-white leading-[0.88] tracking-[-0.05em]"
          style={{ fontFeatureSettings: '"ss01"' }}
        >
          Found
        </h1>
        <div className="flex items-end justify-center gap-[0.06em]">
          <h1
            className="text-[clamp(72px,13vw,152px)] font-black leading-[0.88] tracking-[-0.05em]"
            style={{
              fontFeatureSettings: '"ss01"',
              background: "linear-gradient(135deg, #ffffff 0%, rgba(255,255,255,0.7) 100%)",
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent",
              backgroundClip: "text",
            }}
          >
            It
          </h1>
          <span
            className="text-[clamp(72px,13vw,152px)] font-black leading-[0.88] tracking-[-0.05em]"
            style={{
              color: "#2563EB",
              textShadow: "0 0 60px rgba(37,99,235,0.6), 0 0 120px rgba(37,99,235,0.25)",
            }}
          >
            !
          </span>
        </div>
      </div>

      {/* Divider */}
      <div className="flex items-center gap-4 mb-10 w-full max-w-sm">
        <div className="flex-1 h-px bg-gradient-to-r from-transparent to-white/10" />
        <span className="text-[#2563EB] text-xs">✦</span>
        <div className="flex-1 h-px bg-gradient-to-l from-transparent to-white/10" />
      </div>

      {/* Sub-headline */}
      <p className="text-[clamp(16px,2vw,22px)] font-light text-white/40 max-w-lg leading-relaxed mb-12 tracking-tight">
        Find any file on your Mac by describing it.<br />
        <span className="text-white/60">Natural language. Under 200ms. 100% local.</span>
      </p>

      {/* Waitlist form */}
      <div className="flex flex-col sm:flex-row items-center gap-3 w-full max-w-md mb-6">
        <form
          className="flex items-center gap-2 bg-white/[0.04] border border-white/[0.08] rounded-xl p-1.5 flex-1 w-full backdrop-blur-sm"
          onSubmit={(e) => e.preventDefault()}
          style={{ boxShadow: "inset 0 1px 0 rgba(255,255,255,0.04)" }}
        >
          <input
            type="email"
            placeholder="your@email.com"
            className="bg-transparent text-white text-sm px-3 py-2 outline-none placeholder:text-white/20 flex-1 min-w-0"
          />
          <SubmitButton />
        </form>
      </div>

      <div className="flex items-center gap-6 flex-wrap justify-center">
        {["Free to start", "Pro at $10.99/mo", "Cancel anytime"].map((t, i) => (
          <span key={t} className="flex items-center gap-2 text-[10px] font-mono tracking-[0.2em] uppercase text-white/20">
            {i > 0 && <span className="text-white/10">·</span>}
            {t}
          </span>
        ))}
      </div>
    </motion.div>
  );
}
