import * as SecureStore from 'expo-secure-store';

export const saveSecureData = async (
  key: string,
  value: string
): Promise<void> => {
  try {
    await SecureStore.setItemAsync(key, value);
    console.log(`${key} saved successfully.`);
  } catch (error) {
    console.error('Failed to save the data to secure storage:', error);
  }
};

export const getSecureData = async (key: string): Promise<string | null> => {
  try {
    const value = await SecureStore.getItemAsync(key);
    if (value) {
      console.log(`${key} retrieved successfully:`, value);
    } else {
      console.log(`${key} not found.`);
    }
    return value;
  } catch (error) {
    console.error('Failed to retrieve the data from secure storage:', error);
    return null;
  }
};

export const deleteSecureData = async (key: string): Promise<void> => {
  try {
    await SecureStore.deleteItemAsync(key);
    console.log(`${key} deleted successfully.`);
  } catch (error) {
    console.error('Failed to delete the data from secure storage:', error);
  }
};
