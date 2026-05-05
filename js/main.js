(function () {
  "use strict";

  var reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  var CONFIG = {
    downloadHref: "mailto:hello@founditapp.com?subject=Download%20Found%20It%20for%20Mac",
    proHref:      "mailto:hello@founditapp.com?subject=Upgrade%20to%20Found%20It%20Pro%20(%248%2Fmo)",
  };

  /* ─────────────────────────────────
     SCROLL PROGRESS + NAV SCROLL
     ───────────────────────────────── */
  function initScrollProgress() {
    var bar = document.getElementById("scroll-progress");
    var nav = document.getElementById("nav");

    function onScroll() {
      var h = document.documentElement.scrollHeight - window.innerHeight;
      if (bar) bar.style.width = (h > 0 ? Math.min((window.scrollY / h) * 100, 100) : 0) + "%";
      if (nav) nav.classList.toggle("is-scrolled", window.scrollY > 20);
      updateNavActive();
    }
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);
    onScroll();
  }

  function updateNavActive() {
    var ids = ["features", "how", "privacy", "pricing"];
    var threshold = window.innerHeight * 0.38;
    var best = null, bestScore = -1e9;
    ids.forEach(function (id) {
      var el = document.getElementById(id);
      if (!el) return;
      var r = el.getBoundingClientRect();
      if (r.bottom < 80 || r.top > window.innerHeight) return;
      var mid = (r.top + r.bottom) / 2;
      var score = -Math.abs(mid - threshold) + (r.top <= threshold && r.bottom >= threshold ? 200 : 0);
      if (score > bestScore) { bestScore = score; best = id; }
    });
    document.querySelectorAll("a.nav-link[data-nav-target]").forEach(function (a) {
      a.classList.toggle("is-active", a.getAttribute("data-nav-target") === best);
    });
  }

  /* ─────────────────────────────────
     NAV DRAWER
     ───────────────────────────────── */
  function initNavDrawer() {
    var toggle = document.getElementById("navToggle");
    var drawer = document.getElementById("navDrawer");
    if (!toggle || !drawer) return;

    toggle.addEventListener("click", function () {
      var open = drawer.classList.toggle("is-open");
      toggle.setAttribute("aria-expanded", open ? "true" : "false");
    });
    drawer.querySelectorAll("a").forEach(function (a) {
      a.addEventListener("click", function () {
        drawer.classList.remove("is-open");
        toggle.setAttribute("aria-expanded", "false");
      });
    });
    document.addEventListener("click", function (e) {
      if (!drawer.contains(e.target) && e.target !== toggle && !toggle.contains(e.target)) {
        drawer.classList.remove("is-open");
        toggle.setAttribute("aria-expanded", "false");
      }
    });
  }

  /* ─────────────────────────────────
     HERO ENTRANCE ANIMATION
     ───────────────────────────────── */
  function initHeroAnimation() {
    var heading = document.getElementById("hero-heading");
    var sub     = document.querySelector(".hero__sub");
    var actions = document.querySelector(".hero__actions");
    var support = document.querySelector(".hero__support");
    var mockup  = document.querySelector(".mockup-wrap");

    if (reduceMotion) {
      if (sub)     sub.classList.add("is-on");
      if (actions) actions.classList.add("is-on");
      if (support) support.classList.add("is-on");
      if (mockup)  mockup.classList.add("is-on");
      return;
    }

    if (heading) {
      var nodes = Array.from(heading.childNodes);
      heading.innerHTML = "";
      nodes.forEach(function (node) {
        if (node.nodeType === Node.TEXT_NODE) {
          node.textContent.split(/(\s+)/).forEach(function (chunk) {
            if (!chunk.trim()) {
              heading.appendChild(document.createTextNode(chunk));
            } else {
              var sp = document.createElement("span");
              sp.className = "hero-word";
              sp.textContent = chunk;
              heading.appendChild(sp);
            }
          });
        } else {
          var clone = node.cloneNode(true);
          clone.classList.add("hero-word");
          heading.appendChild(clone);
        }
      });

      var words = heading.querySelectorAll(".hero-word");
      var base = 60, step = 60;
      words.forEach(function (w, i) {
        setTimeout(function () { w.classList.add("is-on"); }, base + i * step);
      });
      var tail = base + words.length * step;
      setTimeout(function () { if (sub)     sub.classList.add("is-on");     }, tail + 60);
      setTimeout(function () { if (actions) actions.classList.add("is-on"); }, tail + 140);
      setTimeout(function () { if (support) support.classList.add("is-on"); }, tail + 200);
      setTimeout(function () { if (mockup)  mockup.classList.add("is-on");  }, tail + 280);
    }
  }

  /* ─────────────────────────────────
     SCROLL REVEAL
     ───────────────────────────────── */
  function initReveal() {
    var els = document.querySelectorAll(".reveal-up, .stagger");
    if (!els.length) return;

    if (reduceMotion) {
      els.forEach(function (el) {
        el.classList.add("is-visible");
      });
      return;
    }

    var io = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (entry.isIntersecting) {
          entry.target.classList.add("is-visible");
          io.unobserve(entry.target);
        }
      });
    }, { threshold: 0.1, rootMargin: "0px 0px -4% 0px" });

    els.forEach(function (el) { io.observe(el); });
  }

  /* ─────────────────────────────────
     SEARCH DEMO
     ───────────────────────────────── */
  var DEMO_ITEMS = [
    {
      query:    "tax document from April",
      filename: "2024_Tax_Return_Summary.pdf",
      desc:     "Tax summary, receipts, and April filing notes",
      path:     "Documents / Finance",
      type:     "PDF",
      typeClass: "pdf"
    },
    {
      query:    "resume version with internship experience",
      filename: "Resume_Terry_Investment_Internship.docx",
      desc:     "Resume draft highlighting internship work and project experience",
      path:     "Documents / Applications",
      type:     "DOCX",
      typeClass: "docx"
    },
    {
      query:    "chemistry lab about titration",
      filename: "Conductometric_Titration_Lab.pdf",
      desc:     "Chemistry lab involving barium hydroxide, sulfuric acid, and conductivity",
      path:     "Documents / School / Chemistry",
      type:     "PDF",
      typeClass: "pdf"
    },
    {
      query:    "presentation I downloaded last week",
      filename: "Robotics_Workshop_Deck.key",
      desc:     "Workshop slides for Arduino robotics and student activities",
      path:     "Downloads",
      type:     "KEY",
      typeClass: "key"
    },
    {
      query:    "economics paper on immigration",
      filename: "Immigration_Economics_Draft.docx",
      desc:     "Draft about Chinese immigration, labor markets, and Canada",
      path:     "Documents / Writing",
      type:     "DOCX",
      typeClass: "docx"
    },
    {
      query:    "invoice from last summer",
      filename: "Invoice_July_Client.pdf",
      desc:     "Client invoice from July with payment details",
      path:     "Documents / Receipts",
      type:     "PDF",
      typeClass: "pdf"
    }
  ];

  function initSearchDemo() {
    var queryEl   = document.getElementById("demoQuery");
    var nameEl    = document.getElementById("demoFilename");
    var descEl    = document.getElementById("demoDesc");
    var pathEl    = document.getElementById("demoPath");
    var iconEl    = document.getElementById("demoIcon");
    var resultEl  = document.getElementById("demoResult");
    var dotsEl    = document.getElementById("demoDots");

    if (!queryEl || !nameEl) return;

    var current   = 0;
    var typingTimer = null;
    var cycleTimer  = null;
    var paused    = false;

    /* build dot indicators */
    if (dotsEl) {
      DEMO_ITEMS.forEach(function (_, i) {
        var d = document.createElement("button");
        d.className = "demo-dot" + (i === 0 ? " is-active" : "");
        d.setAttribute("aria-label", "Query " + (i + 1));
        d.addEventListener("click", function () {
          clearTimeout(typingTimer);
          clearTimeout(cycleTimer);
          current = i;
          showItem(current, true);
        });
        dotsEl.appendChild(d);
      });
    }

    function updateDots(idx) {
      if (!dotsEl) return;
      dotsEl.querySelectorAll(".demo-dot").forEach(function (d, i) {
        d.classList.toggle("is-active", i === idx);
      });
    }

    function setResult(item) {
      if (nameEl) nameEl.textContent = item.filename;
      if (descEl) descEl.textContent = item.desc;
      if (pathEl) pathEl.textContent = item.path;
      if (iconEl) {
        iconEl.textContent = item.type;
        iconEl.className = "demo-result-icon demo-result-icon--" + item.typeClass;
      }
    }

    function showItem(idx, immediate) {
      var item = DEMO_ITEMS[idx];
      updateDots(idx);

      if (reduceMotion || immediate) {
        queryEl.textContent = item.query;
        if (resultEl) resultEl.classList.remove("is-fading");
        setResult(item);
        cycleTimer = setTimeout(function () {
          current = (idx + 1) % DEMO_ITEMS.length;
          showItem(current, false);
        }, 3000);
        return;
      }

      /* fade result out */
      if (resultEl) resultEl.classList.add("is-fading");

      setTimeout(function () {
        setResult(item);
        /* type the query */
        queryEl.textContent = "";
        var chars = item.query.split("");
        var ci = 0;

        function typeChar() {
          if (ci < chars.length) {
            queryEl.textContent += chars[ci++];
            typingTimer = setTimeout(typeChar, 28 + Math.random() * 18);
          } else {
            /* show result */
            if (resultEl) resultEl.classList.remove("is-fading");
            /* schedule next */
            cycleTimer = setTimeout(function () {
              current = (idx + 1) % DEMO_ITEMS.length;
              showItem(current, false);
            }, 2800);
          }
        }
        typeChar();
      }, reduceMotion ? 0 : 280);
    }

    /* start after a short delay so hero animation is out of the way */
    cycleTimer = setTimeout(function () {
      showItem(0, false);
    }, 1200);
  }

  /* ─────────────────────────────────
     FAQ ACCORDION KEYBOARD
     ───────────────────────────────── */
  function initFAQ() {
    /* <details>/<summary> handles open/close natively.
       We just manage aria-expanded for screen readers. */
    document.querySelectorAll(".faq-item").forEach(function (details) {
      var summary = details.querySelector("summary");
      if (!summary) return;
      summary.setAttribute("aria-expanded", details.open ? "true" : "false");
      details.addEventListener("toggle", function () {
        summary.setAttribute("aria-expanded", details.open ? "true" : "false");
      });
    });
  }

  /* ─────────────────────────────────
     WIRE CONFIG LINKS
     ───────────────────────────────── */
  function applyConfigLinks() {
    document.querySelectorAll("[data-download]").forEach(function (a) {
      if (!a.getAttribute("href") || a.getAttribute("href") === "#") {
        a.setAttribute("href", CONFIG.downloadHref);
      }
    });
    document.querySelectorAll("[data-pro]").forEach(function (a) {
      a.setAttribute("href", CONFIG.proHref);
    });
  }

  /* ─────────────────────────────────
     INIT
     ───────────────────────────────── */
  document.addEventListener("DOMContentLoaded", function () {
    applyConfigLinks();
    initScrollProgress();
    initNavDrawer();
    initReveal();
    initHeroAnimation();
    initSearchDemo();
    initFAQ();
  });

})();
