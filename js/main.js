(function () {
  "use strict";

  var reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  var CONFIG = {
    downloadMailto:  "mailto:hello@founditapp.com?subject=Download%20Found%20It%20for%20Mac",
    proCheckoutHref: "mailto:hello@founditapp.com?subject=Upgrade%20to%20Found%20It%20Pro%20(%248%2Fmo)",
  };

  /* ── Scroll progress + nav scroll class ── */
  function initScrollProgress() {
    var bar = document.getElementById("scroll-progress");
    var nav = document.getElementById("nav");

    function onScroll() {
      var h = document.documentElement.scrollHeight - window.innerHeight;
      if (bar) bar.style.width = (h > 0 ? Math.min((window.scrollY / h) * 100, 100) : 0) + "%";
      if (nav) nav.classList.toggle("is-scrolled", window.scrollY > 24);
      updateNavActive();
    }
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);
    onScroll();
  }

  function updateNavActive() {
    var ids = ["manifesto", "features", "pricing", "download"];
    var y = window.innerHeight * 0.35;
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

  /* ── IntersectionObserver scroll reveal ── */
  function initRevealObserver() {
    var els = document.querySelectorAll(".reveal-up, .stagger");
    if (!els.length) return;
    var io = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (entry.isIntersecting) {
          entry.target.classList.add("is-visible");
          io.unobserve(entry.target);
        }
      });
    }, { threshold: 0.12, rootMargin: "0px 0px -5% 0px" });
    els.forEach(function (el) { io.observe(el); });
  }

  /* ── Hero title word-by-word reveal ── */
  function splitHeroTitle() {
    var h = document.getElementById("hero-heading");
    if (!h) return;

    var sub   = document.querySelector(".hero__sub");
    var act   = document.querySelector(".hero__actions");
    var chips = document.querySelector(".hero__chips");

    if (reduceMotion) {
      if (sub)   sub.classList.add("is-on");
      if (act)   act.classList.add("is-on");
      if (chips) chips.classList.add("is-on");
      return;
    }

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
        var gspan = node.cloneNode(true);
        gspan.classList.add("hero-word");
        h.appendChild(gspan);
      }
    });

    var spans = h.querySelectorAll(".hero-word");
    var base = 80, step = 65;
    spans.forEach(function (sp, i) {
      setTimeout(function () { sp.classList.add("is-on"); }, base + i * step);
    });
    var tail = base + spans.length * step;
    setTimeout(function () { if (sub)   sub.classList.add("is-on");   }, tail + 80);
    setTimeout(function () { if (act)   act.classList.add("is-on");   }, tail + 180);
    setTimeout(function () { if (chips) chips.classList.add("is-on"); }, tail + 280);
  }

  /* ── Cursor glow that follows mouse ── */
  function initCursorGlow() {
    var glow = document.querySelector(".hero-cursor-glow");
    if (!glow || reduceMotion) return;

    var tx = window.innerWidth / 2;
    var ty = window.innerHeight / 2;
    var cx = tx, cy = ty;

    window.addEventListener("mousemove", function (e) {
      tx = e.clientX;
      ty = e.clientY;
    }, { passive: true });

    (function frame() {
      cx += (tx - cx) * 0.06;
      cy += (ty - cy) * 0.06;
      glow.style.transform = "translate(" + Math.round(cx) + "px, " + Math.round(cy) + "px) translate(-50%, -50%)";
      requestAnimationFrame(frame);
    })();
  }

  /* ── Wire up mailto/checkout links ── */
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
    initCursorGlow();
  });
})();
