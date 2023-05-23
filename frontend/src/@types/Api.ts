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

export interface ToolsRetrieve {
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

export interface PersonalDetailsRetrieve {
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
