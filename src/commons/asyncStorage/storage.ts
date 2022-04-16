import AsyncStorage from '@react-native-async-storage/async-storage';

export const saveObjectToStorage = async (key: string, value: object) => {
  try {
    const jsonValue = JSON.stringify(value);
    await AsyncStorage.setItem(key, jsonValue);
  } catch (error) {
    console.log('Error saving object to storage: ', { key, value }, error);
  }
};

export const getObjectFromStorage = async (key: string) => {
  try {
    const jsonValue = await AsyncStorage.getItem(key);
    return jsonValue != null ? JSON.parse(jsonValue) : null;
  } catch (error) {
    console.log('Error getting object from storage', key, error);
    return [];
  }
};
