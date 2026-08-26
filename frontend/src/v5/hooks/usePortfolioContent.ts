import { useEffect, useState } from 'react';
import { fallbackContent } from '../content/fallback';
import { loadPortfolioContent } from '../content/contentful';

export function usePortfolioContent() {
  const [content, setContent] = useState(fallbackContent);

  useEffect(() => {
    let active = true;
    loadPortfolioContent().then((next) => active && setContent(next));
    return () => {
      active = false;
    };
  }, []);

  return content;
}
