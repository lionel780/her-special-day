"use client";

import { useEffect, useRef, useState } from "react";

export default function Toast() {
  const [message, setMessage] = useState("");
  const [visible, setVisible] = useState(false);
  const timerRef = useRef(null);

  useEffect(() => {
    function onToast(event) {
      setMessage(event.detail);
      setVisible(true);
      window.clearTimeout(timerRef.current);
      timerRef.current = window.setTimeout(() => setVisible(false), 2400);
    }

    window.addEventListener("hsd:toast", onToast);
    return () => {
      window.removeEventListener("hsd:toast", onToast);
      window.clearTimeout(timerRef.current);
    };
  }, []);

  return (
    <div className={`toast${visible ? " is-visible" : ""}`} role="status" aria-live="polite">
      {message}
    </div>
  );
}
