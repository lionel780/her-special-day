"use client";

import { useEffect, useState } from "react";
import { memories } from "@/data/content";
import Icon from "./Icons";
import SectionIntro from "./SectionIntro";

function MemoryImage({ memory, large = false }) {
  return (
    <div className={`memory-art memory-art--${memory.tone}${large ? " memory-art--large" : ""}`}>
      {memory.image ? (
        // eslint-disable-next-line @next/next/no-img-element
        <img src={memory.image} alt={memory.alt} />
      ) : (
        <span className="memory-art__symbol" aria-hidden="true">{memory.symbol}</span>
      )}
      <span className="memory-art__grain" aria-hidden="true" />
      <span className="memory-art__light" aria-hidden="true" />
    </div>
  );
}

export default function Memories() {
  const [active, setActive] = useState(null);

  useEffect(() => {
    if (!active) return;
    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    function onKeyDown(event) {
      if (event.key === "Escape") setActive(null);
    }
    window.addEventListener("keydown", onKeyDown);
    return () => {
      document.body.style.overflow = previousOverflow;
      window.removeEventListener("keydown", onKeyDown);
    };
  }, [active]);

  return (
    <section className="view">
      <SectionIntro
        eyebrow="04 — Mes souvenirs"
        title={
          <>
            Des instants <em>qui restent</em>
          </>
        }
        lead="Un mur de polaroïds pour garder les rires, les escapades et les petites secondes qui valent plus que des années. Touche une photo pour l'agrandir."
        aside={
          <div className="section-chip">
            <span className="section-chip__num">06</span>
            <span>instants accrochés</span>
          </div>
        }
      />

      <div className="polaroid-wall">
        {memories.map((memory) => (
          <button
            type="button"
            className="polaroid-card"
            key={memory.id}
            style={{ "--tilt": `${memory.tilt}deg` }}
            onClick={() => setActive(memory)}
            aria-label={`Agrandir le souvenir ${memory.caption}, ${memory.note}`}
          >
            <MemoryImage memory={memory} />
            <span className="polaroid-card__caption">
              <span>{memory.caption}</span>
              <span>{memory.note}</span>
            </span>
            <span className="polaroid-card__tape" aria-hidden="true" />
          </button>
        ))}
      </div>

      <p className="section-foot">
        Les plus beaux souvenirs ne sont pas toujours les plus grands.
        <span aria-hidden="true"> ✦</span>
      </p>

      {active ? (
        <div
          className="memory-lightbox"
          role="dialog"
          aria-modal="true"
          aria-label={`Souvenir : ${active.caption}`}
          onClick={() => setActive(null)}
        >
          <div className="memory-lightbox__inner" onClick={(event) => event.stopPropagation()}>
            <button
              type="button"
              className="memory-lightbox__close"
              onClick={() => setActive(null)}
              aria-label="Fermer le souvenir"
            >
              <Icon name="close" size={20} />
            </button>
            <figure className="memory-lightbox__figure">
              <MemoryImage memory={active} large />
              <figcaption>
                <span className="memory-lightbox__caption">{active.caption}</span>
                <span className="memory-lightbox__note">{active.note}</span>
              </figcaption>
            </figure>
          </div>
        </div>
      ) : null}
    </section>
  );
}
