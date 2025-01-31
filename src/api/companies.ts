import apiClient from './apiClient';

export const registerCompany = async (data: any) => {
  try {
    const response = await apiClient.post('/companies/register', data);

    if (response.status === 200) {
      const { token, role, id_user } = response.data;
      const id = response.data.id_company.toString();
      const userId = id_user.toString();
      return { token, id, role, userId };
    } else {
      throw new Error('Invalid credentials');
    }
  } catch (error) {
    console.error('Register error:', error);
    throw error;
  }
};
