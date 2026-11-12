export function celebrate(options = {}) {
  if (typeof window === "undefined") return;
  window.dispatchEvent(new CustomEvent("hsd:confetti", { detail: options }));
}

export function toast(message) {
  if (typeof window === "undefined") return;
  window.dispatchEvent(new CustomEvent("hsd:toast", { detail: message }));
}
