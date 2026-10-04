import { Fragment, type CSSProperties } from "react";

/** "built as *walls*" → built as <em>walls</em> (italic accent word). */
function accented(line: string) {
  return line.split(/(\*[^*]+\*)/).map((part, i) =>
    part.startsWith("*") && part.endsWith("*") ? <em key={i}>{part.slice(1, -1)}</em> : part,
  );
}

type LinesProps = {
  /** Authored line breaks; wrap a word in *asterisks* for an italic accent. Each line may still wrap on narrow screens; it then rises as one. */
  lines: readonly string[];
  /** Delay before the first line rises, in ms. */
  delay?: number;
};

/**
 * Server-rendered masked lines for above-the-fold headings. The rise is a pure
 * CSS animation, so it plays before hydration and never starts from opacity 0.
 * Place inside the heading element: <h1><Lines lines={[...]} /></h1>
 */
export function Lines({ lines, delay = 0 }: LinesProps) {
  return (
    <span className="lines-enter block" style={{ "--delay": `${delay}ms` } as CSSProperties}>
      {lines.map((line, i) => (
        <Fragment key={i}>
          <span className="line-mask">
            <span className="line-inner" style={{ "--i": i } as CSSProperties}>
              {accented(line)}
            </span>
          </span>
          {i < lines.length - 1 && " "}
        </Fragment>
      ))}
    </span>
  );
}
