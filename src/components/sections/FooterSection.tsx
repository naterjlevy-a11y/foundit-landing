"use client";
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Search } from "lucide-react";

function DownloadButton() {
  const [hovered, setHovered] = useState(false);
  return (
    <a
      href="#waitlist"
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      className="relative inline-flex items-center justify-center px-7 py-3 rounded-xl bg-[#2563EB] hover:bg-[#1d4ed8] text-white text-sm font-semibold transition-colors overflow-hidden min-w-[160px] h-[46px]"
    >
      <AnimatePresence mode="wait">
        <motion.span
          key={hovered ? "hover" : "default"}
          initial={{ opacity: 0, y: hovered ? 8 : -8 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: hovered ? -8 : 8 }}
          transition={{ duration: 0.18 }}
          className="absolute inset-0 flex items-center justify-center"
        >
          {hovered ? "Get Found It! →" : "Join the waitlist"}
        </motion.span>
      </AnimatePresence>
    </a>
  );
}

export function FooterSection() {
  return (
    <footer className="relative bg-black overflow-hidden">
      {/* Grid pattern background */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          backgroundImage: `
            linear-gradient(rgba(255,255,255,0.03) 1px, transparent 1px),
            linear-gradient(90deg, rgba(255,255,255,0.03) 1px, transparent 1px)
          `,
          backgroundSize: "48px 48px",
        }}
      />
      {/* Fade edges */}
      <div className="absolute inset-0 pointer-events-none bg-[radial-gradient(ellipse_80%_60%_at_50%_0%,transparent_0%,black_100%)]" />
      <div className="absolute inset-x-0 top-0 h-px bg-white/5" />

      <div className="relative max-w-5xl mx-auto px-6">
        {/* Final CTA */}
        <div className="py-24 flex flex-col items-center text-center">
          <div className="flex items-center gap-2.5 mb-8">
            <div className="w-9 h-9 rounded-xl bg-[#2563EB] flex items-center justify-center">
              <Search className="w-4.5 h-4.5 text-white" strokeWidth={2.5} />
            </div>
            <span className="text-white text-2xl font-black tracking-tight">Found It!</span>
          </div>
          <p className="text-white/30 text-base md:text-lg font-light italic mb-8 max-w-md">
            &ldquo;Your files are waiting to be found.&rdquo;
          </p>
          <DownloadButton />
        </div>

        {/* Links */}
        <div className="border-t border-white/5 py-8 flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="flex flex-wrap items-center justify-center gap-6">
            {[
              ["Features", "#features"],
              ["How it works", "#how"],
              ["Pricing", "#pricing"],
              ["About", "#about"],
            ].map(([l, h]) => (
              <a key={h} href={h} className="text-white/25 hover:text-white/60 text-xs transition-colors">
                {l}
              </a>
            ))}
            <span className="text-white/10">|</span>
            {[
              ["Privacy", "/privacy.html"],
              ["Terms", "/terms.html"],
              ["Refunds", "/refunds.html"],
            ].map(([l, h]) => (
              <a key={h} href={h} className="text-white/25 hover:text-white/60 text-xs transition-colors">
                {l}
              </a>
            ))}
          </div>

          <div className="flex items-center gap-4">
            <a
              href="https://github.com/naterjlevy-a11y"
              target="_blank"
              rel="noopener noreferrer"
              className="text-white/20 hover:text-white/50 transition-colors"
              aria-label="GitHub"
            >
              <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
                <path d="M12 2C6.477 2 2 6.477 2 12c0 4.418 2.865 8.166 6.839 9.489.5.092.682-.217.682-.482 0-.237-.009-.866-.013-1.7-2.782.603-3.369-1.34-3.369-1.34-.454-1.156-1.11-1.464-1.11-1.464-.908-.62.069-.608.069-.608 1.004.07 1.532 1.032 1.532 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.094.39-1.988 1.032-2.684-.103-.253-.448-1.27.098-2.646 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.116 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.393.1 2.646.645.696 1.028 1.59 1.028 2.684 0 3.848-2.338 4.693-4.566 4.923.359.309.678.919.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.578.688.48C19.138 20.161 22 16.418 22 12c0-5.523-4.477-10-10-10z" />
              </svg>
            </a>
            <a
              href="https://www.linkedin.com/in/nate-levy-b803412a9/"
              target="_blank"
              rel="noopener noreferrer"
              className="text-white/20 hover:text-white/50 transition-colors"
              aria-label="LinkedIn"
            >
              <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
                <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
              </svg>
            </a>
          </div>
        </div>

        <div className="border-t border-white/5 py-6 flex items-center justify-between">
          <span className="text-white/15 text-[11px] font-mono">© 2026 Found It!</span>
          <span className="text-white/15 text-[11px] font-mono">Made by Nate Levy</span>
        </div>
      </div>
    </footer>
  );
}
