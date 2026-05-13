"use client";
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useMagnetic } from "@/components/cursor/CustomCursor";

function BigSubmitButton() {
  const magnetic = useMagnetic(0.55);
  const [hovered, setHovered] = useState(false);

  return (
    <motion.button
      ref={magnetic.ref as React.RefObject<HTMLButtonElement>}
      style={magnetic.style}
      onMouseMove={magnetic.onMouseMove as unknown as React.MouseEventHandler<HTMLButtonElement>}
      onMouseLeave={(e) => {
        (magnetic.onMouseLeave as unknown as React.MouseEventHandler<HTMLButtonElement>)(e);
        setHovered(false);
      }}
      onMouseEnter={() => setHovered(true)}
      data-magnetic
      type="submit"
      className="relative px-8 py-4 rounded-2xl bg-[#2563EB] hover:bg-[#1d4ed8] text-white text-base font-bold tracking-wide transition-colors overflow-hidden h-14 min-w-[220px]"
    >
      <AnimatePresence mode="wait">
        <motion.span
          key={hovered ? "h" : "d"}
          initial={{ opacity: 0, y: hovered ? 10 : -10 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: hovered ? -10 : 10 }}
          transition={{ duration: 0.18 }}
          className="absolute inset-0 flex items-center justify-center"
        >
          {hovered ? "Let's go →" : "Get early access"}
        </motion.span>
      </AnimatePresence>
    </motion.button>
  );
}

export function WaitlistCTA() {
  return (
    <section
      id="waitlist"
      className="bg-black border-t border-white/[0.04] relative overflow-hidden"
      style={{ paddingTop: "var(--gap-section)", paddingBottom: "var(--gap-section)" }}
    >
      {/* Deep background glow */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[400px] rounded-full bg-[#2563EB]/6 blur-[120px]" />
      </div>

      <div className="max-w-4xl mx-auto px-6 text-center relative">
        <motion.div
          initial={{ opacity: 0, y: 48 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 1.1, ease: [0.16, 1, 0.3, 1] }}
        >
          {/* Giant italic statement */}
          <p className="text-[10px] font-mono tracking-[0.3em] uppercase text-white/20 mb-10">
            § 02 &nbsp;·&nbsp; Join the waitlist
          </p>

          <h2
            className="text-[clamp(48px,9vw,110px)] font-black text-white tracking-[-0.04em] leading-[0.92] mb-6 italic"
          >
            &ldquo;Your files<br />
            <span className="not-italic text-white/25">are waiting.&rdquo;</span>
          </h2>

          <p className="text-white/35 text-lg font-light mb-16 max-w-md mx-auto leading-relaxed">
            Free to start. Pro at $10.99/mo.<br />Cancel anytime.
          </p>

          {/* Form */}
          <form
            className="flex flex-col sm:flex-row items-center justify-center gap-3 max-w-md mx-auto"
            onSubmit={(e) => e.preventDefault()}
          >
            <input
              type="email"
              placeholder="your@email.com"
              className="flex-1 w-full bg-white/[0.05] border border-white/10 rounded-2xl px-5 py-4 text-white text-base outline-none placeholder:text-white/20 focus:border-white/20 transition-colors h-14"
            />
            <BigSubmitButton />
          </form>

          <div className="mt-8 flex items-center justify-center gap-4 flex-wrap">
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
