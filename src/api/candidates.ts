import apiClient from './apiClient';

export const registerCandidate = async (data: any) => {
  try {
    const { city, country } = data;
    data.address = `${city}, ${country}`;
    const response = await apiClient.post('/candidates/register', data);

    if (response.status === 200) {
      const { token, id, role } = response.data;

      return { token, id, role };
    } else {
      throw new Error('Invalid credentials');
    }
  } catch (error) {
    console.error('Register error:', error);
    throw error;
  }
};
