"use client";
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { CardContainer, CardBody, CardItem } from "@/components/ui/card-3d";
import { Check, X } from "lucide-react";
import { createCheckout } from "@/lib/waitlist";

const free = [
  "Unlimited searches",
  "Up to 500 indexed files",
  "Near-instant local search",
  "Search history across restarts",
  "Open, preview, delete, reveal",
  "Menu bar app",
];

const pro = [
  "Everything in Free",
  "Unlimited file indexing",
  "Deep Search (AI expansion + reranking)",
  "Image conversion (JPEG, PNG, HEIC…)",
  "Drag-and-drop import & use",
  "Priority re-indexing",
];

type CheckoutState = "idle" | "loading" | "error";

function CheckoutModal({ onClose }: { onClose: () => void }) {
  const [plan, setPlan] = useState<"monthly" | "annual">("monthly");
  const [email, setEmail] = useState("");
  const [state, setState] = useState<CheckoutState>("idle");
  const [errorMsg, setErrorMsg] = useState("");

  async function handleCheckout(e: React.FormEvent) {
    e.preventDefault();
    setState("loading");
    setErrorMsg("");
    try {
      const res = await createCheckout(email, plan);
      if (res.url) {
        window.location.href = res.url;
      } else {
        setErrorMsg(res.error ?? "Something went wrong.");
        setState("error");
      }
    } catch {
      setErrorMsg("Something went wrong. Please try again.");
      setState("error");
    }
  }

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 z-50 flex items-center justify-center p-4"
      style={{ background: "rgba(0,0,0,0.85)", backdropFilter: "blur(8px)" }}
      onClick={(e) => { if (e.target === e.currentTarget) onClose(); }}
    >
      <motion.div
        initial={{ opacity: 0, scale: 0.95, y: 16 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        exit={{ opacity: 0, scale: 0.95, y: 16 }}
        transition={{ duration: 0.2 }}
        className="w-full max-w-md rounded-2xl border border-white/10 bg-[#0a0a0a] p-8 relative"
      >
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-white/30 hover:text-white transition-colors"
        >
          <X className="w-5 h-5" />
        </button>

        <div className="flex items-center gap-2 mb-6">
          <div className="w-8 h-8 rounded-lg bg-[#2563EB] flex items-center justify-center">
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2.5" strokeLinecap="round">
              <circle cx="11" cy="11" r="8" /><path d="m21 21-4.35-4.35" />
            </svg>
          </div>
          <span className="text-white font-semibold">Found It! Pro</span>
        </div>

        {/* Plan toggle */}
        <div className="flex gap-2 mb-6 p-1 rounded-xl bg-white/5 border border-white/8">
          {(["monthly", "annual"] as const).map((p) => (
            <button
              key={p}
              onClick={() => setPlan(p)}
              className={`flex-1 py-2 rounded-lg text-sm font-medium transition-all ${
                plan === p
                  ? "bg-[#2563EB] text-white"
                  : "text-white/40 hover:text-white/70"
              }`}
            >
              {p === "monthly" ? (
                <span>Monthly <span className="text-xs font-normal opacity-70">$10.99/mo</span></span>
              ) : (
                <span>Annual <span className="text-xs font-normal opacity-70">$87.99/yr</span></span>
              )}
            </button>
          ))}
        </div>

        {plan === "annual" && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            className="mb-4 flex items-center gap-2 rounded-lg bg-[#2563EB]/10 border border-[#2563EB]/20 px-3 py-2"
          >
            <span className="text-[#2563EB] text-xs font-mono">Save 33%</span>
            <span className="text-white/50 text-xs">· $7.33/mo billed annually</span>
          </motion.div>
        )}

        <form onSubmit={handleCheckout} className="space-y-3">
          <input
            type="email"
            placeholder="your@email.com"
            value={email}
            onChange={(e) => { setEmail(e.target.value); if (state === "error") setState("idle"); }}
            required
            className="w-full rounded-xl px-4 py-3 bg-white/5 border border-white/10 text-white text-sm outline-none placeholder:text-white/25 focus:border-white/20 transition-colors"
          />
          <button
            type="submit"
            disabled={state === "loading"}
            className="w-full py-3 rounded-xl bg-white text-[#2563EB] font-bold text-sm hover:opacity-90 disabled:opacity-50 transition-opacity"
          >
            {state === "loading" ? "Redirecting to Stripe…" : "Continue to payment →"}
          </button>
        </form>

        {state === "error" && (
          <p className="mt-3 text-xs text-red-400 text-center">{errorMsg}</p>
        )}

        <p className="mt-4 text-center text-white/25 text-xs">
          Secured by Stripe · Cancel anytime
        </p>
      </motion.div>
    </motion.div>
  );
}

export function PricingSection() {
  const [showCheckout, setShowCheckout] = useState(false);

  return (
    <>
      <AnimatePresence>
        {showCheckout && <CheckoutModal onClose={() => setShowCheckout(false)} />}
      </AnimatePresence>

      <section id="pricing" className="bg-black border-t border-white/5 py-28">
        <div className="max-w-5xl mx-auto px-6">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="text-center mb-16"
          >
            <h2 className="text-3xl md:text-5xl font-bold text-white tracking-tight">
              Try free on your first 500 files.<br />
              <span className="text-white/50">Go Pro for the full library.</span>
            </h2>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-3xl mx-auto">
            {/* Free card */}
            <CardContainer containerClassName="py-0">
              <CardBody className="w-full h-auto">
                <CardItem translateZ={20} className="w-full">
                  <div className="rounded-2xl border border-white/8 bg-[#0a0a0a] p-8 h-full">
                    <p className="text-white/40 text-[10px] font-mono tracking-widest uppercase mb-3">Free</p>
                    <div className="flex items-end gap-1 mb-1">
                      <span className="text-5xl font-black text-white tracking-tight">$0</span>
                    </div>
                    <p className="text-white/40 text-sm mb-8">Start searching immediately</p>
                    <ul className="space-y-3 mb-8">
                      {free.map((f) => (
                        <li key={f} className="flex items-center gap-2.5 text-sm text-white/60">
                          <div className="w-4 h-4 rounded-full border border-white/15 bg-white/5 flex items-center justify-center flex-shrink-0">
                            <Check className="w-2.5 h-2.5 text-white/50" strokeWidth={2.5} />
                          </div>
                          {f}
                        </li>
                      ))}
                    </ul>
                    <a
                      href="/download"
                      className="block w-full text-center py-3 rounded-lg border border-white/12 text-white/60 hover:text-white hover:border-white/25 text-sm font-medium transition-all"
                    >
                      Download free →
                    </a>
                  </div>
                </CardItem>
              </CardBody>
            </CardContainer>

            {/* Pro card */}
            <CardContainer containerClassName="py-0">
              <CardBody className="w-full h-auto">
                <CardItem translateZ={30} className="w-full">
                  <div className="rounded-2xl border border-[#2563EB]/60 bg-[#2563EB] p-8 h-full relative overflow-hidden">
                    <div className="absolute inset-0 bg-gradient-to-br from-[#2563EB] to-[#1d4ed8] opacity-100 rounded-2xl" />
                    <div className="relative z-10">
                      <div className="flex items-center justify-between mb-3">
                        <p className="text-white/60 text-[10px] font-mono tracking-widest uppercase">Pro</p>
                        <span className="text-[10px] font-mono font-bold tracking-widest uppercase px-2.5 py-1 rounded-full bg-white/15 text-white">
                          Most popular
                        </span>
                      </div>
                      <div className="flex items-end gap-1 mb-1">
                        <span className="text-5xl font-black text-white tracking-tight">$10.99</span>
                        <span className="text-white/60 text-base mb-2">/mo</span>
                      </div>
                      <p className="text-white/70 text-sm mb-8">Unlock the full library</p>
                      <ul className="space-y-3 mb-8">
                        {pro.map((f) => (
                          <li key={f} className="flex items-center gap-2.5 text-sm text-white/85">
                            <div className="w-4 h-4 rounded-full border border-white/30 bg-white/15 flex items-center justify-center flex-shrink-0">
                              <Check className="w-2.5 h-2.5 text-white" strokeWidth={2.5} />
                            </div>
                            {f}
                          </li>
                        ))}
                      </ul>
                      <button
                        onClick={() => setShowCheckout(true)}
                        className="block w-full text-center py-3 rounded-lg bg-white text-[#2563EB] text-sm font-bold hover:opacity-90 transition-opacity"
                      >
                        Get Pro — $10.99/mo →
                      </button>
                      <p className="text-center text-white/40 text-xs mt-3">Cancel anytime · Billed via Stripe</p>
                    </div>
                  </div>
                </CardItem>
              </CardBody>
            </CardContainer>
          </div>

          <p className="text-center text-white/20 text-xs font-mono tracking-wider mt-10">
            Billing through Stripe &nbsp;·&nbsp; Cancel any time &nbsp;·&nbsp; macOS 12+
          </p>
        </div>
      </section>
    </>
  );
}
