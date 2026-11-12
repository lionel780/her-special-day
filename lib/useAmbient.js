"use client";

import { useCallback, useEffect, useRef, useState } from "react";

const MOODS = {
  aube: {
    filter: 1450,
    chords: [
      [196.0, 246.94, 293.66, 392.0],
      [174.61, 220.0, 261.63, 349.23],
      [164.81, 207.65, 246.94, 329.63],
      [196.0, 246.94, 293.66, 392.0]
    ]
  },
  or: {
    filter: 1750,
    chords: [
      [220.0, 277.18, 329.63, 440.0],
      [196.0, 246.94, 293.66, 392.0],
      [174.61, 220.0, 261.63, 349.23],
      [220.0, 277.18, 329.63, 440.0]
    ]
  },
  nuit: {
    filter: 1050,
    chords: [
      [130.81, 164.81, 196.0, 261.63],
      [116.54, 146.83, 174.61, 233.08],
      [110.0, 138.59, 164.81, 220.0],
      [130.81, 164.81, 196.0, 261.63]
    ]
  }
};

class AmbientEngine {
  constructor() {
    const AudioContextClass = window.AudioContext || window.webkitAudioContext;
    this.context = new AudioContextClass();
    this.master = this.context.createGain();
    this.master.gain.value = 0.0001;
    this.filter = this.context.createBiquadFilter();
    this.filter.type = "lowpass";
    this.filter.frequency.value = 1600;
    this.filter.Q.value = 0.4;
    this.delay = this.context.createDelay(1);
    this.delay.delayTime.value = 0.42;
    this.feedback = this.context.createGain();
    this.feedback.gain.value = 0.24;
    this.filter.connect(this.master);
    this.filter.connect(this.delay);
    this.delay.connect(this.feedback);
    this.feedback.connect(this.delay);
    this.delay.connect(this.master);
    this.master.connect(this.context.destination);
    this.mood = "or";
    this.timer = null;
    this.chordIndex = 0;
    this.voices = new Set();
  }

  async start(mood) {
    this.mood = mood || this.mood;
    if (this.context.state === "suspended") {
      await this.context.resume();
    }
    const now = this.context.currentTime;
    this.master.gain.cancelScheduledValues(now);
    this.master.gain.setValueAtTime(Math.max(this.master.gain.value, 0.0001), now);
    this.master.gain.exponentialRampToValueAtTime(0.052, now + 1.8);
    this.filter.frequency.cancelScheduledValues(now);
    this.filter.frequency.setTargetAtTime(MOODS[this.mood].filter, now, 1.2);
    if (!this.timer) {
      this.scheduleChord();
      this.timer = window.setInterval(() => this.scheduleChord(), 7200);
    }
  }

  setMood(mood) {
    this.mood = mood;
    if (this.timer) {
      this.filter.frequency.setTargetAtTime(
        MOODS[mood].filter,
        this.context.currentTime,
        1.2
      );
      this.scheduleChord();
    }
  }

  scheduleChord() {
    const spec = MOODS[this.mood];
    const chord = spec.chords[this.chordIndex % spec.chords.length];
    this.chordIndex += 1;
    const now = this.context.currentTime;
    const duration = 9.2;

    chord.forEach((frequency, index) => {
      const oscillator = this.context.createOscillator();
      const gain = this.context.createGain();
      oscillator.type = index === chord.length - 1 ? "triangle" : "sine";
      oscillator.frequency.value = frequency;
      oscillator.detune.value = (Math.random() - 0.5) * 7;
      gain.gain.setValueAtTime(0.0001, now);
      gain.gain.exponentialRampToValueAtTime(
        index === chord.length - 1 ? 0.012 : 0.032,
        now + 2.4
      );
      gain.gain.exponentialRampToValueAtTime(0.0001, now + duration);
      oscillator.connect(gain);
      gain.connect(this.filter);
      oscillator.start(now);
      oscillator.stop(now + duration + 0.2);
      this.voices.add(oscillator);
      oscillator.onended = () => {
        this.voices.delete(oscillator);
        oscillator.disconnect();
        gain.disconnect();
      };
    });
  }

  stop() {
    const now = this.context.currentTime;
    this.master.gain.cancelScheduledValues(now);
    this.master.gain.setValueAtTime(Math.max(this.master.gain.value, 0.0001), now);
    this.master.gain.exponentialRampToValueAtTime(0.0001, now + 0.7);
    if (this.timer) {
      window.clearInterval(this.timer);
      this.timer = null;
    }
    window.setTimeout(() => {
      if (this.context.state === "running" && !this.timer) {
        this.context.suspend().catch(() => {});
      }
    }, 900);
  }

  destroy() {
    this.stop();
    this.voices.forEach((voice) => {
      try {
        voice.stop();
      } catch {
        return;
      }
    });
    this.voices.clear();
    window.setTimeout(() => {
      this.context.close().catch(() => {});
    }, 1000);
  }
}

export function useAmbient() {
  const engineRef = useRef(null);
  const [playing, setPlaying] = useState(false);
  const [mood, setMoodState] = useState("or");

  const ensureEngine = useCallback(() => {
    if (!engineRef.current) {
      engineRef.current = new AmbientEngine();
    }
    return engineRef.current;
  }, []);

  const play = useCallback(
    async (nextMood) => {
      const engine = ensureEngine();
      const chosen = nextMood || mood;
      setMoodState(chosen);
      await engine.start(chosen);
      setPlaying(true);
    },
    [ensureEngine, mood]
  );

  const stop = useCallback(() => {
    if (!engineRef.current) return;
    engineRef.current.stop();
    setPlaying(false);
  }, []);

  const toggle = useCallback(() => {
    if (playing) {
      stop();
    } else {
      play(mood);
    }
  }, [mood, play, playing, stop]);

  const setMood = useCallback(
    (nextMood) => {
      setMoodState(nextMood);
      if (engineRef.current && playing) {
        engineRef.current.setMood(nextMood);
      }
    },
    [playing]
  );

  const selectMood = useCallback(
    (nextMood) => {
      if (playing && mood === nextMood) {
        stop();
        return;
      }
      play(nextMood);
    },
    [mood, play, playing, stop]
  );

  useEffect(() => {
    return () => {
      if (engineRef.current) {
        engineRef.current.destroy();
        engineRef.current = null;
      }
    };
  }, []);

  return { playing, mood, toggle, setMood, play, stop, selectMood };
}
