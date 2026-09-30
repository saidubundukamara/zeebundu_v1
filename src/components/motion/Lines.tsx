/** Splits a headline into masked lines that rise in on load (CSS only). */
export function Lines({ lines }: { lines: string[] }) {
  return (
    <>
      {lines.map((line, i) => (
        <span key={i} className="line-mask">
          <span className="line-rise" style={{ '--line': i } as React.CSSProperties}>
            {line}
          </span>
        </span>
      ))}
    </>
  )
}

/**
 * Break a headline into lines: at sentence ends first, then wherever a line
 * would pass `max` characters.
 */
export function splitHeadline(text: string, max = 18) {
  const sentences = text.match(/[^.!?]+[.!?]*\s*/g) ?? [text]
  const lines: string[] = []
  for (const sentence of sentences) {
    let current = ''
    for (const word of sentence.trim().split(/\s+/)) {
      if (current && (current + ' ' + word).length > max) {
        lines.push(current)
        current = word
      } else {
        current = current ? `${current} ${word}` : word
      }
    }
    if (current) lines.push(current)
  }
  return lines
}
