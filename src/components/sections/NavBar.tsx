"use client";
import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Search, Menu, X } from "lucide-react";
import { cn } from "@/lib/utils";

const links = [
  { label: "Features", href: "#features" },
  { label: "How it works", href: "#how" },
  { label: "Pricing", href: "#pricing" },
  { label: "About", href: "#about" },
];

export function NavBar() {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <>
      <motion.header
        initial={{ y: -80, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.5, ease: "easeOut" }}
        className={cn(
          "fixed top-4 left-1/2 -translate-x-1/2 z-50 transition-all duration-300",
          scrolled ? "w-[calc(100%-2rem)] max-w-3xl" : "w-[calc(100%-2rem)] max-w-4xl"
        )}
      >
        <div
          className={cn(
            "flex items-center justify-between px-4 py-3 rounded-2xl border transition-all duration-300",
            scrolled
              ? "bg-black/80 border-white/10 backdrop-blur-xl shadow-xl shadow-black/40"
              : "bg-black/40 border-white/5 backdrop-blur-md"
          )}
        >
          {/* Logo */}
          <a href="#" className="flex items-center gap-2 flex-shrink-0">
            <div className="w-7 h-7 rounded-lg bg-[#2563EB] flex items-center justify-center">
              <Search className="w-3.5 h-3.5 text-white" strokeWidth={2.5} />
            </div>
            <span className="text-white font-semibold text-sm tracking-tight">Found It!</span>
          </a>

          {/* Desktop nav */}
          <nav className="hidden md:flex items-center gap-1">
            {links.map((l) => (
              <a
                key={l.href}
                href={l.href}
                className="text-[13px] text-white/50 hover:text-white px-3 py-1.5 rounded-lg hover:bg-white/5 transition-colors"
              >
                {l.label}
              </a>
            ))}
          </nav>

          {/* Right */}
          <div className="hidden md:flex items-center gap-2">
            <a
              href="#waitlist"
              className="text-[13px] font-semibold px-4 py-1.5 rounded-lg bg-[#2563EB] hover:bg-[#1d4ed8] text-white transition-colors"
            >
              Join waitlist
            </a>
          </div>

          {/* Mobile toggle */}
          <button
            onClick={() => setMenuOpen(!menuOpen)}
            className="md:hidden text-white/60 hover:text-white p-1 transition-colors"
            aria-label="Toggle menu"
          >
            {menuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>

        {/* Mobile drawer */}
        <AnimatePresence>
          {menuOpen && (
            <motion.div
              initial={{ opacity: 0, y: -8 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -8 }}
              transition={{ duration: 0.18 }}
              className="mt-2 rounded-2xl border border-white/10 bg-black/90 backdrop-blur-xl p-4 flex flex-col gap-1 md:hidden"
            >
              {links.map((l) => (
                <a
                  key={l.href}
                  href={l.href}
                  onClick={() => setMenuOpen(false)}
                  className="text-[14px] text-white/60 hover:text-white px-3 py-2 rounded-lg hover:bg-white/5 transition-colors"
                >
                  {l.label}
                </a>
              ))}
              <div className="border-t border-white/10 mt-2 pt-3">
                <a
                  href="#waitlist"
                  onClick={() => setMenuOpen(false)}
                  className="block text-center text-[14px] font-semibold px-4 py-2 rounded-lg bg-[#2563EB] hover:bg-[#1d4ed8] text-white transition-colors"
                >
                  Join waitlist
                </a>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.header>
    </>
  );
}
