import Constants from 'expo-constants';

const config = Constants.expoConfig?.extra || {};

export const API = config.API_URL;
