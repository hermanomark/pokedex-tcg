import api from './client';
import { getErrorMessage } from '@/utils/errorHandler';

export const getAllSets = async (
  page: number = 1,
  itemsPerPage: number = 10,
  searchName?: string,
  sortBy?: string) => {
  try {
    let url = `/sets?pagination:page=${page}&pagination:itemsPerPage=${itemsPerPage}`;

    if (searchName) {
      url += `&name=${encodeURIComponent(searchName)}`;
    }

    if (sortBy) {
      const sortByArr = sortBy.split(':');
      url += `&sort:field=${encodeURIComponent(sortByArr[0])}`;
      url += `&sort:order=${encodeURIComponent(sortByArr[1])}`;
    }

    console.log(url);

    const response = await api.get(url);

    return response.data;
  } catch (error: unknown) {
    console.error('Error fetching all sets!:', error);

    throw new Error(getErrorMessage(error, 'Error fetching all sets!'));
  }
}

export const getSetById = async (id: string) => {
  try {
    const response = await api.get(`/sets/${id}`);

    return response.data;
  } catch (error: unknown) {
    console.error('Error fetching set:', error);

    throw new Error(getErrorMessage(error, 'Error fetching set!'));
  }
}

export const getAllCardsInSet = async (id: string, page = 1, itemsPerPage = 10) => {
  try {
    const url: string = `/cards?pagination:page=${page}&pagination:itemsPerPage=${itemsPerPage}&set=eq:${id}`;

    const response = await api.get(url);

    return response.data;
  } catch (error: unknown) {
    console.error('Error fetching cards in set:', error);

    throw new Error(getErrorMessage(error, 'Error fetching cards in set!'));
  }
}