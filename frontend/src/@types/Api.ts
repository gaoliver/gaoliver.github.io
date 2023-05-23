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
}

export interface PersonalDetails {
  name: string;
  surname: string;
  birthdate: string;
  role: string;
  company: string;
  city: string;
  country: string;
  contact: Array<Contact>;
  social: Array<SocialNetwork>;
  // eslint-disable-next-line camelcase
  about_me: string;
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
  name: string;
  surname: string;
  birthdate: string;
  city: string;
  company: string;
  country: string;
  role: string;
  // eslint-disable-next-line camelcase
  about_me: string;
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
        id: number;
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
