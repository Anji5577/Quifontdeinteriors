/**
 * Splits a heading into masked lines for the line-rise reveal.
 *
 *   <h2 data-reveal="lines">Wardrobes, built as <em>walls</em>.</h2>
 *   → <h2 data-split>
 *       <span class="line-mask"><span class="line-inner" style="--i:0">Wardrobes,</span></span>
 *       <span class="line-mask"><span class="line-inner" style="--i:1">built as <em>walls</em>.</span></span>
 *     </h2>
 *
 * Words stay real text, so screen readers and translation read the heading
 * normally. Headings may contain text and <em> accents; anything richer is
 * marked split and simply shown.
 */

/** A word is one or more runs, so "walls" (italic) + "." (upright) stay together. */
type Run = { text: string; em: boolean };
type Word = Run[];

const original = new WeakMap<HTMLElement, string>();

function readWords(el: HTMLElement): Word[] | null {
  const words: Word[] = [];
  let current: Word = [];
  for (const node of el.childNodes) {
    const isText = node.nodeType === Node.TEXT_NODE;
    const isEm = node.nodeType === Node.ELEMENT_NODE && (node as Element).tagName === "EM" && node.childNodes.length === 1;
    if (!isText && !isEm) return null;
    for (const piece of (node.textContent ?? "").split(/(\s+)/)) {
      if (!piece) continue;
      if (/^\s+$/.test(piece)) {
        if (current.length) words.push(current);
        current = [];
      } else {
        current.push({ text: piece, em: isEm });
      }
    }
  }
  if (current.length) words.push(current);
  return words;
}

const render = (word: Word) => {
  const fragment = document.createDocumentFragment();
  for (const run of word) {
    if (run.em) {
      const em = document.createElement("em");
      em.textContent = run.text;
      fragment.append(em);
    } else {
      fragment.append(run.text);
    }
  }
  return fragment;
};

export function splitLines(el: HTMLElement) {
  const saved = original.get(el);
  if (saved !== undefined) el.innerHTML = saved;
  const words = readWords(el);
  if (!words) {
    el.setAttribute("data-split", "");
    return;
  }
  original.set(el, el.innerHTML);

  // Measure each word's line in one flowing pass.
  el.textContent = "";
  const spans = words.map((word, i) => {
    const span = document.createElement("span");
    span.append(render(word));
    el.append(span);
    if (i < words.length - 1) el.append(" ");
    return span;
  });

  const lines: Word[][] = [];
  let lastTop = Number.NaN;
  spans.forEach((span, i) => {
    const top = span.offsetTop;
    if (top !== lastTop) {
      lines.push([]);
      lastTop = top;
    }
    lines[lines.length - 1]!.push(words[i]!);
  });

  el.textContent = "";
  lines.forEach((line, i) => {
    const mask = document.createElement("span");
    mask.className = "line-mask";
    const inner = document.createElement("span");
    inner.className = "line-inner";
    inner.style.setProperty("--i", String(i));
    line.forEach((word, j) => {
      inner.append(render(word));
      if (j < line.length - 1) inner.append(" ");
    });
    mask.append(inner);
    el.append(mask);
    if (i < lines.length - 1) el.append(" ");
  });
  el.setAttribute("data-split", "");
}

/** Restores the original markup once the reveal has played, so later resizes reflow naturally. */
export function unsplitLines(el: HTMLElement) {
  const html = original.get(el);
  if (html !== undefined) el.innerHTML = html;
}
