import {
  saveSecureData,
  getSecureData,
  deleteSecureData,
} from '../utils/secureStorage';

const AUTH_TOKEN_KEY = 'authToken';

export const saveAuthToken = async (token: string): Promise<void> => {
  await saveSecureData(AUTH_TOKEN_KEY, token);
};

export const getAuthToken = async (): Promise<string | null> => {
  return await getSecureData(AUTH_TOKEN_KEY);
};

export const clearAuthToken = async (): Promise<void> => {
  await deleteSecureData(AUTH_TOKEN_KEY);
};
