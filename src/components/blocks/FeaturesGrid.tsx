"use client";
import { motion } from "framer-motion";
import { MessageSquare, Command, Shield, Zap, Image, FolderSearch } from "lucide-react";
import { MagneticCard } from "./MagneticCard";

const itemVariant = {
  hidden: { opacity: 0, y: 40 },
  show: {
    opacity: 1,
    y: 0,
    transition: { duration: 1.0, ease: [0.16, 1, 0.3, 1] as [number, number, number, number] },
  },
};

const containerVariant = {
  hidden: {},
  show: { transition: { staggerChildren: 0.18, delayChildren: 0.05 } },
};

// Large bold label inside a card
function FeatureLabel({ children }: { children: React.ReactNode }) {
  return (
    <p className="text-[11px] font-mono tracking-[0.2em] uppercase text-[#2563EB] mb-4">
      {children}
    </p>
  );
}

function IconBox({ icon: Icon }: { icon: React.ElementType }) {
  return (
    <div className="w-12 h-12 rounded-xl bg-[#2563EB]/10 border border-[#2563EB]/20 flex items-center justify-center mb-6">
      <Icon className="w-6 h-6 text-[#2563EB]" strokeWidth={1.5} />
    </div>
  );
}

export function FeaturesGrid() {
  return (
    <section
      id="features"
      className="bg-black relative overflow-hidden"
      style={{ paddingTop: "var(--gap-section)", paddingBottom: "var(--gap-section)" }}
    >
      {/* Section ambient glow */}
      <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[600px] rounded-full bg-[#2563EB]/4 blur-[150px] pointer-events-none" />

      <div className="max-w-6xl mx-auto px-6 relative">
        {/* Section label */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
          className="mb-40"
        >
          <p className="text-[10px] font-mono tracking-[0.3em] uppercase text-white/40 mb-6">
            § 01 &nbsp;·&nbsp; What you get
          </p>
          <h2 className="text-[clamp(48px,7vw,88px)] font-black text-white tracking-[-0.04em] leading-[0.95]">
            Everything.<br />
            <span className="text-white/25">Nothing extra.</span>
          </h2>
        </motion.div>

        {/* ── Row A: 2/3 + 1/3 ──────────────────────────────────────── */}
        <motion.div
          variants={containerVariant}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, margin: "-80px" }}
          className="grid grid-cols-1 md:grid-cols-3 gap-5 mb-5"
        >
          {/* Large card — natural language */}
          <motion.div variants={itemVariant} className="md:col-span-2">
            <MagneticCard strength={0.2} className="h-full min-h-[280px]">
              <IconBox icon={MessageSquare} />
              <FeatureLabel>Natural language</FeatureLabel>
              <h3 className="text-[clamp(24px,3vw,36px)] font-black text-white tracking-tight leading-tight mb-3">
                Type what you remember.<br />Not what the file is named.
              </h3>
              <p className="text-white/35 text-sm leading-relaxed max-w-sm">
                &ldquo;that Q3 finance thing from last Tuesday&rdquo; actually works. AI understands intent, not just keywords.
              </p>
            </MagneticCard>
          </motion.div>

          {/* Tall card — menu bar */}
          <motion.div variants={itemVariant}>
            <MagneticCard strength={0.4} className="h-full min-h-[280px] flex flex-col">
              <IconBox icon={Command} />
              <FeatureLabel>Always ready</FeatureLabel>
              <h3 className="text-2xl font-black text-white tracking-tight leading-tight mb-3">
                Menu bar.<br />One shortcut.
              </h3>
              <p className="text-white/35 text-sm leading-relaxed">
                Lives quietly in your status bar. Hit ⌘+Space and it&apos;s there.
              </p>
              {/* Keyboard key visual */}
              <div className="mt-auto pt-8 flex items-center gap-2">
                {["⌘", "Space"].map((k) => (
                  <div
                    key={k}
                    className="px-3 py-1.5 rounded-lg border border-white/10 bg-white/5 text-white/50 text-xs font-mono shadow-[0_2px_0_rgba(255,255,255,0.06)]"
                  >
                    {k}
                  </div>
                ))}
              </div>
            </MagneticCard>
          </motion.div>
        </motion.div>

        {/* ── Row B: stat marquee ────────────────────────────────────── */}
        <motion.div
          variants={containerVariant}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, margin: "-80px" }}
          className="grid grid-cols-1 md:grid-cols-3 gap-5 mb-5"
        >
          {/* Privacy card — narrow */}
          <motion.div variants={itemVariant}>
            <MagneticCard strength={0.4} className="h-full min-h-[200px]">
              <IconBox icon={Shield} />
              <FeatureLabel>Private</FeatureLabel>
              <h3 className="text-xl font-black text-white tracking-tight leading-tight">
                Your Mac.<br />Your index.
              </h3>
              <p className="text-white/35 text-xs mt-3 leading-relaxed">
                Local SQLite. Zero uploads. Nothing ever leaves your machine.
              </p>
            </MagneticCard>
          </motion.div>

          {/* Wide speed statement */}
          <motion.div variants={itemVariant} className="md:col-span-2">
            <MagneticCard strength={0.15} className="h-full min-h-[200px] flex items-center">
              <div className="flex flex-col justify-center w-full">
                <IconBox icon={Zap} />
                <p className="text-[clamp(36px,5vw,64px)] font-black text-white tracking-[-0.04em] leading-none">
                  &lt;&nbsp;200ms.
                </p>
                <p className="text-[clamp(36px,5vw,64px)] font-black text-white/20 tracking-[-0.04em] leading-none">
                  Always.
                </p>
                <p className="text-white/30 text-sm mt-4">
                  SQLite-backed local index. No network hop. No lag.
                </p>
              </div>
            </MagneticCard>
          </motion.div>
        </motion.div>

        {/* ── Row C: 3 equal cards ───────────────────────────────────── */}
        <motion.div
          variants={containerVariant}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, margin: "-80px" }}
          className="grid grid-cols-1 md:grid-cols-3 gap-5"
        >
          <motion.div variants={itemVariant}>
            <MagneticCard className="h-full min-h-[220px]">
              <IconBox icon={FolderSearch} />
              <div className="flex items-center gap-2 mb-4">
                <FeatureLabel>Deep Search</FeatureLabel>
                <span className="text-[8px] font-mono font-bold tracking-widest uppercase px-2 py-0.5 rounded-full bg-[#2563EB] text-white -mt-4">
                  Pro
                </span>
              </div>
              <h3 className="text-xl font-black text-white tracking-tight leading-tight mb-2">
                AI expands your query before it searches.
              </h3>
              <p className="text-white/35 text-xs leading-relaxed">
                Finds files you couldn&apos;t name if you tried.
              </p>
            </MagneticCard>
          </motion.div>

          <motion.div variants={itemVariant}>
            <MagneticCard className="h-full min-h-[220px]">
              <IconBox icon={Image} />
              <div className="flex items-center gap-2 mb-4">
                <FeatureLabel>Image convert</FeatureLabel>
                <span className="text-[8px] font-mono font-bold tracking-widest uppercase px-2 py-0.5 rounded-full bg-[#2563EB] text-white -mt-4">
                  Pro
                </span>
              </div>
              <h3 className="text-xl font-black text-white tracking-tight leading-tight mb-2">
                JPEG, PNG, HEIC. Right in the result panel.
              </h3>
              <p className="text-white/35 text-xs leading-relaxed">
                Convert without opening anything else.
              </p>
            </MagneticCard>
          </motion.div>

          {/* Pricing callout card */}
          <motion.div variants={itemVariant}>
            <div className="rounded-2xl border border-[#2563EB]/30 bg-[#2563EB]/8 p-8 h-full min-h-[220px] flex flex-col justify-between relative overflow-hidden">
              <div className="absolute inset-0 bg-gradient-to-br from-[#2563EB]/10 to-transparent" />
              <div className="relative">
                <p className="text-[10px] font-mono tracking-[0.2em] uppercase text-[#2563EB]/70 mb-4">
                  Pricing
                </p>
                <div className="flex items-end gap-1 mb-2">
                  <span className="text-5xl font-black text-white tracking-tight">$0</span>
                  <span className="text-white/40 text-sm mb-2">to start</span>
                </div>
                <p className="text-white/40 text-xs leading-relaxed">
                  500 indexed files, unlimited searches. Pro at $10.99/mo unlocks everything.
                </p>
              </div>
              <a
                href="#waitlist"
                className="relative mt-6 block w-full text-center py-3 rounded-xl bg-white text-[#2563EB] text-sm font-bold hover:opacity-90 transition-opacity"
              >
                Join waitlist
              </a>
            </div>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}
