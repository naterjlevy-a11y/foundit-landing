"use client";
import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Search, Download, CheckCircle, Command } from "lucide-react";

const steps = [
  { n: "01", title: "Download", body: "Click the button above and save the .dmg file to your Downloads folder." },
  { n: "02", title: "Install", body: "Open the .dmg, drag Found It! to Applications, then launch it from there." },
  { n: "03", title: "Search", body: "Press ⌘ Space from anywhere to open Found It! and start searching instantly." },
];

const specs = [
  ["macOS", "13 Ventura or later"],
  ["Chip", "Apple Silicon · Intel"],
  ["Size", "~12 MB"],
  ["Price", "Free tier · 500 files"],
];

export default function DownloadPage() {
  const [fromCheckout, setFromCheckout] = useState(false);

  useEffect(() => {
    if (typeof window !== "undefined") {
      setFromCheckout(window.location.search.includes("checkout=success"));
    }
  }, []);

  return (
    <div className="min-h-screen bg-black text-white flex flex-col">
      {/* Nav */}
      <nav className="fixed top-0 left-0 right-0 z-50 flex items-center justify-between px-6 py-4 border-b border-white/5 bg-black/80 backdrop-blur-xl">
        <a href="/" className="flex items-center gap-2">
          <div className="w-7 h-7 rounded-lg bg-[#2563EB] flex items-center justify-center">
            <Search className="w-3.5 h-3.5 text-white" strokeWidth={2.5} />
          </div>
          <span className="text-white font-semibold text-sm tracking-tight">Found It!</span>
        </a>
        <a href="/#pricing" className="text-white/40 hover:text-white text-sm transition-colors">
          Upgrade to Pro →
        </a>
      </nav>

      <main className="flex-1 flex flex-col items-center justify-center px-6 pt-24 pb-20">

        {/* Checkout success banner */}
        {fromCheckout && (
          <motion.div
            initial={{ opacity: 0, y: -12 }}
            animate={{ opacity: 1, y: 0 }}
            className="mb-10 flex items-center gap-3 rounded-xl border border-green-500/20 bg-green-500/10 px-5 py-3"
          >
            <CheckCircle className="w-5 h-5 text-green-400 flex-shrink-0" />
            <span className="text-green-300 text-sm font-medium">Payment successful — you&apos;re now on Pro! Download below.</span>
          </motion.div>
        )}

        {/* App icon */}
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
          className="mb-8"
        >
          <div className="w-28 h-28 rounded-[28px] bg-gradient-to-br from-[#2563EB] to-[#1d4ed8] flex items-center justify-center shadow-2xl shadow-[#2563EB]/30">
            <Search className="w-14 h-14 text-white" strokeWidth={2} />
          </div>
        </motion.div>

        {/* Headline */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.1 }}
          className="text-center mb-10"
        >
          <h1 className="text-4xl md:text-6xl font-black tracking-tight mb-4">
            Found It!
          </h1>
          <p className="text-white/40 text-lg max-w-md mx-auto">
            Natural-language file search for macOS. Free to start.
          </p>
        </motion.div>

        {/* Download button */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="mb-4"
        >
          <a
            href="/assets/FoundIt.dmg"
            className="flex items-center gap-3 px-8 py-4 rounded-2xl bg-white text-black font-bold text-base hover:opacity-90 transition-opacity shadow-2xl shadow-white/10"
          >
            <Download className="w-5 h-5" />
            Download for Mac — Free
          </a>
        </motion.div>

        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.35 }}
          className="text-white/25 text-xs mb-16 font-mono"
        >
          macOS 13+ · Apple Silicon · Intel · ~12 MB
        </motion.p>

        {/* Keyboard shortcut preview */}
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
          className="flex items-center gap-2 mb-20"
        >
          <div className="flex items-center justify-center w-10 h-10 rounded-lg border border-white/10 bg-white/5">
            <Command className="w-5 h-5 text-white/60" />
          </div>
          <span className="text-white/20 text-sm">+</span>
          <div className="flex items-center justify-center px-4 h-10 rounded-lg border border-white/10 bg-white/5">
            <span className="text-white/60 text-sm font-medium">Space</span>
          </div>
          <span className="text-white/25 text-sm ml-2">Open from anywhere</span>
        </motion.div>

        {/* Setup steps */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.45 }}
          className="w-full max-w-2xl mb-20"
        >
          <h2 className="text-white/30 text-[10px] font-mono tracking-widest uppercase mb-8 text-center">
            Getting started
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {steps.map((s, i) => (
              <motion.div
                key={s.n}
                initial={{ opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.5 + i * 0.08 }}
                className="rounded-2xl border border-white/8 bg-white/3 p-6"
              >
                <div className="text-[#2563EB] text-[10px] font-mono tracking-widest mb-3">{s.n}</div>
                <div className="text-white font-semibold text-sm mb-2">{s.title}</div>
                <div className="text-white/40 text-xs leading-relaxed">{s.body}</div>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* Specs */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.7 }}
          className="w-full max-w-sm"
        >
          <div className="rounded-2xl border border-white/8 bg-white/3 divide-y divide-white/5 overflow-hidden">
            {specs.map(([label, value]) => (
              <div key={label} className="flex items-center justify-between px-5 py-3">
                <span className="text-white/30 text-xs font-mono">{label}</span>
                <span className="text-white/70 text-xs">{value}</span>
              </div>
            ))}
          </div>
        </motion.div>

        {/* Upgrade nudge */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.8 }}
          className="mt-16 text-center"
        >
          <p className="text-white/20 text-sm mb-3">Need unlimited files and AI Deep Search?</p>
          <a
            href="/#pricing"
            className="text-[#2563EB] text-sm font-medium hover:text-blue-400 transition-colors"
          >
            Upgrade to Pro — $10.99/mo →
          </a>
        </motion.div>
      </main>

      {/* Footer */}
      <footer className="border-t border-white/5 px-6 py-6 flex items-center justify-between text-white/20 text-xs font-mono">
        <span>© {new Date().getFullYear()} Found It!</span>
        <div className="flex gap-6">
          <a href="/privacy" className="hover:text-white/50 transition-colors">Privacy</a>
          <a href="/terms" className="hover:text-white/50 transition-colors">Terms</a>
        </div>
      </footer>
    </div>
  );
}
