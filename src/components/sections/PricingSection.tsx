"use client";
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { CardContainer, CardBody, CardItem } from "@/components/ui/card-3d";
import { Check } from "lucide-react";

function ProButton() {
  const [hovered, setHovered] = useState(false);
  return (
    <a
      href="#waitlist"
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      className="relative block w-full text-center py-3 rounded-lg bg-white text-[#2563EB] text-sm font-bold hover:opacity-90 transition-opacity overflow-hidden h-[46px]"
    >
      <AnimatePresence mode="wait">
        <motion.span
          key={hovered ? "hover" : "default"}
          initial={{ opacity: 0, y: hovered ? 8 : -8 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: hovered ? -8 : 8 }}
          transition={{ duration: 0.18 }}
          className="absolute inset-0 flex items-center justify-center"
        >
          {hovered ? "Start 7-day free trial →" : "Join waitlist — $10.99/mo"}
        </motion.span>
      </AnimatePresence>
    </a>
  );
}

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

export function PricingSection() {
  return (
    <section id="pricing" className="relative bg-black border-t border-white/5 py-28 overflow-hidden">
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute left-1/2 -translate-x-1/2 top-0 w-[800px] h-[400px] rounded-full bg-[#2563EB]/6 blur-[120px]" />
      </div>
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
                    href="#waitlist"
                    className="block w-full text-center py-3 rounded-lg border border-white/12 text-white/60 hover:text-white hover:border-white/25 text-sm font-medium transition-all"
                  >
                    Join waitlist
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
                    <ProButton />
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
  );
}
