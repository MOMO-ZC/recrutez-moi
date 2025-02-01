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
