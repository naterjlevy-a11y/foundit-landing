"use client";
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

const QUERIES = [
  {
    text: "Q3 finance report last tuesday",
    results: [
      { icon: "📄", name: "Q3_Finance_Review.pdf",    path: "~/Documents/Finance",  time: "2d ago" },
      { icon: "📊", name: "Q3-Budget-Final.xlsx",      path: "~/Downloads",          time: "3d ago" },
      { icon: "📝", name: "q3-notes.md",               path: "~/Desktop/Work",       time: "3d ago" },
    ],
  },
  {
    text: "screenshot of that xcode error",
    results: [
      { icon: "🖼", name: "Screenshot 2025-04-28.png", path: "~/Desktop",            time: "14d ago" },
      { icon: "🖼", name: "xcode-crash.png",           path: "~/Downloads",          time: "21d ago" },
      { icon: "📄", name: "error-log.txt",             path: "~/Documents/Dev",      time: "21d ago" },
    ],
  },
  {
    text: "mom's pasta recipe",
    results: [
      { icon: "📄", name: "Moms_Bolognese.pdf",        path: "~/Documents/Recipes",  time: "1y ago" },
      { icon: "📝", name: "pasta-notes.md",            path: "~/Documents/Recipes",  time: "8mo ago" },
      { icon: "🖼", name: "recipe-scan.jpg",           path: "~/Pictures/Family",    time: "2y ago" },
    ],
  },
];

export function AppPreview() {
  const [activeIdx, setActiveIdx] = useState(0);
  const active = QUERIES[activeIdx];

  return (
    <section style={{ padding: "0 0 120px" }}>
      <div className="max-w-6xl mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
          className="mb-16"
        >
          <p className="text-[10px] font-mono tracking-[0.35em] uppercase text-white/30 mb-5">
            § 03 · See it in action
          </p>
          <h2
            className="font-black text-white leading-tight"
            style={{ fontSize: "clamp(40px, 6vw, 82px)", letterSpacing: "-0.04em" }}
          >
            Type what you remember.<br />
            <span className="text-white/25">Not what the file is named.</span>
          </h2>
        </motion.div>

        {/* Query pills */}
        <div className="flex flex-wrap gap-3 mb-12">
          {QUERIES.map((q, i) => (
            <button
              key={i}
              onClick={() => setActiveIdx(i)}
              className="px-4 py-2 rounded-full text-sm font-mono transition-all duration-300"
              style={{
                background: activeIdx === i ? "rgba(37,99,235,0.15)" : "rgba(255,255,255,0.04)",
                border: `1px solid ${activeIdx === i ? "rgba(37,99,235,0.4)" : "rgba(255,255,255,0.07)"}`,
                color: activeIdx === i ? "#2563EB" : "rgba(255,255,255,0.4)",
              }}
            >
              "{q.text}"
            </button>
          ))}
        </div>

        {/* App window mockup */}
        <motion.div
          initial={{ opacity: 0, y: 32 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-60px" }}
          transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1] }}
          className="relative mx-auto"
          style={{ maxWidth: "560px" }}
        >
          {/* Background glow */}
          <div
            className="absolute pointer-events-none"
            style={{
              inset: "-40px",
              background: "radial-gradient(ellipse 80% 80%, rgba(37,99,235,0.10) 0%, transparent 70%)",
              filter: "blur(40px)",
            }}
          />

          {/* macOS menu bar */}
          <div
            className="rounded-t-xl flex items-center justify-between px-4 h-8"
            style={{
              background: "rgba(20,22,30,0.95)",
              borderBottom: "1px solid rgba(255,255,255,0.06)",
            }}
          >
            <div className="flex gap-1.5">
              {["#ff5f57", "#febc2e", "#28c840"].map((c) => (
                <div key={c} className="w-3 h-3 rounded-full" style={{ background: c, opacity: 0.85 }} />
              ))}
            </div>
            <span className="text-[10px] text-white/25 font-mono">Found It!</span>
            <div className="w-12" />
          </div>

          {/* App window */}
          <div
            className="relative overflow-hidden rounded-b-xl"
            style={{
              background: "rgba(12,14,22,0.98)",
              border: "1px solid rgba(255,255,255,0.08)",
              borderTop: "none",
              backdropFilter: "blur(20px)",
            }}
          >
            {/* Search bar */}
            <div
              className="flex items-center gap-3 px-5 py-4"
              style={{ borderBottom: "1px solid rgba(255,255,255,0.06)" }}
            >
              <svg width="15" height="15" viewBox="0 0 15 15" fill="none" className="flex-shrink-0">
                <circle cx="6.5" cy="6.5" r="5" stroke="rgba(255,255,255,0.3)" strokeWidth="1.5" />
                <path d="M10.5 10.5L13.5 13.5" stroke="rgba(255,255,255,0.3)" strokeWidth="1.5" strokeLinecap="round" />
              </svg>
              <AnimatePresence mode="wait">
                <motion.span
                  key={activeIdx}
                  initial={{ opacity: 0, x: 6 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -6 }}
                  transition={{ duration: 0.2 }}
                  className="text-sm text-white/80 font-mono flex-1"
                >
                  {active.text}
                  <span className="animate-pulse text-[#2563EB] ml-0.5">|</span>
                </motion.span>
              </AnimatePresence>
              <div
                className="flex-shrink-0 px-2 py-1 rounded text-[10px] font-mono"
                style={{ background: "rgba(255,255,255,0.06)", color: "rgba(255,255,255,0.3)" }}
              >
                ⏎
              </div>
            </div>

            {/* Results */}
            <div>
              <div className="px-5 pt-3 pb-1">
                <span className="text-[9px] font-mono tracking-widest uppercase text-white/20">
                  Best matches
                </span>
              </div>
              <AnimatePresence mode="wait">
                <motion.div
                  key={activeIdx}
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.25 }}
                >
                  {active.results.map((r, i) => (
                    <motion.div
                      key={r.name}
                      initial={{ opacity: 0, x: 8 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: i * 0.07, duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
                      className="group flex items-center gap-4 px-5 py-3.5 cursor-pointer transition-all duration-150"
                      style={{
                        borderBottom: i < active.results.length - 1 ? "1px solid rgba(255,255,255,0.04)" : undefined,
                      }}
                      whileHover={{ backgroundColor: "rgba(37,99,235,0.07)" }}
                    >
                      <span className="text-xl flex-shrink-0 leading-none">{r.icon}</span>
                      <div className="flex-1 min-w-0">
                        <div className="text-sm text-white/85 font-medium truncate">{r.name}</div>
                        <div className="text-[11px] text-white/30 font-mono mt-0.5 truncate">{r.path}</div>
                      </div>
                      <div className="flex-shrink-0 text-[10px] text-white/20 font-mono">{r.time}</div>
                    </motion.div>
                  ))}
                </motion.div>
              </AnimatePresence>

              {/* Footer bar */}
              <div
                className="flex items-center justify-between px-5 py-3"
                style={{
                  borderTop: "1px solid rgba(255,255,255,0.04)",
                  background: "rgba(0,0,0,0.2)",
                }}
              >
                <span className="text-[9px] font-mono text-white/15 tracking-widest uppercase">
                  3 results · 148ms
                </span>
                <span className="text-[9px] font-mono text-white/15">
                  ⌘K settings
                </span>
              </div>
            </div>
          </div>

          {/* Decorative reflection below */}
          <div
            className="rounded-b-xl overflow-hidden"
            style={{
              height: "30px",
              background: "linear-gradient(to bottom, rgba(12,14,22,0.3), transparent)",
              transform: "scaleY(-1)",
              opacity: 0.25,
              filter: "blur(2px)",
            }}
          />
        </motion.div>

        <p className="text-center text-white/20 text-xs font-mono mt-8 tracking-wider">
          Menu bar app · ⌘ Space to open · macOS 13+
        </p>
      </div>
    </section>
  );
}
