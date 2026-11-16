"use client";

import { useState } from "react";
import { config, messages } from "@/data/content";
import Icon from "./Icons";
import SectionIntro from "./SectionIntro";

export default function Messages() {
  const [openId, setOpenId] = useState(null);

  return (
    <section className="view">
      <SectionIntro
        eyebrow="01 — Des petits mots"
        title={
          <>
            À ouvrir <em>sans modération</em>
          </>
        }
        lead="Trois enveloppes, trois pensées posées là pour toi. Prends-en une, lis-la lentement, puis reviens quand tu veux."
        aside={
          <div className="section-chip">
            <span className="section-chip__num">03</span>
            <span>messages à ouvrir</span>
          </div>
        }
      />

      <div className="messages-grid">
        {messages.map((message) => {
          const open = openId === message.id;
          return (
            <article className={`message-card${open ? " is-open" : ""}`} key={message.id}>
              <button
                type="button"
                className="message-card__cover"
                onClick={() => setOpenId(open ? null : message.id)}
                aria-expanded={open}
                aria-controls={`message-${message.id}`}
                aria-label={`${open ? "Refermer" : "Ouvrir"} le message ${message.label}`}
              >
                <span className="message-card__flap" aria-hidden="true" />
                <span className="message-card__seal" aria-hidden="true">
                  {config.signature}
                </span>
                <span className="message-card__cover-meta">
                  <span className="message-card__number">{message.number}</span>
                  <span className="message-card__label">{message.label}</span>
                </span>
                <span className="message-card__hint">
                  {open ? "Refermer" : "Toucher pour ouvrir"}
                  <Icon name={open ? "close" : "arrow"} size={14} />
                </span>
              </button>
              <div className="message-card__letter" id={`message-${message.id}`} aria-hidden={!open}>
                <h3 className="message-card__title">{message.title}</h3>
                <p>{message.text}</p>
                <span className="message-card__sign">{message.sign}</span>
              </div>
            </article>
          );
        })}
      </div>

      <p className="section-foot">
        Chaque mot a été choisi pour toi. Aucun n&apos;est là par hasard.
        <span aria-hidden="true"> ✦</span>
      </p>
    </section>
  );
}
