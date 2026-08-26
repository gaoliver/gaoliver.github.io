import type { ReactNode } from 'react';

interface FormattedTextProps {
  text: string;
  className?: string;
}

const BOLD_MARKERS = /(\*\*|__)(.+?)\1/g;

function renderInlineFormatting(value: string): ReactNode[] {
  const nodes: ReactNode[] = [];
  let cursor = 0;

  for (const match of value.matchAll(BOLD_MARKERS)) {
    const index = match.index ?? 0;
    if (index > cursor) nodes.push(value.slice(cursor, index));
    nodes.push(<strong key={`${index}-${match[2]}`}>{match[2]}</strong>);
    cursor = index + match[0].length;
  }

  if (cursor < value.length) nodes.push(value.slice(cursor));
  return nodes;
}

export function FormattedText({ text, className }: FormattedTextProps) {
  const paragraphs = text.trim().split(/\n\s*\n/).filter(Boolean);

  return <div className={className}>
    {paragraphs.map((paragraph, paragraphIndex) => <p key={`${paragraphIndex}-${paragraph.slice(0, 24)}`}>
      {paragraph.split('\n').map((line, lineIndex) => <span key={`${lineIndex}-${line.slice(0, 24)}`}>
        {lineIndex > 0 && <br />}
        {renderInlineFormatting(line)}
      </span>)}
    </p>)}
  </div>;
}
