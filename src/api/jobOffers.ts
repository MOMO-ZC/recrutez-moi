import { JobOffer } from '../types';
import apiClient from './apiClient';

export const addJobOffer = async (data: any) => {
  try {
    const response = await apiClient.post('/offers/', data);

    if (response.status === 200) {
      return response.data;
    } else {
      throw new Error('Invalid credentials');
    }
  } catch (error) {
    console.error('Register error:', error);
    throw error;
  }
};

export const editJobOffer = async (data: any, id: string) => {
  try {
    const response = await apiClient.patch(`/offers/${id}`, data);

    if (response.status === 200) {
      return response.data;
    } else {
      throw new Error('Invalid credentials');
    }
  } catch (error) {
    console.error('Register error:', error);
    throw error;
  }
};

export const getJobOffer = async (id: string): Promise<JobOffer[]> => {
  try {
    const response = await apiClient.get(`/offers/${id}`);

    if (response.status === 200) {
      return response.data;
    } else {
      throw new Error('Invalid credentials');
    }
  } catch (error) {
    console.error('Register error:', error);
    throw error;
  }
};

export const getJobOffers = async (): Promise<JobOffer[]> => {
  try {
    const response = await apiClient.get('/offers/');

    if (response.status === 200) {
      return response.data;
    } else {
      throw new Error('Invalid credentials');
    }
  } catch (error) {
    console.error('Register error:', error);
    throw error;
  }
};

export const getSortedJobOffers = async (): Promise<JobOffer[]> => {
  try {
    const response = await apiClient.get(`/offers/sort`);

    if (response.status === 200) {
      return response.data;
    } else {
      throw new Error('Invalid credentials');
    }
  } catch (error) {
    console.error('Register error:', error);
    throw error;
  }
};

export const likeOffer = async (userId: string, offerId: string) => {
  try {
    const response = await apiClient.post(`/offers/${offerId}/like`, {
      userId,
    });

    if (response.status === 200) {
      return response.data;
    } else {
      throw new Error('Invalid credentials');
    }
  } catch (error) {
    console.error('like error:', error);
    throw error;
  }
};

export const unlikeOffer = async (userId: string, offerId: string) => {
  try {
    const response = await apiClient.post(`/offers/${offerId}/unlike`, {
      userId,
    });

    if (response.status === 200) {
      return response.data;
    } else {
      throw new Error('Invalid credentials');
    }
  } catch (error) {
    console.error('dislike error:', error);
    throw error;
  }
};
