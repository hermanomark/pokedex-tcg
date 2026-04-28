import api from './client';
import { getErrorMessage } from '@/utils/errorHandler';
import { type SeriesBase } from '@/types';

interface GetAllSeriesParams {
  page?: number;
  itemsPerPage?: number;
  sortBy?: string;
}

export const getAllSeries = async ({
  page = 1,
  itemsPerPage = 10,
  sortBy = 'releaseDate:ASC'
}: GetAllSeriesParams) => {
  try {
    let url = `/series?pagination:page=${page}&pagination:itemsPerPage=${itemsPerPage}`;

    if (sortBy) {
      const sortByArr = sortBy.split(':');
      url += `&sort:field=${encodeURIComponent(sortByArr[0])}`;
      url += `&sort:order=${encodeURIComponent(sortByArr[1])}`;
    }

    const response = await api.get<SeriesBase[]>(url);

    return response.data;
  } catch (error: unknown) {
    console.log('Error fetching all series', error);

    throw new Error(getErrorMessage(error, 'Error fetching all series!'));
  }
}

export const getSeriesById = async (id: string) => {
  try {
    const response = await api.get<SeriesBase>(`/series/${id}`);

    return response.data;
  } catch (error: unknown) {
    console.log('Error fetching series', error);

    throw new Error(getErrorMessage(error, 'Error fetching series!'));
  }
}