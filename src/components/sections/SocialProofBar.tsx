"use client";
import { motion } from "framer-motion";

const AVATARS = [
  { initials: "JK", color: "bg-violet-600" },
  { initials: "ML", color: "bg-sky-600" },
  { initials: "AR", color: "bg-emerald-600" },
  { initials: "PW", color: "bg-amber-600" },
  { initials: "SC", color: "bg-rose-600" },
];

export function SocialProofBar() {
  return (
    <motion.div
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: 0.2 }}
      className="w-full border-y border-white/5 bg-[#2563EB]/[0.025] py-4"
    >
      <div className="max-w-5xl mx-auto px-6 flex items-center justify-center gap-5 flex-wrap">
        {/* Avatar cluster */}
        <div className="flex items-center -space-x-2">
          {AVATARS.map((a) => (
            <div
              key={a.initials}
              className={`w-7 h-7 rounded-full ${a.color} border-2 border-black flex items-center justify-center text-[10px] font-bold text-white flex-shrink-0`}
            >
              {a.initials}
            </div>
          ))}
        </div>

        {/* Stars */}
        <div className="flex items-center gap-1">
          {[...Array(5)].map((_, i) => (
            <svg key={i} className="w-3.5 h-3.5 text-amber-400" viewBox="0 0 24 24" fill="currentColor">
              <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
            </svg>
          ))}
        </div>

        <span className="text-white/35 text-xs tracking-wide">
          Loved by <span className="text-white/60 font-semibold">500+ developers</span> on macOS
        </span>

        <div className="hidden sm:block w-px h-4 bg-white/10" />

        <span className="hidden sm:block text-white/20 text-[11px] font-mono tracking-widest uppercase">
          Early access · Free to join
        </span>
      </div>
    </motion.div>
  );
}
