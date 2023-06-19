import { Document } from '@contentful/rich-text-types';
import { Contact } from './Models';

/* eslint-disable camelcase */

export interface GetToolsApi {
  title: string;
  languages: [
    {
      fields: {
        category: string;
        list: Array<string>;
      };
    }
  ];
  tools: Array<string>;
}

export interface GetPersonalDetailsApi {
  image: {
    fields: {
      file: {
        url: string;
      };
    };
  };
  name: string;
  surname: string;
  birthdate: string;
  city: string;
  company: string;
  country: string;
  role: string;
  about_me: Document;
  contact: {
    fields: Contact;
  };
  social: [
    {
      fields: {
        id: string;
        title: string;
        url: string;
        image: {
          fields: {
            title: string;
            file: {
              url: string;
            };
          };
        };
      };
    }
  ];
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

export interface GetPortfolioApi {
  name: string;
  portfolio: [
    {
      fields: {
        name: string;
        company: string;
        mainImage: {
          fields: {
            title: string;
            description: string;
            file: {
              url: string;
            };
          };
        };
        url: string;
        slug: string;
        color: string;
        jobInfo: {
          sys: {
            space: unknown;
            id: string;
            type: string;
            createdAt: string;
            updatedAt: string;
            environment: unknown;
            revision: number;
            contentType: unknown;
            locale: string;
          };
          metadata: {
            tags: Array<unknown>;
          };
          fields: {
            role: string;
            type: string;
            language: string;
            startDate: string;
            endDate: string;
            mainTools: Array<string>;
            images: [
              {
                fields: {
                  title: string;
                  description: string;
                  file: {
                    url: string;
                  };
                };
              }
            ];
          };
        };
        text: string;
      };
    }
  ];
}

export interface GetThemeApi {
  desktopBackgroundImage: {
    fields: {
      file: {
        url: string;
      };
    };
  };
  mobileBackgroundImage: {
    fields: {
      file: {
        url: string;
      };
    };
  };
  isMaintenanceMode: boolean;
  maintenanceText?: string;
}

export interface GetDesktopApi {
  title: string;
  folders: [
    {
      fields: {
        name: string;
        id: string;
        image: {
          fields: {
            title: string;
            description: string;
            file: {
              url: string;
            };
          };
        };
        type: 'Video' | 'Text' | 'Embed' | 'Gallery';
        url: string;
        youTubeVideoId: string;
        isNotWorking: false;
        notWorkingText: Document;
        text: Document;
        gallery: [
          {
            fields: {
              title: string;
              description: string;
              file: {
                url: string;
                fileName: string;
                contentType: string;
              };
            };
          }
        ];
      };
    }
  ];
}
