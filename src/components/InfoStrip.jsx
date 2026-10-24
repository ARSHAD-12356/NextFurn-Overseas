import '../styles/info-strip.css';

/* Thin green ribbon between the product range and the banner carousel.
   Items come from the price list cover (product lines) and the NFSOC chair specs (3 years warranty). */
const ITEMS = [
  { icon: 'office', text: 'Premium Office Furniture' },
  { icon: 'shield', text: '3 Years Warranty on Office Chairs' },
  { icon: 'school', text: 'Institutional Furniture' },
  { icon: 'tools', text: 'Custom Solutions' },
  { icon: 'health', text: 'Healthcare Furniture' },
  { icon: 'diamond', text: 'Premium Quality' },
  { icon: 'seat', text: 'Public Seating Solutions' },
  { icon: 'users', text: 'Trusted By 1000+ Clients' },
];

function Icon({ name }) {
  const c = { viewBox: '0 0 24 24', fill: 'none', stroke: 'currentColor', strokeWidth: 1.7, strokeLinecap: 'round', strokeLinejoin: 'round', 'aria-hidden': true };
  switch (name) {
    case 'office': return <svg {...c}><path d="M3 10h18v3H3z" /><path d="M5 13v7M19 13v7M14 13v4h5" /><path d="M8 10V6h5v4" /></svg>;
    case 'shield': return <svg {...c}><path d="M12 3 4.5 6v5.5c0 4.6 3.2 8.2 7.5 9.5 4.3-1.3 7.5-4.9 7.5-9.5V6z" /><path d="m8.5 12 2.4 2.4 4.6-4.8" /></svg>;
    case 'school': return <svg {...c}><path d="M22 10v6M2 10l10-5 10 5-10 5z" /><path d="M6 12v5c3 3 9 3 12 0v-5" /></svg>;
    case 'tools': return <svg {...c}><path d="M14.7 6.3a4 4 0 0 0-5.4 5.4L3 18l3 3 6.3-6.3a4 4 0 0 0 5.4-5.4l-2.5 2.5-2.5-.7-.7-2.5z" /></svg>;
    case 'health': return <svg {...c}><path d="M2 4v16M2 14h18a2 2 0 0 0 2-2V8a2 2 0 0 0-2-2H8M22 10v10" /><path d="M14 6v4M12 8h4" /></svg>;
    case 'diamond': return <svg {...c}><path d="M6 4h12l3 5-9 11L3 9z" /><path d="M3 9h18" /></svg>;
    case 'seat': return <svg {...c}><path d="M3 13h18M5 13V8a2 2 0 0 1 2-2h2a2 2 0 0 1 2 2v5M13 13V8a2 2 0 0 1 2-2h2a2 2 0 0 1 2 2v5" /><path d="M4 13l-1 6M20 13l1 6M12 13v6" /></svg>;
    case 'users': return <svg {...c}><circle cx="9" cy="8" r="3" /><path d="M3.5 19a5.5 5.5 0 0 1 11 0" /><circle cx="17" cy="9" r="2.4" /><path d="M15.5 14.2A4.5 4.5 0 0 1 21 18.5" /></svg>;
    default: return null;
  }
}

function Row({ hidden }) {
  return (
    <ul className="ns-row" aria-hidden={hidden || undefined}>
      {ITEMS.map((it) => (
        <li key={it.text}>
          <span className="ns-icon"><Icon name={it.icon} /></span>
          <span>{it.text}</span>
          <span className="ns-dot" aria-hidden="true" />
        </li>
      ))}
    </ul>
  );
}

export default function InfoStrip() {
  return (
    <div className="ns-strip" role="region" aria-label="Why NextFurn">
      <div className="ns-track">
        <Row />
        <Row hidden />
      </div>
    </div>
  );
}