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
      style={{ ...magnetic.style, boxShadow: "0 0 50px rgba(37,99,235,0.3), 0 8px 24px rgba(37,99,235,0.2)" }}
      onMouseMove={magnetic.onMouseMove as unknown as React.MouseEventHandler<HTMLButtonElement>}
      onMouseLeave={(e) => {
        (magnetic.onMouseLeave as unknown as React.MouseEventHandler<HTMLButtonElement>)(e);
        setHovered(false);
      }}
      onMouseEnter={() => setHovered(true)}
      data-magnetic
      type="submit"
      className="relative px-8 py-5 rounded-2xl bg-[#2563EB] hover:bg-[#1d4ed8] text-white text-lg font-bold tracking-wide transition-colors overflow-hidden h-16 min-w-[240px]"
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
        <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[500px] rounded-full bg-[#2563EB]/6 blur-[130px]" />
      </div>

      {/* Ghost magnifying glass ring — ties back to intro visually */}
      <div
        className="absolute pointer-events-none"
        style={{
          width: "500px",
          height: "500px",
          borderRadius: "50%",
          border: "1.5px solid rgba(255,255,255,0.04)",
          left: "50%",
          top: "50%",
          transform: "translate(-50%, -68%)",
        }}
      />
      <div
        className="absolute pointer-events-none"
        style={{
          width: "340px",
          height: "340px",
          borderRadius: "50%",
          border: "1px solid rgba(37,99,235,0.06)",
          left: "50%",
          top: "50%",
          transform: "translate(-50%, -72%)",
        }}
      />

      <div className="max-w-4xl mx-auto px-6 text-center relative">
        <motion.div
          initial={{ opacity: 0, y: 48 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 1.1, ease: [0.16, 1, 0.3, 1] }}
        >
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
            className="flex flex-col sm:flex-row items-center justify-center gap-3 max-w-lg mx-auto"
            onSubmit={(e) => e.preventDefault()}
          >
            <input
              type="email"
              placeholder="your@email.com"
              className="flex-1 w-full bg-white/[0.05] border border-white/10 rounded-2xl px-5 py-5 text-white text-base outline-none placeholder:text-white/20 focus:border-white/20 transition-colors h-16"
            />
            <BigSubmitButton />
          </form>

          <div className="mt-10 flex items-center justify-center gap-4 flex-wrap">
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
