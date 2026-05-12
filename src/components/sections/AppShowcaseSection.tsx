"use client";
import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Search } from "lucide-react";
import { ContainerScroll } from "@/components/ui/container-scroll";

const SCENARIOS = [
  {
    label: "Find a design file",
    query: "that design mockup from last month",
    ms: "47ms",
    results: [
      { ext: "FIG", tc: "text-purple-400", bg: "bg-purple-500/15", name: "App_Redesign_v3.fig", sub: "Design / Mockups · 3w ago", best: true },
      { ext: "PNG", tc: "text-sky-400", bg: "bg-sky-500/15", name: "hero-mockup-final.png", sub: "Desktop · 3w ago", best: false },
      { ext: "PDF", tc: "text-red-400", bg: "bg-red-500/15", name: "design-brief.pdf", sub: "Documents / Projects · 1mo", best: false },
    ],
  },
  {
    label: "Locate your resume",
    query: "my resume, latest version",
    ms: "31ms",
    results: [
      { ext: "PDF", tc: "text-red-400", bg: "bg-red-500/15", name: "NLevy_Resume_2024.pdf", sub: "Documents / Career · 6w ago", best: true },
      { ext: "DOCX", tc: "text-blue-400", bg: "bg-blue-500/15", name: "resume_draft_v2.docx", sub: "Documents · 4mo ago", best: false },
    ],
  },
  {
    label: "Recall meeting notes",
    query: "investor call notes from tuesday",
    ms: "52ms",
    results: [
      { ext: "MD", tc: "text-emerald-400", bg: "bg-emerald-500/15", name: "investor-notes-oct15.md", sub: "Notes / Meetings · 4d ago", best: true },
      { ext: "TXT", tc: "text-white/40", bg: "bg-white/5", name: "call_transcript.txt", sub: "Documents / Calls · 4d ago", best: false },
    ],
  },
];

type Scenario = typeof SCENARIOS[0];

function MacDesktop({ typed, showResults, scenario }: { typed: string; showResults: boolean; scenario: Scenario }) {
  return (
    <div
      className="w-full h-full relative overflow-hidden"
      style={{
        background:
          "radial-gradient(ellipse 70% 55% at 68% 28%, #1b2d4a 0%, #0d1a2e 35%, #050a18 60%, #020408 100%)",
      }}
    >
      {/* Ghost windows for depth — barely visible, suggest a busy desktop */}
      <div className="absolute top-14 left-6 w-60 h-40 rounded-xl border border-white/[0.04] bg-white/[0.012]" />
      <div className="absolute top-20 left-24 w-80 h-56 rounded-xl border border-white/[0.03] bg-white/[0.008]" />
      <div className="absolute bottom-16 left-10 w-52 h-36 rounded-xl border border-white/[0.03] bg-white/[0.008]" />
      <div className="absolute bottom-20 right-80 w-40 h-28 rounded-xl border border-white/[0.025] bg-white/[0.006]" />

      {/* Blue ambient bloom behind the popover area */}
      <div className="absolute -top-8 right-0 w-80 h-72 rounded-full bg-[#2563EB]/10 blur-[80px] pointer-events-none" />

      {/* ── macOS Menu Bar ── */}
      <div className="flex items-center h-6 px-3 bg-black/50 backdrop-blur-md border-b border-white/[0.07] relative z-20">
        {/* Apple logo */}
        <svg viewBox="0 0 14 17" className="w-2.5 h-3 text-white/75 mr-4 flex-shrink-0" fill="currentColor">
          <path d="M13.1 11.9c-.3.7-.6 1.3-1 1.9-.5.8-.9 1.3-1.2 1.5-.5.4-1 .6-1.5.6-.4 0-.9-.1-1.4-.4-.5-.3-1-.4-1.4-.4-.5 0-1 .1-1.5.4-.5.3-.9.4-1.3.4-.5 0-1-.2-1.5-.6-.4-.3-.8-.9-1.3-1.7C.5 12.9.1 11.8 0 10.7c-.2-1.2.1-2.3.6-3.2.4-.7.9-1.2 1.5-1.6.6-.4 1.2-.6 1.9-.6.5 0 1 .1 1.6.4.6.3 1 .4 1.2.4.2 0 .7-.2 1.3-.5.7-.3 1.2-.4 1.7-.3 1.2.1 2.1.6 2.7 1.5-.5.3-.9.7-1.2 1.2-.3.5-.4 1-.4 1.6 0 .6.2 1.2.5 1.7.3.5.7.9 1.2 1.1zm-3.5-11C9.6 1.6 9 2.1 8.5 2.7 8 3.2 7.6 3.8 7.5 4.5c0 .1 0 .1-.1.1s-.1 0-.1-.1C7.2 4 7.3 3.4 7.6 2.8 7.9 2.3 8.3 1.8 8.8 1.4c.5-.4 1.1-.7 1.7-.9h.1v.4z" />
        </svg>
        {/* App menu items */}
        <div className="flex items-center gap-4 flex-1">
          {["Finder", "File", "Edit", "View", "Go", "Window"].map((m) => (
            <span key={m} className="text-white/55 text-[11px] font-medium">{m}</span>
          ))}
        </div>
        {/* Status area */}
        <div className="flex items-center gap-3">
          {/* Wifi */}
          <svg viewBox="0 0 18 14" className="w-3.5 h-3 text-white/50" fill="currentColor">
            <path d="M9 10a2 2 0 110 4 2 2 0 010-4zm-4-3a6 6 0 018 0l-1.4 1.4a4 4 0 00-5.2 0L5 7zm-3-3a10 10 0 0114 0L18.4 5.4a8 8 0 00-10.8 0L2 4z" opacity=".35"/>
            <path d="M9 10a2 2 0 110 4 2 2 0 010-4zm-4-3a6 6 0 018 0l-1.4 1.4a4 4 0 00-5.2 0L5 7z"/>
          </svg>
          {/* Battery */}
          <div className="flex items-center gap-px">
            <div className="w-5 h-2.5 rounded-[3px] border border-white/30 p-[2px] flex items-center">
              <div className="h-full rounded-[1px] bg-white/55" style={{ width: "68%" }} />
            </div>
            <div className="w-px h-1.5 bg-white/30 rounded-r" />
          </div>
          {/* Time */}
          <span className="text-white/60 text-[11px] font-medium tabular-nums">2:53 PM</span>
          {/* Found It! icon — highlighted / active */}
          <div className="flex items-center gap-1 bg-white/10 border border-white/15 rounded px-1.5 py-0.5">
            <div className="w-3.5 h-3.5 rounded bg-[#2563EB] flex items-center justify-center">
              <Search className="w-2 h-2 text-white" strokeWidth={3} />
            </div>
          </div>
        </div>
      </div>

      {/* ── Popover panel — below Found It! icon (top-right) ── */}
      <div className="absolute top-7 right-3 w-72 z-30">
        {/* Caret arrow */}
        <div className="flex justify-end pr-[18px] -mb-px">
          <div className="w-3 h-2 relative overflow-hidden flex justify-center">
            <div className="w-3 h-3 bg-[#252525] border border-white/10 rotate-45 absolute top-0.5" />
          </div>
        </div>
        {/* Panel */}
        <div className="rounded-[13px] bg-[#232323]/97 backdrop-blur-2xl border border-white/[0.09] shadow-[0_32px_100px_-12px_rgba(0,0,0,0.95),0_0_0_1px_rgba(255,255,255,0.04)]">
          {/* Search row */}
          <div className="flex items-center gap-2.5 px-3 py-2.5 border-b border-white/[0.07]">
            <div className="w-5 h-5 rounded-md bg-[#2563EB] flex items-center justify-center flex-shrink-0 shadow-[0_0_8px_rgba(37,99,235,0.5)]">
              <Search className="w-2.5 h-2.5 text-white" strokeWidth={3} />
            </div>
            <span className="text-white/85 text-[13px] font-light tracking-tight flex-1 min-h-[1.2rem] leading-5">
              {typed}
              <motion.span
                animate={{ opacity: [1, 0] }}
                transition={{ duration: 0.5, repeat: Infinity, repeatType: "reverse" }}
                className="inline-block w-[1.5px] h-[13px] bg-[#2563EB] ml-0.5 rounded align-middle"
              />
            </span>
          </div>

          {/* Results */}
          <div className="px-1.5 py-1 min-h-[90px]">
            <AnimatePresence mode="popLayout">
              {showResults &&
                scenario.results.map((r, i) => (
                  <motion.div
                    key={`${scenario.label}-${r.name}`}
                    initial={{ opacity: 0, y: -4 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: 4 }}
                    transition={{ duration: 0.18, delay: i * 0.07 }}
                    className={`flex items-center gap-2.5 px-2 py-1.5 rounded-lg mb-0.5 cursor-default ${
                      i === 0 ? "bg-[#2563EB]/12 border border-[#2563EB]/18" : "hover:bg-white/[0.04]"
                    }`}
                  >
                    <div className={`w-6 h-6 rounded-md ${r.bg} flex items-center justify-center flex-shrink-0`}>
                      <span className={`text-[7px] font-bold font-mono ${r.tc}`}>{r.ext}</span>
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="text-white/85 text-[11px] font-mono truncate">{r.name}</div>
                      <div className="text-white/30 text-[9px] mt-0.5">{r.sub}</div>
                    </div>
                    {r.best && (
                      <span className="text-[8px] font-mono text-[#2563EB] bg-[#2563EB]/10 border border-[#2563EB]/18 px-1.5 py-0.5 rounded-full flex-shrink-0">
                        Best
                      </span>
                    )}
                  </motion.div>
                ))}
            </AnimatePresence>
          </div>

          {/* Footer */}
          <div className="flex items-center gap-3 px-3 py-2 border-t border-white/[0.05]">
            <span className="text-white/18 text-[9px] font-mono">↵ open &nbsp;·&nbsp; ⌘P preview &nbsp;·&nbsp; ⌘C copy path</span>
            <span className="ml-auto text-white/18 text-[9px] font-mono tabular-nums">
              {showResults ? `${scenario.results.length} results · ${scenario.ms}` : ""}
            </span>
          </div>
        </div>
      </div>

      {/* Dock strip — subtle hint at bottom */}
      <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-56 h-10 rounded-t-2xl bg-white/[0.04] backdrop-blur-sm border border-white/[0.06] border-b-0 flex items-center justify-center gap-2.5 px-5">
        {[
          { color: "#1C1C1E", icon: "F" },
          { color: "#2563EB", icon: "✦" },
          { color: "#28C840", icon: "T" },
          { color: "#FF5F57", icon: "C" },
          { color: "#9D5BD2", icon: "X" },
        ].map(({ color, icon }, i) => (
          <div
            key={i}
            className="w-7 h-7 rounded-[8px] flex items-center justify-center text-white text-[10px] font-bold flex-shrink-0"
            style={{ background: color, opacity: 0.75 }}
          >
            {icon}
          </div>
        ))}
      </div>
    </div>
  );
}

export function AppShowcaseSection() {
  const [idx, setIdx] = useState(0);
  const [typed, setTyped] = useState("");
  const [showResults, setShowResults] = useState(false);

  useEffect(() => {
    let timeout: ReturnType<typeof setTimeout>;
    setTyped("");
    setShowResults(false);

    const query = SCENARIOS[idx].query;
    let i = 0;

    const typeChar = () => {
      setTyped(query.slice(0, i));
      i++;
      if (i <= query.length) {
        timeout = setTimeout(typeChar, 36 + Math.random() * 34);
      } else {
        timeout = setTimeout(() => {
          setShowResults(true);
          timeout = setTimeout(() => {
            setShowResults(false);
            timeout = setTimeout(() => {
              setIdx((prev) => (prev + 1) % SCENARIOS.length);
            }, 450);
          }, 3600);
        }, 260);
      }
    };

    timeout = setTimeout(typeChar, 650);
    return () => clearTimeout(timeout);
  }, [idx]);

  return (
    <section id="showcase" className="bg-black">
      <ContainerScroll
        titleComponent={
          <div className="text-center px-4">
            <div className="inline-flex items-center gap-2 mb-6">
              <div className="flex items-center gap-1.5 px-3 py-1.5 rounded-full border border-white/10 bg-white/[0.04]">
                <span className="text-white/50 text-xs font-mono">⌘</span>
                <span className="text-white/20 text-xs font-mono">+</span>
                <span className="text-white/50 text-xs font-mono">Space</span>
              </div>
              <span className="text-white/25 text-xs tracking-wide">and it&apos;s there</span>
            </div>
            <h2 className="text-3xl md:text-5xl font-bold text-white tracking-tight leading-tight mb-4">
              Lives in your menu bar.<br />
              <span className="text-white/40">Out of the way until you need it.</span>
            </h2>
            <p className="text-white/25 text-xs font-mono tracking-widest uppercase">
              Hit your shortcut · Type what you remember · Done
            </p>
          </div>
        }
      >
        <MacDesktop typed={typed} showResults={showResults} scenario={SCENARIOS[idx]} />
      </ContainerScroll>

      {/* Scenario pills — let user jump between them */}
      <div className="flex items-center justify-center gap-2 pb-16 -mt-6 flex-wrap px-4">
        {SCENARIOS.map((s, i) => (
          <button
            key={s.label}
            onClick={() => { if (i !== idx) setIdx(i); }}
            className={`px-3 py-1.5 rounded-full text-[11px] font-mono transition-all ${
              i === idx
                ? "bg-[#2563EB]/15 border border-[#2563EB]/30 text-[#2563EB]"
                : "border border-white/8 text-white/25 hover:text-white/50 hover:border-white/18 cursor-pointer"
            }`}
          >
            {s.label}
          </button>
        ))}
      </div>
    </section>
  );
}
