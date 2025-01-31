import apiClient from '../api/apiClient';

export const loginUser = async (email: string, password: string) => {
  try {
    const response = await apiClient.post('/auth/login', { email, password });

    if (response.status === 200) {
      const { token, role, user_id } = response.data;
      const userId = user_id.toString();
      const id =
        role === 'candidate'
          ? response.data.id_candidate.toString()
          : response.data.id_company.toString();
      console.log('Login response:', response.data);

      return { token, id, role, userId };
    } else {
      throw new Error('Invalid credentials');
    }
  } catch (error) {
    console.error('Login error:', error);
    throw error;
  }
};

export const getUser = async (userId: string) => {
  try {
    const response = await apiClient.get(`/users/${userId}`);

    if (response.status === 200) {
      return response.data;
    } else {
      throw new Error('Failed to fetch user');
    }
  } catch (error) {
    console.error('Error fetching user:', error);
    throw error;
  }
};
