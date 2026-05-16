"use client";
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { LampContainer } from "@/components/ui/lamp";
import { Spotlight } from "@/components/ui/spotlight";
import { FlipWords } from "@/components/ui/flip-words";
import { BackgroundBeams } from "@/components/ui/background-beams";
import { AnimatedSearchDemo } from "@/components/sections/AnimatedSearchDemo";
import { KeyboardShortcut } from "@/components/sections/KeyboardShortcut";
import { submitWaitlist } from "@/lib/waitlist";

const flipWords = ["files", "docs", "screenshots", "emails"];

type FormState = "idle" | "loading" | "success" | "error";

export function HeroSection() {
  const [email, setEmail] = useState("");
  const [state, setState] = useState<FormState>("idle");
  const [message, setMessage] = useState("");

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (state === "loading" || state === "success") return;
    setState("loading");
    try {
      const res = await submitWaitlist(email);
      if (res.error) {
        setMessage(res.error);
        setState("error");
      } else {
        setMessage(res.already ? "You're already on the list!" : "You're on the list!");
        setState("success");
        setEmail("");
      }
    } catch {
      setMessage("Something went wrong. Please try again.");
      setState("error");
    }
  }

  return (
    <section id="hero" className="relative min-h-screen bg-black flex flex-col items-center pt-20 overflow-x-hidden">
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
          <span className="block whitespace-nowrap">
            Find any <FlipWords words={flipWords} className="font-bold" />
          </span>
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
          <AnimatePresence mode="wait">
            {state === "success" ? (
              <motion.div
                key="success"
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                className="flex items-center gap-2 bg-white/5 border border-white/10 rounded-xl px-4 py-2.5"
              >
                <span className="text-[#2563EB] text-base">✓</span>
                <span className="text-white/80 text-sm">{message}</span>
              </motion.div>
            ) : (
              <motion.form
                key="form"
                className="flex items-center gap-2 bg-white/5 border border-white/10 rounded-xl p-1.5 w-full sm:w-auto"
                onSubmit={handleSubmit}
              >
                <input
                  type="email"
                  placeholder="your@email.com"
                  value={email}
                  onChange={(e) => { setEmail(e.target.value); if (state === "error") setState("idle"); }}
                  required
                  className="bg-transparent text-white text-sm px-3 py-1.5 outline-none placeholder:text-white/25 w-48"
                />
                <button
                  type="submit"
                  disabled={state === "loading"}
                  className="relative px-5 py-2 rounded-lg bg-[#2563EB] hover:bg-[#1d4ed8] disabled:opacity-60 text-white text-sm font-semibold transition-colors flex-shrink-0 min-w-[130px] h-9"
                >
                  {state === "loading" ? "Joining…" : "Get early access"}
                </button>
              </motion.form>
            )}
          </AnimatePresence>
          <a
            href="#how"
            className="px-5 py-2.5 rounded-lg border border-white/10 hover:border-white/20 text-white/60 hover:text-white text-sm font-medium transition-all"
          >
            See how it works
          </a>
        </motion.div>

        {state === "error" && (
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="mt-2 text-xs text-red-400"
          >
            {message}
          </motion.p>
        )}

        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.6, delay: 0.8 }}
          className="mt-5 text-xs text-white/20 tracking-widest uppercase"
        >
          macOS &nbsp;&middot;&nbsp; Early access &nbsp;&middot;&nbsp; Free to join
        </motion.p>

        {/* Animated search demo */}
        <AnimatedSearchDemo />

        {/* Keyboard shortcut */}
        <KeyboardShortcut />
      </LampContainer>
    </section>
  );
}
