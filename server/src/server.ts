require('dotenv').config();
import http from 'http';
import { Client } from '@notionhq/client';

interface SocialNetworks {
  id: string;
  name: string;
  url: string;
  image: string;
}

interface Contact {
  id: string;
  name: string;
  telephone: string;
  email: string;
}

interface PersonalDetails {
  name: string;
  surname: string;
  birthdate: string;
  role: string;
  company: string;
  city: string;
  country: string;
  contact: Array<Contact>;
  social: Array<SocialNetworks>;
}

const notionDatabaseId = process.env.NOTION_DATABASE_ID;
const notionSecret = process.env.NOTION_SECRET;

if (!notionDatabaseId || !notionSecret) {
  throw Error('Must define NOTION_SECRET and NOTION_DATABASE_ID in env');
}

const notion = new Client({
  auth: notionSecret
});

const host = 'localhost';
const port = 8000;

const server = http.createServer(async (req, res) => {
  res.setHeader('Access-Control-Allow-Origin', '*');

  switch (req.url) {
    case '/':
      const personalDetailsQuery = await notion.databases.query({
        database_id: notionDatabaseId
      });
      const contactsQuery = await notion.databases.query({
        database_id: '5b04c218c2de46b7baf392fe8eb1393e'
      });
      const socialQuery = await notion.databases.query({
        database_id: '9de876af295c44b0a0a3a1009df4737e'
      });

      const contacts: Contact[] = contactsQuery.results.map((prop: any) => ({
        id: prop.id,
        name: prop.properties.name.title[0].plain_text,
        email: prop.properties.email.email,
        telephone: prop.properties.telephone.rich_text[0].plain_text
      }));

      const socialNetworks: SocialNetworks[] = socialQuery.results.map(
        (prop: any) => ({
          id: prop.id,
          name: prop.properties.name.title[0].plain_text,
          url: prop.properties.url.url,
          image: prop.properties.image.rich_text[0].plain_text
        })
      );

      const personalDetails: PersonalDetails[] =
        personalDetailsQuery.results.map((prop: any) => ({
          name: prop.properties.name.title[0].plain_text,
          surname: prop.properties.surname.rich_text[0].plain_text,
          birthdate: prop.properties.birthdate.date.start,
          role: prop.properties.role.rich_text[0].plain_text,
          company: prop.properties.company.rich_text[0].plain_text,
          city: prop.properties.city.rich_text[0].plain_text,
          country: prop.properties.country.rich_text[0].plain_text,
          contact: contacts,
          social: socialNetworks
        }));

      // const personalDetails = query.results

      res.setHeader('Content-Type', 'application/json');
      res.writeHead(200);
      res.end(JSON.stringify(personalDetails));
      break;

    default:
      res.setHeader('Content-Type', 'application/json');
      res.writeHead(404);
      res.end(JSON.stringify({ error: 'Resource not found' }));
  }
});

server.listen(port, host, () => {
  console.log(`Server is running on http://${host}:${port}`);
});
