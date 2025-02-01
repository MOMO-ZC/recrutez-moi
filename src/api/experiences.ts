import AsyncStorage from '@react-native-async-storage/async-storage';
import apiClient from './apiClient';
import { Experience } from '../types';

const SKILLS_STORAGE_KEY = 'cachedExperiences';
const LAST_FETCH_KEY = 'lastFetchTime';
const CACHE_DURATION = 24 * 60 * 60 * 1000; // 24 hours in milliseconds

export const getExperiences = async (): Promise<Experience[]> => {
  try {
    const lastFetch = await AsyncStorage.getItem(LAST_FETCH_KEY);
    const now = Date.now();

    if (lastFetch && now - Number(lastFetch) < CACHE_DURATION) {
      const cachedExperiences = await AsyncStorage.getItem(SKILLS_STORAGE_KEY);
      if (cachedExperiences) {
        return JSON.parse(cachedExperiences);
      }
    }

    const response = await apiClient.get('/experiences');
    if (response.status === 200) {
      const experiences: Experience[] = response.data.experiences;

      await AsyncStorage.setItem(
        SKILLS_STORAGE_KEY,
        JSON.stringify(experiences)
      );
      await AsyncStorage.setItem(LAST_FETCH_KEY, now.toString());

      return experiences;
    } else {
      2;
      throw new Error('Failed to fetch experiences');
    }
  } catch (error) {
    console.error('Error fetching experiences:', error);

    return [];
  }
};
