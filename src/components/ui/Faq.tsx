type FaqProps = {
  items: readonly { q: string; a: string }[];
  className?: string;
};

/** Accessible accordion on native <details>; questions without answers are not rendered. */
export function Faq({ items, className = "" }: FaqProps) {
  const answered = items.filter((i) => i.a.trim());
  if (!answered.length) return null;
  return (
    <div className={`border-t border-line ${className}`}>
      {answered.map((item) => (
        <details key={item.q} className="faq group border-b border-line">
          <summary className="flex cursor-pointer list-none items-baseline justify-between gap-6 py-6 [&::-webkit-details-marker]:hidden">
            <span className="serif text-[clamp(1.25rem,1.1rem+0.6vw,1.625rem)] leading-snug text-ink">{item.q}</span>
            <span
              aria-hidden="true"
              className="label shrink-0 text-muted transition-[rotate] duration-[400ms] ease-soft group-open:rotate-45"
            >
              +
            </span>
          </summary>
          <p className="max-w-[44rem] pb-7 text-body text-ink-soft">{item.a}</p>
        </details>
      ))}
    </div>
  );
}
