"use client";

import { useEffect } from "react";
import { config } from "@/data/content";
import { celebrate } from "@/lib/celebrate";
import Icon from "./Icons";

const STARS = [
  { top: "12%", left: "13%", size: 12, delay: "0s" },
  { top: "21%", left: "83%", size: 8, delay: "1.4s" },
  { top: "34%", left: "24%", size: 7, delay: "2.1s" },
  { top: "16%", left: "62%", size: 14, delay: "0.7s" },
  { top: "42%", left: "91%", size: 9, delay: "2.8s" },
  { top: "64%", left: "9%", size: 8, delay: "1.8s" },
  { top: "73%", left: "79%", size: 12, delay: "0.4s" },
  { top: "84%", left: "32%", size: 7, delay: "2.4s" },
  { top: "56%", left: "70%", size: 6, delay: "3.2s" },
  { top: "28%", left: "47%", size: 6, delay: "3.8s" }
];

export default function BirthdayReveal({ onContinue }) {
  useEffect(() => {
    const first = window.setTimeout(
      () => celebrate({ count: 120, y: window.innerHeight * 0.3, spread: 1.15 }),
      450
    );
    const second = window.setTimeout(
      () => celebrate({ count: 80, x: window.innerWidth * 0.2, y: window.innerHeight * 0.55 }),
      2100
    );
    const third = window.setTimeout(
      () => celebrate({ count: 70, x: window.innerWidth * 0.8, y: window.innerHeight * 0.4 }),
      3000
    );
    return () => {
      window.clearTimeout(first);
      window.clearTimeout(second);
      window.clearTimeout(third);
    };
  }, []);

  return (
    <main className="reveal-screen">
      <div className="reveal-screen__glow reveal-screen__glow--one" aria-hidden="true" />
      <div className="reveal-screen__glow reveal-screen__glow--two" aria-hidden="true" />
      <div className="reveal-screen__stars" aria-hidden="true">
        {STARS.map((star, index) => (
          <span
            key={index}
            style={{
              top: star.top,
              left: star.left,
              fontSize: `${star.size}px`,
              animationDelay: star.delay
            }}
          >
            ✦
          </span>
        ))}
      </div>

      <div className="reveal-screen__content">
        <p className="reveal-screen__eyebrow">{config.age} ans · aujourd&apos;hui</p>
        <h1 className="reveal-screen__title">
          It&apos;s your
          <br />
          <em>day</em>
        </h1>
        <p className="reveal-screen__script">{config.name}</p>
        <div className="reveal-screen__rule" aria-hidden="true">
          <span />
          <i>✦</i>
          <span />
        </div>
        <p className="reveal-screen__text">
          Aujourd&apos;hui, le monde célèbre une personne exceptionnelle.
          <br />
          Happy Birthday, {config.name} !
        </p>
        <button className="btn btn--light reveal-screen__cta" type="button" onClick={onContinue}>
          Découvrir ma surprise <Icon name="arrow" size={16} />
        </button>

        <div className="reveal-screen__song">
          <p className="reveal-screen__song-label">
            <Icon name="music" size={14} /> Happy Birthday · Naza
          </p>
          <div className="reveal-screen__song-frame">
            <iframe
              src="https://www.youtube.com/embed/dNEnzdcnWzE?autoplay=1&rel=0&modestbranding=1&playsinline=1"
              title="Happy Birthday — Naza"
              allow="autoplay; encrypted-media; picture-in-picture; web-share"
              referrerPolicy="strict-origin-when-cross-origin"
              allowFullScreen
            />
          </div>
        </div>
      </div>

      <p className="reveal-screen__foot" aria-hidden="true">
        Prends ton temps. Tout est pour toi.
      </p>
    </main>
  );
}
