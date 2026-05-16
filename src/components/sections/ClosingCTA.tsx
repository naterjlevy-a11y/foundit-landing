"use client";
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { GlassLens } from "@/components/intro/GlassLens";
import { submitWaitlist } from "@/lib/waitlist";

type FormState = "idle" | "loading" | "success" | "error";

export function ClosingCTA() {
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
    <section
      id="waitlist"
      className="relative overflow-hidden"
      style={{ padding: "120px 0 140px", borderTop: "1px solid rgba(255,255,255,0.04)" }}
    >
      <div
        className="absolute pointer-events-none"
        style={{
          top: "50%", left: "50%", transform: "translate(-50%,-50%)",
          width: "700px", height: "500px",
          background: "radial-gradient(ellipse 100% 100%, rgba(37,99,235,0.08) 0%, transparent 70%)",
          filter: "blur(60px)",
        }}
      />

      <div className="max-w-4xl mx-auto px-6 text-center relative">
        <motion.div
          initial={{ opacity: 0, scale: 0.7 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true, margin: "-60px" }}
          transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
          className="flex justify-center mb-14"
        >
          <GlassLens
            style={{ width: "100px", height: "100px" }}
            showHandle={false}
            rimPadding="6px"
          />
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 32 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1] }}
        >
          <p className="text-[10px] font-mono tracking-[0.35em] uppercase text-white/25 mb-8">
            § 04 · Join the waitlist
          </p>

          <h2
            className="font-black text-white leading-tight mb-4"
            style={{ fontSize: "clamp(48px, 9vw, 110px)", letterSpacing: "-0.04em", lineHeight: 0.92 }}
          >
            Your files
          </h2>
          <h2
            className="font-black text-white/20 leading-tight mb-12"
            style={{ fontSize: "clamp(48px, 9vw, 110px)", letterSpacing: "-0.04em", lineHeight: 0.92, fontStyle: "italic" }}
          >
            are waiting.
          </h2>

          <p className="text-white/35 text-lg font-light mb-16 max-w-sm mx-auto leading-relaxed">
            Free to start. Pro at $10.99/mo.<br />Cancel anytime.
          </p>

          <AnimatePresence mode="wait">
            {state === "success" ? (
              <motion.div
                key="success"
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                className="flex items-center justify-center gap-3 max-w-lg mx-auto py-4"
              >
                <span className="text-[#2563EB] text-2xl">✓</span>
                <span className="text-white/80 text-lg">{message} We&apos;ll be in touch soon.</span>
              </motion.div>
            ) : (
              <motion.form
                key="form"
                className="flex flex-col sm:flex-row items-center justify-center gap-3 max-w-lg mx-auto"
                onSubmit={handleSubmit}
              >
                <input
                  type="email"
                  placeholder="your@email.com"
                  value={email}
                  onChange={(e) => { setEmail(e.target.value); if (state === "error") setState("idle"); }}
                  required
                  className="flex-1 w-full rounded-full px-6 py-4 text-white text-sm outline-none placeholder:text-white/20 focus:ring-1 focus:ring-white/15 transition-all h-14"
                  style={{ background: "rgba(255,255,255,0.05)", border: "1px solid rgba(255,255,255,0.10)" }}
                />
                <button
                  type="submit"
                  disabled={state === "loading"}
                  className="relative px-8 py-4 rounded-full bg-[#2563EB] hover:bg-[#1d4ed8] disabled:opacity-60 text-white text-base font-bold tracking-wide transition-colors h-14 min-w-[200px] flex-shrink-0"
                  style={{ boxShadow: "0 0 50px rgba(37,99,235,0.35), 0 8px 24px rgba(37,99,235,0.2)" }}
                >
                  {state === "loading" ? "Joining…" : "Get early access"}
                </button>
              </motion.form>
            )}
          </AnimatePresence>

          {state === "error" && (
            <p className="mt-3 text-sm text-red-400">{message}</p>
          )}

          <div className="mt-10 flex items-center justify-center gap-6 flex-wrap">
            {["Free tier · 500 files", "Pro · $10.99/mo", "Apple Silicon", "macOS 13+"].map((t) => (
              <span key={t} className="text-[10px] font-mono tracking-[0.18em] uppercase text-white/20">
                {t}
              </span>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
}
