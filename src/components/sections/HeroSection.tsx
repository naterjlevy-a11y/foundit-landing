"use client";
import { motion } from "framer-motion";
import { LampContainer } from "@/components/ui/lamp";
import { Spotlight } from "@/components/ui/spotlight";
import { FlipWords } from "@/components/ui/flip-words";
import { BackgroundBeams } from "@/components/ui/background-beams";

const flipWords = ["files", "docs", "screenshots", "emails"];

export function HeroSection() {
  return (
    <section id="hero" className="relative min-h-screen bg-black overflow-hidden flex flex-col items-center justify-center">
      <Spotlight className="-top-40 left-0 md:left-60 md:-top-20" />
      <BackgroundBeams className="opacity-40" />

      <LampContainer className="min-h-screen">
        {/* Badge */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="mb-8 flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-4 py-1.5 text-xs text-white/50 tracking-widest uppercase"
        >
          <span className="text-[#2563EB]">✦</span>
          Now in beta &middot; macOS 13+
        </motion.div>

        {/* Headline */}
        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.35 }}
          className="text-center text-4xl font-bold tracking-tight text-white md:text-6xl lg:text-7xl leading-[1.05]"
        >
          Find any{" "}
          <FlipWords words={flipWords} className="font-bold" />
          <br />
          <span className="text-white/90">instantly.</span>
        </motion.h1>

        {/* Subheadline */}
        <motion.p
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.5 }}
          className="mt-6 text-center text-base md:text-lg text-white/40 max-w-lg leading-relaxed"
        >
          AI-powered file search for macOS. Lives in your menu bar.
          Finds everything.
        </motion.p>

        {/* CTAs */}
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.65 }}
          className="mt-10 flex flex-col sm:flex-row items-center gap-3"
          id="waitlist"
        >
          <form
            className="flex items-center gap-2 bg-white/5 border border-white/10 rounded-xl p-1.5 w-full sm:w-auto"
            onSubmit={(e) => e.preventDefault()}
          >
            <input
              type="email"
              placeholder="your@email.com"
              className="bg-transparent text-white text-sm px-3 py-1.5 outline-none placeholder:text-white/25 w-48"
            />
            <button
              type="submit"
              className="px-5 py-2 rounded-lg bg-[#2563EB] hover:bg-[#1d4ed8] text-white text-sm font-semibold transition-colors flex-shrink-0"
            >
              Get early access
            </button>
          </form>
          <a
            href="#how"
            className="px-5 py-2.5 rounded-lg border border-white/10 hover:border-white/20 text-white/60 hover:text-white text-sm font-medium transition-all"
          >
            See how it works
          </a>
        </motion.div>

        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.6, delay: 0.8 }}
          className="mt-5 text-xs text-white/20 tracking-widest uppercase"
        >
          macOS &nbsp;&middot;&nbsp; Early access &nbsp;&middot;&nbsp; Free to join
        </motion.p>
      </LampContainer>
    </section>
  );
}
