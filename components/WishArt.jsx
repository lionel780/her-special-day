import Icon from "./Icons";

const ART_ICONS = {
  perfume: "perfume",
  bag: "bag",
  headphones: "headphones",
  plane: "plane",
  dinner: "dinner",
  flowers: "flowers",
  serum: "serum",
  book: "book",
  concert: "concert",
  palette: "palette"
};

export default function WishArt({ art, tone = "blush" }) {
  return (
    <div className={`wish-art wish-art--${tone}`} aria-hidden="true">
      <span className="wish-art__halo" />
      <span className="wish-art__icon">
        <Icon name={ART_ICONS[art] || "sparkle"} size={44} strokeWidth={1.05} />
      </span>
      <span className="wish-art__star">✦</span>
      <span className="wish-art__grain" />
    </div>
  );
}
