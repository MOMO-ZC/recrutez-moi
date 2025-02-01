import AsyncStorage from '@react-native-async-storage/async-storage';
import apiClient from './apiClient';
import { Language } from '../types';
import { LANGUAGE } from '../constants/language';

const LANGUAGE_STORAGE_KEY = 'cachedLanguages';
const LAST_FETCH_KEY = 'lastFetchTime';
const CACHE_DURATION = 24 * 60 * 60 * 1000; // 24 hours in milliseconds

const LANGUAGE_LEVELS: ('beginner' | 'intermediate' | 'advanced' | 'native')[] =
  ['beginner', 'intermediate', 'advanced', 'native'];

export const getLanguages = async (): Promise<Language[]> => {
  try {
    // Check last fetch time
    const lastFetch = await AsyncStorage.getItem(LAST_FETCH_KEY);
    const now = Date.now();

    if (lastFetch && now - Number(lastFetch) < CACHE_DURATION) {
      // Use cached data if recent
      const cachedLanguages = await AsyncStorage.getItem(LANGUAGE_STORAGE_KEY);
      if (cachedLanguages) {
        try {
          return JSON.parse(cachedLanguages);
        } catch (parseError) {
          console.error('Error parsing cached languages:', parseError);
        }
      }
    }

    // Fetch languages from API
    const response = await apiClient.get('/languages');
    if (response.status === 200) {
      const partialLanguages: { name: string; id: number }[] =
        response.data.languages;

      // Generate all levels for each language while keeping the same ID
      const languages: Language[] = partialLanguages.flatMap((language) =>
        LANGUAGE_LEVELS.map((level) => ({
          id: language.id,
          name: language.name,
          level,
        }))
      );

      // Cache the fetched data
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

    // Generate Mock Languages with levels, keeping same ID per language
    const mockLanguages: Language[] = LANGUAGE.flatMap((lang, index) =>
      LANGUAGE_LEVELS.map((level) => ({
        id: index + 1,
        name: lang,
        level,
      }))
    );
    return mockLanguages;
  }
};
