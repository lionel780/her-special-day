"use client";

import { useEffect, useState } from "react";
import { chapter, config } from "@/data/content";
import { readStored, writeStored } from "@/lib/storage";
import Icon from "./Icons";
import SectionIntro from "./SectionIntro";

export default function NewChapter() {
  const [goals, setGoals] = useState([]);
  const [affirmation, setAffirmation] = useState(0);

  useEffect(() => {
    const stored = readStored("hsd:goals", []);
    if (Array.isArray(stored) && stored.length === chapter.goals.length) {
      setGoals(stored);
    } else {
      setGoals(chapter.goals.map(() => false));
    }
  }, []);

  const completed = goals.filter(Boolean).length;

  function toggleGoal(index) {
    setGoals((current) => {
      const next = current.map((value, position) => (position === index ? !value : value));
      writeStored("hsd:goals", next);
      return next;
    });
  }

  function nextAffirmation() {
    setAffirmation((current) => {
      let next = Math.floor(Math.random() * chapter.affirmations.length);
      if (next === current) next = (next + 1) % chapter.affirmations.length;
      return next;
    });
  }

  return (
    <section className="view">
      <SectionIntro
        eyebrow="04 — Nouveau chapitre"
        title={
          <>
            A new chapter <em>begins</em>
          </>
        }
        lead={chapter.lead}
        aside={
          <div className="chapter-badge">
            <span className="chapter-badge__small">Chapitre</span>
            <span className="chapter-badge__num">{config.age }</span>
            <span className="chapter-badge__small">une année à écrire</span>
          </div>
        }
      />

      <div className="chapter-layout">
        <div className="goal-panel">
          <div className="goal-panel__head">
            <div>
              <p className="eyebrow">Cinq promesses</p>
              <h3 className="goal-panel__title">Ce que tu t&apos;offres cette année</h3>
            </div>
            <span className="goal-panel__count">{completed} / {chapter.goals.length}</span>
          </div>

          <div className="goal-progress" aria-hidden="true">
            <span style={{ width: `${(completed / chapter.goals.length) * 100}%` }} />
          </div>

          <ul className="goal-list">
            {chapter.goals.map((goal, index) => {
              const checked = Boolean(goals[index]);
              return (
                <li key={goal}>
                  <button
                    type="button"
                    className={`goal-item${checked ? " is-checked" : ""}`}
                    onClick={() => toggleGoal(index)}
                    role="checkbox"
                    aria-checked={checked}
                  >
                    <span className="goal-item__check" aria-hidden="true">
                      <Icon name="check" size={13} />
                    </span>
                    <span className="goal-item__text">{goal}</span>
                  </button>
                </li>
              );
            })}
          </ul>
          <p className="goal-panel__note">
            Coche ce que tu veux garder près de toi. Tu peux revenir et changer d&apos;avis.
          </p>
        </div>

        <div className="chapter-aside">
          <div className="affirmation-card">
            <span className="affirmation-card__mark" aria-hidden="true">“</span>
            <p className="affirmation-card__eyebrow">Une affirmation pour aujourd&apos;hui</p>
            <p className="affirmation-card__text" key={affirmation}>
              {chapter.affirmations[affirmation]}
            </p>
            <button type="button" className="btn btn--gold btn--small" onClick={nextAffirmation}>
              <Icon name="sparkle" size={14} /> Une autre
            </button>
          </div>

          <blockquote className="chapter-quote">
            <span aria-hidden="true">✦</span>
            <p>{chapter.quote}</p>
          </blockquote>
        </div>
      </div>

      <p className="section-foot">
        Une année ne se réussit pas. Elle se vit.
        <span aria-hidden="true"> ✦</span>
      </p>
    </section>
  );
}
