export default function ScrollIndicator({ targetId }) {
  const handleClick = (e) => {
    const target = document.getElementById(targetId);
    if (!target) return;
    e.preventDefault();
    const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    target.scrollIntoView({ behavior: reduce ? 'auto' : 'smooth', block: 'start' });
  };

  return (
    <a
      href={`#${targetId}`}
      className="scroll-indicator"
      data-anim="scroll"
      aria-label="Scroll down to discover more"
      onClick={handleClick}
    >
      <span className="scroll-indicator__ring" aria-hidden="true">
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6">
          <path d="M12 5v14" />
          <path d="M6.5 13.5 12 19l5.5-5.5" />
        </svg>
      </span>
    </a>
  );
}
