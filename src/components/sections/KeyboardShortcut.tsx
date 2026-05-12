"use client";
import { motion } from "framer-motion";

function Key({ label, wide = false }: { label: string; wide?: boolean }) {
  return (
    <motion.div
      whileHover={{ y: 2, boxShadow: "0 0px 0px 0 rgba(255,255,255,0.04)" }}
      transition={{ duration: 0.1 }}
      className={`
        flex items-center justify-center rounded-[6px] border border-white/10
        bg-gradient-to-b from-white/8 to-white/4
        shadow-[0_2px_0_0_rgba(255,255,255,0.06),inset_0_1px_0_0_rgba(255,255,255,0.12)]
        text-white/70 font-medium select-none
        ${wide ? "px-4 py-2.5 text-xs min-w-[48px]" : "w-9 h-9 text-sm"}
      `}
    >
      {label}
    </motion.div>
  );
}

export function KeyboardShortcut() {
  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: 1.1 }}
      className="flex flex-col items-center gap-3 mt-10"
    >
      <div className="flex items-center gap-2">
        <Key label="⌘" />
        <span className="text-white/20 text-xs">+</span>
        <Key label="Space" wide />
      </div>
      <p className="text-white/20 text-[11px] font-mono tracking-widest uppercase">
        Open from anywhere
      </p>
    </motion.div>
  );
}
