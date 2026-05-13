"use client";
import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useMagnetic } from "@/components/cursor/CustomCursor";

const LINKS = [
  ["How it works", "#how-it-works"],
  ["Features",    "#features"],
  ["Pricing",     "#waitlist"],
] as const;

function NavCTA() {
  const mag = useMagnetic(0.35);
  return (
    <motion.a
      href="#waitlist"
      ref={mag.ref as React.RefObject<HTMLAnchorElement>}
      style={{ ...mag.style, boxShadow: "0 0 24px rgba(37,99,235,0.35)" }}
      onMouseMove={mag.onMouseMove as unknown as React.MouseEventHandler<HTMLAnchorElement>}
      onMouseLeave={mag.onMouseLeave as unknown as React.MouseEventHandler<HTMLAnchorElement>}
      data-magnetic
      className="px-5 py-2.5 rounded-full bg-[#2563EB] text-white text-[13px] font-bold tracking-wide hover:bg-[#1d4ed8] transition-colors"
    >
      Get early access
    </motion.a>
  );
}

export function TopNav() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 48);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <>
      <nav
        className="fixed top-0 inset-x-0 z-50 h-16 flex items-center justify-between px-6 md:px-10 transition-all duration-500"
        style={
          scrolled
            ? {
                background: "rgba(5,8,16,0.85)",
                backdropFilter: "blur(20px)",
                WebkitBackdropFilter: "blur(20px)",
                borderBottom: "1px solid rgba(255,255,255,0.05)",
              }
            : {}
        }
      >
        {/* Wordmark */}
        <a href="/" className="text-[15px] font-black text-white tracking-tight flex-shrink-0">
          Found It<span style={{ color: "#2563EB" }}>!</span>
        </a>

        {/* Desktop links */}
        <div className="hidden md:flex items-center gap-8">
          {LINKS.map(([label, href]) => (
            <a
              key={href}
              href={href}
              className="text-[13px] text-white/40 hover:text-white/75 font-medium transition-colors tracking-wide"
            >
              {label}
            </a>
          ))}
        </div>

        {/* Desktop CTA */}
        <div className="hidden md:block">
          <NavCTA />
        </div>

        {/* Mobile hamburger */}
        <button
          className="md:hidden flex flex-col gap-1.5 p-2"
          onClick={() => setMobileOpen((o) => !o)}
          aria-label="Toggle menu"
        >
          <span className={`block h-px w-5 bg-white/60 transition-transform duration-300 ${mobileOpen ? "translate-y-[7px] rotate-45" : ""}`} />
          <span className={`block h-px w-5 bg-white/60 transition-opacity duration-300 ${mobileOpen ? "opacity-0" : ""}`} />
          <span className={`block h-px w-5 bg-white/60 transition-transform duration-300 ${mobileOpen ? "-translate-y-[7px] -rotate-45" : ""}`} />
        </button>
      </nav>

      {/* Mobile menu */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ opacity: 0, y: -8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            transition={{ duration: 0.2 }}
            className="fixed top-16 inset-x-0 z-40 flex flex-col gap-1 px-6 py-4"
            style={{
              background: "rgba(5,8,16,0.96)",
              backdropFilter: "blur(20px)",
              borderBottom: "1px solid rgba(255,255,255,0.05)",
            }}
          >
            {LINKS.map(([label, href]) => (
              <a
                key={href}
                href={href}
                onClick={() => setMobileOpen(false)}
                className="py-3 text-sm text-white/60 hover:text-white border-b border-white/[0.05] last:border-0 transition-colors"
              >
                {label}
              </a>
            ))}
            <a
              href="#waitlist"
              onClick={() => setMobileOpen(false)}
              className="mt-3 py-3 text-center rounded-full bg-[#2563EB] text-white text-sm font-bold"
            >
              Get early access
            </a>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
