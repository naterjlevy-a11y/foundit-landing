"use client";
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { GlassLens } from "@/components/intro/GlassLens";
import { useMagnetic } from "@/components/cursor/CustomCursor";

function CTAButton() {
  const mag = useMagnetic(0.5);
  const [hovered, setHovered] = useState(false);
  return (
    <motion.button
      ref={mag.ref as React.RefObject<HTMLButtonElement>}
      style={{ ...mag.style, boxShadow: "0 0 50px rgba(37,99,235,0.35), 0 8px 24px rgba(37,99,235,0.2)" }}
      onMouseMove={mag.onMouseMove as unknown as React.MouseEventHandler<HTMLButtonElement>}
      onMouseLeave={(e) => {
        (mag.onMouseLeave as unknown as React.MouseEventHandler<HTMLButtonElement>)(e);
        setHovered(false);
      }}
      onMouseEnter={() => setHovered(true)}
      data-magnetic
      type="submit"
      className="relative px-8 py-4 rounded-full bg-[#2563EB] text-white text-base font-bold tracking-wide overflow-hidden h-14 min-w-[200px] flex-shrink-0"
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
          {hovered ? "Let's go →" : "Get early access"}
        </motion.span>
      </AnimatePresence>
    </motion.button>
  );
}

export function ClosingCTA() {
  return (
    <section
      id="waitlist"
      className="relative overflow-hidden"
      style={{ padding: "120px 0 140px", borderTop: "1px solid rgba(255,255,255,0.04)" }}
    >
      {/* Background radial glow */}
      <div
        className="absolute pointer-events-none"
        style={{
          top: "50%", left: "50%", transform: "translate(-50%,-50%)",
          width: "700px", height: "500px",
          background: "radial-gradient(ellipse 100% 100%, rgba(37,99,235,0.08) 0%, transparent 70%)",
          filter: "blur(60px)",
        }}
      />

      <div className="max-w-4xl mx-auto px-6 text-center relative">
        {/* Small lens */}
        <motion.div
          initial={{ opacity: 0, scale: 0.7 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true, margin: "-60px" }}
          transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
          className="flex justify-center mb-14"
        >
          <GlassLens
            style={{ width: "100px", height: "100px" }}
            showHandle={false}
            rimPadding="6px"
          />
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 32 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1] }}
        >
          <p className="text-[10px] font-mono tracking-[0.35em] uppercase text-white/25 mb-8">
            § 04 · Join the waitlist
          </p>

          <h2
            className="font-black text-white leading-tight mb-4"
            style={{ fontSize: "clamp(48px, 9vw, 110px)", letterSpacing: "-0.04em", lineHeight: 0.92 }}
          >
            Your files
          </h2>
          <h2
            className="font-black text-white/20 leading-tight mb-12"
            style={{ fontSize: "clamp(48px, 9vw, 110px)", letterSpacing: "-0.04em", lineHeight: 0.92, fontStyle: "italic" }}
          >
            are waiting.
          </h2>

          <p className="text-white/35 text-lg font-light mb-16 max-w-sm mx-auto leading-relaxed">
            Free to start. Pro at $10.99/mo.<br />Cancel anytime.
          </p>

          {/* Email form */}
          <form
            className="flex flex-col sm:flex-row items-center justify-center gap-3 max-w-lg mx-auto"
            onSubmit={(e) => e.preventDefault()}
          >
            <input
              type="email"
              placeholder="your@email.com"
              className="flex-1 w-full rounded-full px-6 py-4 text-white text-sm outline-none placeholder:text-white/20 focus:ring-1 focus:ring-white/15 transition-all h-14"
              style={{
                background: "rgba(255,255,255,0.05)",
                border: "1px solid rgba(255,255,255,0.10)",
              }}
            />
            <CTAButton />
          </form>

          {/* Trust badges */}
          <div className="mt-10 flex items-center justify-center gap-6 flex-wrap">
            {["Free tier · 500 files", "Pro · $10.99/mo", "Apple Silicon", "macOS 13+"].map((t) => (
              <span key={t} className="text-[10px] font-mono tracking-[0.18em] uppercase text-white/20">
                {t}
              </span>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
}
