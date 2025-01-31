import apiClient from '../api/apiClient';

export const loginUser = async (email: string, password: string) => {
  try {
    const response = await apiClient.post('/auth/login', { email, password });

    if (response.status === 200) {
      const { token, role } = response.data;
      const id =
        role === 'candidate'
          ? response.data.id_candidate.toString()
          : response.data.id_company.toString();
      console.log('Login response:', response.data);

      return { token, id, role };
    } else {
      throw new Error('Invalid credentials');
    }
  } catch (error) {
    console.error('Login error:', error);
    throw error;
  }
};
