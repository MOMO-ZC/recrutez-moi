import AsyncStorage from '@react-native-async-storage/async-storage';
import apiClient from './apiClient';
import { Skill } from '../types';

const SKILLS_STORAGE_KEY = 'cachedSkills';
const LAST_FETCH_KEY = 'lastFetchTime';
const CACHE_DURATION = 24 * 60 * 60 * 1000; // 24 hours in milliseconds

export const getSkills = async (): Promise<Skill[]> => {
  try {
    const lastFetch = await AsyncStorage.getItem(LAST_FETCH_KEY);
    const now = Date.now();

    if (lastFetch && now - Number(lastFetch) < CACHE_DURATION) {
      const cachedSkills = await AsyncStorage.getItem(SKILLS_STORAGE_KEY);
      if (cachedSkills) {
        return JSON.parse(cachedSkills);
      }
    }

    const response = await apiClient.get('/skills');
    if (response.status === 200) {
      const skills: Skill[] = response.data.skills;

      await AsyncStorage.setItem(SKILLS_STORAGE_KEY, JSON.stringify(skills));
      await AsyncStorage.setItem(LAST_FETCH_KEY, now.toString());

      return skills;
    } else {
      throw new Error('Failed to fetch skills');
    }
  } catch (error) {
    console.error('Error fetching skills:', error);

    return [];
  }
};
