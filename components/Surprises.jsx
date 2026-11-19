"use client";

import { useEffect, useMemo, useState } from "react";
import { config, quiz, quizResults, wishes } from "@/data/content";
import { celebrate } from "@/lib/celebrate";
import Icon from "./Icons";
import SectionIntro from "./SectionIntro";

function JarOfWishes() {
  const [note, setNote] = useState("");
  const [draws, setDraws] = useState(0);

  function draw() {
    let next = wishes[Math.floor(Math.random() * wishes.length)];
    if (next === note) next = wishes[(wishes.indexOf(next) + 1) % wishes.length];
    setNote(next);
    setDraws((value) => value + 1);
    celebrate({ count: 18, spread: 0.55 });
  }

  return (
    <article className="surprise-card jar-card">
      <div className="surprise-card__head">
        <span className="surprise-card__icon"><Icon name="jar" size={22} /></span>
        <span className="surprise-card__index">01</span>
      </div>
      <h3 className="surprise-card__title">Le bocal à vœux</h3>
      <p className="surprise-card__text">
        Douze petits souhaits enfermés dans un bocal. Tire-en un au hasard, puis reviens quand tu veux.
      </p>

      <div className="wish-jar" aria-hidden="true">
        <span className="wish-jar__lid" />
        <span className="wish-jar__glass">
          <i /><i /><i /><i /><i />
        </span>
        <span className="wish-jar__glow" />
      </div>

      <div className="jar-note" key={draws}>
        {note ? (
          <p>{note}</p>
        ) : (
          <p className="jar-note__empty">Le bocal attend que tu tendes la main.</p>
        )}
      </div>

      <button type="button" className="btn btn--primary btn--small surprise-card__button" onClick={draw}>
        <Icon name="sparkle" size={14} /> {draws ? "Tirer un autre vœu" : "Tirer un petit vœu"}
      </button>
    </article>
  );
}

function SelfQuiz() {
  const [step, setStep] = useState(0);
  const [answers, setAnswers] = useState([]);
  const [result, setResult] = useState(null);
  const [summary, setSummary] = useState([]);

  function choose(trait) {
    if (result) return;
    const nextAnswers = [...answers, trait];
    setAnswers(nextAnswers);
    if (nextAnswers.length === quiz.length) {
      const counts = nextAnswers.reduce((accumulator, value) => {
        accumulator[value] = (accumulator[value] || 0) + 1;
        return accumulator;
      }, {});
      const ranked = Object.entries(counts).sort((a, b) => b[1] - a[1]);
      const winner = ranked[0][0];
      setResult(quizResults[winner]);
      setSummary(
        ranked.map(([trait, count]) => ({
          id: trait,
          name: quizResults[trait].title,
          count
        }))
      );
      celebrate({ count: 38, spread: 0.7 });
    } else {
      setStep((value) => value + 1);
    }
  }

  function restart() {
    setStep(0);
    setAnswers([]);
    setResult(null);
    setSummary([]);
  }

  const current = quiz[step];

  // return (
  //   <article className="surprise-card quiz-card">
  //     <div className="surprise-card__head">
  //       <span className="surprise-card__icon"><Icon name="quiz" size={22} /></span>
  //       <span className="surprise-card__index">02</span>
  //     </div>
  //     <h3 className="surprise-card__title">Te connais-tu si bien ?</h3>

  //     {result ? (
  //       <div className="quiz-result">
  //         <p className="quiz-result__eyebrow">{result.label}</p>
  //         <p className="quiz-result__title">{result.title}</p>
  //         <p className="quiz-result__text">{result.text}</p>
  //         <div className="quiz-result__choices">
  //           {summary.map((item) => (
  //             <span className={`quiz-result__trait quiz-result__trait--${item.id}`} key={item.id}>
  //               {item.name} <strong>{item.count}</strong>
  //             </span>
  //           ))}
  //         </div>
  //         <button type="button" className="btn btn--ghost btn--small" onClick={restart}>
  //           Rejouer le quiz <Icon name="arrow" size={14} />
  //         </button>
  //       </div>
  //     ) : (
  //       <div className="quiz-body">
  //         <div className="quiz-progress" aria-hidden="true">
  //           {quiz.map((item, index) => (
  //             <span
  //               key={item.question}
  //               className={index <= step ? "is-active" : ""}
  //             />
  //           ))}
  //         </div>
  //         <p className="quiz-body__count" aria-live="polite">
  //           Question {step + 1} sur {quiz.length}
  //         </p>
  //         <p className="quiz-body__question">{current.question}</p>
  //         <div className="quiz-options">
  //           {current.options.map((option) => (
  //             <button
  //               type="button"
  //               className="quiz-option"
  //               key={option.label}
  //               onClick={() => choose(option.trait)}
  //             >
  //               <span>{option.label}</span>
  //               <Icon name="arrow" size={14} />
  //             </button>
  //           ))}
  //         </div>
  //       </div>
  //     )}
  //   </article>
  // );
}

function Countdown() {
  const [remaining, setRemaining] = useState(null);

  const details = useMemo(() => {
    const [year, month, day] = config.birthday.split("-").map(Number);
    return { month, day };
  }, []);

  useEffect(() => {
    function update() {
      const now = new Date();
      const isToday = now.getMonth() === details.month - 1 && now.getDate() === details.day;
      const today = new Date(now.getFullYear(), now.getMonth(), now.getDate());
      const target = new Date(now.getFullYear(), details.month - 1, details.day);
      if (!isToday && target < today) {
        target.setFullYear(now.getFullYear() + 1);
      }
      let distance = target.getTime() - now.getTime();
      if (isToday) distance = Math.max(0, distance);
      const days = Math.floor(distance / 86400000);
      const hours = Math.floor((distance % 86400000) / 3600000);
      const minutes = Math.floor((distance % 3600000) / 60000);
      setRemaining({
        isToday,
        days,
        hours,
        minutes,
        date: target.toLocaleDateString("fr-FR", {
          day: "numeric",
          month: "long",
          year: "numeric"
        })
      });
    }

    update();
    const timer = window.setInterval(update, 60000);
    return () => window.clearInterval(timer);
  }, [details]);

  return (
    <article className="surprise-card countdown-card">
      <div className="surprise-card__head">
        <span className="surprise-card__icon"><Icon name="calendar" size={22} /></span>
        {/* <span className="surprise-card__index">03</span> */}
      </div>
      <h3 className="surprise-card__title">Le prochain jour</h3>

      {remaining ? (
        remaining.isToday ? (
          <div className="countdown-today">
            <p className="countdown-today__eyebrow">Aujourd&apos;hui même</p>
            <p className="countdown-today__title">C&apos;est ton jour, {config.name}.</p>
            <p className="countdown-today__text">
              Pas besoin de compter : la journée est déjà là. Profite.
            </p>
            <span className="countdown-today__spark" aria-hidden="true">✦</span>
          </div>
        ) : (
          <div className="countdown-time">
            <p className="countdown-time__eyebrow">Dans</p>
            <div className="countdown-time__numbers">
              <span>
                <strong>{String(remaining.days).padStart(2, "0")}</strong>
                <small>jours</small>
              </span>
              <i aria-hidden="true">:</i>
              <span>
                <strong>{String(remaining.hours).padStart(2, "0")}</strong>
                <small>heures</small>
              </span>
              <i aria-hidden="true">:</i>
              <span>
                <strong>{String(remaining.minutes).padStart(2, "0")}</strong>
                <small>minutes</small>
              </span>
            </div>
            <p className="countdown-time__date">Prochain anniversaire · {remaining.date}</p>
          </div>
        )
      ) : (
        <div className="countdown-time countdown-time--loading">
          <span className="countdown-time__loading">Le temps se prépare…</span>
        </div>
      )}

      <p className="countdown-card__note">
        Une année, c&apos;est long. Et en même temps, ça passe vite.
      </p>
    </article>
  );
}

export default function Surprises() {
  return (
    <section className="view">
      <SectionIntro
        eyebrow="05 — Petites surprises"
        title={
          <>
            Trois façons de <em>jouer un peu</em>
          </>
        }
        lead="Un bocal à vœux, un quiz sans mauvaise réponse et un compte à rebours. Rien de sérieux : juste de quoi sourire."
        aside={
          <div className="section-chip">
            <span className="section-chip__num">01</span>
            <span>petites attentions</span>
          </div>
        }
      />

      <div className="surprises-grid">
        <JarOfWishes />
        <SelfQuiz />
        <Countdown />
      </div>

      <p className="section-foot">
        Les surprises les plus simples sont parfois celles qu&apos;on garde le plus longtemps.
        <span aria-hidden="true"> ✦</span>
      </p>
    </section>
  );
}
