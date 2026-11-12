import Icon from "./Icons";

export default function SoundToggle({ playing, onToggle, className = "" }) {
  return (
    <button
      type="button"
      className={`sound-toggle ${playing ? "is-playing" : ""} ${className}`.trim()}
      onClick={onToggle}
      aria-pressed={playing}
      aria-label={playing ? "Mettre l'ambiance musicale en pause" : "Activer l'ambiance musicale"}
      title={playing ? "Couper la musique" : "Activer la musique"}
    >
      <span className="sound-toggle__icon" aria-hidden="true">
        <Icon name={playing ? "sound" : "sound-off"} size={18} />
      </span>
      <span className="sound-toggle__bars" aria-hidden="true">
        <i />
        <i />
        <i />
      </span>
    </button>
  );
}
