import { Fragment, type ReactNode } from 'react';
import type { RichTextNode } from '../types/content';

interface Props { document?: RichTextNode; className?: string; }

const assetUrl = (target: any): string | undefined => {
  const url = target?.fields?.file?.url;
  return typeof url === 'string' ? (url.startsWith('//') ? `https:${url}` : url) : undefined;
};

const renderNode = (node: RichTextNode, key: string): ReactNode => {
  if (node.nodeType === 'text') {
    let value: ReactNode = (node.value ?? '').replace(/<[^>]*>/g, '');
    for (const mark of node.marks ?? []) {
      if (mark.type === 'bold') value = <strong>{value}</strong>;
      if (mark.type === 'italic') value = <em>{value}</em>;
      if (mark.type === 'underline') value = <u>{value}</u>;
      if (mark.type === 'code') value = <code>{value}</code>;
    }
    return <Fragment key={key}>{value}</Fragment>;
  }
  const children = node.content?.map((child, index) => renderNode(child, `${key}-${index}`));
  switch (node.nodeType) {
    case 'document': return <Fragment key={key}>{children}</Fragment>;
    case 'paragraph': return <p key={key}>{children}</p>;
    case 'heading-1': return <h1 key={key}>{children}</h1>;
    case 'heading-2': return <h2 key={key}>{children}</h2>;
    case 'heading-3': return <h3 key={key}>{children}</h3>;
    case 'heading-4': return <h4 key={key}>{children}</h4>;
    case 'unordered-list': return <ul key={key}>{children}</ul>;
    case 'ordered-list': return <ol key={key}>{children}</ol>;
    case 'list-item': return <li key={key}>{children}</li>;
    case 'blockquote': return <blockquote key={key}>{children}</blockquote>;
    case 'hr': return <hr key={key} />;
    case 'hyperlink': return node.data?.uri ? <a key={key} href={node.data.uri} target="_blank" rel="noreferrer">{children}</a> : children;
    case 'embedded-asset-block': {
      const src = assetUrl(node.data?.target);
      return src ? <img key={key} src={src} alt={String((node.data?.target as any)?.fields?.title ?? '')} loading="lazy" /> : null;
    }
    default: return <Fragment key={key}>{children}</Fragment>;
  }
};

export function RichText({ document, className }: Props) {
  return document ? <div className={className}>{renderNode(document, 'root')}</div> : null;
}
