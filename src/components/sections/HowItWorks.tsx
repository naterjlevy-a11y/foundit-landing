"use client";
import { motion } from "framer-motion";

const STEPS = [
  {
    n: "01",
    title: "Describe it.",
    body: `Type what you actually remember — not the filename. "The Q3 finance doc from last Tuesday." "That screenshot of the error." "Mom's recipe PDF."`,
    detail: "Natural language · No exact match needed",
  },
  {
    n: "02",
    title: "Found It! scans locally.",
    body: "A local SQLite index of your files — with AI-generated summaries, smart metadata, and content embeddings — is searched instantly on your device. Nothing leaves your Mac.",
    detail: "50,000+ files · SQLite · On-device AI",
  },
  {
    n: "03",
    title: "Open it.",
    body: "Results appear in under 200ms, ranked by relevance. Click to open, reveal in Finder, or copy the path. The entire flow happens from your menu bar.",
    detail: "< 200ms · Menu bar · ⌘ Space",
  },
] as const;

export function HowItWorks() {
  return (
    <section id="how-it-works" style={{ padding: "100px 0 120px" }}>
      <div className="max-w-6xl mx-auto px-6">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
          className="mb-20"
        >
          <p className="text-[10px] font-mono tracking-[0.35em] uppercase text-white/30 mb-5">
            § 01 · How it works
          </p>
          <h2
            className="font-black text-white leading-tight"
            style={{ fontSize: "clamp(40px, 6vw, 82px)", letterSpacing: "-0.04em" }}
          >
            Three steps.<br />
            <span className="text-white/25">Under 200ms.</span>
          </h2>
        </motion.div>

        {/* Steps */}
        <div className="relative">
          {/* Connecting line — desktop only */}
          <div
            className="absolute hidden md:block"
            style={{
              top: "52px",
              left: "calc(16.67% + 24px)",
              right: "calc(16.67% + 24px)",
              height: "1px",
              background: "linear-gradient(90deg, transparent, rgba(37,99,235,0.3) 20%, rgba(37,99,235,0.3) 80%, transparent)",
            }}
          />

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-8">
            {STEPS.map((s, i) => (
              <motion.div
                key={s.n}
                initial={{ opacity: 0, y: 32 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-40px" }}
                transition={{ duration: 0.8, delay: i * 0.15, ease: [0.16, 1, 0.3, 1] }}
                className="relative"
              >
                {/* Step number circle */}
                <div
                  className="relative z-10 w-[104px] h-[104px] rounded-full border flex items-center justify-center mb-8 mx-auto md:mx-0"
                  style={{
                    background: "rgba(37,99,235,0.06)",
                    borderColor: "rgba(37,99,235,0.25)",
                    boxShadow: "0 0 30px rgba(37,99,235,0.12)",
                  }}
                >
                  <span
                    className="font-black"
                    style={{ fontSize: "28px", color: "#2563EB", letterSpacing: "-0.03em" }}
                  >
                    {s.n}
                  </span>
                </div>

                {/* Content */}
                <div
                  className="rounded-2xl p-7 md:p-8"
                  style={{
                    background: "rgba(255,255,255,0.03)",
                    border: "1px solid rgba(255,255,255,0.07)",
                  }}
                >
                  <h3
                    className="font-black text-white mb-4"
                    style={{ fontSize: "clamp(20px, 2.5vw, 28px)", letterSpacing: "-0.03em" }}
                  >
                    {s.title}
                  </h3>
                  <p className="text-white/40 text-sm leading-relaxed font-light mb-6">
                    {s.body}
                  </p>
                  <div
                    className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full text-[10px] font-mono tracking-widest uppercase"
                    style={{
                      background: "rgba(37,99,235,0.08)",
                      border: "1px solid rgba(37,99,235,0.18)",
                      color: "#2563EB",
                    }}
                  >
                    {s.detail}
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>

        {/* Bottom stat row */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7, delay: 0.5, ease: [0.16, 1, 0.3, 1] }}
          className="mt-20 grid grid-cols-2 md:grid-cols-4 gap-px rounded-2xl overflow-hidden"
          style={{ background: "rgba(255,255,255,0.04)" }}
        >
          {[
            ["< 200ms",  "search time"],
            ["100%",     "local processing"],
            ["50k+",     "files indexed"],
            ["0",        "cloud uploads"],
          ].map(([val, label]) => (
            <div key={label} className="bg-[#050810] px-6 py-7 md:px-8 md:py-8 flex flex-col gap-1">
              <span
                className="font-black text-white"
                style={{ fontSize: "clamp(28px, 4vw, 44px)", letterSpacing: "-0.04em", lineHeight: 1 }}
              >
                {val}
              </span>
              <span className="text-white/30 text-xs font-mono tracking-wider uppercase">{label}</span>
            </div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
