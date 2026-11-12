"use client";

import { useEffect, useState } from "react";
import { wishCategories, wishlist } from "@/data/content";
import { celebrate, toast } from "@/lib/celebrate";
import { readStored, writeStored } from "@/lib/storage";
import Icon from "./Icons";
import SectionIntro from "./SectionIntro";
import WishArt from "./WishArt";

export default function Wishlist() {
  const [filter, setFilter] = useState("Tout");
  const [saved, setSaved] = useState([]);

  useEffect(() => {
    const stored = readStored("hsd:wishlist", []);
    if (Array.isArray(stored)) setSaved(stored);
  }, []);

  const visible = filter === "Tout" ? wishlist : wishlist.filter((wish) => wish.category === filter);

  function toggleWish(wish, event) {
    const isSaved = saved.includes(wish.id);
    const next = isSaved ? saved.filter((id) => id !== wish.id) : [...saved, wish.id];
    setSaved(next);
    writeStored("hsd:wishlist", next);

    if (!isSaved) {
      const rect = event.currentTarget.getBoundingClientRect();
      celebrate({
        x: rect.left + rect.width / 2,
        y: rect.top + rect.height / 2,
        count: 22,
        spread: 0.6
      });
      toast("Ajouté à tes envies ✦");
    }
  }

  return (
    <section className="view">
      <SectionIntro
        eyebrow="03 — Mes envies"
        title={
          <>
            Des envies, <em>pas des besoins</em>
          </>
        }
        lead="Dix petites idées pour te faire plaisir, te surprendre ou simplement te ressembler. Garde celles qui te parlent : le cœur remplace le panier."
        aside={
          <div className="section-chip">
            <span className="section-chip__num">{String(saved.length).padStart(2, "0")}</span>
            <span>envies gardées</span>
          </div>
        }
      />

      <div className="wish-filters" role="group" aria-label="Filtrer les envies par catégorie">
        {wishCategories.map((category) => (
          <button
            key={category}
            type="button"
            className={`wish-filter${filter === category ? " is-active" : ""}`}
            onClick={() => setFilter(category)}
            aria-pressed={filter === category}
          >
            {category}
          </button>
        ))}
      </div>

      <div className="wishlist-grid">
        {visible.map((wish) => {
          const isSaved = saved.includes(wish.id);
          return (
            <article className="wish-card" key={wish.id}>
              <WishArt art={wish.art} tone={wish.tone} />
              <div className="wish-card__body">
                <p className="wish-card__category">{wish.category}</p>
                <h3 className="wish-card__title">{wish.title}</h3>
                <p className="wish-card__description">{wish.description}</p>
                <div className="wish-card__foot">
                  <span className="wish-card__price">{wish.price}</span>
                  <button
                    type="button"
                    className={`wish-card__love${isSaved ? " is-saved" : ""}`}
                    onClick={(event) => toggleWish(wish, event)}
                    aria-pressed={isSaved}
                    aria-label={`${isSaved ? "Retirer" : "Ajouter"} ${wish.title} ${isSaved ? "des" : "aux"} envies`}
                  >
                    <Icon name="heart" size={14} />
                    <span>{isSaved ? "Gardée" : "C'est mon rêve"}</span>
                  </button>
                </div>
              </div>
            </article>
          );
        })}
      </div>

      <p className="section-foot">
        Rien n&apos;est obligé d&apos;arriver. Les envies ont le droit de rester des envies.
        <span aria-hidden="true"> ✦</span>
      </p>
    </section>
  );
}
