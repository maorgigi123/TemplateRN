import AsyncStorage from "@react-native-async-storage/async-storage";
import logger from "./logger";

export const getItemFromStorage = async (key: string) => {
  try {
    const data = await AsyncStorage.getItem(key);
    if (data) {
      return data;
    } else {
      return null;
    }
  } catch {
    logger("Did not get data from the memory");
  }
};

export const setItemToStorage = async (key: string, data: object | string) => {
  try {
    console.log("key ",key)
    console.log("data ",typeof data)
    await AsyncStorage.setItem(
      key,
      typeof data === "string" ? data : JSON.stringify(data)
    );
    return data;
  } catch {
    logger("Did not save data in the memory");
  }
};

export const removeItemFromStorage = async (key: string) => {
  try {
    await AsyncStorage.removeItem(key);
  } catch (err) {
    logger("Did not remove data from the memory");
  }
};
