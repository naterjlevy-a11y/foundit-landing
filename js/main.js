(function () {
  "use strict";

  var reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  /**
   * Replace `proCheckoutHref` with your Stripe Payment Link URL (same link as in-app Pro checkout).
   * Example: https://buy.stripe.com/...
   */
  var CONFIG = {
    downloadMailto: "mailto:hello@founditapp.com?subject=Download%20Found%20It%20for%20Mac",
    proCheckoutHref:
      "mailto:hello@founditapp.com?subject=Upgrade%20to%20Found%20It%20Pro%20%28%248%2Fmo%29",
    typeCharMs: 42,
    deleteCharMs: 28,
    pauseAfterResultsMs: 2200,
    pauseBetweenQueriesMs: 600,
    heroDemoDelayMs: 800,
  };

  var DEMO_QUERIES = [
    {
      query: "tax documents 2024",
      results: [
        ["Tax_Return_2024.pdf", "~/Documents/Finance", "Matched: tax + 2024"],
        ["T4_2024.pdf", "~/Documents/Finance", "Matched: tax form + 2024"],
        ["Receipt_Summary_2024.xlsx", "~/Documents/Finance", "Matched: finance + 2024"],
      ],
      breakdown: [
        { k: "Topic", v: "tax" },
        { k: "Year", v: "2024" },
        { k: "Type", v: "documents" },
      ],
      why: "Results rank by how strongly tax + 2024 appear in content and metadata.",
    },
    {
      query: "math homework from last week",
      results: [
        ["Calculus Homework 7.pdf", "~/Documents/School/Math", "Matched: math + homework + last week"],
        ["Algebra Worksheet.pdf", "~/Downloads", "Matched: homework + math"],
        ["Unit 4 Practice Problems.pdf", "~/Documents/School", "Matched: assignment + math"],
      ],
      breakdown: [
        { k: "Required", v: "math" },
        { k: "Required", v: "homework" },
        { k: "Time", v: "last week" },
        { k: "Type", v: "assignment" },
      ],
      why: "Multi-part intent is split into signals, then fused so vague homework queries still surface the right PDFs.",
    },
    {
      query: "physics notes about circuits",
      results: [
        ["Physics Notes - Circuits.pdf", "~/Documents/School/Physics", "Matched: physics + circuits"],
        ["Ohm's Law Lab.docx", "~/Documents/Labs", "Matched: circuits + lab"],
        ["Electricity Review.pdf", "~/Documents/School", "Matched: related physics topic"],
      ],
      breakdown: [
        { k: "Subject", v: "physics" },
        { k: "Topic", v: "circuits" },
        { k: "Type", v: "notes" },
      ],
      why: "Topic and subject anchors narrow long directories down to the lab and lecture files you actually meant.",
    },
    {
      query: "old resume PDF",
      results: [
        ["Resume_2024.pdf", "~/Documents/Career", "Matched: resume + PDF"],
        ["Resume_Draft.pdf", "~/Desktop", "Matched: resume + draft"],
        ["CV_Old.pdf", "~/Documents/Career", "Matched: old + career document"],
      ],
      breakdown: [
        { k: "Document", v: "resume" },
        { k: "Format", v: "PDF" },
        { k: "Hint", v: "old" },
      ],
      why: "Even messy Desktop drafts stay discoverable when filenames refuse to cooperate.",
    },
    {
      query: "screenshots with app designs",
      results: [
        ["app_design_mockup.png", "~/Desktop/Design", "Matched: screenshot + app design"],
        ["blue_icon_exploration.png", "~/Pictures/Screenshots", "Matched: visual app UI"],
        ["landing_page_concept.png", "~/Desktop", "Matched: design screenshot"],
      ],
      breakdown: [
        { k: "Type", v: "screenshots" },
        { k: "Topic", v: "app designs" },
      ],
      why: "Visual files become searchable by what is on screen, not camera-roll filenames.",
    },
  ];

  function extIcon(name) {
    var lower = name.toLowerCase();
    if (lower.endsWith(".pdf")) return "PDF";
    if (lower.endsWith(".png") || lower.endsWith(".jpg") || lower.endsWith(".jpeg")) return "IMG";
    if (lower.endsWith(".docx") || lower.endsWith(".doc")) return "DOC";
    if (lower.endsWith(".xlsx") || lower.endsWith(".csv")) return "XLS";
    if (lower.endsWith(".md")) return "MD";
    if (lower.endsWith(".zip")) return "ZIP";
    return "FILE";
  }

  function sleep(ms) {
    return new Promise(function (resolve) {
      setTimeout(resolve, ms);
    });
  }

  function TypewriterDemo(options) {
    this.queryEl = options.queryEl;
    this.resultsEl = options.resultsEl;
    this.queries = options.queries;
    this.onBlock = options.onBlock || function () {};
    this.onBreakdown = options.onBreakdown || function () {};
    this.onWhy = options.onWhy || function () {};
    this.idx = 0;
    this.running = false;
    this.cancelled = false;
    this.skipInitialDelay = !!options.skipInitialDelay;
  }

  TypewriterDemo.prototype.clearResults = function () {
    if (!this.resultsEl) return;
    this.resultsEl.innerHTML = "";
  };

  TypewriterDemo.prototype.renderSkeletonRows = function (count) {
    if (!this.resultsEl) return;
    this.resultsEl.innerHTML = "";
    for (var i = 0; i < count; i++) {
      var row = document.createElement("div");
      row.className = "hero-result-row is-skel";
      row.innerHTML =
        '<div class="hero-file-ico">···</div><div class="hero-result-main"><div class="hero-result-name" style="opacity:.35">Indexing results…</div><div class="hero-result-path">&nbsp;</div></div>';
      this.resultsEl.appendChild(row);
    }
  };

  TypewriterDemo.prototype.renderMemorySkeleton = function (container, count) {
    if (!container) return;
    container.innerHTML = "";
    for (var i = 0; i < count; i++) {
      var row = document.createElement("div");
      row.className = "memory-row";
      row.innerHTML =
        '<div class="hero-file-ico">···</div><div><div style="font-size:12px;font-weight:600;color:rgba(255,255,255,.35)">…</div><div style="font-size:10px;color:rgba(255,255,255,.2);margin-top:4px">…</div></div>';
      container.appendChild(row);
    }
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
    var inner = useMemoryClass
      ? function (name, path, why) {
          return (
            '<div class="hero-file-ico">' +
            extIcon(name) +
            '</div><div><div style="font-size:13px;font-weight:600;color:#fff">' +
            escapeHtml(name) +
            '</div><div style="font-size:11px;color:rgba(255,255,255,.35);margin-top:4px;font-family:var(--mono,monospace)">' +
            escapeHtml(path) +
            '</div><div style="font-size:10px;color:rgba(147,197,253,.85);margin-top:6px;font-family:var(--mono,monospace)">' +
            escapeHtml(why) +
            "</div></div>"
          );
        }
      : function (name, path, why) {
          return (
            '<div class="hero-file-ico">' +
            extIcon(name) +
            '</div><div class="hero-result-main"><div class="hero-result-name">' +
            escapeHtml(name) +
            '</div><div class="hero-result-path">' +
            escapeHtml(path) +
            '</div><div class="hero-result-why">' +
            escapeHtml(why) +
            "</div></div>"
          );
        };

    for (var j = 0; j < results.length; j++) {
      if (this.cancelled) return;
      var row = document.createElement("div");
      row.className = rowClass;
      row.innerHTML = inner(results[j][0], results[j][1], results[j][2]);
      this.resultsEl.appendChild(row);
      requestAnimationFrame(function (el, jj) {
        return function () {
          el.classList.add(useMemoryClass ? "is-on" : "is-visible");
          if (!useMemoryClass) {
            var rows = el.parentNode.querySelectorAll(".hero-result-row");
            rows.forEach(function (r) {
              r.classList.remove("is-active");
            });
            el.classList.add("is-active");
            setTimeout(function () {
              el.classList.add("is-show-why");
            }, 180 + jj * 90);
          }
        };
      })(row, j);
      await sleep(320);
    }
    await sleep(CONFIG.pauseAfterResultsMs);
  };

  function escapeHtml(s) {
    var d = document.createElement("div");
    d.textContent = s;
    return d.innerHTML;
  }

  TypewriterDemo.prototype.loop = async function () {
    if (reduceMotion || !this.queries.length) return;
    this.running = true;
    var first = true;
    while (!this.cancelled) {
      if (first && !this.skipInitialDelay) {
        await sleep(CONFIG.heroDemoDelayMs);
      }
      first = false;
      var block = this.queries[this.idx % this.queries.length];
      this.idx++;
      this.onBlock(block);
      this.onBreakdown(block.breakdown || [], block);
      this.onWhy(block.why || "", block);
      this.clearResults();
      this.renderSkeletonRows(3);
      await this.typeText(block.query);
      this.clearResults();
      await this.showResults(block.results, !!this.memoryMode);
      await this.deleteText();
      await sleep(CONFIG.pauseBetweenQueriesMs);
    }
  };

  TypewriterDemo.prototype.start = function () {
    var self = this;
    if (reduceMotion) {
      if (this.queryEl && this.queries[0]) this.queryEl.textContent = this.queries[0].query;
      return;
    }
    this.cancelled = false;
    this.loop().catch(function () {});
  };

  TypewriterDemo.prototype.stop = function () {
    this.cancelled = true;
  };

  /* --- Pointer parallax for hero bg --- */
  function initParallaxPtr() {
    if (reduceMotion) return;
    var px = 0.5,
      py = 0.5,
      cx = 0.5,
      cy = 0.5;
    document.addEventListener(
      "mousemove",
      function (e) {
        px = e.clientX / window.innerWidth;
        py = e.clientY / window.innerHeight;
      },
      { passive: true }
    );
    function tick() {
      cx += (px - cx) * 0.06;
      cy += (py - cy) * 0.06;
      document.documentElement.style.setProperty("--ptr-x", cx);
      document.documentElement.style.setProperty("--ptr-y", cy);
      requestAnimationFrame(tick);
    }
    requestAnimationFrame(tick);
  }

  function initScrollProgress() {
    var bar = document.getElementById("scroll-progress");
    function onScroll() {
      var h = document.documentElement.scrollHeight - window.innerHeight;
      var pct = h > 0 ? (window.scrollY / h) * 100 : 0;
      if (bar) bar.style.width = Math.min(pct, 100) + "%";
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
    var best = null,
      bestScore = -1e9;
    ids.forEach(function (id) {
      var el = document.getElementById(id);
      if (!el) return;
      var r = el.getBoundingClientRect();
      if (r.bottom < 80 || r.top > window.innerHeight) return;
      var mid = (r.top + r.bottom) / 2;
      var dist = Math.abs(mid - y);
      var score = -dist + (r.top <= y && r.bottom >= y + 40 ? 200 : 0);
      if (score > bestScore) {
        bestScore = score;
        best = id;
      }
    });
    document.querySelectorAll("a.nav-link[data-nav-target]").forEach(function (a) {
      a.classList.toggle("is-active", a.getAttribute("data-nav-target") === best);
    });
  }

  function initNavDrawer() {
    var nt = document.getElementById("navToggle"),
      nd = document.getElementById("navDrawer");
    if (nt && nd) {
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
    }
  }

  function initRevealObserver() {
    var els = document.querySelectorAll(".reveal, .reveal-up, .reveal-left, .reveal-right, .stagger");
    if (!els.length) return;
    var io = new IntersectionObserver(
      function (entries) {
        entries.forEach(function (entry) {
          if (entry.isIntersecting) {
            entry.target.classList.add("is-visible");
            io.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.18, rootMargin: "0px 0px -5% 0px" }
    );
    els.forEach(function (el) {
      io.observe(el);
    });
  }

  function splitHeroTitle() {
    var h = document.getElementById("hero-heading");
    if (!h) return;
    if (reduceMotion) {
      var sub = document.querySelector(".hero__sub");
      if (sub) sub.classList.add("is-on");
      var act = document.querySelector(".hero__actions");
      if (act) act.classList.add("is-on");
      var stage = document.querySelector(".hero-demo-stage");
      if (stage) stage.classList.add("is-on");
      return;
    }
    var text = h.textContent.trim();
    var words = text.split(/\s+/);
    h.innerHTML = words
      .map(function (w) {
        return '<span class="hero-word">' + escapeHtml(w) + "</span>";
      })
      .join(" ");
    var spans = h.querySelectorAll(".hero-word");
    spans.forEach(function (sp, i) {
      setTimeout(function () {
        sp.classList.add("is-on");
      }, 80 + i * 65);
    });
    setTimeout(function () {
      var sub = document.querySelector(".hero__sub");
      if (sub) sub.classList.add("is-on");
    }, 80 + spans.length * 65 + 120);
    setTimeout(function () {
      var act = document.querySelector(".hero__actions");
      if (act) act.classList.add("is-on");
    }, 80 + spans.length * 65 + 220);
    setTimeout(function () {
      var stage = document.querySelector(".hero-demo-stage");
      if (stage) stage.classList.add("is-on");
    }, 80 + spans.length * 65 + 280);
  }

  function initHeroDemo() {
    var qEl = document.getElementById("heroTypeQuery");
    var rEl = document.getElementById("heroResults");
    if (!qEl || !rEl) return;
    var demo = new TypewriterDemo({
      queryEl: qEl,
      resultsEl: rEl,
      queries: DEMO_QUERIES,
      onBreakdown: function () {},
      onWhy: function () {},
    });
    demo.start();
  }

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
    var sec = document.getElementById("how-it-works");
    var qEl = document.getElementById("memoryTypeQuery");
    var rEl = document.getElementById("memoryResults");
    var pillsEl = document.getElementById("memoryPills");
    var whyEl = document.getElementById("memoryWhyText");
    if (!qEl || !rEl) return;
    var demo = new TypewriterDemo({
      skipInitialDelay: true,
      queryEl: qEl,
      resultsEl: rEl,
      queries: DEMO_QUERIES,
      onBlock: function (block) {
        syncMemoryTopHit(block);
      },
      onBreakdown: function (pills) {
        if (!pillsEl) return;
        pillsEl.innerHTML = "";
        pills.forEach(function (p) {
          var span = document.createElement("span");
          span.className = "memory-pill";
          span.innerHTML = "<strong>" + escapeHtml(p.k) + ":</strong> " + escapeHtml(p.v);
          pillsEl.appendChild(span);
        });
      },
      onWhy: function (text) {
        if (whyEl) whyEl.textContent = text;
      },
    });
    demo.memoryMode = true;
    if (reduceMotion) {
      var b0 = DEMO_QUERIES[0];
      if (b0) {
        qEl.textContent = b0.query;
        if (whyEl) whyEl.textContent = b0.why || "";
        if (pillsEl && b0.breakdown) {
          pillsEl.innerHTML = "";
          b0.breakdown.forEach(function (p) {
            var span = document.createElement("span");
            span.className = "memory-pill";
            span.innerHTML = "<strong>" + escapeHtml(p.k) + ":</strong> " + escapeHtml(p.v);
            pillsEl.appendChild(span);
          });
        }
        syncMemoryTopHit(b0);
      }
      return;
    }
    if (!sec) {
      demo.start();
      return;
    }
    var started = false;
    var io = new IntersectionObserver(
      function (entries) {
        entries.forEach(function (entry) {
          if (entry.isIntersecting && !started) {
            started = true;
            demo.start();
            io.disconnect();
          }
        });
      },
      { threshold: 0.14, rootMargin: "0px 0px -8% 0px" }
    );
    io.observe(sec);
  }

  function initLooksParallax() {
    var stage = document.querySelector(".showcase-stage");
    if (!stage || reduceMotion) return;
    var front = stage.querySelector(".showcase-window--front");
    if (!front) return;
    function update() {
      var r = stage.getBoundingClientRect();
      var vh = window.innerHeight;
      var p = (r.top + r.height / 2 - vh / 2) / vh;
      var offset = Math.max(-12, Math.min(12, p * 10));
      front.style.setProperty("--showcase-y", offset + "px");
    }
    window.addEventListener("scroll", update, { passive: true });
    update();
  }

  function applyConfigLinks() {
    document.querySelectorAll("[data-pro-link]").forEach(function (a) {
      a.setAttribute("href", CONFIG.proCheckoutHref);
    });
  }

  document.addEventListener("DOMContentLoaded", function () {
    applyConfigLinks();
    initParallaxPtr();
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
