"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
require('dotenv').config();
const http_1 = __importDefault(require("http"));
const client_1 = require("@notionhq/client");
const notionDatabaseId = process.env.NOTION_DATABASE_ID;
const notionSecret = process.env.NOTION_SECRET;
if (!notionDatabaseId || !notionSecret) {
    throw Error('Must define NOTION_SECRET and NOTION_DATABASE_ID in env');
}
const notion = new client_1.Client({
    auth: notionSecret
});
const host = 'localhost';
const port = 8000;
const server = http_1.default.createServer((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    res.setHeader('Access-Control-Allow-Origin', '*');
    switch (req.url) {
        case '/':
            const personalDetailsQuery = yield notion.databases.query({
                database_id: notionDatabaseId
            });
            const contactsQuery = yield notion.databases.query({
                database_id: '5b04c218c2de46b7baf392fe8eb1393e'
            });
            const socialQuery = yield notion.databases.query({
                database_id: '9de876af295c44b0a0a3a1009df4737e'
            });
            const contacts = contactsQuery.results.map((prop) => ({
                id: prop.id,
                name: prop.properties.name.title[0].plain_text,
                email: prop.properties.email.email,
                telephone: prop.properties.telephone.rich_text[0].plain_text
            }));
            const socialNetworks = socialQuery.results.map((prop) => ({
                id: prop.id,
                name: prop.properties.name.title[0].plain_text,
                url: prop.properties.url.url,
                image: prop.properties.image.rich_text[0].plain_text
            }));
            const personalDetails = personalDetailsQuery.results.map((prop) => ({
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
}));
server.listen(port, host, () => {
    console.log(`Server is running on http://${host}:${port}`);
});
