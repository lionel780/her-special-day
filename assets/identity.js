(function () {
  "use strict";

  const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  const $ = (selector, root = document) => root.querySelector(selector);
  const $$ = (selector, root = document) => Array.from(root.querySelectorAll(selector));

  const toastEl = $(".toast");
  let toastTimer;

  function toast(message) {
    if (!toastEl) return;
    toastEl.textContent = message;
    toastEl.classList.add("is-visible");
    clearTimeout(toastTimer);
    toastTimer = setTimeout(() => toastEl.classList.remove("is-visible"), 2200);
  }

  function copyText(text) {
    if (navigator.clipboard && window.isSecureContext) {
      return navigator.clipboard
        .writeText(text)
        .then(() => true)
        .catch(() => fallbackCopy(text));
    }
    return Promise.resolve(fallbackCopy(text));
  }

  function fallbackCopy(text) {
    const area = document.createElement("textarea");
    area.value = text || "";
    area.setAttribute("readonly", "");
    area.style.position = "fixed";
    area.style.opacity = "0";
    document.body.appendChild(area);
    area.select();
    try {
      document.execCommand("copy");
    } catch (error) {
      return false;
    } finally {
      area.remove();
    }
    return true;
  }

  // Scroll reveals
  const revealEls = $$(".reveal");

  revealEls.forEach((el) => {
    const siblings = Array.from(el.parentElement.children).filter((child) =>
      child.classList.contains("reveal")
    );
    const index = siblings.indexOf(el);
    el.style.transitionDelay = `${Math.min(index, 5) * 70}ms`;
  });

  if (reduceMotion || !("IntersectionObserver" in window)) {
    revealEls.forEach((el) => el.classList.add("is-visible"));
  } else {
    const revealObserver = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("is-visible");
            revealObserver.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.12, rootMargin: "0px 0px -8% 0px" }
    );
    revealEls.forEach((el) => revealObserver.observe(el));
  }

  // Active navigation
  const sections = $$("main section[id]");
  const navLinks = $$(".nav a");
  let navFrame = null;

  function updateNav() {
    navFrame = null;
    const marker = window.scrollY + 170;
    let current = sections.length ? sections[0].id : "";

    sections.forEach((section) => {
      if (section.offsetTop <= marker) current = section.id;
    });

    navLinks.forEach((link) => {
      if (link.getAttribute("href") === `#${current}`) {
        link.setAttribute("aria-current", "true");
      } else {
        link.removeAttribute("aria-current");
      }
    });
  }

  function requestNavUpdate() {
    if (navFrame === null) navFrame = requestAnimationFrame(updateNav);
  }

  window.addEventListener("scroll", requestNavUpdate, { passive: true });
  window.addEventListener("resize", requestNavUpdate);
  updateNav();

  // Copy colour codes
  $$(".swatch").forEach((button) => {
    button.addEventListener("click", () => {
      const hex = button.dataset.hex;
      if (!hex) return;
      copyText(hex).then((ok) => {
        toast(ok === false ? "Copie indisponible" : `${hex} copié`);
      });
    });
  });

  // Envelopes
  $$("[data-env]").forEach((envelope) => {
    envelope.addEventListener("click", () => {
      const open = envelope.classList.toggle("is-open");
      envelope.setAttribute("aria-expanded", String(open));
      envelope.setAttribute(
        "aria-label",
        open ? "Fermer l'enveloppe de démonstration" : "Ouvrir l'enveloppe de démonstration"
      );
    });
  });

  // Wishlist hearts
  $$("[data-love]").forEach((button) => {
    const heart = $(".wish__heart", button);
    button.addEventListener("click", () => {
      const active = button.getAttribute("aria-pressed") !== "true";
      button.setAttribute("aria-pressed", String(active));
      if (heart) heart.textContent = active ? "♥" : "♡";
      button.classList.remove("is-popping");
      void button.offsetWidth;
      button.classList.add("is-popping");
      if (active) {
        const rect = button.getBoundingClientRect();
        confettiBurst(rect.left + rect.width / 2, rect.top + rect.height / 2, 26);
      }
    });
  });

  // Gift box
  $$("[data-gift]").forEach((gift) => {
    gift.addEventListener("click", () => {
      const open = gift.classList.toggle("is-open");
      gift.setAttribute("aria-expanded", String(open));
      gift.setAttribute(
        "aria-label",
        open ? "Refermer le cadeau de démonstration" : "Ouvrir le cadeau de démonstration"
      );
      if (open) {
        const rect = gift.getBoundingClientRect();
        confettiBurst(rect.left + rect.width / 2, rect.top + rect.height * 0.3, 64);
      }
    });
  });

  // Confetti engine
  const canvas = document.createElement("canvas");
  canvas.id = "confetti";
  canvas.setAttribute("aria-hidden", "true");
  document.body.appendChild(canvas);

  const ctx = canvas.getContext("2d");
  const COLORS = ["#C1A06A", "#E2C79A", "#F2D2D6", "#DFA9B1", "#B4717C", "#FFFCF8", "#93A38D"];
  let width = 0;
  let height = 0;
  let particles = [];
  let running = false;
  let frame = null;

  function resizeCanvas() {
    const dpr = Math.min(window.devicePixelRatio || 1, 2);
    width = window.innerWidth;
    height = window.innerHeight;
    canvas.width = Math.floor(width * dpr);
    canvas.height = Math.floor(height * dpr);
    canvas.style.width = `${width}px`;
    canvas.style.height = `${height}px`;
    ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
  }

  function confettiBurst(x, y, count) {
    if (reduceMotion) return;
    const amount = typeof count === "number" ? count : 110;

    for (let i = 0; i < amount; i += 1) {
      const angle = Math.random() * Math.PI * 2;
      const speed = 2 + Math.random() * 7;
      particles.push({
        x,
        y,
        vx: Math.cos(angle) * speed * (0.6 + Math.random() * 0.8),
        vy: Math.sin(angle) * speed - (2.4 + Math.random() * 4.2),
        gravity: 0.11 + Math.random() * 0.08,
        drag: 0.994,
        w: 3.5 + Math.random() * 5,
        h: 5 + Math.random() * 7,
        rot: Math.random() * Math.PI,
        vr: (Math.random() - 0.5) * 0.26,
        color: COLORS[Math.floor(Math.random() * COLORS.length)],
        shape: Math.random() < 0.24 ? "circle" : "rect",
        life: 0,
        ttl: 110 + Math.random() * 80
      });
    }

    if (!running) {
      running = true;
      frame = requestAnimationFrame(tick);
    }
  }

  function tick() {
    ctx.clearRect(0, 0, width, height);
    particles = particles.filter((p) => p.life < p.ttl);

    particles.forEach((p) => {
      p.life += 1;
      p.x += p.vx;
      p.y += p.vy;
      p.vy += p.gravity;
      p.vx *= p.drag;
      p.rot += p.vr;

      const fadeStart = p.ttl * 0.62;
      const alpha =
        p.life > fadeStart ? 1 - (p.life - fadeStart) / (p.ttl - fadeStart) : 1;

      ctx.save();
      ctx.translate(p.x, p.y);
      ctx.rotate(p.rot);
      ctx.globalAlpha = Math.max(0, alpha);
      ctx.fillStyle = p.color;

      if (p.shape === "circle") {
        ctx.beginPath();
        ctx.arc(0, 0, p.w / 2, 0, Math.PI * 2);
        ctx.fill();
      } else {
        ctx.fillRect(-p.w / 2, -p.h / 2, p.w, p.h);
      }

      ctx.restore();
    });

    if (particles.length) {
      frame = requestAnimationFrame(tick);
    } else {
      running = false;
      ctx.clearRect(0, 0, width, height);
      if (frame) cancelAnimationFrame(frame);
      frame = null;
    }
  }

  resizeCanvas();
  window.addEventListener("resize", () => {
    resizeCanvas();
    particles = [];
    running = false;
    if (frame) cancelAnimationFrame(frame);
    frame = null;
    ctx.clearRect(0, 0, width, height);
  });

  $$("[data-confetti]").forEach((button) => {
    button.addEventListener("click", () => {
      const rect = button.getBoundingClientRect();
      confettiBurst(rect.left + rect.width / 2, rect.top + rect.height / 2, 120);
      toast("Joyeux anniversaire, Marie");
    });
  });

  if (!reduceMotion) {
    window.setTimeout(() => {
      confettiBurst(window.innerWidth / 2, window.innerHeight * 0.3, 72);
    }, 1200);
  }
})();
