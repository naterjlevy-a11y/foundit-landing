import { Search } from "lucide-react";

export function FooterSection() {
  return (
    <footer className="bg-black border-t border-white/5 py-12">
      <div className="max-w-5xl mx-auto px-6">
        <div className="flex flex-col md:flex-row items-start justify-between gap-10 mb-10">
          <div>
            <div className="flex items-center gap-2 mb-3">
              <div className="w-6 h-6 rounded-lg bg-[#2563EB] flex items-center justify-center">
                <Search className="w-3 h-3 text-white" strokeWidth={2.5} />
              </div>
              <span className="text-white font-semibold text-sm tracking-tight">Found It!</span>
            </div>
            <p className="text-white/25 text-xs max-w-[180px] leading-relaxed">
              Natural-language file search for Mac.
            </p>
          </div>

          <div className="flex flex-wrap gap-12">
            <div className="flex flex-col gap-3">
              <h4 className="text-white/20 text-[10px] font-mono tracking-widest uppercase">Product</h4>
              {[["Features", "#features"], ["How it works", "#how"], ["Pricing", "#pricing"]].map(([l, h]) => (
                <a key={h} href={h} className="text-white/40 hover:text-white text-sm transition-colors">{l}</a>
              ))}
            </div>
            <div className="flex flex-col gap-3">
              <h4 className="text-white/20 text-[10px] font-mono tracking-widest uppercase">Legal</h4>
              {[["Privacy", "/privacy.html"], ["Terms", "/terms.html"], ["Refunds", "/refunds.html"]].map(([l, h]) => (
                <a key={h} href={h} className="text-white/40 hover:text-white text-sm transition-colors">{l}</a>
              ))}
            </div>
            <div className="flex flex-col gap-3">
              <h4 className="text-white/20 text-[10px] font-mono tracking-widest uppercase">Connect</h4>
              {[["GitHub", "https://github.com/naterjlevy-a11y"], ["LinkedIn", "https://www.linkedin.com/in/nate-levy-b803412a9/"]].map(([l, h]) => (
                <a key={h} href={h} target="_blank" rel="noopener noreferrer" className="text-white/40 hover:text-white text-sm transition-colors">{l}</a>
              ))}
            </div>
          </div>
        </div>

        <div className="border-t border-white/5 pt-6 flex flex-col md:flex-row items-center justify-between gap-3">
          <span className="text-white/20 text-xs font-mono">© 2026 Found It!</span>
          <span className="text-white/20 text-xs font-mono">Made by Nate Levy</span>
        </div>
      </div>
    </footer>
  );
}
