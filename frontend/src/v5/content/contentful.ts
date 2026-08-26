import { createClient, type Entry } from 'contentful';
import { fallbackContent } from './fallback';
import type { DesktopFolder, PortfolioContent, Project, SocialLink } from '../types/content';

type Fields = Record<string, any>;

const fileUrl = (value: any): string | undefined => {
  const url = value?.fields?.file?.url ?? value?.file?.url;
  if (!url || typeof url !== 'string') return undefined;
  return url.startsWith('//') ? `https:${url}` : url;
};

const plainText = (value: any): string => {
  if (typeof value === 'string') return value;
  if (Array.isArray(value)) return value.map(plainText).filter(Boolean).join('\n');
  if (!value || typeof value !== 'object') return '';
  if (typeof value.value === 'string') return value.value;
  return plainText(value.content);
};

const fieldsOf = (entry: any): Fields => entry?.fields ?? entry ?? {};
const idOf = (entry: any, fallback: string) => entry?.sys?.id ?? fallback;

const normaliseSocials = (items: any): SocialLink[] =>
  (Array.isArray(items) ? items : [])
    .map(fieldsOf)
    .map((item) => ({ label: item.name ?? item.title ?? 'Social', url: item.url ?? item.link ?? '' }))
    .filter((item) => item.url);

const normaliseProjects = (items: any): Project[] =>
  (Array.isArray(items) ? items : []).map((raw, index) => {
    const item = fieldsOf(raw);
    const details = fieldsOf(item.jobInfo);
    const start = details.startDate ? new Date(details.startDate).getFullYear() : undefined;
    const end = details.endDate ? new Date(details.endDate).getFullYear() : 'Now';
    return {
      id: idOf(raw, `project-${index}`),
      name: item.name ?? item.title ?? `Project ${index + 1}`,
      company: item.company,
      summary: plainText(item.text ?? item.description) || 'A selected project from my portfolio.',
      image: fileUrl(item.mainImage ?? item.image),
      url: item.url,
      tools: Array.isArray(details.mainTools) ? details.mainTools : [],
      role: details.role,
      period: start ? `${start} — ${end}` : undefined,
      accent: item.color,
    };
  });

const normaliseFolders = (items: any): DesktopFolder[] =>
  (Array.isArray(items) ? items : []).map((raw, index) => {
    const item = fieldsOf(raw);
    return {
      id: idOf(raw, `folder-${index}`),
      name: item.name ?? `Folder ${index + 1}`,
      type: item.type ?? 'Text',
      image: fileUrl(item.image),
      url: item.url,
      videoId: item.youTubeVideoId,
      text: plainText(item.text),
      gallery: (Array.isArray(item.gallery) ? item.gallery : []).map((asset: any, assetIndex: number) => {
        const image = fieldsOf(asset);
        return {
          id: idOf(asset, `image-${assetIndex}`),
          title: image.title ?? image.name ?? 'Gallery image',
          image: fileUrl(image.image ?? asset) ?? '',
        };
      }).filter((asset: { image: string }) => asset.image),
    };
  });

const getEntry = async (client: ReturnType<typeof createClient>, id?: string): Promise<Entry | undefined> => {
  if (!id) return undefined;
  return client.getEntry(id);
};

export async function loadPortfolioContent(): Promise<PortfolioContent> {
  const space = import.meta.env.REACT_APP_CONTENTFUL_SPACE;
  const accessToken = import.meta.env.REACT_APP_CONTENTFUL_TOKEN;
  if (!space || !accessToken) return fallbackContent;

  const client = createClient({
    space,
    accessToken,
    environment: import.meta.env.REACT_APP_CONTENTFUL_ENV || 'master',
  });

  try {
    const [infoEntry, themeEntry, portfolioEntry, desktopEntry] = await Promise.all([
      getEntry(client, import.meta.env.REACT_APP_CONTENTFUL_GET_INFO),
      getEntry(client, import.meta.env.REACT_APP_CONTENTFUL_GET_THEME),
      getEntry(client, import.meta.env.REACT_APP_CONTENTFUL_GET_PORTFOLIO),
      getEntry(client, import.meta.env.REACT_APP_CONTENTFUL_GET_DESKTOP),
    ]);
    const info = fieldsOf(infoEntry);
    const theme = fieldsOf(themeEntry);
    const portfolio = fieldsOf(portfolioEntry);
    const desktop = fieldsOf(desktopEntry);
    const contacts = (Array.isArray(info.contact) ? info.contact : []).map(fieldsOf);
    const email = contacts.find((item: Fields) => item.type === 'email' || item.name?.toLowerCase().includes('mail'))?.value;
    const phone = contacts.find((item: Fields) => item.type === 'phone' || item.name?.toLowerCase().includes('phone'))?.value;

    return {
      ...fallbackContent,
      name: [info.name, info.surname].filter(Boolean).join(' ') || fallbackContent.name,
      role: info.role ?? fallbackContent.role,
      location: [info.city, info.country].filter(Boolean).join(', ') || fallbackContent.location,
      about: plainText(info.about_me ?? info.aboutMe) || fallbackContent.about,
      email: email ?? info.email ?? fallbackContent.email,
      phone,
      avatar: fileUrl(info.image),
      resumeUrl: fileUrl(info.resume) ?? info.resumeUrl,
      desktopBackground: fileUrl(theme.desktopBackgroundImage),
      mobileBackground: fileUrl(theme.mobileBackgroundImage),
      socials: normaliseSocials(info.social).length ? normaliseSocials(info.social) : fallbackContent.socials,
      projects: normaliseProjects(portfolio.portfolio).length ? normaliseProjects(portfolio.portfolio) : fallbackContent.projects,
      folders: normaliseFolders(desktop.folders),
    };
  } catch (error) {
    console.warn('Content could not be refreshed; showing the local portfolio copy.', error);
    return fallbackContent;
  }
}
