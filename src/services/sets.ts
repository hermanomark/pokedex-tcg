import api from './client';
import { getErrorMessage } from '@/utils/errorHandler';
import { type SetBrief, type SetBase, type CardBrief } from '@/types';

interface GetAllSetsParams {
  page?: number;
  itemsPerPage?: number;
  searchName?: string;
  sortBy?: string;
}

interface GetAllCardsInSetParams {
  id: string;
  page?: number;
  itemsPerPage?: number;
}

export const getAllSets = async ({
  page = 1,
  itemsPerPage = 10,
  searchName = '',
  sortBy = ''
}: GetAllSetsParams) => {
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

    const response = await api.get<SetBrief[]>(url);

    return response.data;
  } catch (error: unknown) {
    console.error('Error fetching all sets!:', error);

    throw new Error(getErrorMessage(error, 'Error fetching all sets!'));
  }
}

export const getSetById = async (id: string) => {
  try {
    const response = await api.get<SetBase>(`/sets/${id}`);

    return response.data;
  } catch (error: unknown) {
    console.error('Error fetching set:', error);

    throw new Error(getErrorMessage(error, 'Error fetching set!'));
  }
}

export const getAllCardsInSet = async ({ id, page = 1, itemsPerPage = 10 }: GetAllCardsInSetParams) => {
  try {
    const url: string = `/cards?pagination:page=${page}&pagination:itemsPerPage=${itemsPerPage}&set=eq:${id}`;

    const response = await api.get<CardBrief[]>(url);

    return response.data;
  } catch (error: unknown) {
    console.error('Error fetching cards in set:', error);

    throw new Error(getErrorMessage(error, 'Error fetching cards in set!'));
  }
}