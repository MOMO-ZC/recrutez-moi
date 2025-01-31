import AsyncStorage from '@react-native-async-storage/async-storage';
import apiClient from './apiClient';
import { Language } from '../types';

const LANGUAGE_STORAGE_KEY = 'cachedLanguages';
const LAST_FETCH_KEY = 'lastFetchTime';
const CACHE_DURATION = 24 * 60 * 60 * 1000; // 24 hours in milliseconds

export const getLanguages = async (): Promise<Language[]> => {
  try {
    const lastFetch = await AsyncStorage.getItem(LAST_FETCH_KEY);
    const now = Date.now();

    if (lastFetch && now - Number(lastFetch) < CACHE_DURATION) {
      const cachedLanguages = await AsyncStorage.getItem(LANGUAGE_STORAGE_KEY);
      if (cachedLanguages) {
        return JSON.parse(cachedLanguages);
      }
    }

    const response = await apiClient.get('/languages');
    if (response.status === 200) {
      const LANGUAGE_LEVEL: (
        | 'beginner'
        | 'intermediate'
        | 'advanced'
        | 'native'
      )[] = ['beginner', 'intermediate', 'advanced', 'native'];
      const partialLanguage: { name: string; id: number }[] =
        response.data.languages;
      const languages: Language[] = partialLanguage.map((language) => ({
        ...language,
        level:
          LANGUAGE_LEVEL[Math.floor(Math.random() * LANGUAGE_LEVEL.length)],
      }));
      await AsyncStorage.setItem(
        LANGUAGE_STORAGE_KEY,
        JSON.stringify(languages)
      );
      await AsyncStorage.setItem(LAST_FETCH_KEY, now.toString());

      return languages;
    } else {
      throw new Error('Failed to fetch languages');
    }
  } catch (error) {
    console.error('Error fetching languages:', error);
    return [];
  }
};
