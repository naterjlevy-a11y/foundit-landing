"use client";
import { motion } from "framer-motion";
import { useMagnetic } from "@/components/cursor/CustomCursor";

interface MagneticCardProps {
  children: React.ReactNode;
  className?: string;
  strength?: number;
}

export function MagneticCard({ children, className = "", strength = 0.3 }: MagneticCardProps) {
  const magnetic = useMagnetic(strength);

  return (
    <motion.div
      ref={magnetic.ref as React.RefObject<HTMLDivElement>}
      style={magnetic.style}
      onMouseMove={magnetic.onMouseMove as unknown as React.MouseEventHandler<HTMLDivElement>}
      onMouseLeave={magnetic.onMouseLeave as unknown as React.MouseEventHandler<HTMLDivElement>}
      data-magnetic
      className={`rounded-2xl border border-white/[0.07] bg-white/[0.025] p-8 relative overflow-hidden group ${className}`}
      whileHover={{ borderColor: "rgba(255,255,255,0.12)", backgroundColor: "rgba(255,255,255,0.04)" }}
      transition={{ duration: 0.3 }}
    >
      {/* Hover glow */}
      <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none">
        <div className="absolute inset-0 bg-gradient-to-br from-[#2563EB]/6 to-transparent rounded-2xl" />
      </div>
      {children}
    </motion.div>
  );
}
