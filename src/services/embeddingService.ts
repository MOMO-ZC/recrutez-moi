import * as SecureStore from 'expo-secure-store';
import { userJobsEmbedding } from '../constants/vectors';

const VECTOR_KEY = 'embeddingVector';

/**
 * Save the vector to secure storage
 * @param vector - Array of numbers representing the vector
 */
export const saveVector = async (vector: number[]): Promise<void> => {
  await SecureStore.setItemAsync(VECTOR_KEY, JSON.stringify(vector));
};

/**
 * Get the vector from secure storage
 * @returns The vector or a default vector if none exists
 */
export const getVector = async (): Promise<number[]> => {
  const storedVector = await SecureStore.getItemAsync(VECTOR_KEY);
  if (storedVector) {
    return JSON.parse(storedVector);
  }

  const defaultVector = userJobsEmbedding;
  await saveVector(defaultVector);
  return defaultVector;
};

export const clearVector = async (): Promise<void> => {
  await SecureStore.deleteItemAsync(VECTOR_KEY);
};
