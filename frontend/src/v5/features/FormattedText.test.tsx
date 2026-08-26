import { render, screen } from '@testing-library/react';
import { describe, expect, it } from 'vitest';
import { FormattedText } from './FormattedText';

describe('FormattedText', () => {
  it('formats double-underscore and double-asterisk emphasis markers', () => {
    render(<FormattedText text="Built for __Oil & Gas__ with **full traceability**." />);

    expect(screen.getByText('Oil & Gas').tagName).toBe('STRONG');
    expect(screen.getByText('full traceability').tagName).toBe('STRONG');
    expect(screen.queryByText(/__/)).toBeNull();
  });

  it('keeps separated paragraphs readable', () => {
    const { container } = render(<FormattedText text={'First paragraph.\n\nSecond paragraph.'} />);
    expect(container.querySelectorAll('p')).toHaveLength(2);
  });
});
