"use client";

import { soundtrack } from "@/data/content";
import Icon from "./Icons";
import SectionIntro from "./SectionIntro";

export default function Soundtrack({ ambient }) {
  const activeMood = soundtrack.moods.find((mood) => mood.id === ambient.mood) || soundtrack.moods[0];

  return (
    <section className="view">
      <SectionIntro
        eyebrow="06 — Ton ambiance"
        title={
          <>
            La bande-son de <em>ton année</em>
          </>
        }
        lead="Trois ambiances composées en direct, pour accompagner les moments où tu as besoin d'un peu de douceur. Et quelques morceaux qui te ressemblent."
        aside={
          <div className="section-chip">
            <span className="section-chip__num">03</span>
            <span>ambiances à écouter</span>
          </div>
        }
      />

      <div className="soundtrack-layout">
        <div className={`ambient-player${ambient.playing ? " is-playing" : ""}`}>
          <div className="ambient-player__top">
            <div>
              <p className="ambient-player__eyebrow">En direct dans ton navigateur</p>
              <h3 className="ambient-player__title">{activeMood.name}</h3>
              <p className="ambient-player__desc">{activeMood.description}</p>
            </div>
            <div className="ambient-player__orb" aria-hidden="true">
              <span />
              <span />
              <span />
              <span />
            </div>
          </div>

          <div className="ambient-player__moods">
            {soundtrack.moods.map((mood) => {
              const active = ambient.mood === mood.id && ambient.playing;
              return (
                <button
                  key={mood.id}
                  type="button"
                  className={`mood-button${active ? " is-active" : ""}`}
                  onClick={() => ambient.selectMood(mood.id)}
                  aria-pressed={active}
                  aria-label={`${active ? "Mettre en pause" : "Écouter"} l'ambiance ${mood.name}`}
                >
                  <span className="mood-button__name">{mood.name}</span>
                  <span className="mood-button__note">{mood.note}</span>
                  <span className="mood-button__play" aria-hidden="true">
                    <Icon name={active ? "sound" : "music"} size={15} />
                  </span>
                </button>
              );
            })}
          </div>

          <div className="ambient-player__foot">
            <span className="equalizer" aria-hidden="true">
              <i /><i /><i /><i /><i />
            </span>
            <p>
              {ambient.playing
                ? "La musique joue doucement. Tu peux la couper à tout moment."
                : "Choisis une ambiance pour commencer. Le son est généré en direct."}
            </p>
          </div>
        </div>

        <div className="playlist">
          <div className="playlist__head">
            <p className="eyebrow">Compagnons de route</p>
            <h3 className="playlist__title">Les morceaux de ton année</h3>
          </div>
          <ol className="playlist__list">
            {soundtrack.tracks.map((track, index) => (
              <li className="playlist__item" key={track.title}>
                <span className="playlist__num">{String(index + 1).padStart(2, "0")}</span>
                <span className="playlist__meta">
                  <span className="playlist__song">{track.title}</span>
                  <span className="playlist__artist">{track.artist}</span>
                </span>
                <span className="playlist__note">{track.note}</span>
              </li>
            ))}
          </ol>
          <p className="playlist__hint">
            À retrouver sur ta plateforme d&apos;écoute préférée. Ici, seules les ambiances sont jouées.
          </p>
        </div>
      </div>

      <p className="section-foot">
        Certaines chansons savent dire ce que les mots ne savent pas.
        <span aria-hidden="true"> ✦</span>
      </p>
    </section>
  );
}
