import apiClient from './apiClient';

export const registerCompany = async (data: any) => {
  try {
    const response = await apiClient.post('/companies/register', data);

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
