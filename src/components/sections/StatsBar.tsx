"use client";
import { useEffect, useRef, useState } from "react";
import { motion, useInView } from "framer-motion";

function useCountUp(target: number, duration = 1800, started = false) {
  const [count, setCount] = useState(0);
  useEffect(() => {
    if (!started) return;
    let start = 0;
    const step = target / (duration / 16);
    const timer = setInterval(() => {
      start += step;
      if (start >= target) {
        setCount(target);
        clearInterval(timer);
      } else {
        setCount(Math.floor(start));
      }
    }, 16);
    return () => clearInterval(timer);
  }, [target, duration, started]);
  return count;
}

const STATS = [
  { value: 10000, suffix: "+", label: "Files indexed", sublabel: "per user on average" },
  { value: 200, suffix: "ms", label: "Search time", sublabel: "fully local, zero network" },
  { value: 100, suffix: "%", label: "Local processing", sublabel: "nothing leaves your Mac" },
];

function StatItem({ value, suffix, label, sublabel, started }: typeof STATS[0] & { started: boolean }) {
  const count = useCountUp(value, 1600, started);
  return (
    <div className="flex flex-col items-center text-center px-8">
      <div className="text-5xl md:text-6xl font-black text-white tracking-tight tabular-nums">
        {suffix === "ms" ? "< " : ""}{count.toLocaleString()}<span className="text-[#2563EB]">{suffix === "ms" ? "ms" : suffix}</span>
      </div>
      <div className="mt-2 text-sm font-semibold text-white/60">{label}</div>
      <div className="mt-0.5 text-xs text-white/25">{sublabel}</div>
    </div>
  );
}

export function StatsBar() {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });

  return (
    <section ref={ref} className="bg-black border-t border-white/5 py-20">
      <div className="max-w-5xl mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="grid grid-cols-1 md:grid-cols-3 gap-10 md:gap-0 md:divide-x md:divide-white/5"
        >
          {STATS.map((s) => (
            <StatItem key={s.label} {...s} started={inView} />
          ))}
        </motion.div>
      </div>
    </section>
  );
}
