export interface SocialNetwork {
  id: string;
  name: string;
  url: string;
  image: string;
}

export interface Contact {
  id: string;
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
}
