"use client";
import { motion } from "framer-motion";

const CHIPS = ["M1", "M2", "M3", "M4"];

export function MacOSBadge() {
  return (
    <section className="relative bg-[#020208] border-t border-white/5 py-16 overflow-hidden">
      <div className="absolute right-0 top-0 w-64 h-64 rounded-full bg-[#2563EB]/4 blur-[80px] pointer-events-none" />
      <div className="max-w-5xl mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="flex flex-col md:flex-row items-center justify-between gap-8 rounded-2xl border border-white/6 bg-white/[0.02] px-8 py-7"
        >
          {/* Left: Apple Silicon badge */}
          <div className="flex items-center gap-4">
            {/* Chip icon */}
            <div className="w-12 h-12 rounded-xl border border-white/10 bg-white/5 flex items-center justify-center flex-shrink-0">
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" className="text-white/60">
                <rect x="7" y="7" width="10" height="10" rx="2" stroke="currentColor" strokeWidth="1.5" />
                <path d="M10 7V5M14 7V5M10 19v-2M14 19v-2M7 10H5M7 14H5M19 10h-2M19 14h-2" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
              </svg>
            </div>
            <div>
              <div className="text-white font-semibold text-sm">Built for Apple Silicon</div>
              <div className="text-white/35 text-xs mt-0.5">Native ARM64 — no Rosetta needed</div>
            </div>
          </div>

          {/* Center: chip badges */}
          <div className="flex items-center gap-2 flex-wrap justify-center">
            {CHIPS.map((chip) => (
              <div
                key={chip}
                className="px-3 py-1.5 rounded-lg border border-white/8 bg-white/4 text-white/50 text-xs font-mono font-semibold tracking-widest"
              >
                {chip}
              </div>
            ))}
          </div>

          {/* Right: macOS version */}
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-[#2563EB]/30 to-[#1d4ed8]/10 border border-[#2563EB]/20 flex items-center justify-center flex-shrink-0">
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" className="text-[#2563EB]">
                <path d="M12 3C7.03 3 3 7.03 3 12s4.03 9 9 9 9-4.03 9-9-4.03-9-9-9zm0 16c-3.86 0-7-3.14-7-7s3.14-7 7-7 7 3.14 7 7-3.14 7-7 7z" fill="currentColor" opacity=".3" />
                <path d="M12 7c-1.66 0-3 1.34-3 3s1.34 3 3 3 3-1.34 3-3-1.34-3-3-3z" fill="currentColor" />
              </svg>
            </div>
            <div>
              <div className="text-white/60 text-xs font-semibold">macOS Ventura and later</div>
              <div className="text-white/25 text-[10px] mt-0.5 font-mono">13.0+</div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
