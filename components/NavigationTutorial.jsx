"use client";

import { useEffect, useState } from "react";
import { readStored, writeStored } from "@/lib/storage";
import Icon from "./Icons";

const STEPS = [
  {
    kicker: "Étape 01",
    title: "Choisis ta porte",
    text: "Ouvre les rubriques dans l'ordre que tu veux. Chaque espace découvert reste dans ton parcours.",
    action: "Suivant"
  },
  {
    kicker: "Étape 02",
    title: "Suis ta progression",
    text: "En haut de l'écran, le compteur avance à chaque porte ouverte. C'est ta petite carte du chemin.",
    action: "Suivant"
  },
  {
    kicker: "Étape 03",
    title: "Ouvre le dernier cadeau",
    text: "Une fois les portes visitées, le cadeau final t'attend en bas de l'accueil. Un clic, et la surprise est à toi.",
    action: "Voir le cadeau"
  }
];

function DoorsDemo() {
  return (
    <div className="guide-demo guide-demo--doors">
      <div className="guide-demo__label">Choisis une porte</div>
      <div className="guide-demo__doors">
        <span className="guide-door is-lit">
          <i>✦</i>
          <b>01</b>
        </span>
        <span className="guide-door">
          <i>✧</i>
          <b>02</b>
        </span>
        <span className="guide-door">
          <i>✦</i>
          <b>03</b>
        </span>
      </div>
      <span className="guide-cursor" aria-hidden="true">➤</span>
    </div>
  );
}

function ProgressDemo() {
  return (
    <div className="guide-demo guide-demo--progress">
      <div className="guide-demo__header">
        <span className="guide-demo__brand">HSD</span>
        <span className="guide-demo__nav">
          <i className="is-on" />
          <i className="is-on" />
          <i />
          <i />
          <i />
        </span>
        <span className="guide-demo__count">3/5</span>
      </div>
      <div className="guide-demo__bar">
        <span />
      </div>
      <div className="guide-demo__label">Ta progression avance</div>
      <span className="guide-cursor" aria-hidden="true">➤</span>
    </div>
  );
}

function GiftDemo() {
  return (
    <div className="guide-demo guide-demo--gift">
      <div className="guide-gift">
        <span className="guide-gift__lid"><i>✦</i></span>
        <span className="guide-gift__box" />
        <span className="guide-gift__ribbon" />
        <span className="guide-gift__spark guide-gift__spark--a">✦</span>
        <span className="guide-gift__spark guide-gift__spark--b">✧</span>
        <span className="guide-gift__spark guide-gift__spark--c">✦</span>
      </div>
      <div className="guide-demo__label">Le dernier cadeau</div>
      <span className="guide-cursor" aria-hidden="true">➤</span>
    </div>
  );
}

export default function NavigationTutorial() {
  const [mounted, setMounted] = useState(false);
  const [visible, setVisible] = useState(false);
  const [step, setStep] = useState(0);

  useEffect(() => {
    setMounted(true);
    setVisible(readStored("hsd:tutorial", false) !== true);
  }, []);

  function dismiss() {
    writeStored("hsd:tutorial", true);
    setVisible(false);
  }

  function finish() {
    dismiss();
    const panel = document.querySelector(".final-gift-panel");
    if (!panel) return;
    panel.scrollIntoView({
      behavior: window.matchMedia("(prefers-reduced-motion: reduce)").matches ? "auto" : "smooth",
      block: "center"
    });
    panel.classList.add("is-highlighted");
    window.setTimeout(() => panel.classList.remove("is-highlighted"), 2600);
  }

  function next() {
    if (step === STEPS.length - 1) {
      finish();
      return;
    }
    setStep((value) => value + 1);
  }

  if (!mounted || !visible) return null;

  const current = STEPS[step];

  return (
    <section className="guide" aria-label="Mini tutoriel de navigation">
      <div className="guide__head">
        <div>
          <p className="eyebrow">Le petit guide</p>
          <h2 className="guide__title">
            Trois étapes <em>jusqu&apos;au cadeau</em>
          </h2>
        </div>
        <button type="button" className="guide__skip" onClick={dismiss}>
          Passer le guide <Icon name="close" size={13} />
        </button>
      </div>

      <div className="guide__body">
        <div className="guide__copy">
          <p className="guide__kicker">{current.kicker}</p>
          <h3 className="guide__step-title">{current.title}</h3>
          <p className="guide__text">{current.text}</p>

          <div className="guide__dots" role="tablist" aria-label="Étapes du guide">
            {STEPS.map((item, index) => (
              <button
                key={item.kicker}
                type="button"
                role="tab"
                aria-selected={index === step}
                className={`guide__dot${index === step ? " is-active" : ""}`}
                onClick={() => setStep(index)}
                aria-label={`${item.kicker} : ${item.title}`}
              />
            ))}
          </div>

          <div className="guide__actions">
            <button
              type="button"
              className="btn btn--ghost btn--small"
              onClick={() => setStep((value) => Math.max(0, value - 1))}
              disabled={step === 0}
            >
              Précédent
            </button>
            <button type="button" className="btn btn--primary btn--small" onClick={next}>
              {current.action} <Icon name="arrow" size={14} />
            </button>
          </div>
        </div>

        <div className="guide__demo" aria-hidden="true">
          <div className="guide__browser" key={step}>
            <div className="guide__browser-bar">
              <span className="guide__mark">HSD</span>
              <span className="guide__browser-dots">
                <i />
                <i />
                <i />
              </span>
            </div>
            {step === 0 ? <DoorsDemo /> : null}
            {step === 1 ? <ProgressDemo /> : null}
            {step === 2 ? <GiftDemo /> : null}
          </div>
        </div>
      </div>
    </section>
  );
}
