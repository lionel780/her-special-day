"use client";

import { useEffect, useRef } from "react";
import { config } from "@/data/content";
import { celebrate } from "@/lib/celebrate";
import Icon from "./Icons";

export default function FinalGiftModal({ open, onClose }) {
  const closeRef = useRef(null);

  useEffect(() => {
    if (!open) return;
    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    closeRef.current?.focus();

    const timer = window.setTimeout(
      () => celebrate({ count: 140, y: window.innerHeight * 0.32, spread: 1.15 }),
      300
    );

    function onKeyDown(event) {
      if (event.key === "Escape") onClose();
    }
    window.addEventListener("keydown", onKeyDown);

    return () => {
      document.body.style.overflow = previousOverflow;
      window.removeEventListener("keydown", onKeyDown);
      window.clearTimeout(timer);
    };
  }, [open, onClose]);

  if (!open) return null;

  return (
    <div className="final-modal" role="dialog" aria-modal="true" aria-labelledby="final-title" onClick={onClose}>
      <div className="final-modal__card" onClick={(event) => event.stopPropagation()}>
        <button
          type="button"
          className="final-modal__close"
          onClick={onClose}
          aria-label="Fermer le dernier cadeau"
          ref={closeRef}
        >
          <Icon name="close" size={20} />
        </button>

        <span className="final-modal__star final-modal__star--a" aria-hidden="true">✦</span>
        <span className="final-modal__star final-modal__star--b" aria-hidden="true">✧</span>
        <span className="final-modal__star final-modal__star--c" aria-hidden="true">✦</span>

        <p className="eyebrow eyebrow--center">
          <span className="eyebrow__line" />
          Le dernier cadeau
          <span className="eyebrow__line" />
        </p>
        <h2 className="final-modal__title" id="final-title">
          Pour toi, <em>{config.name}</em>
        </h2>
        <p className="final-modal__script">Happy Birthday</p>

        <div className="final-modal__letter">
          <p>
            Les années précédentes n’ont pas toujours été synonymes de bonheur à l’approche
            de ton anniversaire. Mais cette année, j’ai bien envie qu’elle soit particulière.
          </p>
          <p>
            Je te souhaite un anniversaire merveilleux, rempli d’amour, de belles surprises et
            de moments inoubliables.
          </p>
          <p>
            À toi, cette créatrice de contenu et passionnée. Tu caches une personne sensible,
            généreuse et profondément attachée au bonheur des autres. Une belle âme qui aime
            donner, aider et faire du bien autour d’elle.
          </p>
          <p>
            Ne perds jamais cette belle partie de toi. Tu mérites aussi de recevoir tout le
            bonheur que tu distribues autour de toi.
          </p>
        </div>

        <p className="final-modal__sign">
          {config.finalSignature}
          <span aria-hidden="true">{config.signature}</span>
        </p>

        <div className="final-modal__foot">
          <span className="final-modal__age">{config.age} · édition 2026</span>
          <button type="button" className="btn btn--primary btn--small" onClick={onClose}>
            <Icon name="heart" size={14} /> Garder ce moment
          </button>
        </div>
      </div>
    </div>
  );
}
