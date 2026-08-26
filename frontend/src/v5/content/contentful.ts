import { createClient } from 'contentful';
import { fallbackContent } from './fallback';
import type { DesktopFolder, PortfolioContent, Project, RichTextNode, SkillGroup, SocialLink } from '../types/content';

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
const asArray = <T,>(value: T | T[] | undefined): T[] => Array.isArray(value) ? value : value ? [value] : [];
const richTextDocument = (value: any): RichTextNode | undefined =>
  value?.nodeType === 'document' && Array.isArray(value.content) ? value as RichTextNode : undefined;

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
      projectType: details.type,
      language: details.language,
      period: start ? `${start} — ${end}` : undefined,
      accent: item.color,
      descriptionDocument: richTextDocument(item.text ?? item.description),
      gallery: asArray(details.images).map((asset: any, assetIndex: number) => ({
        id: idOf(asset, `project-image-${assetIndex}`),
        title: fieldsOf(asset).title ?? `${item.name ?? 'Project'} image ${assetIndex + 1}`,
        image: fileUrl(asset) ?? '',
      })).filter((asset) => asset.image),
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
      textDocument: richTextDocument(item.text),
      isNotWorking: item.isNotWorking,
      notWorkingText: item.notWorkingText,
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

const normaliseSkillGroups = (items: any): SkillGroup[] =>
  asArray(items).map(fieldsOf).map((item) => ({
    category: item.category ?? 'Skills',
    items: asArray(item.list).filter((value): value is string => typeof value === 'string'),
  })).filter((group) => group.items.length > 0);

const PERSONAL_INFORMATION_CONTENT_TYPE = 'personalInformation';

const getEntries = async (client: ReturnType<typeof createClient>, contentType?: string) => {
  if (!contentType) return [];
  const collection = await client.getEntries({
    content_type: contentType,
    include: 10,
    limit: 1000,
  });
  return collection.items;
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
    const [infoEntries, themeEntries, portfolioEntries, desktopEntries, toolEntries] = await Promise.all([
      getEntries(client, PERSONAL_INFORMATION_CONTENT_TYPE),
      getEntries(client, import.meta.env.REACT_APP_CONTENTFUL_GET_THEME),
      getEntries(client, import.meta.env.REACT_APP_CONTENTFUL_GET_PORTFOLIO),
      getEntries(client, import.meta.env.REACT_APP_CONTENTFUL_GET_DESKTOP),
      getEntries(client, import.meta.env.REACT_APP_CONTENTFUL_GET_TOOL),
    ]);
    const info = fieldsOf(infoEntries[0]);
    const theme = fieldsOf(themeEntries[0]);
    const desktop = fieldsOf(desktopEntries[0]);
    const toolContent = fieldsOf(toolEntries[0]);
    const projectEntries = portfolioEntries.flatMap((entry) => {
      const fields = fieldsOf(entry);
      return Array.isArray(fields.portfolio) ? fields.portfolio : [entry];
    });
    const contacts = asArray(info.contact).map(fieldsOf);
    const email = contacts.find((item: Fields) => item.email)?.email;
    const phone = contacts.find((item: Fields) => item.telephone)?.telephone;

    return {
      ...fallbackContent,
      name: [info.name, info.surname].filter(Boolean).join(' ') || fallbackContent.name,
      role: info.role ?? fallbackContent.role,
      location: [info.city, info.country].filter(Boolean).join(', ') || fallbackContent.location,
      about: plainText(info.about_me ?? info.aboutMe) || fallbackContent.about,
      aboutDocument: richTextDocument(info.about_me ?? info.aboutMe),
      birthdate: info.birthdate,
      company: info.company,
      email: email ?? info.email ?? fallbackContent.email,
      phone,
      whatsAppMessage: contacts.find((item: Fields) => item.whatsAppMessage)?.whatsAppMessage,
      telegramUrl: fallbackContent.telegramUrl,
      avatar: fileUrl(info.image),
      resumeUrl: fileUrl(info.resume) ?? info.resumeUrl,
      desktopBackground: fileUrl(theme.desktopBackgroundImage),
      mobileBackground: fileUrl(theme.mobileBackgroundImage),
      socials: normaliseSocials(info.social).length ? normaliseSocials(info.social) : fallbackContent.socials,
      skillGroups: normaliseSkillGroups(toolContent.languages).length ? normaliseSkillGroups(toolContent.languages) : fallbackContent.skillGroups,
      tools: asArray(toolContent.tools).filter((value): value is string => typeof value === 'string'),
      projects: normaliseProjects(projectEntries).length ? normaliseProjects(projectEntries) : fallbackContent.projects,
      folders: normaliseFolders(desktop.folders),
    };
  } catch (error) {
    console.warn('Content could not be refreshed; showing the local portfolio copy.', error);
    return fallbackContent;
  }
}
