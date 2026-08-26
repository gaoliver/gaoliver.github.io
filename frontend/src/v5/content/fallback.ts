import type { PortfolioContent } from '../types/content';

export const fallbackContent: PortfolioContent = {
  name: 'Gabriel Ramos',
  role: 'Senior Fullstack Developer',
  location: 'Netherlands · working worldwide',
  about:
    'I design and build dependable digital products, turning complex business needs into clear, maintainable software. My work spans product thinking, frontend craft, backend architecture and technical leadership.',
  email: 'hello@gabrielramos.app',
  socials: [
    { label: 'LinkedIn', url: 'https://www.linkedin.com/' },
    { label: 'GitHub', url: 'https://github.com/gaoliver' },
    { label: 'Instagram', url: 'https://www.instagram.com/' },
  ],
  projects: [
    {
      id: 'platforms',
      name: 'Digital platforms',
      company: 'Selected work',
      summary: 'Scalable web products built around strong domain models, responsive interfaces and pragmatic engineering.',
      tools: ['React', 'TypeScript', 'Node.js'],
      accent: '#78dcca',
    },
    {
      id: 'product',
      name: 'Product experiences',
      company: 'Design & engineering',
      summary: 'Interfaces that make demanding workflows feel calm, direct and human.',
      tools: ['UX', 'Design systems', 'Accessibility'],
      accent: '#f4bd7a',
    },
  ],
  folders: [],
};
