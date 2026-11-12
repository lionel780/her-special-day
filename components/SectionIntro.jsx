export default function SectionIntro({ eyebrow, title, lead, aside }) {
  return (
    <header className="section-head">
      <div>
        <p className="eyebrow">
          <span className="eyebrow__line" />
          {eyebrow}
        </p>
        <h2 className="h2">{title}</h2>
        {lead ? <p className="lead">{lead}</p> : null}
      </div>
      {aside ? <div className="section-head__aside">{aside}</div> : null}
    </header>
  );
}
