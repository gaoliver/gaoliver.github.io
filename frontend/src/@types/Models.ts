/* eslint-disable camelcase */

import { Document } from '@contentful/rich-text-types';

export type WindowListProps = {
  id: string;
  title: string;
  minimized: boolean;
  content: JSX.Element;
};

export type PortfolioModel = {
  name: string;
  company: string;
  mainImage: string;
  url: string;
  slug: string;
  color: string;
  jobInfo: {
    role: string;
    type: string;
    language: string;
    startDate: string;
    endDate?: string;
    mainTools: Array<string>;
    images: Array<string>;
  };
  text?: string;
};

export type ToolsModel = {
  description: string;
  languages: {
    pro: Array<string>;
    intermediate: Array<string>;
    beginner: Array<string>;
  };
  tools: Array<string>;
};

export interface ThemeModelApi {
  desktopBackgroundImage: string;
  mobileBackgroundImage: string;
  isMaintenanceMode?: boolean;
  maintenanceText?: string;
}

export interface SocialNetwork {
  id: string;
  name: string;
  url: string;
  image: string;
}

export interface Contact {
  name: string;
  telephone: string;
  email: string;
  whatsAppMessage: string;
}

export interface PersonalDetails {
  image: string;
  name: string;
  surname: string;
  birthdate: string;
  role: string;
  company: string;
  city: string;
  country: string;
  contact: Array<Contact>;
  social: Array<SocialNetwork>;
  about_me: Document;
  resume: {
    fields: {
      title: string;
      description: string;
      file: {
        url: string;
        fileName: string;
      };
    };
  };
}

export interface Folder {
  name: string;
  id: string;
  image: {
    title: string;
    description: string;
    file: {
      url: string;
    };
  };
  type: 'Video' | 'Text' | 'Embed' | 'Gallery';
  url: string;
  youTubeVideoId: string;
  isNotWorking: false;
  notWorkingText: Document;
  text: Document;
  gallery: Array<{
    title: string;
    description: string;
    file: {
      url: string;
      fileName: string;
      contentType: string;
    };
  }>;
}
