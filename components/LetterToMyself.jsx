"use client";

import { useEffect, useRef, useState } from "react";
import { config, letterPrompts, pastLetter } from "@/data/content";
import { toast } from "@/lib/celebrate";
import { readStored, writeStored } from "@/lib/storage";
import Icon from "./Icons";
import SectionIntro from "./SectionIntro";

export default function LetterToMyself() {
  const [openKeepsake, setOpenKeepsake] = useState(false);
  const [letter, setLetter] = useState("");
  const [savedAt, setSavedAt] = useState("");
  const textareaRef = useRef(null);

  useEffect(() => {
    setLetter(readStored("hsd:letter", ""));
    setSavedAt(readStored("hsd:letter-saved", ""));
  }, []);

  function appendPrompt(prompt) {
    setLetter((current) => `${current}${current.trim() ? "\n\n" : ""}${prompt}\n`);
    window.setTimeout(() => {
      if (textareaRef.current) {
        textareaRef.current.focus();
        textareaRef.current.selectionStart = textareaRef.current.value.length;
        textareaRef.current.selectionEnd = textareaRef.current.value.length;
      }
    }, 0);
  }

  function saveLetter() {
    writeStored("hsd:letter", letter);
    const stamp = new Date().toLocaleDateString("fr-FR", {
      day: "numeric",
      month: "long",
      year: "numeric"
    });
    writeStored("hsd:letter-saved", stamp);
    setSavedAt(stamp);
    toast(letter.trim() ? "Ta lettre est gardée sur cet appareil" : "La page est enregistrée, prête à être écrite");
  }

  function downloadLetter() {
    if (!letter.trim()) {
      toast("Écris quelques mots avant de télécharger");
      return;
    }
    const content = `Dear Me, Happy Birthday !\n\n${letter}\n\n— ${config.fullName}, ${config.age} ans\n`;
    const blob = new Blob([content], { type: "text/plain;charset=utf-8" });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = url;
    link.download = "lettre-a-moi.txt";
    document.body.appendChild(link);
    link.click();
    link.remove();
    URL.revokeObjectURL(url);
    toast("Ta lettre a été téléchargée");
  }

  return (
    <section className="view">
      <SectionIntro
        eyebrow="02 — Lettre à moi"
        title={
          <>
            Dear Me, <em>Happy Birthday!</em>
          </>
        }
        lead="Une lettre de celle que tu étais, puis une page blanche pour celle que tu deviens. Personne d'autre que toi ne lira ces mots."
        aside={
          <div className="section-chip">
            <span className="section-chip__num">21</span>
            <span>le chapitre qui commence</span>
          </div>
        }
      />

      <div className="letter-layout">
        <div className={`keepsake${openKeepsake ? " is-open" : ""}`}>
          {!openKeepsake ? (
            <button
              type="button"
              className="keepsake__closed"
              onClick={() => setOpenKeepsake(true)}
              aria-expanded={false}
            >
              <span className="keepsake__stamp" aria-hidden="true">✦</span>
              <span className="keepsake__eyebrow">Une lettre du passé</span>
              <span className="keepsake__title">{pastLetter.title}</span>
              <span className="keepsake__date">{pastLetter.date}</span>
              <span className="keepsake__open">
                Lire la lettre <Icon name="arrow" size={15} />
              </span>
              <span className="keepsake__seal" aria-hidden="true">{config.signature}</span>
            </button>
          ) : (
            <article className="keepsake__paper">
              <p className="eyebrow">
                <span className="eyebrow__line" />
                Une lettre du passé
              </p>
              <h1 className="keepsake__paper-title">{pastLetter.title}</h1>
              {pastLetter.paragraphs.map((paragraph) => (
                <p key={paragraph.slice(0, 18)}>{paragraph}</p>
              ))}
              <p className="keepsake__sign">{pastLetter.sign}</p>
              <button
                type="button"
                className="btn btn--ghost btn--small"
                onClick={() => setOpenKeepsake(false)}
              >
                <Icon name="arrow-left" size={14} /> Replier la lettre
              </button>
            </article>
          )}
        </div>

        <div className="letter-editor">
          <div className="letter-editor__head">
            <div>
              <p className="eyebrow">À toi d&apos;écrire</p>
              <h3 className="letter-editor__title">Ta lettre à toi-même</h3>
            </div>
            <span className="letter-editor__privacy">
              <Icon name="heart" size={14} /> reste sur ton appareil
            </span>
          </div>

          <div className="letter-prompts" aria-label="Idées pour commencer">
            {letterPrompts.map((prompt) => (
              <button
                type="button"
                className="letter-prompt"
                key={prompt}
                onClick={() => appendPrompt(prompt)}
              >
                {prompt}
              </button>
            ))}
          </div>

          <label className="sr-only" htmlFor="self-letter">
            Écris une lettre à toi-même
          </label>
          <textarea
            id="self-letter"
            ref={textareaRef}
            className="letter-editor__textarea"
            value={letter}
            onChange={(event) => setLetter(event.target.value)}
            placeholder="A Moi-même, cette année, je te souhaite…"
            rows={12}
          />

          <div className="letter-editor__foot">
            <span className="letter-editor__count">
              {letter.trim() ? `${letter.trim().split(/\s+/).length} mots` : "Une page entière pour toi"}
              {savedAt ? ` · enregistrée le ${savedAt}` : ""}
            </span>
            <div className="letter-editor__actions">
              <button type="button" className="btn btn--gold btn--small" onClick={downloadLetter}>
                <Icon name="download" size={14} /> Télécharger
              </button>
              <button type="button" className="btn btn--primary btn--small" onClick={saveLetter}>
                <Icon name="heart" size={14} /> Enregistrer ma lettre
              </button>
            </div>
          </div>
        </div>
      </div>

      <p className="section-foot">
        Tu peux revenir ici autant de fois que tu veux. Les mots ont le droit de changer.
        <span aria-hidden="true"> ✦</span>
      </p>
    </section>
  );
}
