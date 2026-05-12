"use client";
import { useRef } from "react";
import { Folder, Database, Sparkles } from "lucide-react";
import { AnimatedBeam } from "@/components/ui/animated-beam";
import { motion } from "framer-motion";
import { cn } from "@/lib/utils";

function Node({
  icon: Icon,
  label,
  sub,
  className,
  ref,
}: {
  icon: React.ElementType;
  label: string;
  sub: string;
  className?: string;
  ref?: React.RefObject<HTMLDivElement | null>;
}) {
  return (
    <div ref={ref} className={cn("flex flex-col items-center gap-3 z-10", className)}>
      <div className="w-16 h-16 rounded-2xl border border-white/10 bg-[#0a0a0a] flex items-center justify-center shadow-lg shadow-black/60">
        <Icon className="w-7 h-7 text-[#2563EB]" strokeWidth={1.5} />
      </div>
      <div className="text-center">
        <div className="text-white text-sm font-semibold">{label}</div>
        <div className="text-white/35 text-xs mt-1 max-w-[140px] leading-relaxed">{sub}</div>
      </div>
    </div>
  );
}

export function HowItWorksSection() {
  const containerRef = useRef<HTMLDivElement>(null);
  const div1Ref = useRef<HTMLDivElement>(null);
  const div2Ref = useRef<HTMLDivElement>(null);
  const div3Ref = useRef<HTMLDivElement>(null);

  return (
    <section id="how" className="bg-black border-t border-white/5 py-28">
      <div className="max-w-5xl mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="text-center mb-20"
        >
          <p className="text-[#2563EB] text-xs font-mono tracking-widest uppercase mb-4">§ 002 · How it works</p>
          <h2 className="text-3xl md:text-5xl font-bold text-white tracking-tight">
            Smart search.<br />
            <span className="text-white/50">Private by default.</span>
          </h2>
          <p className="mt-4 text-white/40 max-w-lg mx-auto text-base leading-relaxed">
            Found It! builds a local index of your files in the background. When you search, everything is already there — no scanning, no waiting, nothing uploaded.
          </p>
        </motion.div>

        <div
          ref={containerRef}
          className="relative flex items-center justify-between gap-4 md:gap-0 flex-col md:flex-row"
        >
          <div ref={div1Ref}>
            <Node icon={Folder} label="Your Files" sub="Local SQLite index — nothing leaves your Mac" />
          </div>
          <div ref={div2Ref}>
            <Node icon={Database} label="Found It! Index" sub="AI summaries, embeddings, smart metadata" />
          </div>
          <div ref={div3Ref}>
            <Node icon={Sparkles} label="AI Search" sub="Instant results, ranked by relevance" />
          </div>

          <AnimatedBeam containerRef={containerRef} fromRef={div1Ref} toRef={div2Ref} curvature={-40} />
          <AnimatedBeam containerRef={containerRef} fromRef={div2Ref} toRef={div3Ref} curvature={-40} />
        </div>

        {/* Steps */}
        <div className="mt-20 grid grid-cols-1 md:grid-cols-3 gap-6">
          {[
            { num: "01", title: "Found It! indexes your files", body: "Scans Documents, Downloads, and Desktop — building a local SQLite index with AI-generated summaries and smart metadata." },
            { num: "02", title: "Smart keyword extraction", body: "Your query is lemmatized, expanded with synonyms, and used to fetch candidates from the local index via fast LIKE queries." },
            { num: "03", title: "Scored, ranked, and ready", body: "Each file is scored across 10+ signals — filename, content, metadata, embeddings, recency — then ranked and shown instantly." },
          ].map((s) => (
            <motion.div
              key={s.num}
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: parseInt(s.num) * 0.1 }}
              className="border border-white/5 rounded-xl p-6 bg-[#0a0a0a]"
            >
              <span className="text-[#2563EB] font-mono text-sm font-semibold">{s.num}</span>
              <h3 className="text-white font-semibold mt-3 mb-2">{s.title}</h3>
              <p className="text-white/40 text-sm leading-relaxed">{s.body}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
