import axios from 'axios';

const language: string = 'en';

const api = axios.create({
  baseURL: `https://api.tcgdex.net/v2/${language}`
});

export default api;
