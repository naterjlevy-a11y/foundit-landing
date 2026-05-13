"use client";
import { useEffect, useRef } from "react";
import { motion, useMotionValue, useSpring } from "framer-motion";

// ─── useMagnetic ──────────────────────────────────────────────────────────────
// Exported hook — attach to any element for magnetic pull toward cursor.
export function useMagnetic(strength = 0.35) {
  const ref = useRef<HTMLElement>(null);
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const springX = useSpring(x, { stiffness: 180, damping: 16, mass: 0.8 });
  const springY = useSpring(y, { stiffness: 180, damping: 16, mass: 0.8 });

  const onMouseMove = (e: React.MouseEvent) => {
    if (!ref.current) return;
    const rect = ref.current.getBoundingClientRect();
    x.set((e.clientX - rect.left - rect.width / 2) * strength);
    y.set((e.clientY - rect.top - rect.height / 2) * strength);
  };
  const onMouseLeave = () => {
    x.set(0);
    y.set(0);
  };

  return {
    ref,
    style: { x: springX, y: springY },
    onMouseMove,
    onMouseLeave,
  } as const;
}

// ─── CustomCursor ─────────────────────────────────────────────────────────────
export function CustomCursor() {
  const dotX = useMotionValue(-100);
  const dotY = useMotionValue(-100);
  const ringX = useSpring(useMotionValue(-100), { stiffness: 80, damping: 20 });
  const ringY = useSpring(useMotionValue(-100), { stiffness: 80, damping: 20 });
  const ringScale = useSpring(1, { stiffness: 200, damping: 20 });
  const ringOpacity = useSpring(1, { stiffness: 200, damping: 20 });

  const ringXRaw = useRef(useMotionValue(-100));
  const ringYRaw = useRef(useMotionValue(-100));

  useEffect(() => {
    const onMove = (e: MouseEvent) => {
      dotX.set(e.clientX);
      dotY.set(e.clientY);
      ringXRaw.current.set(e.clientX);
      ringYRaw.current.set(e.clientY);
    };

    const onEnterMagnetic = () => {
      ringScale.set(1.8);
      ringOpacity.set(0.6);
    };
    const onLeaveMagnetic = () => {
      ringScale.set(1);
      ringOpacity.set(1);
    };
    const onEnterClickable = () => ringScale.set(1.4);
    const onLeaveClickable = () => ringScale.set(1);

    const attachListeners = () => {
      document.querySelectorAll("[data-magnetic]").forEach((el) => {
        el.addEventListener("mouseenter", onEnterMagnetic);
        el.addEventListener("mouseleave", onLeaveMagnetic);
      });
      document.querySelectorAll("a, button").forEach((el) => {
        el.addEventListener("mouseenter", onEnterClickable);
        el.addEventListener("mouseleave", onLeaveClickable);
      });
    };

    window.addEventListener("mousemove", onMove);
    attachListeners();

    const observer = new MutationObserver(attachListeners);
    observer.observe(document.body, { childList: true, subtree: true });

    return () => {
      window.removeEventListener("mousemove", onMove);
      observer.disconnect();
    };
  }, [dotX, dotY, ringScale, ringOpacity]);

  // Sync spring targets
  useEffect(() => {
    const unsub1 = ringXRaw.current.on("change", (v) => (ringX as unknown as { set: (v: number) => void }).set(v));
    const unsub2 = ringYRaw.current.on("change", (v) => (ringY as unknown as { set: (v: number) => void }).set(v));
    return () => { unsub1(); unsub2(); };
  }, [ringX, ringY]);

  return (
    // Hidden on touch devices via CSS
    <div className="pointer-events-none fixed inset-0 z-[99999] hidden md:[display:block]">
      {/* Fast dot */}
      <motion.div
        className="absolute w-1.5 h-1.5 rounded-full bg-white"
        style={{ x: dotX, y: dotY, translateX: "-50%", translateY: "-50%" }}
      />
      {/* Slow ring */}
      <motion.div
        className="absolute w-8 h-8 rounded-full border border-white/40"
        style={{
          x: ringX,
          y: ringY,
          scale: ringScale,
          opacity: ringOpacity,
          translateX: "-50%",
          translateY: "-50%",
        }}
      />
    </div>
  );
}
