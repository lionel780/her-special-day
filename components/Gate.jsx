"use client";

import { useEffect, useRef, useState } from "react";
import { config } from "@/data/content";
import { celebrate } from "@/lib/celebrate";
import Icon from "./Icons";

const FUNNY_ERRORS = [
  "Pas tout à fait… mais j'aime beaucoup ton audace.",
  "Ce n'est pas ce chiffre-là. La bonne réponse te va à merveille.",
  "Presque. Enfin… non. Mais tu peux réessayer, évidemment.",
  "Hmm, non. Indice : c'est le plus joli des nombres aujourd'hui.",
  "Ce n'est pas encore ça. Souffle un coup et recommence."
];

export default function Gate({ onUnlock }) {
  const [age, setAge] = useState("");
  const [error, setError] = useState("");
  const [attempts, setAttempts] = useState(0);
  const [success, setSuccess] = useState(false);
  const timerRef = useRef(null);

  useEffect(() => {
    return () => window.clearTimeout(timerRef.current);
  }, []);

  function submit(event) {
    event.preventDefault();
    if (success) return;
    const parsed = Number.parseInt(age, 10);
    if (!age.trim() || Number.isNaN(parsed)) {
      setError("Un chiffre, juste un chiffre. Promis, rien de plus.");
      return;
    }
    if (parsed === config.age || parsed === config.currentAge) {
      setError("");
      setSuccess(true);
      celebrate({ count: 90, y: window.innerHeight * 0.42 });
      timerRef.current = window.setTimeout(onUnlock, 900);
      return;
    }
    setError(FUNNY_ERRORS[attempts % FUNNY_ERRORS.length]);
    setAttempts((value) => value + 1);
  }

  return (
    <main className="gate">
      <div className="gate__glow gate__glow--blush" aria-hidden="true" />
      <div className="gate__glow gate__glow--gold" aria-hidden="true" />
      <span className="gate__ornament gate__ornament--a" aria-hidden="true">✦</span>
      <span className="gate__ornament gate__ornament--b" aria-hidden="true">✦</span>
      <span className="gate__ornament gate__ornament--c" aria-hidden="true">✧</span>

      <div className="gate__frame">
        <div className="gate__brand">
          <span className="brand-mark">HSD</span>
          <span>
            <span className="gate__brand-name">HER SPECIAL DAY</span>
            <span className="gate__brand-tag">Une surprise rien que pour toi</span>
          </span>
        </div>

        <div className={`gate__card${error ? " has-error" : ""}${success ? " is-success" : ""}`}>
          <p className="eyebrow eyebrow--center">
            <span className="eyebrow__line" />
            Avant d&apos;ouvrir
            <span className="eyebrow__line" />
          </p>
          <h1 className="gate__title">
            J&apos;ai une question
            <br />
            <em>pour toi</em>
          </h1>
          <p className="gate__lead">
            Avant de découvrir ta petite surprise, dis-moi simplement quel âge tu as aujourd&apos;hui.
          </p>

          <form className="gate__form" onSubmit={submit} noValidate>
            <label className="gate__label" htmlFor="birthday-age">
              Quel âge as-tu aujourd&apos;hui ?
            </label>
            <div className="gate__field">
              <input
                id="birthday-age"
                className="gate__input"
                type="text"
                inputMode="numeric"
                pattern="[0-9]*"
                autoComplete="off"
                maxLength={3}
                value={age}
                onChange={(event) => {
                  setAge(event.target.value.replace(/[^0-9]/g, ""));
                  setError("");
                }}
                placeholder={String(config.currentAge)}
                aria-describedby="age-hint age-error"
                aria-invalid={Boolean(error)}
                disabled={success}
              />
              <span className="gate__suffix" aria-hidden="true">ans</span>
            </div>
            <p className="gate__hint" id="age-hint">
              {config.hint}
            </p>
            <button className="btn btn--primary gate__submit" type="submit" disabled={success}>
              {success ? (
                <>
                  C&apos;est bien toi <Icon name="sparkle" size={16} />
                </>
              ) : (
                <>
                  Valider <Icon name="arrow" size={16} />
                </>
              )}
            </button>
          </form>

          <div className="gate__live" id="age-error" role="status" aria-live="polite">
            {error ? <span className="gate__error">{error}</span> : null}
            {success ? (
              <span className="gate__success">
                <Icon name="sparkle" size={15} /> La surprise s&apos;ouvre…
              </span>
            ) : null}
          </div>
        </div>

        <p className="gate__note">
          Un cadeau privé, préparé avec soin.
          <span aria-hidden="true"> ✦</span>
        </p>
      </div>
    </main>
  );
}
