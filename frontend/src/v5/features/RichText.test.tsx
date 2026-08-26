import { render, screen } from '@testing-library/react';
import { describe, expect, it } from 'vitest';
import { RichText } from './RichText';

describe('RichText', () => {
  it('renders CMS hyperlinks as safe external links', () => {
    render(<RichText document={{ nodeType: 'document', content: [{ nodeType: 'paragraph', content: [{ nodeType: 'hyperlink', data: { uri: 'https://example.com/feedback' }, content: [{ nodeType: 'text', value: 'Leave feedback' }] }] }] }} />);
    const link = screen.getByRole('link', { name: 'Leave feedback' });
    expect(link.getAttribute('href')).toBe('https://example.com/feedback');
    expect(link.getAttribute('rel')).toBe('noreferrer');
  });

  it('removes legacy inline markup without injecting HTML', () => {
    render(<RichText document={{ nodeType: 'document', content: [{ nodeType: 'paragraph', content: [{ nodeType: 'text', value: '<span class="alert">Enjoy!</span>' }] }] }} />);
    expect(screen.getByText('Enjoy!')).toBeTruthy();
    expect(document.querySelector('.alert')).toBeNull();
  });
});
