"use client";
import { motion } from "framer-motion";
import { GlowingCard } from "@/components/ui/glowing-card";
import { MessageSquare, Command, Shield, Zap, Image, FolderSearch } from "lucide-react";

const features = [
  {
    icon: MessageSquare,
    title: "Natural language search",
    body: "Search like you think. 'That PDF from last Tuesday about Q3 revenue' actually works.",
  },
  {
    icon: Command,
    title: "Lives in your menu bar",
    body: "One shortcut away. Always ready. Never in your way.",
  },
  {
    icon: Shield,
    title: "100% local index",
    body: "Your files never leave your Mac. The index is yours, stored locally in SQLite.",
  },
  {
    icon: Zap,
    title: "Blazing fast",
    body: "SQLite-powered local index. Results in under 200ms — no network, no lag.",
  },
  {
    icon: Image,
    title: "Image conversion",
    body: "Convert JPEG, PNG, HEIC, and more. Pro feature — baked right into the result panel.",
    pro: true,
  },
  {
    icon: FolderSearch,
    title: "Deep Search",
    body: "AI query expansion finds related terms before searching, then re-ranks results. Built for vague or hard-to-name files.",
    pro: true,
  },
];

export function FeaturesSection() {
  return (
    <section id="features" className="bg-black border-t border-white/5 py-28">
      <div className="max-w-5xl mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="text-center mb-16"
        >
          <h2 className="text-3xl md:text-5xl font-bold text-white tracking-tight">What you get.</h2>
          <p className="mt-4 text-white/40 max-w-lg mx-auto text-base leading-relaxed">
            Free lets you search your first 500 indexed files with no limit on searches. Pro removes the cap and adds AI-powered extras.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3">
          {features.map((f, i) => (
            <motion.div
              key={f.title}
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: i * 0.07 }}
            >
              <GlowingCard className="h-full">
                <div className="flex items-start justify-between mb-4">
                  <div className="w-9 h-9 rounded-lg bg-white/5 border border-white/8 flex items-center justify-center">
                    <f.icon className="w-4 h-4 text-[#2563EB]" strokeWidth={1.75} />
                  </div>
                  {f.pro && (
                    <span className="text-[9px] font-mono font-bold tracking-widest uppercase px-2 py-0.5 rounded-full bg-[#2563EB] text-white">
                      Pro
                    </span>
                  )}
                </div>
                <h3 className="text-white font-semibold text-sm mb-2">{f.title}</h3>
                <p className="text-white/40 text-sm leading-relaxed">{f.body}</p>
              </GlowingCard>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
