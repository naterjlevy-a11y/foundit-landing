"use client";
import { motion } from "framer-motion";

const PAINS = [
  {
    quote: '"What did I name that file?"',
    caption: "Spotlight only searches filenames. Not what's inside them.",
  },
  {
    quote: '"I know I saved it somewhere."',
    caption: "\"Somewhere\" covers 50,000 files across a dozen folders.",
  },
  {
    quote: '"Just let me describe it."',
    caption: "No tool on macOS understood you. Until now.",
  },
];

export function Problem() {
  return (
    <section className="relative overflow-hidden" style={{ padding: "100px 0 120px" }}>
      {/* Oversized glass motif in background */}
      <div
        className="absolute pointer-events-none"
        style={{
          right: "-8%",
          top: "50%",
          transform: "translateY(-50%)",
          width: "520px",
          height: "520px",
          borderRadius: "50%",
          border: "1px solid rgba(255,255,255,0.03)",
          boxShadow: "inset 0 0 80px rgba(37,99,235,0.04)",
        }}
      />
      <div
        className="absolute pointer-events-none"
        style={{
          right: "-3%",
          top: "50%",
          transform: "translateY(-50%)",
          width: "360px",
          height: "360px",
          borderRadius: "50%",
          border: "1px solid rgba(37,99,235,0.06)",
        }}
      />

      <div className="max-w-6xl mx-auto px-6 relative">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
          className="mb-20"
        >
          <p className="text-[10px] font-mono tracking-[0.35em] uppercase text-white/30 mb-5">
            § 00 · The problem
          </p>
          <h2
            className="font-black text-white tracking-tight leading-tight"
            style={{ fontSize: "clamp(36px, 5.5vw, 72px)", letterSpacing: "-0.04em", maxWidth: "640px" }}
          >
            Spotlight finds filenames.<br />
            <span className="text-white/25">You don't think in filenames.</span>
          </h2>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-px bg-white/[0.05] rounded-2xl overflow-hidden">
          {PAINS.map((p, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-40px" }}
              transition={{ duration: 0.7, delay: i * 0.12, ease: [0.16, 1, 0.3, 1] }}
              className="bg-[#050810] p-8 md:p-10 flex flex-col gap-4"
            >
              <span className="text-[#2563EB] font-mono text-xs">0{i + 1}</span>
              <p className="font-black text-white text-xl leading-tight tracking-tight">
                {p.quote}
              </p>
              <p className="text-white/35 text-sm leading-relaxed font-light">
                {p.caption}
              </p>
            </motion.div>
          ))}
        </div>

        {/* Resolution line */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7, delay: 0.4, ease: [0.16, 1, 0.3, 1] }}
          className="mt-16 flex items-center gap-6"
        >
          <div className="flex-1 h-px bg-gradient-to-r from-transparent via-white/10 to-transparent" />
          <p className="text-white/50 text-sm font-medium text-center" style={{ maxWidth: "380px" }}>
            Found It! lets you describe what you remember.<br />
            It finds the file in under 200ms.
          </p>
          <div className="flex-1 h-px bg-gradient-to-r from-transparent via-white/10 to-transparent" />
        </motion.div>
      </div>
    </section>
  );
}
