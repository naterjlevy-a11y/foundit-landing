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
      className="relative px-6 py-3 rounded-xl bg-[#2563EB] text-white text-sm font-semibold tracking-wide overflow-hidden flex-shrink-0 h-12 min-w-[160px]"
    >
      <AnimatePresence mode="wait">
        <motion.span
          key={hovered ? "h" : "d"}
          initial={{ opacity: 0, y: hovered ? 8 : -8 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: hovered ? -8 : 8 }}
          transition={{ duration: 0.16 }}
          className="absolute inset-0 flex items-center justify-center"
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
      className="flex flex-col items-center text-center px-6 w-full max-w-4xl mx-auto select-none"
    >
      {/* Badge */}
      <div className="mb-8 inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/[0.04] px-4 py-1.5 text-[10px] text-white/40 tracking-[0.25em] uppercase font-mono">
        <span className="text-[#2563EB]">✦</span>
        Now in beta &middot; macOS 13+
      </div>

      {/* Main headline — XXL brutalist */}
      <h1
        className="text-[clamp(64px,12vw,140px)] font-black text-white leading-[0.92] tracking-[-0.04em] mb-8"
        style={{ fontFeatureSettings: '"ss01"' }}
      >
        Found It<span className="text-[#2563EB]">!</span>
      </h1>

      {/* Sub-headline */}
      <p className="text-[clamp(18px,2.5vw,26px)] font-light text-white/45 max-w-xl leading-relaxed mb-12 tracking-tight">
        Find any file on your Mac by describing it.<br />
        Natural language. Under 200ms. 100% local.
      </p>

      {/* Waitlist form */}
      <div className="flex flex-col sm:flex-row items-center gap-3 w-full max-w-md">
        <form
          className="flex items-center gap-2 bg-white/[0.05] border border-white/10 rounded-xl p-1.5 flex-1 w-full"
          onSubmit={(e) => e.preventDefault()}
        >
          <input
            type="email"
            placeholder="your@email.com"
            className="bg-transparent text-white text-sm px-3 py-2 outline-none placeholder:text-white/20 flex-1 min-w-0"
          />
          <SubmitButton />
        </form>
      </div>

      <p className="mt-5 text-[10px] text-white/20 tracking-[0.2em] uppercase font-mono">
        Free to join &nbsp;·&nbsp; macOS 13+ &nbsp;·&nbsp; Apple Silicon
      </p>
    </motion.div>
  );
}
