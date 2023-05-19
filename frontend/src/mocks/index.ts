import axios from "axios";

export const baseUrl =
  'https://raw.githubusercontent.com/gaoliver/gaoliver.github.io/master';

axios.defaults.baseURL = 'http://localhost:8000';

const location = baseUrl + '/frontend/src/mocks/';

const version = '';

export const toolsUrl = location + 'tools.json' + version;
// export const myInfoUrl = location + 'my-info.json' + version;
export const portfolioUrl = location + 'portfolio.json' + version;

// export const toolsUrl = '/tools';
export const myInfoUrl = '/personal-details';
// export const portfolioUrl = '/portfolio';
