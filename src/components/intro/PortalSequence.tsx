"use client";
import { useRef, useLayoutEffect } from "react";
import { motion, useMotionValue, useTransform } from "framer-motion";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { MagnifyingGlass } from "./MagnifyingGlass";
import { HeroReveal } from "./HeroReveal";

gsap.registerPlugin(ScrollTrigger);

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

  // ── Animation values derived from a single 0→1 scroll progress ──────────
  const glassScale = useTransform(scrollProgress, [0, 0.45], [1, 8]);

  const handleOpacity = useTransform(scrollProgress, [0, 0.22], [1, 0]);

  const glowIntensity = useTransform(scrollProgress, [0, 0.40], [0.3, 1]);

  // Distortion peaks at 0.55, resolves by 0.72
  const distortion = useTransform(
    scrollProgress,
    [0.32, 0.55, 0.72],
    [0, 80, 0]
  );

  // Clip-path expands from 0% to 150% (covers whole viewport)
  const clipRadius = useTransform(scrollProgress, [0.48, 0.88], ["0%", "150%"]);
  const clipPath = useTransform(
    clipRadius,
    (r) => `circle(${r} at 50% 50%)`
  );

  // Hero content fades in
  const heroOpacity = useTransform(scrollProgress, [0.80, 1.0], [0, 1]);
  const heroY = useTransform(scrollProgress, [0.80, 1.0], [48, 0]);

  // The void layer fades out as hero appears
  const voidOpacity = useTransform(scrollProgress, [0.72, 0.90], [1, 0]);

  // "Scroll" label fades out fast
  const scrollLabelOpacity = useTransform(scrollProgress, [0, 0.12], [1, 0]);

  // Background shifts from pure black to very dark blue as portal opens
  const bgBlue = useTransform(scrollProgress, [0.6, 1.0], [0, 8]);
  const bgStyle = useTransform(
    bgBlue,
    (v) => `radial-gradient(ellipse 80% 60% at 50% 0%, rgba(37,99,235,${v * 0.015}) 0%, transparent 70%), #000`
  );

  return (
    // The wrapper is 400vh tall — gives scrollable travel for GSAP to pin+scrub
    <div ref={wrapperRef} className="relative" style={{ height: "400vh" }}>
      {/* ── Fixed viewport: everything inside stays fixed during pinning ── */}
      {/* (GSAP handles the actual fixation via ScrollTrigger pin) */}
      <div className="w-full h-screen overflow-hidden relative">

        {/* Dynamic background */}
        <motion.div className="absolute inset-0" style={{ background: bgStyle }} />

        {/* ── The VOID layer — glass on black ───────────────────────── */}
        <motion.div
          className="absolute inset-0 flex flex-col items-center justify-center"
          style={{ opacity: voidOpacity }}
        >
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

          {/* Subtle concentric pulse rings around glass */}
          <PulseRings />
        </motion.div>

        {/* ── CONTENT layer — revealed via clip-path expanding circle ── */}
        <motion.div
          className="absolute inset-0 bg-black flex flex-col items-center justify-center"
          style={{ clipPath }}
        >
          {/* Blue ambient after portal */}
          <div className="absolute inset-0 pointer-events-none">
            <div className="absolute inset-x-0 top-0 h-[50vh] bg-gradient-to-b from-[#2563EB]/8 to-transparent" />
          </div>
          <HeroReveal opacity={heroOpacity} y={heroY} />
        </motion.div>

      </div>
    </div>
  );
}

// Subtle pulse rings behind the glass — suggest depth/energy
function PulseRings() {
  return (
    <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
      {[1, 2, 3].map((i) => (
        <motion.div
          key={i}
          className="absolute rounded-full border border-white/[0.04]"
          animate={{
            width: [`${120 + i * 60}px`, `${160 + i * 60}px`, `${120 + i * 60}px`],
            height: [`${120 + i * 60}px`, `${160 + i * 60}px`, `${120 + i * 60}px`],
            opacity: [0.5, 0.15, 0.5],
          }}
          transition={{
            duration: 3 + i * 0.8,
            repeat: Infinity,
            ease: "easeInOut",
            delay: i * 0.6,
          }}
        />
      ))}
    </div>
  );
}
