"use client";
import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { FileText, Image, Code, Film } from "lucide-react";

const QUERY = "Q3 revenue report from last week";

const RESULTS = [
  {
    icon: FileText,
    color: "text-red-400",
    bg: "bg-red-500/10",
    label: "PDF",
    name: "Q3_Revenue_Report_2024.pdf",
    path: "Documents / Finance / 2024",
    date: "Modified 3 days ago",
    badge: "Best match",
  },
  {
    icon: Image,
    color: "text-blue-400",
    bg: "bg-blue-500/10",
    label: "PNG",
    name: "q3-revenue-chart-final.png",
    path: "Desktop / Work",
    date: "Modified 5 days ago",
    badge: null,
  },
  {
    icon: Code,
    color: "text-green-400",
    bg: "bg-green-500/10",
    label: "XLSX",
    name: "Revenue_Breakdown_Q3.xlsx",
    path: "Documents / Finance",
    date: "Modified 6 days ago",
    badge: null,
  },
  {
    icon: Film,
    color: "text-purple-400",
    bg: "bg-purple-500/10",
    label: "KEY",
    name: "Q3_Presentation_Draft.key",
    path: "Documents / Presentations",
    date: "Modified 1 week ago",
    badge: null,
  },
];

export function AnimatedSearchDemo() {
  const [typed, setTyped] = useState("");
  const [showResults, setShowResults] = useState(false);
  const [phase, setPhase] = useState<"typing" | "results" | "pause">("typing");

  useEffect(() => {
    let timeout: ReturnType<typeof setTimeout>;

    const runCycle = () => {
      setTyped("");
      setShowResults(false);
      setPhase("typing");

      // Type the query character by character
      let i = 0;
      const typeChar = () => {
        if (i < QUERY.length) {
          setTyped(QUERY.slice(0, i + 1));
          i++;
          timeout = setTimeout(typeChar, 42 + Math.random() * 30);
        } else {
          // Pause after typing, then show results
          timeout = setTimeout(() => {
            setPhase("results");
            setShowResults(true);
            // Pause with results visible, then restart
            timeout = setTimeout(() => {
              setPhase("pause");
              timeout = setTimeout(runCycle, 600);
            }, 4000);
          }, 400);
        }
      };
      typeChar();
    };

    timeout = setTimeout(runCycle, 800);
    return () => clearTimeout(timeout);
  }, []);

  return (
    <motion.div
      initial={{ opacity: 0, y: 24 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.7, delay: 1.0 }}
      className="w-full max-w-xl mx-auto mt-12"
    >
      <div className="rounded-2xl border border-white/8 bg-[#0a0a0a] overflow-hidden shadow-2xl shadow-black/60">
        {/* Window bar */}
        <div className="flex items-center gap-2 px-4 py-2.5 border-b border-white/5 bg-[#0f0f0f]">
          <div className="w-2.5 h-2.5 rounded-full bg-[#FF5F57]" />
          <div className="w-2.5 h-2.5 rounded-full bg-[#FEBC2E]" />
          <div className="w-2.5 h-2.5 rounded-full bg-[#28C840]" />
          <span className="ml-auto text-white/15 text-[10px] font-mono tracking-wide">Found It!</span>
        </div>

        {/* Search row */}
        <div className="flex items-center gap-3 px-4 py-3 border-b border-white/5">
          <div className="w-6 h-6 rounded-md bg-[#2563EB] flex items-center justify-center flex-shrink-0">
            <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2.5" strokeLinecap="round">
              <circle cx="11" cy="11" r="8" /><path d="m21 21-4.35-4.35" />
            </svg>
          </div>
          <span className="text-white/80 text-sm font-light tracking-tight flex-1 min-h-[1.25rem]">
            {typed}
            <motion.span
              animate={{ opacity: [1, 0] }}
              transition={{ duration: 0.5, repeat: Infinity, repeatType: "reverse" }}
              className="inline-block w-0.5 h-3.5 bg-[#2563EB] rounded ml-0.5 align-middle"
            />
          </span>
          <span className="text-white/15 text-[10px] font-mono flex-shrink-0">
            {showResults ? `${RESULTS.length} results · 38ms` : ""}
          </span>
        </div>

        {/* Results */}
        <div className="px-2 py-1.5 min-h-[140px]">
          <AnimatePresence>
            {showResults &&
              RESULTS.map((r, i) => (
                <motion.div
                  key={r.name}
                  initial={{ opacity: 0, x: -8 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.25, delay: i * 0.07 }}
                  className={`flex items-center gap-3 px-3 py-2 rounded-lg mb-0.5 ${
                    i === 0 ? "bg-[#2563EB]/10 border border-[#2563EB]/20" : "hover:bg-white/3"
                  }`}
                >
                  <div className={`w-7 h-7 rounded-md ${r.bg} flex items-center justify-center flex-shrink-0`}>
                    <span className={`text-[8px] font-bold font-mono ${r.color}`}>{r.label}</span>
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="text-white/85 text-xs font-mono truncate">{r.name}</div>
                    <div className="text-white/25 text-[10px] mt-0.5 truncate">
                      {r.path} &nbsp;·&nbsp; {r.date}
                    </div>
                  </div>
                  {r.badge && (
                    <span className="text-[9px] font-mono text-[#2563EB] bg-[#2563EB]/10 border border-[#2563EB]/20 px-2 py-0.5 rounded-full flex-shrink-0">
                      {r.badge}
                    </span>
                  )}
                </motion.div>
              ))}
          </AnimatePresence>
        </div>

        {/* Footer bar */}
        <div className="flex items-center gap-3 px-4 py-2 border-t border-white/5 bg-[#0f0f0f]">
          <span className="text-white/15 text-[9px] font-mono">↵ open</span>
          <span className="text-white/15 text-[9px] font-mono">⌘P preview</span>
          <span className="text-white/15 text-[9px] font-mono">⌘C copy path</span>
        </div>
      </div>
    </motion.div>
  );
}
