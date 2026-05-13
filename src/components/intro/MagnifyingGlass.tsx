"use client";
import { useRef } from "react";
import { motion, useMotionValue, useMotionValueEvent, MotionValue } from "framer-motion";

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

  // Bridge: Framer MotionValue → SVG attribute (can't be done via style)
  useMotionValueEvent(distortion, "change", (v) => {
    displacementRef.current?.setAttribute("scale", String(v));
  });

  return (
    <>
      {/* SVG filter definition — zero-size, just registers the filter */}
      <svg
        style={{ position: "absolute", width: 0, height: 0, overflow: "hidden" }}
        aria-hidden="true"
      >
        <defs>
          <filter
            id="lens-warp"
            x="-40%"
            y="-40%"
            width="180%"
            height="180%"
            colorInterpolationFilters="sRGB"
          >
            <feTurbulence
              type="fractalNoise"
              baseFrequency="0.018 0.018"
              numOctaves="1"
              seed="3"
              result="noise"
            />
            <feDisplacementMap
              ref={displacementRef}
              in="SourceGraphic"
              in2="noise"
              scale="0"
              xChannelSelector="R"
              yChannelSelector="G"
            />
          </filter>
        </defs>
      </svg>

      {/* The magnifying glass */}
      <motion.div
        className="relative flex items-center justify-center"
        style={{ scale, filter: "url(#lens-warp)" }}
      >
        {/* SVG glass body */}
        <svg
          width="160"
          height="200"
          viewBox="0 0 160 200"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          className="relative z-10"
        >
          <defs>
            <radialGradient id="glass-fill" cx="40%" cy="35%" r="65%">
              <stop offset="0%" stopColor="rgba(37,99,235,0.30)" />
              <stop offset="60%" stopColor="rgba(37,99,235,0.10)" />
              <stop offset="100%" stopColor="rgba(0,0,0,0.0)" />
            </radialGradient>
            <radialGradient id="glass-glow" cx="50%" cy="50%" r="50%">
              <stop offset="0%" stopColor="rgba(37,99,235,0.5)" />
              <stop offset="100%" stopColor="rgba(37,99,235,0)" />
            </radialGradient>
            {/* Clip path for the shimmer arc */}
            <clipPath id="glass-clip">
              <circle cx="72" cy="72" r="68" />
            </clipPath>
          </defs>

          {/* Outer glow ring */}
          <motion.circle
            cx="72"
            cy="72"
            r="74"
            fill="none"
            stroke="rgba(37,99,235,0.15)"
            strokeWidth="8"
            style={{ opacity: glowIntensity }}
          />

          {/* Glass fill */}
          <circle cx="72" cy="72" r="68" fill="url(#glass-fill)" />

          {/* Inner glow */}
          <motion.circle
            cx="72"
            cy="72"
            r="52"
            fill="url(#glass-glow)"
            style={{ opacity: glowIntensity }}
          />

          {/* Glass ring */}
          <circle
            cx="72"
            cy="72"
            r="68"
            stroke="rgba(255,255,255,0.18)"
            strokeWidth="1.5"
            fill="none"
          />

          {/* Inner ring highlight */}
          <circle
            cx="72"
            cy="72"
            r="62"
            stroke="rgba(255,255,255,0.06)"
            strokeWidth="1"
            fill="none"
          />

          {/* Shimmer arc — rotating */}
          <g clipPath="url(#glass-clip)" style={{ animation: "glass-shimmer 9s linear infinite" }}>
            <path
              d="M 72 4 A 68 68 0 0 1 140 72"
              stroke="rgba(255,255,255,0.25)"
              strokeWidth="2"
              fill="none"
              strokeLinecap="round"
            />
          </g>

          {/* Lens center cross-hair (very subtle) */}
          <circle cx="72" cy="72" r="1.5" fill="rgba(37,99,235,0.6)" />

          {/* Handle */}
          <motion.g style={{ opacity: handleOpacity }}>
            <line
              x1="122"
              y1="122"
              x2="152"
              y2="185"
              stroke="rgba(255,255,255,0.35)"
              strokeWidth="6"
              strokeLinecap="round"
            />
            <line
              x1="122"
              y1="122"
              x2="152"
              y2="185"
              stroke="rgba(255,255,255,0.10)"
              strokeWidth="10"
              strokeLinecap="round"
            />
          </motion.g>
        </svg>

        {/* Found It! label inside glass — very subtle */}
        <div
          className="absolute top-[62px] left-1/2 -translate-x-1/2 text-[7px] font-mono tracking-[0.25em] uppercase text-white/20 select-none pointer-events-none"
          style={{ letterSpacing: "0.25em" }}
        >
          found it
        </div>
      </motion.div>
    </>
  );
}
