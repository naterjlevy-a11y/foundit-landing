"use client";
import { useRef } from "react";
import { motion, useMotionValueEvent, MotionValue } from "framer-motion";

interface MagnifyingGlassProps {
  scale: MotionValue<number>;
  handleOpacity: MotionValue<number>;
  glowIntensity: MotionValue<number>;
  distortion: MotionValue<number>;
}

export function MagnifyingGlass({
  scale,
  handleOpacity,
  glowIntensity,
  distortion,
}: MagnifyingGlassProps) {
  const displacementRef = useRef<SVGFEDisplacementMapElement>(null);

  useMotionValueEvent(distortion, "change", (v) => {
    displacementRef.current?.setAttribute("scale", String(v));
  });

  return (
    <>
      {/* SVG filter — lens warp distortion */}
      <svg style={{ position: "absolute", width: 0, height: 0, overflow: "hidden" }} aria-hidden="true">
        <defs>
          <filter id="lens-warp" x="-50%" y="-50%" width="200%" height="200%" colorInterpolationFilters="sRGB">
            <feTurbulence type="fractalNoise" baseFrequency="0.012 0.012" numOctaves="2" seed="5" result="noise" />
            <feDisplacementMap ref={displacementRef} in="SourceGraphic" in2="noise" scale="0" xChannelSelector="R" yChannelSelector="G" />
          </filter>
        </defs>
      </svg>

      {/* Outer ambient glow — very large, very soft */}
      <motion.div
        className="absolute rounded-full pointer-events-none"
        style={{
          width: "clamp(500px, 60vw, 700px)",
          height: "clamp(500px, 60vw, 700px)",
          background: "radial-gradient(circle, rgba(37,99,235,0.12) 0%, transparent 70%)",
          opacity: glowIntensity,
          top: "50%",
          left: "50%",
          transform: "translate(-50%, -50%)",
        }}
      />

      {/* The glass assembly — float wrapper + scroll scale */}
      <div style={{ animation: "glass-float 4s ease-in-out infinite" }}>
      <motion.div
        className="relative flex items-center justify-center"
        style={{ scale, filter: "url(#lens-warp)", transformOrigin: "center center" }}
      >
        {/* === HANDLE === */}
        <motion.div
          className="absolute pointer-events-none"
          style={{
            opacity: handleOpacity,
            bottom: "-96px",
            right: "-16px",
            transformOrigin: "top left",
            transform: "rotate(0deg)",
          }}
        >
          {/* Handle shaft — tapered metal with grip */}
          <svg width="52" height="130" viewBox="0 0 52 130" fill="none">
            <defs>
              <linearGradient id="handle-metal" x1="0" y1="0" x2="1" y2="0">
                <stop offset="0%" stopColor="#1a1a22" />
                <stop offset="20%" stopColor="#5a5a6a" />
                <stop offset="45%" stopColor="#8a8a9a" />
                <stop offset="60%" stopColor="#6a6a7a" />
                <stop offset="80%" stopColor="#3a3a44" />
                <stop offset="100%" stopColor="#1a1a22" />
              </linearGradient>
              <linearGradient id="handle-grip" x1="0" y1="0" x2="1" y2="0">
                <stop offset="0%" stopColor="#111118" />
                <stop offset="35%" stopColor="#2a2a34" />
                <stop offset="65%" stopColor="#222228" />
                <stop offset="100%" stopColor="#0e0e14" />
              </linearGradient>
              <linearGradient id="handle-cap" x1="0" y1="0" x2="1" y2="0">
                <stop offset="0%" stopColor="#222228" />
                <stop offset="40%" stopColor="#707080" />
                <stop offset="100%" stopColor="#1a1a22" />
              </linearGradient>
            </defs>
            {/* Top ferrule (connects to rim) */}
            <rect x="14" y="0" width="24" height="12" rx="3" fill="url(#handle-metal)" />
            {/* Main shaft */}
            <path d="M 16 12 L 14 80 L 18 80 L 20 12 Z" fill="url(#handle-metal)" />
            <path d="M 32 12 L 34 80 L 38 80 L 36 12 Z" fill="url(#handle-metal)" />
            <rect x="14" y="12" width="24" height="68" rx="1" fill="url(#handle-metal)" />
            {/* Grip section */}
            <rect x="15" y="32" width="22" height="32" rx="2" fill="url(#handle-grip)" />
            {/* Grip rings */}
            {[36, 40, 44, 48, 52, 56].map((y) => (
              <rect key={y} x="15" y={y} width="22" height="1" rx="0.5" fill="rgba(255,255,255,0.06)" />
            ))}
            {/* End cap */}
            <path d="M 16 80 C 16 80 14 90 18 110 C 20 120 24 128 26 128 C 28 128 32 120 34 110 C 38 90 36 80 36 80 Z" fill="url(#handle-cap)" />
            {/* Cap highlight */}
            <path d="M 20 82 C 19 88 18 100 22 118" stroke="rgba(255,255,255,0.12)" strokeWidth="1.5" strokeLinecap="round" />
          </svg>
        </motion.div>

        {/* === LENS ASSEMBLY === */}
        <div
          style={{
            width: "clamp(180px, 26vw, 300px)",
            height: "clamp(180px, 26vw, 300px)",
            position: "relative",
          }}
        >
          {/* Outer shadow ring */}
          <div
            className="absolute rounded-full"
            style={{
              inset: "-4px",
              boxShadow: "0 60px 160px -20px rgba(0,0,0,0.95), 0 20px 60px rgba(0,0,0,0.8)",
              borderRadius: "50%",
            }}
          />

          {/* Metal bezel (outer ring) */}
          <div
            className="absolute inset-0 rounded-full"
            style={{
              background: `conic-gradient(
                from 100deg,
                #111116 0deg,
                #6a6a78 40deg,
                #c0c0cc 80deg,
                #6a6a78 120deg,
                #1a1a20 160deg,
                #505060 200deg,
                #a8a8b8 240deg,
                #5a5a68 280deg,
                #111116 320deg,
                #6a6a78 360deg
              )`,
              padding: "clamp(10px, 1.4vw, 16px)",
            }}
          >
            {/* Bezel inner bevel */}
            <div
              className="w-full h-full rounded-full"
              style={{
                background: `conic-gradient(
                  from 280deg,
                  #2a2a32 0deg,
                  #787888 60deg,
                  #d8d8e8 100deg,
                  #888898 140deg,
                  #2a2a32 180deg,
                  #585868 240deg,
                  #b0b0c0 300deg,
                  #2a2a32 360deg
                )`,
                padding: "3px",
              }}
            >
              {/* === THE GLASS LENS === */}
              <div
                className="w-full h-full rounded-full overflow-hidden relative"
                style={{
                  background: "radial-gradient(circle at 50% 55%, #06080f 0%, #020408 60%, #000204 100%)",
                }}
              >
                {/* Deep interior — very dark, like looking into a lens */}
                <div className="absolute inset-0 rounded-full" style={{
                  background: "radial-gradient(ellipse 60% 55% at 50% 60%, rgba(4,8,28,0.95) 0%, rgba(0,2,10,1) 100%)",
                }} />

                {/* Blue AR coating — inner glow */}
                <div className="absolute inset-0 rounded-full" style={{
                  background: "radial-gradient(ellipse 70% 60% at 55% 65%, rgba(37,99,235,0.18) 0%, rgba(20,60,160,0.08) 50%, transparent 80%)",
                }} />

                {/* Purple/violet lens coating at edge */}
                <div className="absolute inset-0 rounded-full" style={{
                  background: "radial-gradient(ellipse 90% 30% at 50% 95%, rgba(120,60,220,0.12) 0%, transparent 60%)",
                }} />

                {/* Top-left bright specular — the main reflection */}
                <div className="absolute inset-0 rounded-full" style={{
                  background: "radial-gradient(ellipse 42% 22% at 28% 20%, rgba(255,255,255,0.88) 0%, rgba(255,255,255,0.35) 35%, rgba(255,255,255,0.08) 60%, transparent 80%)",
                }} />

                {/* Secondary specular — bottom right */}
                <div className="absolute inset-0 rounded-full" style={{
                  background: "radial-gradient(ellipse 18% 10% at 74% 78%, rgba(255,255,255,0.22) 0%, transparent 100%)",
                }} />

                {/* Lens element rings — simulate internal optics */}
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="rounded-full border border-white/[0.03]" style={{ width: "75%", height: "75%" }} />
                  <div className="absolute rounded-full border border-white/[0.025]" style={{ width: "50%", height: "50%" }} />
                  <div className="absolute rounded-full border border-[#2563EB]/[0.08]" style={{ width: "30%", height: "30%" }} />
                </div>

                {/* Chromatic fringe at glass edge — very subtle rainbow */}
                <div className="absolute inset-0 rounded-full" style={{
                  boxShadow: "inset 0 0 0 3px rgba(100,140,255,0.12), inset 0 0 0 5px rgba(120,80,200,0.06)",
                }} />

                {/* Center glow — faint blue hotspot */}
                <motion.div
                  className="absolute inset-0 rounded-full flex items-center justify-center"
                  style={{ opacity: glowIntensity }}
                >
                  <div style={{
                    width: "30%",
                    height: "30%",
                    borderRadius: "50%",
                    background: "radial-gradient(circle, rgba(37,99,235,0.5) 0%, transparent 100%)",
                    filter: "blur(8px)",
                  }} />
                </motion.div>

                {/* Shimmer sweep — rotating bright arc */}
                <div
                  className="absolute inset-0 rounded-full overflow-hidden"
                  style={{ animation: "glass-shimmer 12s linear infinite" }}
                >
                  <div style={{
                    position: "absolute",
                    top: "5%",
                    left: "-10%",
                    width: "45%",
                    height: "45%",
                    background: "linear-gradient(135deg, rgba(255,255,255,0.12) 0%, transparent 70%)",
                    borderRadius: "50%",
                    filter: "blur(6px)",
                  }} />
                </div>
              </div>
            </div>
          </div>

          {/* Outer rim glow — animated with scroll */}
          <motion.div
            className="absolute rounded-full pointer-events-none"
            style={{
              inset: "-2px",
              boxShadow: "0 0 40px rgba(37,99,235,0.25), 0 0 80px rgba(37,99,235,0.08)",
              opacity: glowIntensity,
            }}
          />
        </div>
      </motion.div>
      </div>
    </>
  );
}
