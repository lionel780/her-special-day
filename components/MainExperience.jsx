"use client";

import { useCallback, useEffect, useState } from "react";
import { config } from "@/data/content";
import { readStored, writeStored } from "@/lib/storage";
import FinalGiftModal from "./FinalGiftModal";
import Hub from "./Hub";
import Icon from "./Icons";
import LetterToMyself from "./LetterToMyself";
import Memories from "./Memories";
import Messages from "./Messages";
import NewChapter from "./NewChapter";
import SoundToggle from "./SoundToggle";
import Soundtrack from "./Soundtrack";
import Surprises from "./Surprises";
import Wishlist from "./Wishlist";

const NAV = [
  { id: "hub", label: "Accueil" },
  { id: "messages", label: "Des mots" },
  { id: "letter", label: "Lettre" },
  { id: "wishlist", label: "Envies" },
  { id: "memories", label: "Souvenirs" },
  { id: "chapter", label: "Chapitre" },
  { id: "soundtrack", label: "Ambiance" },
  { id: "surprises", label: "Surprises" }
];

const TOTAL_STEPS = NAV.length;

export default function MainExperience({ ambient, onReset }) {
  const [view, setView] = useState(() => {
    if (typeof window === "undefined") return "hub";
    const requested = new URLSearchParams(window.location.search).get("view");
    return NAV.some((item) => item.id === requested) ? requested : "hub";
  });
  const [visited, setVisited] = useState([]);
  const [giftOpen, setGiftOpen] = useState(() => {
    if (typeof window === "undefined") return false;
    if (process.env.NODE_ENV !== "development") return false;
    return new URLSearchParams(window.location.search).get("gift") === "1";
  });

  useEffect(() => {
    const stored = readStored("hsd:visited", []);
    if (Array.isArray(stored)) setVisited(stored);
  }, []);

  useEffect(() => {
    setVisited((current) => {
      if (current.includes(view)) return current;
      const next = [...current, view];
      writeStored("hsd:visited", next);
      return next;
    });
  }, [view]);

  const navigate = useCallback((nextView) => {
    setView(nextView);
    window.scrollTo({
      top: 0,
      behavior: window.matchMedia("(prefers-reduced-motion: reduce)").matches ? "auto" : "smooth"
    });
  }, []);

  const closeGift = useCallback(() => setGiftOpen(false), []);
  const openGift = useCallback(() => setGiftOpen(true), []);

  const progress = Math.min(visited.length, TOTAL_STEPS) / TOTAL_STEPS;

  function renderView() {
    switch (view) {
      case "messages":
        return <Messages />;
      case "letter":
        return <LetterToMyself />;
      case "wishlist":
        return <Wishlist />;
      case "memories":
        return <Memories />;
      case "chapter":
        return <NewChapter />;
      case "soundtrack":
        return <Soundtrack ambient={ambient} />;
      case "surprises":
        return <Surprises />;
      default:
        return <Hub visited={visited} onNavigate={navigate} onOpenGift={openGift} />;
    }
  }

  return (
    <div className="app-shell">
      <header className="app-header">
        <div className="app-header__inner">
          <button
            type="button"
            className="app-brand"
            onClick={() => navigate("hub")}
            aria-label="Her Special Day, retour à l'accueil"
          >
            <span className="brand-mark">HSD</span>
            <span className="app-brand__text">
              <span className="app-brand__name">HER SPECIAL DAY</span>
              <span className="app-brand__tag">Pour {config.name} · {config.age} ans</span>
            </span>
          </button>

          <nav className="app-nav" aria-label="Les espaces du parcours">
            {NAV.map((item) => (
              <button
                key={item.id}
                type="button"
                className={`app-nav__link${view === item.id ? " is-active" : ""}`}
                onClick={() => navigate(item.id)}
                aria-current={view === item.id ? "page" : undefined}
              >
                {item.label}
              </button>
            ))}
          </nav>

          <div className="app-tools">
            <span className="app-progress" aria-label={`${visited.length} espaces sur ${TOTAL_STEPS} découverts`}>
              <span className="app-progress__text">{Math.min(visited.length, TOTAL_STEPS)}/{TOTAL_STEPS}</span>
              <span className="app-progress__track" aria-hidden="true">
                <i style={{ width: `${progress * 100}%` }} />
              </span>
            </span>
            <SoundToggle playing={ambient.playing} onToggle={ambient.toggle} />
            <button
              type="button"
              className={`tool-button${visited.length >= 5 ? " has-dot" : ""}`}
              onClick={openGift}
              aria-label="Ouvrir le dernier cadeau"
              title="Le dernier cadeau"
            >
              <Icon name="gift" size={19} />
            </button>
          </div>
        </div>
        <span className="app-header__line" aria-hidden="true">
          <i style={{ width: `${progress * 100}%` }} />
        </span>
      </header>

      <main className="app-main">
        <div className="view-wrap" key={view}>
          {renderView()}
        </div>
      </main>

      <footer className="app-footer">
        <div className="app-footer__inner">
          <div>
            <p className="app-footer__mark">HER <span>special</span> DAY</p>
            <p className="app-footer__note">
              Fait avec soin pour {config.fullName} · {config.age} ans · {config.edition}
            </p>
          </div>
          <div className="app-footer__actions">
            <span className="app-footer__privacy">
              <Icon name="heart" size={13} /> tes mots restent sur cet appareil
            </span>
            <button type="button" className="btn btn--ghost btn--small" onClick={onReset}>
              Rejouer depuis le début
            </button>
          </div>
        </div>
      </footer>

      <FinalGiftModal open={giftOpen} onClose={closeGift} />
    </div>
  );
}
