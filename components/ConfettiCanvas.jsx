"use client";

import { useEffect, useRef } from "react";

const COLORS = ["#C1A06A", "#E2C79A", "#F2D2D6", "#DFA9B1", "#B4717C", "#FFFCF8", "#93A38D"];

export default function ConfettiCanvas() {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const context = canvas.getContext("2d");
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    let width = 0;
    let height = 0;
    let particles = [];
    let frame = null;

    function resize() {
      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      width = window.innerWidth;
      height = window.innerHeight;
      canvas.width = Math.floor(width * dpr);
      canvas.height = Math.floor(height * dpr);
      canvas.style.width = `${width}px`;
      canvas.style.height = `${height}px`;
      context.setTransform(dpr, 0, 0, dpr, 0, 0);
    }

    function tick() {
      context.clearRect(0, 0, width, height);
      particles = particles.filter((particle) => particle.life < particle.ttl);

      particles.forEach((particle) => {
        particle.life += 1;
        particle.x += particle.vx;
        particle.y += particle.vy;
        particle.vy += particle.gravity;
        particle.vx *= particle.drag;
        particle.rot += particle.vr;

        const fadeStart = particle.ttl * 0.62;
        const alpha =
          particle.life > fadeStart
            ? 1 - (particle.life - fadeStart) / (particle.ttl - fadeStart)
            : 1;

        context.save();
        context.translate(particle.x, particle.y);
        context.rotate(particle.rot);
        context.globalAlpha = Math.max(0, alpha);
        context.fillStyle = particle.color;

        if (particle.shape === "circle") {
          context.beginPath();
          context.arc(0, 0, particle.w / 2, 0, Math.PI * 2);
          context.fill();
        } else if (particle.shape === "star") {
          context.beginPath();
          for (let point = 0; point < 8; point += 1) {
            const radius = point % 2 === 0 ? particle.w * 0.85 : particle.w * 0.28;
            const angle = (Math.PI / 4) * point;
            const x = Math.cos(angle) * radius;
            const y = Math.sin(angle) * radius;
            if (point === 0) context.moveTo(x, y);
            else context.lineTo(x, y);
          }
          context.closePath();
          context.fill();
        } else {
          context.fillRect(-particle.w / 2, -particle.h / 2, particle.w, particle.h);
        }

        context.restore();
      });

      if (particles.length) {
        frame = requestAnimationFrame(tick);
      } else {
        context.clearRect(0, 0, width, height);
        frame = null;
      }
    }

    function burst(options = {}) {
      if (reduced) return;
      const fallbackX = width / 2;
      const fallbackY = height * 0.34;
      const x = typeof options.x === "number" ? options.x : fallbackX;
      const y = typeof options.y === "number" ? options.y : fallbackY;
      const count = typeof options.count === "number" ? options.count : 110;
      const spread = typeof options.spread === "number" ? options.spread : 1;

      for (let index = 0; index < count; index += 1) {
        const angle = Math.random() * Math.PI * 2;
        const speed = (2 + Math.random() * 7) * spread;
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
          shape: Math.random() < 0.18 ? "star" : Math.random() < 0.36 ? "circle" : "rect",
          life: 0,
          ttl: 110 + Math.random() * 80
        });
      }

      if (!frame) {
        frame = requestAnimationFrame(tick);
      }
    }

    function handleCelebrate(event) {
      burst(event.detail || {});
    }

    resize();
    window.addEventListener("resize", resize);
    window.addEventListener("hsd:confetti", handleCelebrate);

    return () => {
      window.removeEventListener("resize", resize);
      window.removeEventListener("hsd:confetti", handleCelebrate);
      if (frame) cancelAnimationFrame(frame);
    };
  }, []);

  return <canvas id="confetti" ref={canvasRef} aria-hidden="true" />;
}
