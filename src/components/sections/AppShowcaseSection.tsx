"use client";
import { useEffect, useState, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { FileText, Image, Code, Film, ChevronRight, Check } from "lucide-react";

const STEP_DURATION = 3800;

const STEPS = [
  {
    id: "search",
    number: "01",
    label: "Search anything",
    desc: "Type what you remember — Found It! understands plain English.",
    color: "#2563EB",
  },
  {
    id: "select",
    number: "02",
    label: "Click to open",
    desc: "Instantly open, preview, or copy the path with one keystroke.",
    color: "#7C3AED",
  },
  {
    id: "convert",
    number: "03",
    label: "Convert & export",
    desc: "Convert any file to another format without leaving the search bar.",
    color: "#0891b2",
  },
  {
    id: "drop",
    number: "04",
    label: "Drag & drop",
    desc: "Drag results directly into any app — Finder, Mail, Slack, anywhere.",
    color: "#059669",
  },
];

// ── Step 1: typing animation ────────────────────────────────────────────────
const SEARCH_QUERY = "Q3 budget from last Tuesday";
const SEARCH_RESULTS = [
  { icon: FileText, label: "XLSX", name: "Q3_Budget_FINAL.xlsx", path: "Documents / Finance / 2025", color: "text-green-400", bg: "bg-green-500/10", best: true },
  { icon: Code, label: "CSV", name: "budget_raw_export.csv", path: "Downloads", color: "text-blue-400", bg: "bg-blue-500/10", best: false },
  { icon: Image, label: "PDF", name: "budget_review_slides.pdf", path: "Desktop / Work", color: "text-red-400", bg: "bg-red-500/10", best: false },
];

function StepSearch({ active }: { active: boolean }) {
  const [typed, setTyped] = useState("");
  const [showResults, setShowResults] = useState(false);
  const cycleRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  useEffect(() => {
    if (!active) {
      setTyped("");
      setShowResults(false);
      return;
    }
    let i = 0;
    setTyped("");
    setShowResults(false);

    const type = () => {
      if (i < SEARCH_QUERY.length) {
        setTyped(SEARCH_QUERY.slice(0, i + 1));
        i++;
        cycleRef.current = setTimeout(type, 45 + Math.random() * 25);
      } else {
        cycleRef.current = setTimeout(() => setShowResults(true), 350);
      }
    };
    cycleRef.current = setTimeout(type, 300);
    return () => { if (cycleRef.current) clearTimeout(cycleRef.current); };
  }, [active]);

  return (
    <div className="flex flex-col gap-1.5">
      <div className="flex items-center gap-3 px-4 py-3 border-b border-white/5">
        <div className="w-6 h-6 rounded-md bg-[#2563EB] flex items-center justify-center flex-shrink-0">
          <svg width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2.8" strokeLinecap="round"><circle cx="11" cy="11" r="8"/><path d="m21 21-4.35-4.35"/></svg>
        </div>
        <span className="text-white/80 text-sm flex-1 whitespace-nowrap overflow-hidden">
          {typed || <span className="text-white/20">Search your files...</span>}
          <motion.span animate={{ opacity: [1,0] }} transition={{ duration: 0.5, repeat: Infinity, repeatType:"reverse" }} className="inline-block w-0.5 h-3.5 bg-[#2563EB] rounded ml-0.5 align-middle"/>
        </span>
        <span className="text-white/15 text-[10px] font-mono flex-shrink-0">{showResults ? "3 results · 22ms" : ""}</span>
      </div>
      <div className="px-2 h-[148px] overflow-hidden flex flex-col justify-center">
        <AnimatePresence>
          {showResults && SEARCH_RESULTS.map((r, i) => (
            <motion.div key={r.name} initial={{ opacity: 0, x: -10 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0 }} transition={{ duration: 0.22, delay: i * 0.07 }}
              className={`flex items-center gap-3 px-3 py-2 rounded-lg mb-0.5 ${i === 0 ? "bg-[#2563EB]/10 border border-[#2563EB]/20" : "hover:bg-white/3"}`}>
              <div className={`w-7 h-7 rounded-md ${r.bg} flex items-center justify-center flex-shrink-0`}>
                <span className={`text-[8px] font-bold font-mono ${r.color}`}>{r.label}</span>
              </div>
              <div className="flex-1 min-w-0">
                <div className="text-white/85 text-xs font-mono truncate">{r.name}</div>
                <div className="text-white/25 text-[10px] mt-0.5">{r.path}</div>
              </div>
              {r.best && <span className="text-[9px] font-mono text-[#2563EB] bg-[#2563EB]/10 border border-[#2563EB]/20 px-2 py-0.5 rounded-full flex-shrink-0">Best match</span>}
            </motion.div>
          ))}
        </AnimatePresence>
        {!showResults && (
          <div className="flex items-center justify-center h-full">
            <span className="text-white/10 text-xs font-mono">waiting for query…</span>
          </div>
        )}
      </div>
    </div>
  );
}

// ── Step 2: select + open ────────────────────────────────────────────────────
function StepSelect({ active }: { active: boolean }) {
  const [highlighted, setHighlighted] = useState(0);
  const [opened, setOpened] = useState(false);

  useEffect(() => {
    if (!active) { setHighlighted(0); setOpened(false); return; }
    setHighlighted(0); setOpened(false);
    const t1 = setTimeout(() => setHighlighted(1), 600);
    const t2 = setTimeout(() => setHighlighted(2), 1200);
    const t3 = setTimeout(() => setHighlighted(0), 1800);
    const t4 = setTimeout(() => setOpened(true), 2400);
    return () => { clearTimeout(t1); clearTimeout(t2); clearTimeout(t3); clearTimeout(t4); };
  }, [active]);

  const files = [
    { label: "XLSX", name: "Q3_Budget_FINAL.xlsx", color: "text-green-400", bg: "bg-green-500/10" },
    { label: "CSV", name: "budget_raw_export.csv", color: "text-blue-400", bg: "bg-blue-500/10" },
    { label: "PDF", name: "budget_review_slides.pdf", color: "text-red-400", bg: "bg-red-500/10" },
  ];

  return (
    <div className="flex flex-col">
      <div className="flex items-center gap-3 px-4 py-3 border-b border-white/5">
        <div className="w-6 h-6 rounded-md bg-[#2563EB]/20 flex items-center justify-center flex-shrink-0">
          <svg width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="#2563EB" strokeWidth="2.8" strokeLinecap="round"><circle cx="11" cy="11" r="8"/><path d="m21 21-4.35-4.35"/></svg>
        </div>
        <span className="text-white/40 text-sm">Q3 budget from last Tuesday</span>
      </div>
      <div className="px-2 pt-2 h-[110px] overflow-hidden">
        {files.map((f, i) => (
          <motion.div key={f.name} animate={{ background: i === highlighted ? "rgba(37,99,235,0.12)" : "transparent", borderColor: i === highlighted ? "rgba(37,99,235,0.25)" : "transparent" }}
            transition={{ duration: 0.18 }}
            className="flex items-center gap-3 px-3 py-2 rounded-lg mb-0.5 border">
            <div className={`w-7 h-7 rounded-md ${f.bg} flex items-center justify-center flex-shrink-0`}>
              <span className={`text-[8px] font-bold font-mono ${f.color}`}>{f.label}</span>
            </div>
            <span className="text-white/70 text-xs font-mono flex-1 truncate">{f.name}</span>
            {i === highlighted && <ChevronRight className="w-3 h-3 text-white/30 flex-shrink-0"/>}
          </motion.div>
        ))}
      </div>
      <AnimatePresence>
        {opened && (
          <motion.div initial={{ opacity: 0, y: 6 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }} transition={{ duration: 0.2 }}
            className="mx-3 mb-2 px-3 py-2 rounded-lg bg-[#2563EB]/10 border border-[#2563EB]/20 flex items-center gap-3">
            <Check className="w-3.5 h-3.5 text-[#2563EB] flex-shrink-0"/>
            <span className="text-[#2563EB] text-xs font-mono">Opened Q3_Budget_FINAL.xlsx</span>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

// ── Step 3: convert ──────────────────────────────────────────────────────────
const FORMATS = ["PDF", "DOCX", "CSV", "TXT", "PNG"];

function StepConvert({ active }: { active: boolean }) {
  const [selectedFormat, setSelectedFormat] = useState<number | null>(null);
  const [progress, setProgress] = useState(0);
  const [done, setDone] = useState(false);

  useEffect(() => {
    if (!active) { setSelectedFormat(null); setProgress(0); setDone(false); return; }
    setSelectedFormat(null); setProgress(0); setDone(false);
    const t1 = setTimeout(() => setSelectedFormat(0), 600);
    const t2 = setTimeout(() => {
      let p = 0;
      const tick = setInterval(() => {
        p += 18 + Math.random() * 12;
        if (p >= 100) { p = 100; clearInterval(tick); setDone(true); }
        setProgress(Math.min(p, 100));
      }, 120);
      return () => clearInterval(tick);
    }, 1200);
    return () => { clearTimeout(t1); clearTimeout(t2); };
  }, [active]);

  return (
    <div className="flex flex-col gap-2">
      <div className="px-4 py-3 border-b border-white/5 flex items-center gap-2">
        <div className="w-7 h-7 rounded-md bg-green-500/10 flex items-center justify-center flex-shrink-0">
          <span className="text-[8px] font-bold font-mono text-green-400">XLSX</span>
        </div>
        <span className="text-white/60 text-xs font-mono">Q3_Budget_FINAL.xlsx</span>
        <span className="ml-auto text-white/20 text-[10px]">→ Convert</span>
      </div>
      <div className="px-4 pb-1">
        <p className="text-white/30 text-[10px] font-mono uppercase tracking-wider mb-2">Choose output format</p>
        <div className="flex gap-1.5 flex-wrap">
          {FORMATS.map((f, i) => (
            <motion.button key={f} animate={{ background: selectedFormat === i ? "#2563EB" : "rgba(255,255,255,0.04)", borderColor: selectedFormat === i ? "#2563EB" : "rgba(255,255,255,0.1)" }}
              transition={{ duration: 0.18 }}
              className="px-3 py-1 rounded-md border text-[11px] font-mono font-semibold text-white/70 cursor-default">
              {f}
            </motion.button>
          ))}
        </div>
      </div>
      <div className="px-4 pb-3">
        <div className="rounded-lg bg-white/3 border border-white/8 p-3">
          <div className="flex justify-between text-[10px] font-mono text-white/30 mb-1.5">
            <span>{done ? "Complete" : selectedFormat !== null ? "Converting…" : "Waiting"}</span>
            <span>{Math.round(progress)}%</span>
          </div>
          <div className="h-1 rounded-full bg-white/8 overflow-hidden">
            <motion.div animate={{ width: `${progress}%` }} transition={{ duration: 0.15 }}
              className="h-full rounded-full bg-[#2563EB]"/>
          </div>
          {done && (
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="flex items-center gap-1.5 mt-2">
              <Check className="w-3 h-3 text-green-400"/>
              <span className="text-green-400 text-[10px] font-mono">Saved to Downloads / Q3_Budget_FINAL.pdf</span>
            </motion.div>
          )}
        </div>
      </div>
    </div>
  );
}

// ── Step 4: drag & drop ──────────────────────────────────────────────────────
function StepDrop({ active }: { active: boolean }) {
  const [dragging, setDragging] = useState(false);
  const [dropped, setDropped] = useState(false);
  const [pos, setPos] = useState({ x: 0, y: 0 });

  useEffect(() => {
    if (!active) { setDragging(false); setDropped(false); setPos({ x: 0, y: 0 }); return; }
    setDragging(false); setDropped(false); setPos({ x: 0, y: 0 });
    const t1 = setTimeout(() => setDragging(true), 500);
    const t2 = setTimeout(() => setPos({ x: 90, y: 50 }), 900);
    const t3 = setTimeout(() => { setDragging(false); setDropped(true); }, 1800);
    return () => { clearTimeout(t1); clearTimeout(t2); clearTimeout(t3); };
  }, [active]);

  return (
    <div className="px-4 py-3 flex flex-col gap-3" style={{ height: 200, position: "relative" }}>
      <p className="text-white/25 text-[10px] font-mono uppercase tracking-wider">Drag to any app</p>
      <div className="flex gap-3">
        {/* File chip */}
        <motion.div
          animate={dragging ? { x: pos.x, y: pos.y, scale: 1.06, rotate: 3, boxShadow: "0 12px 32px rgba(37,99,235,0.35)" } : { x: 0, y: 0, scale: 1, rotate: 0, boxShadow: "none" }}
          transition={{ type: "spring", stiffness: 200, damping: 22 }}
          className="flex items-center gap-2 px-3 py-2 rounded-lg bg-[#2563EB]/15 border border-[#2563EB]/30 cursor-grab"
          style={{ position: "relative", zIndex: 10 }}
        >
          <div className="w-6 h-6 rounded-md bg-green-500/10 flex items-center justify-center">
            <span className="text-[7px] font-bold font-mono text-green-400">XLSX</span>
          </div>
          <span className="text-white/70 text-xs font-mono whitespace-nowrap">Q3_Budget.xlsx</span>
        </motion.div>
      </div>

      {/* Drop zone */}
      <motion.div
        animate={{ borderColor: dropped ? "#059669" : dragging && pos.x > 40 ? "rgba(37,99,235,0.6)" : "rgba(255,255,255,0.08)", background: dropped ? "rgba(5,150,105,0.08)" : dragging && pos.x > 40 ? "rgba(37,99,235,0.06)" : "transparent" }}
        transition={{ duration: 0.2 }}
        className="flex-1 rounded-xl border-2 border-dashed flex flex-col items-center justify-center gap-1.5 min-h-[80px]"
      >
        {dropped ? (
          <motion.div initial={{ scale: 0.7, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} transition={{ type: "spring" }} className="flex items-center gap-1.5">
            <Check className="w-4 h-4 text-green-400"/>
            <span className="text-green-400 text-xs font-mono">Dropped into Mail</span>
          </motion.div>
        ) : (
          <>
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="rgba(255,255,255,0.15)" strokeWidth="1.5" strokeLinecap="round"><path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/><polyline points="17 8 12 3 7 8"/><line x1="12" y1="3" x2="12" y2="15"/></svg>
            <span className="text-white/20 text-[10px] font-mono">Drop here</span>
          </>
        )}
      </motion.div>
    </div>
  );
}

// ── App window shell ─────────────────────────────────────────────────────────
function AppWindow({ step }: { step: number }) {
  return (
    <div className="rounded-2xl border border-white/10 bg-[#090909] overflow-hidden shadow-2xl shadow-black/70" style={{ minHeight: 300 }}>
      {/* Title bar */}
      <div className="flex items-center gap-2 px-4 py-2.5 border-b border-white/5 bg-[#0f0f0f]">
        <div className="w-2.5 h-2.5 rounded-full bg-[#FF5F57]"/>
        <div className="w-2.5 h-2.5 rounded-full bg-[#FEBC2E]"/>
        <div className="w-2.5 h-2.5 rounded-full bg-[#28C840]"/>
        <span className="ml-auto text-white/15 text-[10px] font-mono">Found It!</span>
      </div>

      {/* Step content — fixed height, no layout shift */}
      <div style={{ height: 260, overflow: "hidden", position: "relative" }}>
        <AnimatePresence mode="wait">
          <motion.div key={step} initial={{ opacity: 0, x: 16 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -16 }} transition={{ duration: 0.28, ease: "easeOut" }}
            style={{ position: "absolute", inset: 0 }}>
            {step === 0 && <StepSearch active={true}/>}
            {step === 1 && <StepSelect active={true}/>}
            {step === 2 && <StepConvert active={true}/>}
            {step === 3 && <StepDrop active={true}/>}
          </motion.div>
        </AnimatePresence>
      </div>

      {/* Footer */}
      <div className="flex items-center gap-4 px-4 py-2 border-t border-white/5 bg-[#0f0f0f]">
        <span className="text-white/15 text-[9px] font-mono">↵ open</span>
        <span className="text-white/15 text-[9px] font-mono">⌘P preview</span>
        <span className="text-white/15 text-[9px] font-mono">⌘C copy path</span>
      </div>
    </div>
  );
}

// ── Main export ──────────────────────────────────────────────────────────────
export function AppShowcaseSection() {
  const [step, setStep] = useState(0);
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    setProgress(0);
    const startTime = Date.now();
    const frame = () => {
      const elapsed = Date.now() - startTime;
      const pct = Math.min((elapsed / STEP_DURATION) * 100, 100);
      setProgress(pct);
      if (pct < 100) {
        requestAnimationFrame(frame);
      }
    };
    const raf = requestAnimationFrame(frame);
    const t = setTimeout(() => {
      setStep((s) => (s + 1) % STEPS.length);
    }, STEP_DURATION);
    return () => { clearTimeout(t); cancelAnimationFrame(raf); };
  }, [step]);

  return (
    <section id="showcase" className="bg-black py-24 px-6">
      <div className="max-w-5xl mx-auto">
        {/* Section header */}
        <div className="text-center mb-16">
          <p className="text-[#2563EB] text-xs font-mono tracking-widest uppercase mb-3">
            How it works
          </p>
          <h2 className="text-3xl md:text-5xl font-bold text-white tracking-tight">
            From search to done
            <span className="text-white/30"> — in seconds.</span>
          </h2>
        </div>

        <div className="flex flex-col lg:flex-row gap-10 items-start">
          {/* Step indicators */}
          <div className="flex flex-col gap-2 lg:w-64 shrink-0">
            {STEPS.map((s, i) => {
              const isActive = i === step;
              const isDone = i < step;
              return (
                <button key={s.id} onClick={() => setStep(i)}
                  className="text-left p-4 rounded-xl border transition-all duration-300 cursor-pointer"
                  style={{
                    borderColor: isActive ? `${s.color}40` : "rgba(255,255,255,0.05)",
                    background: isActive ? `${s.color}08` : "transparent",
                  }}
                >
                  <div className="flex items-center gap-3 mb-1">
                    <span className="text-[11px] font-mono font-bold"
                      style={{ color: isActive ? s.color : isDone ? "rgba(255,255,255,0.25)" : "rgba(255,255,255,0.2)" }}>
                      {s.number}
                    </span>
                    {isActive && (
                      <div className="flex-1 h-0.5 rounded-full bg-white/10 overflow-hidden">
                        <motion.div className="h-full rounded-full" style={{ background: s.color, width: `${progress}%` }} transition={{ duration: 0 }}/>
                      </div>
                    )}
                  </div>
                  <p className="text-sm font-semibold mb-0.5"
                    style={{ color: isActive ? "white" : "rgba(255,255,255,0.35)" }}>
                    {s.label}
                  </p>
                  <p className="text-xs leading-relaxed"
                    style={{ color: isActive ? "rgba(255,255,255,0.5)" : "rgba(255,255,255,0.2)" }}>
                    {s.desc}
                  </p>
                </button>
              );
            })}
          </div>

          {/* App window */}
          <div className="flex-1 w-full">
            <AppWindow step={step}/>
          </div>
        </div>
      </div>
    </section>
  );
}
