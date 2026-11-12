"use client";

import { useEffect, useState } from "react";
import BirthdayReveal from "./BirthdayReveal";
import ConfettiCanvas from "./ConfettiCanvas";
import Gate from "./Gate";
import MainExperience from "./MainExperience";
import SoundToggle from "./SoundToggle";
import Toast from "./Toast";
import { useAmbient } from "@/lib/useAmbient";
import { readStored, removeStored, writeStored } from "@/lib/storage";

const RESET_KEYS = [
  "hsd:unlocked",
  "hsd:visited",
  "hsd:wishlist",
  "hsd:letter",
  "hsd:letter-saved",
  "hsd:goals"
];

export default function Experience() {
  const [stage, setStage] = useState("loading");
  const ambient = useAmbient();

  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const preview = process.env.NODE_ENV === "development" ? params.get("preview") : null;
    if (preview === "reveal") {
      setStage("reveal");
      return;
    }
    if (preview === "main") {
      setStage("main");
      return;
    }
    const unlocked = readStored("hsd:unlocked", false);
    setStage(unlocked === true ? "main" : "gate");
  }, []);

  function unlock() {
    writeStored("hsd:unlocked", true);
    setStage("reveal");
    window.scrollTo({ top: 0, behavior: "auto" });
  }

  function enterExperience() {
    setStage("main");
    window.scrollTo({ top: 0, behavior: "auto" });
  }

  function resetExperience() {
    RESET_KEYS.forEach((key) => removeStored(key));
    ambient.stop();
    setStage("gate");
    window.scrollTo({ top: 0, behavior: "auto" });
  }

  if (stage === "loading") {
    return (
      <div className="boot">
        <div className="boot__mark">
          <span>✦</span>
          <strong>HSD</strong>
          <span>✦</span>
        </div>
        <p>Her special day</p>
      </div>
    );
  }

  return (
    <>
      <ConfettiCanvas />
      <Toast />
      {stage !== "main" ? (
        <div className={`ambient-dock${stage === "reveal" ? " ambient-dock--dark" : ""}`}>
          <SoundToggle playing={ambient.playing} onToggle={ambient.toggle} />
        </div>
      ) : null}
      {stage === "gate" ? <Gate onUnlock={unlock} /> : null}
      {stage === "reveal" ? <BirthdayReveal onContinue={enterExperience} /> : null}
      {stage === "main" ? <MainExperience ambient={ambient} onReset={resetExperience} /> : null}
    </>
  );
}
