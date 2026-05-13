"use client";
import { useId } from "react";
import { motion } from "framer-motion";

interface GlassLensProps {
  style?: React.CSSProperties;
  className?: string;
  showHandle?: boolean;
  float?: boolean;
  rimPadding?: string;
}

export function GlassLens({
  style,
  className = "",
  showHandle = true,
  float = true,
  rimPadding = "clamp(10px, 1.4vw, 16px)",
}: GlassLensProps) {
  const id = useId().replace(/:/g, "");
  const metalId = `lens-metal-${id}`;
  const gripId  = `lens-grip-${id}`;
  const capId   = `lens-cap-${id}`;

  return (
    <div
      className={`relative flex-shrink-0 ${className}`}
      style={{
        ...style,
        animation: float ? "glass-float 4.5s ease-in-out infinite" : undefined,
      }}
    >
      {/* Large soft bloom behind the lens */}
      <div
        className="absolute rounded-full pointer-events-none"
        style={{
          inset: "-45%",
          background:
            "radial-gradient(circle, rgba(37,99,235,0.18) 0%, rgba(10,20,120,0.06) 45%, transparent 70%)",
          filter: "blur(50px)",
        }}
      />

      {/* Handle */}
      {showHandle && (
        <div
          className="absolute pointer-events-none"
          style={{ bottom: "-40%", right: "-15%", zIndex: 0 }}
        >
          <svg width="52" height="120" viewBox="0 0 52 120" fill="none">
            <defs>
              <linearGradient id={metalId} x1="0" y1="0" x2="1" y2="0">
                <stop offset="0%"   stopColor="#1a1a22" />
                <stop offset="20%"  stopColor="#5a5a6a" />
                <stop offset="45%"  stopColor="#8a8a9a" />
                <stop offset="60%"  stopColor="#6a6a7a" />
                <stop offset="80%"  stopColor="#3a3a44" />
                <stop offset="100%" stopColor="#1a1a22" />
              </linearGradient>
              <linearGradient id={gripId} x1="0" y1="0" x2="1" y2="0">
                <stop offset="0%"   stopColor="#111118" />
                <stop offset="35%"  stopColor="#2a2a34" />
                <stop offset="65%"  stopColor="#222228" />
                <stop offset="100%" stopColor="#0e0e14" />
              </linearGradient>
              <linearGradient id={capId} x1="0" y1="0" x2="1" y2="0">
                <stop offset="0%"   stopColor="#222228" />
                <stop offset="40%"  stopColor="#707080" />
                <stop offset="100%" stopColor="#1a1a22" />
              </linearGradient>
            </defs>
            {/* Ferrule */}
            <rect x="14" y="0" width="24" height="10" rx="2" fill={`url(#${metalId})`} />
            {/* Shaft */}
            <rect x="14" y="10" width="24" height="65" rx="1" fill={`url(#${metalId})`} />
            {/* Grip */}
            <rect x="15" y="25" width="22" height="28" rx="2" fill={`url(#${gripId})`} />
            {[28, 32, 36, 40, 44, 48].map((y) => (
              <rect key={y} x="15" y={y} width="22" height="1" rx="0.5" fill="rgba(255,255,255,0.07)" />
            ))}
            {/* End cap */}
            <path d="M 16 75 C 16 75 14 85 18 102 C 20 110 24 119 26 119 C 28 119 32 110 34 102 C 38 85 36 75 36 75 Z" fill={`url(#${capId})`} />
            <path d="M 20 77 C 19 83 18 96 22 114" stroke="rgba(255,255,255,0.10)" strokeWidth="1.5" strokeLinecap="round" />
          </svg>
        </div>
      )}

      {/* Metal bezel */}
      <div
        className="absolute inset-0 rounded-full"
        style={{
          zIndex: 1,
          background: `conic-gradient(
            from 100deg,
            #111116 0deg, #6a6a78 40deg, #c0c0cc 80deg, #6a6a78 120deg,
            #1a1a20 160deg, #505060 200deg, #a8a8b8 240deg, #5a5a68 280deg,
            #111116 320deg, #6a6a78 360deg
          )`,
          padding: rimPadding,
          boxShadow: "0 40px 120px -20px rgba(0,0,0,0.9), 0 16px 48px rgba(0,0,0,0.7)",
        }}
      >
        {/* Inner bevel */}
        <div
          className="w-full h-full rounded-full"
          style={{
            background: `conic-gradient(
              from 280deg,
              #2a2a32 0deg, #787888 60deg, #d8d8e8 100deg,
              #888898 140deg, #2a2a32 180deg, #585868 240deg,
              #b0b0c0 300deg, #2a2a32 360deg
            )`,
            padding: "3px",
          }}
        >
          {/* Glass interior */}
          <div
            className="w-full h-full rounded-full overflow-hidden relative"
            style={{
              background: "radial-gradient(circle at 50% 55%, #06080f 0%, #020408 60%, #000204 100%)",
            }}
          >
            {/* Deep interior */}
            <div className="absolute inset-0 rounded-full" style={{
              background: "radial-gradient(ellipse 60% 55% at 50% 60%, rgba(4,8,28,0.95) 0%, rgba(0,2,10,1) 100%)",
            }} />

            {/* Blue AR coating */}
            <div className="absolute inset-0 rounded-full" style={{
              background: "radial-gradient(ellipse 70% 60% at 55% 65%, rgba(37,99,235,0.18) 0%, rgba(20,60,160,0.08) 50%, transparent 80%)",
            }} />

            {/* Purple edge coating */}
            <div className="absolute inset-0 rounded-full" style={{
              background: "radial-gradient(ellipse 90% 30% at 50% 95%, rgba(120,60,220,0.12) 0%, transparent 60%)",
            }} />

            {/* Primary specular — top left */}
            <div className="absolute inset-0 rounded-full" style={{
              background: "radial-gradient(ellipse 42% 22% at 28% 20%, rgba(255,255,255,0.88) 0%, rgba(255,255,255,0.35) 35%, rgba(255,255,255,0.08) 60%, transparent 80%)",
            }} />

            {/* Secondary specular — bottom right */}
            <div className="absolute inset-0 rounded-full" style={{
              background: "radial-gradient(ellipse 18% 10% at 74% 78%, rgba(255,255,255,0.22) 0%, transparent 100%)",
            }} />

            {/* Internal lens element rings */}
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="rounded-full border border-white/[0.03]"       style={{ width: "75%", height: "75%" }} />
              <div className="absolute rounded-full border border-white/[0.025]" style={{ width: "50%", height: "50%" }} />
              <div className="absolute rounded-full border border-[#2563EB]/[0.08]" style={{ width: "30%", height: "30%" }} />
            </div>

            {/* Chromatic fringe */}
            <div className="absolute inset-0 rounded-full" style={{
              boxShadow: "inset 0 0 0 3px rgba(100,140,255,0.12), inset 0 0 0 5px rgba(120,80,200,0.06)",
            }} />

            {/* Center glow — breathing pulse */}
            <motion.div
              className="absolute inset-0 rounded-full flex items-center justify-center"
              animate={{ opacity: [0.45, 1, 0.45] }}
              transition={{ duration: 3.8, repeat: Infinity, ease: "easeInOut" }}
            >
              <div style={{
                width: "35%", height: "35%", borderRadius: "50%",
                background: "radial-gradient(circle, rgba(37,99,235,0.55) 0%, transparent 100%)",
                filter: "blur(10px)",
              }} />
            </motion.div>

            {/* Rotating shimmer arc */}
            <div
              className="absolute inset-0 rounded-full overflow-hidden"
              style={{ animation: "glass-shimmer 14s linear infinite" }}
            >
              <div style={{
                position: "absolute", top: "5%", left: "-10%",
                width: "45%", height: "45%",
                background: "linear-gradient(135deg, rgba(255,255,255,0.10) 0%, transparent 70%)",
                borderRadius: "50%", filter: "blur(6px)",
              }} />
            </div>
          </div>
        </div>
      </div>

      {/* Rim glow */}
      <motion.div
        className="absolute rounded-full pointer-events-none"
        animate={{ opacity: [0.5, 1, 0.5] }}
        transition={{ duration: 3.8, repeat: Infinity, ease: "easeInOut" }}
        style={{
          inset: "-2px", zIndex: 2,
          boxShadow: "0 0 40px rgba(37,99,235,0.28), 0 0 90px rgba(37,99,235,0.10)",
          borderRadius: "50%",
        }}
      />
    </div>
  );
}
