"use client";
import { ContainerScroll } from "@/components/ui/container-scroll";
import { Search, FileText, Image, Code } from "lucide-react";

function AppMockup() {
  const results = [
    { icon: FileText, label: "PDF", name: "2024_Tax_Return_Summary.pdf", desc: "Tax summary · Documents/Finance", color: "text-red-400", bg: "bg-red-500/10" },
    { icon: Image, label: "PNG", name: "q3-revenue-chart.png", desc: "Revenue chart · Desktop/Work", color: "text-blue-400", bg: "bg-blue-500/10" },
    { icon: Code, label: "PY", name: "data_analysis_final.py", desc: "Data script · Projects/Q3", color: "text-green-400", bg: "bg-green-500/10" },
  ];

  return (
    <div className="w-full h-full bg-[#080808] flex flex-col">
      {/* Window bar */}
      <div className="flex items-center gap-2 px-4 py-3 border-b border-white/5 bg-[#0f0f0f]">
        <div className="w-3 h-3 rounded-full bg-[#FF5F57]" />
        <div className="w-3 h-3 rounded-full bg-[#FEBC2E]" />
        <div className="w-3 h-3 rounded-full bg-[#28C840]" />
        <span className="ml-auto text-white/20 text-xs font-mono">Found It!</span>
      </div>

      {/* Search bar */}
      <div className="flex items-center gap-3 px-4 py-3 border-b border-white/5">
        <div className="w-7 h-7 rounded-lg bg-[#2563EB] flex items-center justify-center flex-shrink-0">
          <Search className="w-3.5 h-3.5 text-white" strokeWidth={2.5} />
        </div>
        <span className="text-white/80 text-sm font-light tracking-tight">tax document from April</span>
        <span className="w-0.5 h-4 bg-[#2563EB] rounded animate-pulse ml-0.5" />
      </div>

      {/* Results */}
      <div className="flex-1 overflow-hidden px-2 py-2 space-y-0.5">
        {results.map((r, i) => (
          <div
            key={i}
            className={`flex items-center gap-3 px-3 py-2.5 rounded-lg transition-colors ${i === 0 ? "bg-[#2563EB]/10 border border-[#2563EB]/20" : "hover:bg-white/3"}`}
          >
            <div className={`w-8 h-8 rounded-lg ${r.bg} flex items-center justify-center flex-shrink-0`}>
              <span className={`text-[9px] font-bold font-mono ${r.color}`}>{r.label}</span>
            </div>
            <div className="flex-1 min-w-0">
              <div className="text-white/85 text-xs font-mono truncate">{r.name}</div>
              <div className="text-white/30 text-[10px] mt-0.5">{r.desc}</div>
            </div>
            {i === 0 && (
              <span className="text-[10px] font-mono text-[#2563EB] bg-[#2563EB]/10 px-2 py-0.5 rounded-full flex-shrink-0">
                Best match
              </span>
            )}
          </div>
        ))}
      </div>

      {/* Footer bar */}
      <div className="flex items-center gap-4 px-4 py-2 border-t border-white/5 bg-[#0f0f0f]">
        <span className="text-white/20 text-[10px] font-mono">↵ open &nbsp;·&nbsp; ⌘P preview &nbsp;·&nbsp; ⌘C copy path</span>
        <span className="ml-auto text-white/15 text-[10px] font-mono">3 results · 48ms</span>
      </div>
    </div>
  );
}

export function AppShowcaseSection() {
  return (
    <section id="showcase" className="bg-black">
      <ContainerScroll
        titleComponent={
          <div className="text-center px-4">
            <p className="text-[#2563EB] text-xs font-mono tracking-widest uppercase mb-4">
              § 001 · The search bar you always wanted
            </p>
            <h2 className="text-3xl md:text-5xl font-bold text-white tracking-tight leading-tight mb-4">
              Hit your shortcut.<br />
              <span className="text-white/50">Type anything.</span>
            </h2>
            <p className="text-white/40 text-base max-w-lg mx-auto leading-relaxed">
              Found It! searches your entire Mac in milliseconds — powered by AI that understands what you mean, not just what you typed.
            </p>
          </div>
        }
      >
        <AppMockup />
      </ContainerScroll>
    </section>
  );
}
