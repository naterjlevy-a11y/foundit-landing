(function () {
  "use strict";

  var reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  var CONFIG = {
    downloadMailto:          "mailto:hello@founditapp.com?subject=Download%20Found%20It%20for%20Mac",
    proCheckoutHref:         "mailto:hello@founditapp.com?subject=Upgrade%20to%20Found%20It%20Pro%20(%248%2Fmo)",
    typeCharMs:              40,
    deleteCharMs:            26,
    pauseAfterResultsMs:     2400,
    pauseBetweenQueriesMs:   700,
    heroDemoDelayMs:         900,
  };

  var DEMO_QUERIES = [
    {
      query: "tax documents 2024",
      results: [
        ["Tax_Return_2024.pdf",       "~/Documents/Finance",      "Matched: tax + 2024"],
        ["T4_2024.pdf",               "~/Documents/Finance",      "Matched: tax form + 2024"],
        ["Receipt_Summary_2024.xlsx", "~/Documents/Finance",      "Matched: finance + 2024"],
      ],
      breakdown: [
        { k: "Topic", v: "tax" },
        { k: "Year",  v: "2024" },
        { k: "Type",  v: "documents" },
      ],
      why: "Results rank by how strongly tax + 2024 appear in content and metadata.",
    },
    {
      query: "math homework from last week",
      results: [
        ["Calculus Homework 7.pdf",     "~/Documents/School/Math", "Matched: math + homework + last week"],
        ["Algebra Worksheet.pdf",       "~/Downloads",             "Matched: homework + math"],
        ["Unit 4 Practice Problems.pdf","~/Documents/School",      "Matched: assignment + math"],
      ],
      breakdown: [
        { k: "Required", v: "math" },
        { k: "Required", v: "homework" },
        { k: "Time",     v: "last week" },
        { k: "Type",     v: "assignment" },
      ],
      why: "Multi-part intent splits into signals, fused so vague queries still surface the right PDFs.",
    },
    {
      query: "physics notes about circuits",
      results: [
        ["Physics Notes - Circuits.pdf", "~/Documents/School/Physics", "Matched: physics + circuits"],
        ["Ohm's Law Lab.docx",           "~/Documents/Labs",           "Matched: circuits + lab"],
        ["Electricity Review.pdf",       "~/Documents/School",         "Matched: related physics topic"],
      ],
      breakdown: [
        { k: "Subject", v: "physics" },
        { k: "Topic",   v: "circuits" },
        { k: "Type",    v: "notes" },
      ],
      why: "Topic and subject anchors narrow long directories down to the relevant files.",
    },
    {
      query: "old resume PDF",
      results: [
        ["Resume_2024.pdf",  "~/Documents/Career", "Matched: resume + PDF"],
        ["Resume_Draft.pdf", "~/Desktop",          "Matched: resume + draft"],
        ["CV_Old.pdf",       "~/Documents/Career", "Matched: old + career document"],
      ],
      breakdown: [
        { k: "Document", v: "resume" },
        { k: "Format",   v: "PDF" },
        { k: "Hint",     v: "old" },
      ],
      why: "Even messy Desktop drafts stay discoverable when filenames refuse to cooperate.",
    },
    {
      query: "screenshots with app designs",
      results: [
        ["app_design_mockup.png",      "~/Desktop/Design",       "Matched: screenshot + app design"],
        ["blue_icon_exploration.png",  "~/Pictures/Screenshots", "Matched: visual app UI"],
        ["landing_page_concept.png",   "~/Desktop",              "Matched: design screenshot"],
      ],
      breakdown: [
        { k: "Type",  v: "screenshots" },
        { k: "Topic", v: "app designs" },
      ],
      why: "Visual files become searchable by what is on screen, not camera-roll filenames.",
    },
  ];

  function extIcon(name) {
    var lower = name.toLowerCase();
    if (lower.endsWith(".pdf"))                              return "PDF";
    if (lower.endsWith(".png") || lower.endsWith(".jpg"))   return "IMG";
    if (lower.endsWith(".docx") || lower.endsWith(".doc"))  return "DOC";
    if (lower.endsWith(".xlsx") || lower.endsWith(".csv"))  return "XLS";
    if (lower.endsWith(".md"))                              return "MD";
    return "FILE";
  }

  function sleep(ms) { return new Promise(function (r) { setTimeout(r, ms); }); }

  function escapeHtml(s) {
    var d = document.createElement("div");
    d.textContent = s;
    return d.innerHTML;
  }

  /* ── TypewriterDemo ── */
  function TypewriterDemo(options) {
    this.queryEl   = options.queryEl;
    this.resultsEl = options.resultsEl;
    this.countEl   = options.countEl || null;
    this.queries   = options.queries;
    this.onBlock      = options.onBlock      || function () {};
    this.onBreakdown  = options.onBreakdown  || function () {};
    this.onWhy        = options.onWhy        || function () {};
    this.idx           = 0;
    this.cancelled     = false;
    this.memoryMode    = false;
    this.skipInitialDelay = !!options.skipInitialDelay;
  }

  TypewriterDemo.prototype.clearResults = function () {
    if (this.resultsEl) this.resultsEl.innerHTML = "";
    if (this.countEl)   this.countEl.textContent = "Searching…";
  };

  TypewriterDemo.prototype.typeText = async function (text) {
    if (!this.queryEl) return;
    this.queryEl.textContent = "";
    for (var i = 0; i < text.length; i++) {
      if (this.cancelled) return;
      this.queryEl.textContent += text.charAt(i);
      await sleep(CONFIG.typeCharMs);
    }
  };

  TypewriterDemo.prototype.deleteText = async function () {
    if (!this.queryEl) return;
    var t = this.queryEl.textContent;
    while (t.length > 0) {
      if (this.cancelled) return;
      t = t.slice(0, -1);
      this.queryEl.textContent = t;
      await sleep(CONFIG.deleteCharMs);
    }
  };

  TypewriterDemo.prototype.showResults = async function (results, useMemoryClass) {
    if (!this.resultsEl) return;
    this.resultsEl.innerHTML = "";
    var rowClass = useMemoryClass ? "memory-row" : "hero-result-row";

    var buildInner = useMemoryClass
      ? function (name, path, why) {
          return '<div class="hero-file-ico">' + extIcon(name) + '</div>'
            + '<div>'
            + '<div style="font-size:13px;font-weight:600;color:#fff">'  + escapeHtml(name) + '</div>'
            + '<div style="font-size:11px;color:rgba(255,255,255,.3);margin-top:3px;font-family:var(--mono,monospace)">' + escapeHtml(path) + '</div>'
            + '<div style="font-size:10px;color:rgba(147,197,253,.85);margin-top:5px;font-family:var(--mono,monospace)">' + escapeHtml(why) + '</div>'
            + '</div>';
        }
      : function (name, path, why) {
          return '<div class="hero-file-ico">' + extIcon(name) + '</div>'
            + '<div class="hero-result-main">'
            + '<div class="hero-result-name">' + escapeHtml(name) + '</div>'
            + '<div class="hero-result-path">' + escapeHtml(path) + '</div>'
            + '<div class="hero-result-why">'  + escapeHtml(why)  + '</div>'
            + '</div>';
        };

    for (var j = 0; j < results.length; j++) {
      if (this.cancelled) return;
      var row = document.createElement("div");
      row.className = rowClass;
      row.innerHTML = buildInner(results[j][0], results[j][1], results[j][2]);
      this.resultsEl.appendChild(row);

      (function (el, idx, countEl, total) {
        requestAnimationFrame(function () {
          el.classList.add(useMemoryClass ? "is-on" : "is-visible");
          if (!useMemoryClass) {
            var rows = el.parentNode.querySelectorAll(".hero-result-row");
            rows.forEach(function (r) { r.classList.remove("is-active"); });
            el.classList.add("is-active");
            setTimeout(function () { el.classList.add("is-show-why"); }, 200 + idx * 80);
            if (countEl) countEl.textContent = (idx + 1) + " of " + total + " results";
          }
        });
      })(row, j, this.countEl, results.length);

      await sleep(330);
    }

    if (this.countEl && !useMemoryClass) {
      this.countEl.textContent = results.length + " files found";
    }
    await sleep(CONFIG.pauseAfterResultsMs);
  };

  TypewriterDemo.prototype.loop = async function () {
    if (reduceMotion || !this.queries.length) return;
    this.running = true;
    var first = true;
    while (!this.cancelled) {
      if (first && !this.skipInitialDelay) await sleep(CONFIG.heroDemoDelayMs);
      first = false;
      var block = this.queries[this.idx % this.queries.length];
      this.idx++;
      this.onBlock(block);
      this.onBreakdown(block.breakdown || [], block);
      this.onWhy(block.why || "", block);
      this.clearResults();
      await this.typeText(block.query);
      this.clearResults();
      await this.showResults(block.results, !!this.memoryMode);
      await this.deleteText();
      await sleep(CONFIG.pauseBetweenQueriesMs);
    }
  };

  TypewriterDemo.prototype.start = function () {
    if (reduceMotion) {
      if (this.queryEl && this.queries[0]) this.queryEl.textContent = this.queries[0].query;
      return;
    }
    this.cancelled = false;
    this.loop().catch(function () {});
  };

  TypewriterDemo.prototype.stop = function () { this.cancelled = true; };

  /* ── Scroll progress + nav scroll class ── */
  function initScrollProgress() {
    var bar = document.getElementById("scroll-progress");
    function onScroll() {
      var h = document.documentElement.scrollHeight - window.innerHeight;
      if (bar) bar.style.width = (h > 0 ? Math.min((window.scrollY / h) * 100, 100) : 0) + "%";
      var nav = document.getElementById("nav");
      if (nav) nav.classList.toggle("is-scrolled", window.scrollY > 24);
      updateNavActive();
    }
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);
    onScroll();
  }

  function updateNavActive() {
    var ids = ["features", "how-it-works", "pricing", "founder", "download"];
    var y = window.innerHeight * 0.32;
    var best = null, bestScore = -1e9;
    ids.forEach(function (id) {
      var el = document.getElementById(id);
      if (!el) return;
      var r = el.getBoundingClientRect();
      if (r.bottom < 80 || r.top > window.innerHeight) return;
      var mid = (r.top + r.bottom) / 2;
      var score = -Math.abs(mid - y) + (r.top <= y && r.bottom >= y + 40 ? 200 : 0);
      if (score > bestScore) { bestScore = score; best = id; }
    });
    document.querySelectorAll("a.nav-link[data-nav-target]").forEach(function (a) {
      a.classList.toggle("is-active", a.getAttribute("data-nav-target") === best);
    });
  }

  /* ── Nav drawer ── */
  function initNavDrawer() {
    var nt = document.getElementById("navToggle");
    var nd = document.getElementById("navDrawer");
    if (!nt || !nd) return;
    nt.addEventListener("click", function () {
      var open = nd.classList.toggle("is-open");
      nt.setAttribute("aria-expanded", open ? "true" : "false");
    });
    nd.querySelectorAll("a").forEach(function (a) {
      a.addEventListener("click", function () {
        nd.classList.remove("is-open");
        nt.setAttribute("aria-expanded", "false");
      });
    });
    document.addEventListener("click", function (e) {
      if (!nd.contains(e.target) && e.target !== nt) {
        nd.classList.remove("is-open");
        nt.setAttribute("aria-expanded", "false");
      }
    });
  }

  /* ── Intersection observer reveal ── */
  function initRevealObserver() {
    var els = document.querySelectorAll(".reveal, .reveal-up, .reveal-left, .reveal-right, .stagger");
    if (!els.length) return;
    var io = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (entry.isIntersecting) {
          entry.target.classList.add("is-visible");
          io.unobserve(entry.target);
        }
      });
    }, { threshold: 0.14, rootMargin: "0px 0px -5% 0px" });
    els.forEach(function (el) { io.observe(el); });
  }

  /* ── Hero title word-by-word reveal ── */
  function splitHeroTitle() {
    var h = document.getElementById("hero-heading");
    if (!h) return;

    var sub   = document.querySelector(".hero__sub");
    var act   = document.querySelector(".hero__actions");
    var wrap  = document.querySelector(".hero-window-wrap");

    if (reduceMotion) {
      if (sub)  sub.classList.add("is-on");
      if (act)  act.classList.add("is-on");
      if (wrap) wrap.classList.add("is-on");
      return;
    }

    /* Wrap plain text nodes in word spans (preserve gradient span intact) */
    var children = Array.from(h.childNodes);
    h.innerHTML = "";
    children.forEach(function (node) {
      if (node.nodeType === Node.TEXT_NODE) {
        var words = node.textContent.split(/(\s+)/);
        words.forEach(function (w) {
          if (w.trim().length === 0) {
            h.appendChild(document.createTextNode(w));
          } else {
            var sp = document.createElement("span");
            sp.className = "hero-word";
            sp.textContent = w;
            h.appendChild(sp);
          }
        });
      } else {
        /* Keep gradient span; wrap its text in hero-words too */
        var gspan = node.cloneNode(true);
        gspan.classList.add("hero-word");
        h.appendChild(gspan);
      }
    });

    var spans = h.querySelectorAll(".hero-word");
    var base  = 80;
    var step  = 60;
    spans.forEach(function (sp, i) {
      setTimeout(function () { sp.classList.add("is-on"); }, base + i * step);
    });
    var tail = base + spans.length * step;
    setTimeout(function () { if (sub)  sub.classList.add("is-on"); }, tail + 100);
    setTimeout(function () { if (act)  act.classList.add("is-on"); }, tail + 220);
    setTimeout(function () { if (wrap) wrap.classList.add("is-on"); }, tail + 320);
  }

  /* ── Hero demo ── */
  function initHeroDemo() {
    var qEl    = document.getElementById("heroTypeQuery");
    var rEl    = document.getElementById("heroResults");
    var cEl    = document.getElementById("heroResultsCount");
    if (!qEl || !rEl) return;
    var demo = new TypewriterDemo({
      queryEl:   qEl,
      resultsEl: rEl,
      countEl:   cEl,
      queries:   DEMO_QUERIES,
    });
    demo.start();
  }

  /* ── Memory section demo ── */
  function syncMemoryTopHit(block) {
    var top = block.results && block.results[0];
    var n = document.getElementById("memoryTopName");
    var p = document.getElementById("memoryTopPath");
    var m = document.getElementById("memoryTopMatch");
    if (!top) return;
    if (n) n.textContent = top[0];
    if (p) p.textContent = top[1];
    if (m) m.textContent = top[2];
  }

  function initMemoryDemo() {
    var sec    = document.getElementById("how-it-works");
    var qEl    = document.getElementById("memoryTypeQuery");
    var rEl    = document.getElementById("memoryResults");
    var pillEl = document.getElementById("memoryPills");
    var whyEl  = document.getElementById("memoryWhyText");
    if (!qEl || !rEl) return;

    var demo = new TypewriterDemo({
      skipInitialDelay: true,
      queryEl:   qEl,
      resultsEl: rEl,
      queries:   DEMO_QUERIES,
      onBlock:     function (block) { syncMemoryTopHit(block); },
      onBreakdown: function (pills) {
        if (!pillEl) return;
        pillEl.innerHTML = "";
        pills.forEach(function (p) {
          var span = document.createElement("span");
          span.className = "memory-pill";
          span.innerHTML = "<strong>" + escapeHtml(p.k) + ":</strong> " + escapeHtml(p.v);
          pillEl.appendChild(span);
        });
      },
      onWhy: function (text) { if (whyEl) whyEl.textContent = text; },
    });
    demo.memoryMode = true;

    if (reduceMotion) {
      var b0 = DEMO_QUERIES[0];
      if (b0) {
        qEl.textContent = b0.query;
        if (whyEl) whyEl.textContent = b0.why || "";
        if (pillEl && b0.breakdown) {
          pillEl.innerHTML = "";
          b0.breakdown.forEach(function (p) {
            var sp = document.createElement("span");
            sp.className = "memory-pill";
            sp.innerHTML = "<strong>" + escapeHtml(p.k) + ":</strong> " + escapeHtml(p.v);
            pillEl.appendChild(sp);
          });
        }
        syncMemoryTopHit(b0);
      }
      return;
    }

    if (!sec) { demo.start(); return; }
    var started = false;
    var io = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (entry.isIntersecting && !started) {
          started = true;
          demo.start();
          io.disconnect();
        }
      });
    }, { threshold: 0.12, rootMargin: "0px 0px -8% 0px" });
    io.observe(sec);
  }

  /* ── Showcase parallax on scroll ── */
  function initLooksParallax() {
    var stage = document.querySelector(".showcase-stage");
    if (!stage || reduceMotion) return;
    var front = stage.querySelector(".showcase-window--front");
    if (!front) return;
    function update() {
      var r  = stage.getBoundingClientRect();
      var p  = (r.top + r.height / 2 - window.innerHeight / 2) / window.innerHeight;
      var offset = Math.max(-12, Math.min(12, p * 10));
      front.style.setProperty("--showcase-y", offset + "px");
    }
    window.addEventListener("scroll", update, { passive: true });
    update();
  }

  /* ── Wire up config links ── */
  function applyConfigLinks() {
    document.querySelectorAll("[data-pro-link]").forEach(function (a) {
      a.setAttribute("href", CONFIG.proCheckoutHref);
    });
  }

  /* ── Init ── */
  document.addEventListener("DOMContentLoaded", function () {
    applyConfigLinks();
    initScrollProgress();
    initNavDrawer();
    initRevealObserver();
    splitHeroTitle();
    initLooksParallax();
    if (!reduceMotion) {
      setTimeout(initHeroDemo, 50);
      initMemoryDemo();
    } else {
      var hq = document.getElementById("heroTypeQuery");
      if (hq && DEMO_QUERIES[0]) hq.textContent = DEMO_QUERIES[0].query;
      initMemoryDemo();
    }
  });
})();
