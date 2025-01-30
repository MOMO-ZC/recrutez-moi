import {
  saveSecureData,
  getSecureData,
  deleteSecureData,
} from '../utils/secureStorage';

const AUTH_TOKEN_KEY = 'authToken';
const ROLE_KEY = 'role';
const ID_KEY = 'id';

export const saveAuthToken = async (token: string): Promise<void> => {
  await saveSecureData(AUTH_TOKEN_KEY, token);
};

export const getAuthToken = async (): Promise<string | null> => {
  return await getSecureData(AUTH_TOKEN_KEY);
};

export const clearAuthToken = async (): Promise<void> => {
  await deleteSecureData(AUTH_TOKEN_KEY);
};

export const saveRole = async (role: string): Promise<void> => {
  await saveSecureData(ROLE_KEY, role);
};

export const getRole = async (): Promise<string | null> => {
  return await getSecureData(ROLE_KEY);
};

export const clearRole = async (): Promise<void> => {
  await deleteSecureData(ROLE_KEY);
};

export const saveId = async (id: string): Promise<void> => {
  await saveSecureData(ID_KEY, id);
};

export const getId = async (): Promise<string | null> => {
  return await getSecureData(ID_KEY);
};

export const clearId = async (): Promise<void> => {
  await deleteSecureData(ID_KEY);
};
