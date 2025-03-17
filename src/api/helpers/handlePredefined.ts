import { PREDEFINED_RESPONSES_STORAGE_KEY } from "../../constants/keys";
import { getItemFromStorage } from "../../utils/storage";

export const getPredefinedJSON = async () => {
  const predefinedJSON = await getItemFromStorage(
    PREDEFINED_RESPONSES_STORAGE_KEY
  );
  return JSON.parse(predefinedJSON as any);
};

export const getPredefinedValue = async (service: string) => {
  const result = await getPredefinedJSON();
  return (
    result?.find((item: { service: string }) => item.service === service)
      .responseIndex ?? 0
  );
};

export const getIsServicePredefined = async (service: string) => {
  const result = await getItemFromStorage(service);
  return result === "true";
};
