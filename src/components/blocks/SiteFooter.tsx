"use client";

export function SiteFooter() {
  return (
    <footer className="bg-black border-t border-white/[0.04] py-8">
      <div className="max-w-6xl mx-auto px-6 flex flex-col md:flex-row items-center justify-between gap-4">
        <span className="text-white/15 text-[11px] font-mono">
          © 2026 Found It! &nbsp;·&nbsp; Made by Nate Levy
        </span>

        <div className="flex items-center flex-wrap justify-center gap-x-6 gap-y-2">
          {[
            ["Features", "#features"],
            ["Waitlist", "#waitlist"],
            ["Privacy", "/privacy.html"],
            ["Terms", "/terms.html"],
            ["Refunds", "/refunds.html"],
          ].map(([l, h]) => (
            <a
              key={h}
              href={h}
              className="text-white/20 hover:text-white/55 text-[11px] font-mono transition-colors"
            >
              {l}
            </a>
          ))}
        </div>

        <div className="flex items-center gap-4">
          <a
            href="https://github.com/naterjlevy-a11y"
            target="_blank"
            rel="noopener noreferrer"
            className="text-white/15 hover:text-white/50 transition-colors"
            aria-label="GitHub"
          >
            <svg width="15" height="15" viewBox="0 0 24 24" fill="currentColor">
              <path d="M12 2C6.477 2 2 6.477 2 12c0 4.418 2.865 8.166 6.839 9.489.5.092.682-.217.682-.482 0-.237-.009-.866-.013-1.7-2.782.603-3.369-1.34-3.369-1.34-.454-1.156-1.11-1.464-1.11-1.464-.908-.62.069-.608.069-.608 1.004.07 1.532 1.032 1.532 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.094.39-1.988 1.032-2.684-.103-.253-.448-1.27.098-2.646 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.116 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.393.1 2.646.645.696 1.028 1.59 1.028 2.684 0 3.848-2.338 4.693-4.566 4.923.359.309.678.919.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.578.688.48C19.138 20.161 22 16.418 22 12c0-5.523-4.477-10-10-10z" />
            </svg>
          </a>
          <a
            href="https://www.linkedin.com/in/nate-levy-b803412a9/"
            target="_blank"
            rel="noopener noreferrer"
            className="text-white/15 hover:text-white/50 transition-colors"
            aria-label="LinkedIn"
          >
            <svg width="15" height="15" viewBox="0 0 24 24" fill="currentColor">
              <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
            </svg>
          </a>
        </div>
      </div>
    </footer>
  );
}
