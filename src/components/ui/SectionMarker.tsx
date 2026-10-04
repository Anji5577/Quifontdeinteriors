type SectionMarkerProps = {
  index: string;
  title: string;
  tone?: "ink" | "light";
  className?: string;
};

/** Small editorial marker, e.g. "(03) — Selected work". Purely presentational. */
export function SectionMarker({ index, title, tone = "ink", className = "" }: SectionMarkerProps) {
  return (
    <p
      className={`label flex items-center gap-3 ${tone === "light" ? "text-umber-muted" : "text-muted"} ${className}`}
    >
      <span>({index})</span>
      <span aria-hidden="true" className="h-px w-8 bg-current opacity-60" />
      <span>{title}</span>
    </p>
  );
}
