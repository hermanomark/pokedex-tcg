import axios from 'axios';

const language = 'en';

const api = axios.create({
  baseURL: `https://api.tcgdex.net/v2/${language}`
});

export default api;
