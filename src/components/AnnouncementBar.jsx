import '../styles/announcement-bar.css';

/* Promo ribbon above the navbar. Placeholder offers \u2014 edit before going live. */
const MESSAGES = [
  { icon: 'tag', text: 'Flat 50% OFF at MRP \u2014 Limited Period Offer' },
  { icon: 'spark', text: 'New 2026 Collection is Live \u2014 Office, Healthcare & Institutional' },
  { icon: 'chat', text: 'Free Design Consultation on Bulk & Corporate Orders' },
  { icon: 'tag', text: 'Flat 50% OFF at MRP \u2014 Shop Before Stocks Run Out' },
];

function Icon({ name }) {
  const c = { viewBox: '0 0 24 24', fill: 'none', stroke: 'currentColor', strokeWidth: 1.8, strokeLinecap: 'round', strokeLinejoin: 'round', 'aria-hidden': true };
  switch (name) {
    case 'tag': return <svg {...c}><path d="M3 12V4a1 1 0 0 1 1-1h8l9 9-9 9z" /><circle cx="7.5" cy="7.5" r="1.4" /></svg>;
    case 'spark': return <svg {...c}><path d="M12 3v4M12 17v4M3 12h4M17 12h4M6 6l2.5 2.5M15.5 15.5 18 18M6 18l2.5-2.5M15.5 8.5 18 6" /></svg>;
    case 'chat': return <svg {...c}><path d="M4 5h16v11H9l-5 4z" /><path d="M8 10h8M8 13h5" /></svg>;
    default: return null;
  }
}

function Row({ hidden }) {
  return (
    <ul className="ann-row" aria-hidden={hidden || undefined}>
      {MESSAGES.map((m, i) => (
        <li key={i}>
          <Icon name={m.icon} />
          <span>{m.text}</span>
          <i aria-hidden="true">&#10022;</i>
        </li>
      ))}
    </ul>
  );
}

export default function AnnouncementBar() {
  return (
    <div className="ann-bar" role="region" aria-label="Offers">
      <div className="ann-track">
        <Row />
        <Row hidden />
      </div>
    </div>
  );
}