"use client";

import { config, doors } from "@/data/content";
import Icon from "./Icons";

export default function Hub({ visited, onNavigate, onOpenGift }) {
  return (
    <section className="view view--hub">
      <div className="hub-hero">
        <div className="hub-hero__glow" aria-hidden="true" />
        <span className="hub-hero__ornament hub-hero__ornament--a" aria-hidden="true">✦</span>
        <span className="hub-hero__ornament hub-hero__ornament--b" aria-hidden="true">✧</span>
        <span className="hub-hero__ornament hub-hero__ornament--c" aria-hidden="true">✦</span>

        <div className="hub-hero__inner">
          <div className="hub-hero__monogram" aria-hidden="true">
            <span>✦</span>
            <strong>HSD</strong>
            <span>{config.age}</span>
          </div>
          <p className="eyebrow eyebrow--center">
            <span className="eyebrow__line" />
            {config.edition}
            <span className="eyebrow__line" />
          </p>
          <h1 className="hub-hero__title">
            Bienvenue,
            <br />
            <em>{config.name}</em>
          </h1>
          <p className="hub-hero__lead">
            Sept petites portes, un dernier cadeau, et tout le temps qu&apos;il te faut.
            Prends le parcours comme une promenade : rien ne presse.
          </p>
          <div className="hub-hero__meta">
            <span className="chip">{config.age} ans</span>
            <span className="chip">Aujourd&apos;hui</span>
            <span className="chip">Rien que pour toi</span>
          </div>
          <button type="button" className="btn btn--primary hub-hero__start" onClick={() => onNavigate("messages")}>
            Commencer par un petit mot <Icon name="arrow" size={16} />
          </button>
        </div>
      </div>

      <div className="doors-head">
        <div>
          <p className="eyebrow">Le parcours</p>
          <h2 className="h2">Choisis ta <em>première porte</em>.</h2>
        </div>
        <p className="doors-head__note">
          Tu peux les ouvrir dans n&apos;importe quel ordre.
        </p>
      </div>

      <div className="doors-grid">
        {doors.map((door) => (
          <button
            type="button"
            className={`door-card door-card--${door.tone}${visited.includes(door.id) ? " is-visited" : ""}`}
            key={door.id}
            onClick={() => onNavigate(door.id)}
          >
            <span className="door-card__index">{door.index}</span>
            <span className="door-card__icon">
              <Icon name={door.icon} size={26} strokeWidth={1.2} />
            </span>
            <span className="door-card__title">{door.title}</span>
            <span className="door-card__desc">{door.description}</span>
            <span className="door-card__foot">
              <span className="door-card__meta">{visited.includes(door.id) ? "Déjà ouvert" : door.meta}</span>
              <span className="door-card__arrow"><Icon name="arrow" size={15} /></span>
            </span>
            <span className="door-card__star" aria-hidden="true">✦</span>
          </button>
        ))}
      </div>

      <div className="final-gift-panel">
        <div className="final-gift-panel__copy">
          <p className="eyebrow">Le dernier cadeau</p>
          <h2 className="h2">
            Il reste <em>une chose</em>.
          </h2>
          <p>
            Un dernier objet à ouvrir, posé là au milieu. Cette fois, c&apos;est pour de vrai.
            Tu es arrivée jusqu&apos;ici : tu mérites bien une dernière surprise.
          </p>
          <button type="button" className="btn btn--primary" onClick={onOpenGift}>
            <Icon name="gift" size={16} /> Ouvrir le cadeau
          </button>
        </div>
        <button
          type="button"
          className="hub-gift"
          onClick={onOpenGift}
          aria-label="Ouvrir le dernier cadeau"
        >
          <span className="hub-gift__glow" aria-hidden="true" />
          <span className="hub-gift__stars" aria-hidden="true">
            <i>✦</i><i>✦</i><i>✦</i><i>✦</i>
          </span>
          <span className="hub-gift__lid" aria-hidden="true">
            <span>✦</span>
          </span>
          <span className="hub-gift__box" aria-hidden="true" />
          <span className="hub-gift__ribbon" aria-hidden="true" />
          <span className="hub-gift__tag">Pour {config.name}</span>
        </button>
      </div>

      <p className="section-foot">
        Ce n&apos;est pas un site. C&apos;est un cadeau qu&apos;on ouvre avec les yeux.
        <span aria-hidden="true"> ✦</span>
      </p>
    </section>
  );
}
