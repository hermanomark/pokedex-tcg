import api from './client';
import { getErrorMessage } from '@/utils/errorHandler';

export const getCategories = async () => {
  try {
    const response = await api.get('/categories');

    return response.data;
  } catch (error: unknown) {
    console.log('Error fetching categories', error);

    throw new Error(getErrorMessage(error, 'Error fetching categories!'));
  }
}

export const getTypes = async () => {
  try {
    const response = await api.get('/types');

    return response.data;
  } catch (error: unknown) {
    console.log('Error fetching types', error);

    throw new Error(getErrorMessage(error, 'Error fetching types!'));
  }
}

export const getReatreats = async () => {
  try {
    const response = await api.get('/reatreats');

    return response.data;
  } catch (error: unknown) {
    console.log('Error fetching reatreats', error);

    throw new Error(getErrorMessage(error, 'Error fetching reatreats!'));
  }
}

export const getRarities = async () => {
  try {
    const response = await api.get('/rarities');

    return response.data;
  } catch (error: unknown) {
    console.log('Error fetching rarities', error);

    throw new Error(getErrorMessage(error, 'Error fetching rarities!'));
  }
}

export const getHp = async () => {
  try {
    const response = await api.get('/hp');

    return response.data;
  } catch (error: unknown) {
    console.log('Error fetching hp', error);

    throw new Error(getErrorMessage(error, 'Error fetching hp!'));
  }
}