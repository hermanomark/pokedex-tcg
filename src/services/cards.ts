import api from "./client";
import { getErrorMessage } from "@/utils/errorHandler";

export const getAllCards = async (
  page: number = 1, 
  itemsPerPage: number = 10, 
  searchName: string = '', 
  category: string = '', 
  types: string[] = [], 
  rarities: string[] = [], 
  hpRange: [number, number] = [0, 500], 
  sortBy: string = ''
) => {
  try {
    let url = `/cards?pagination:page=${page}&pagination:itemsPerPage=${itemsPerPage}`;

    if (searchName) {
      url += `&name=${encodeURIComponent(searchName)}`;
    }

    if (category && category !== 'all') {
      url += `&category=eq:${encodeURIComponent(category)}`;
    }

    if (types.length > 0) {
      url += `&types=${encodeURIComponent(types.join('|'))}`;
    }

    if (rarities.length > 0) {
      url += `&rarity=${encodeURIComponent(rarities.join('|'))}`;
    }

    if (hpRange && (hpRange[0] !== 0 || hpRange[1] !== 380)) {
      url += `&hp=gte:${hpRange[0]}`;
      url += `&hp=lte:${hpRange[1]}`;
    }

    if (sortBy) {
      const sortByArr = sortBy.split(':');
      url += `&sort:field=${encodeURIComponent(sortByArr[0])}`;
      url += `&sort:order=${encodeURIComponent(sortByArr[1])}`;
    }

    url += `&image=notnull:`;

    console.log('Fetching cards with URL:', url);

    const response = await api.get(url);

    return response.data;
  } catch (error: unknown) {
    console.log('Error fetching all cards', error);

    throw new Error(getErrorMessage(error, 'Error fetching all cards!'));
  }
}

export const getCardById = async (id: string) => {
  try {
    const response = await api.get(`/cards/${id}`);

    return response.data;
  } catch (error: unknown) {
    console.log('Error fetching card', error);

    throw new Error(getErrorMessage(error, 'Error fetching card!'));
  }
}
