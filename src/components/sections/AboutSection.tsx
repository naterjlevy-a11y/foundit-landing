"use client";
import { motion } from "framer-motion";
import Image from "next/image";

export function AboutSection() {
  return (
    <section id="about" className="bg-black border-t border-white/5 py-24">
      <div className="max-w-5xl mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="flex flex-col md:flex-row items-start gap-12"
        >
          <div className="flex-shrink-0">
            <div className="relative w-40 h-40 md:w-48 md:h-48">
              <Image
                src="/assets/nate.jpg"
                alt="Nate Levy"
                fill
                className="rounded-2xl object-cover object-top border border-white/10"
              />
            </div>
          </div>

          <div className="flex-1">
            <p className="text-[#2563EB] text-xs font-mono tracking-widest uppercase mb-4">§ 003 · About</p>
            <h2 className="text-4xl md:text-5xl font-black text-white tracking-tight mb-2">Nate Levy</h2>
            <p className="text-[#2563EB] text-xs font-mono tracking-widest uppercase mb-6">
              Indie developer &nbsp;·&nbsp; macOS &nbsp;·&nbsp; AI
            </p>
            <p className="text-white/50 text-base leading-relaxed mb-4">
              I built Found It because I kept losing my own files. Spotlight is great when you know the name — I needed something for when you only remember what it was about.
            </p>
            <p className="text-white/50 text-base leading-relaxed mb-8">
              What started as a weekend experiment turned into a full-featured search app with local AI, Stripe billing, and a Supabase backend. I care about software that feels fast, stays out of your way, and respects your data.
            </p>
            <div className="flex flex-wrap gap-4">
              {[
                { label: "GitHub", href: "https://github.com/naterjlevy-a11y" },
                { label: "LinkedIn", href: "https://www.linkedin.com/in/nate-levy-b803412a9/" },
                { label: "hello@founditapp.com", href: "mailto:hello@founditapp.com" },
              ].map((l) => (
                <a
                  key={l.href}
                  href={l.href}
                  target={l.href.startsWith("http") ? "_blank" : undefined}
                  rel="noopener noreferrer"
                  className="text-xs font-mono tracking-widest uppercase text-white/35 hover:text-white border-b border-white/10 hover:border-white/40 pb-0.5 transition-all"
                >
                  {l.label}
                </a>
              ))}
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
