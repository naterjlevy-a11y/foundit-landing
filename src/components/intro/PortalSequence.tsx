"use client";
import { useRef, useLayoutEffect, useMemo } from "react";
import { motion, useMotionValue, useTransform } from "framer-motion";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { MagnifyingGlass } from "./MagnifyingGlass";
import { HeroReveal } from "./HeroReveal";

gsap.registerPlugin(ScrollTrigger);

function StarField() {
  const stars = useMemo(() =>
    Array.from({ length: 120 }, (_, i) => ({
      id: i,
      x: ((Math.sin(i * 127.1 + 0.5) * 0.5 + 0.5) * 100),
      y: ((Math.sin(i * 311.7 + 1.2) * 0.5 + 0.5) * 100),
      size: (Math.abs(Math.sin(i * 73.3)) * 1.2 + 0.4),
      opacity: (Math.abs(Math.sin(i * 53.1)) * 0.35 + 0.08),
      twinkleDuration: 2.5 + Math.abs(Math.sin(i * 41.2)) * 3,
      twinkleDelay: Math.abs(Math.sin(i * 19.7)) * 4,
    })), []
  );

  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none">
      {stars.map((s) => (
        <motion.div
          key={s.id}
          className="absolute rounded-full bg-white"
          style={{
            left: `${s.x}%`,
            top: `${s.y}%`,
            width: `${s.size}px`,
            height: `${s.size}px`,
          }}
          animate={{ opacity: [s.opacity, s.opacity * 0.3, s.opacity] }}
          transition={{
            duration: s.twinkleDuration,
            repeat: Infinity,
            ease: "easeInOut",
            delay: s.twinkleDelay,
          }}
        />
      ))}
    </div>
  );
}

function VoidAtmosphere() {
  return (
    <div className="absolute inset-0 pointer-events-none">
      {/* Deep space gradient — not pure black, subtle dark blue */}
      <div
        className="absolute inset-0"
        style={{
          background: "radial-gradient(ellipse 100% 80% at 50% 40%, #020510 0%, #010208 50%, #000000 100%)",
        }}
      />
      {/* Vignette edges */}
      <div
        className="absolute inset-0"
        style={{
          background: "radial-gradient(ellipse 70% 70% at 50% 50%, transparent 40%, rgba(0,0,0,0.85) 100%)",
        }}
      />
      {/* Subtle top glow — like a distant nebula */}
      <div
        className="absolute"
        style={{
          top: "-10%",
          left: "20%",
          width: "60%",
          height: "40%",
          background: "radial-gradient(ellipse 100% 100%, rgba(37,60,180,0.06) 0%, transparent 70%)",
          filter: "blur(40px)",
        }}
      />
    </div>
  );
}

export function PortalSequence() {
  const wrapperRef = useRef<HTMLDivElement>(null);
  const scrollProgress = useMotionValue(0);

  useLayoutEffect(() => {
    const ctx = gsap.context(() => {
      ScrollTrigger.create({
        trigger: wrapperRef.current,
        start: "top top",
        end: "+=300%",
        scrub: 1.2,
        pin: true,
        anticipatePin: 1,
        onUpdate: (self) => {
          scrollProgress.set(self.progress);
        },
      });
    });

    return () => ctx.revert();
  }, [scrollProgress]);

  const glassScale    = useTransform(scrollProgress, [0, 0.45], [1, 8]);
  const handleOpacity = useTransform(scrollProgress, [0, 0.22], [1, 0]);
  const glowIntensity = useTransform(scrollProgress, [0, 0.40], [0.3, 1]);

  const distortion = useTransform(
    scrollProgress,
    [0.32, 0.55, 0.72],
    [0, 80, 0]
  );

  const clipRadius = useTransform(scrollProgress, [0.48, 0.88], ["0%", "150%"]);
  const clipPath   = useTransform(clipRadius, (r) => `circle(${r} at 50% 50%)`);

  const heroOpacity = useTransform(scrollProgress, [0.80, 1.0], [0, 1]);
  const heroY       = useTransform(scrollProgress, [0.80, 1.0], [48, 0]);

  const voidOpacity = useTransform(scrollProgress, [0.72, 0.90], [1, 0]);

  const scrollLabelOpacity = useTransform(scrollProgress, [0, 0.12], [1, 0]);

  // White burst flash at portal breakthrough (peaks at max distortion)
  const burstOpacity = useTransform(
    scrollProgress,
    [0.50, 0.545, 0.56, 0.65],
    [0, 0.92, 0.92, 0]
  );

  // Star field fades as glass grows and consumes the frame
  const starOpacity = useTransform(scrollProgress, [0, 0.35, 0.50], [1, 0.6, 0]);

  // Atmosphere intensifies ahead of breakthrough
  const atmosphereGlow = useTransform(scrollProgress, [0.30, 0.54], [0, 1]);

  return (
    <div ref={wrapperRef} className="relative" style={{ height: "400vh" }}>
      <div className="w-full h-screen overflow-hidden relative">

        {/* Deep space void background */}
        <VoidAtmosphere />

        {/* Star field — fades as glass expands */}
        <motion.div className="absolute inset-0" style={{ opacity: starOpacity }}>
          <StarField />
        </motion.div>

        {/* ── The VOID layer — glass on void ───────────────────────── */}
        <motion.div
          className="absolute inset-0 flex flex-col items-center justify-center"
          style={{ opacity: voidOpacity }}
        >
          {/* Pre-breakthrough atmosphere — blue haze builds around glass */}
          <motion.div
            className="absolute inset-0 pointer-events-none flex items-center justify-center"
            style={{ opacity: atmosphereGlow }}
          >
            <div style={{
              width: "clamp(400px, 50vw, 700px)",
              height: "clamp(400px, 50vw, 700px)",
              borderRadius: "50%",
              background: "radial-gradient(circle, rgba(30,60,220,0.22) 0%, rgba(10,20,100,0.08) 50%, transparent 75%)",
              filter: "blur(30px)",
            }} />
          </motion.div>

          <MagnifyingGlass
            scale={glassScale}
            handleOpacity={handleOpacity}
            glowIntensity={glowIntensity}
            distortion={distortion}
          />

          {/* Scroll prompt */}
          <motion.div
            className="absolute bottom-12 flex flex-col items-center gap-3"
            style={{ opacity: scrollLabelOpacity }}
          >
            <span className="text-[10px] font-mono tracking-[0.3em] uppercase text-white/25">
              scroll to enter
            </span>
            <motion.div
              animate={{ y: [0, 6, 0] }}
              transition={{ duration: 1.6, repeat: Infinity, ease: "easeInOut" }}
              className="w-px h-6 bg-gradient-to-b from-white/30 to-transparent rounded-full"
            />
          </motion.div>

          <PulseRings />
        </motion.div>

        {/* ── BURST FLASH — white out at portal breakthrough ────────── */}
        <motion.div
          className="absolute inset-0 pointer-events-none"
          style={{
            opacity: burstOpacity,
            background: "radial-gradient(ellipse 60% 60% at 50% 50%, rgba(255,255,255,1) 0%, rgba(200,210,255,0.6) 40%, transparent 75%)",
          }}
        />

        {/* ── CONTENT layer — revealed via clip-path ─────────────────── */}
        <motion.div
          className="absolute inset-0 flex flex-col items-center justify-center"
          style={{
            clipPath,
            background: "radial-gradient(ellipse 100% 80% at 50% 0%, rgba(5,10,30,1) 0%, #000308 60%, #000000 100%)",
          }}
        >
          {/* Hero ambient light from above */}
          <div className="absolute inset-0 pointer-events-none">
            <div className="absolute inset-x-0 top-0 h-[60vh] bg-gradient-to-b from-[#2563EB]/10 to-transparent" />
            <div
              className="absolute left-1/2 -translate-x-1/2"
              style={{
                top: "-5%",
                width: "50%",
                height: "35%",
                background: "radial-gradient(ellipse 100% 100%, rgba(37,99,235,0.18) 0%, transparent 70%)",
                filter: "blur(50px)",
              }}
            />
          </div>
          <HeroReveal opacity={heroOpacity} y={heroY} />
        </motion.div>

      </div>
    </div>
  );
}

function PulseRings() {
  return (
    <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
      {[1, 2, 3].map((i) => (
        <motion.div
          key={i}
          className="absolute rounded-full border border-white/[0.04]"
          animate={{
            width: [`${120 + i * 70}px`, `${165 + i * 70}px`, `${120 + i * 70}px`],
            height: [`${120 + i * 70}px`, `${165 + i * 70}px`, `${120 + i * 70}px`],
            opacity: [0.5, 0.12, 0.5],
          }}
          transition={{
            duration: 3.2 + i * 0.9,
            repeat: Infinity,
            ease: "easeInOut",
            delay: i * 0.7,
          }}
        />
      ))}
    </div>
  );
}
