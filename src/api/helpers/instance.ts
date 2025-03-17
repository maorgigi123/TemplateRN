import axios from "axios";
import { JWT_TOKEN_STORAGE_KEY } from "../../constants/keys";
import { getItemFromStorage, setItemToStorage } from "../../utils/storage";

const instance = axios.create();

instance.interceptors.request.use(async (config) => {
  const jwt = await getItemFromStorage(JWT_TOKEN_STORAGE_KEY);
  if (jwt) {
    config.headers['Authorization'] = `Bearer ${jwt}`; // Set token in Authorization header
  }
  return config;
});

instance.interceptors.response.use(async (response) => {
  const jwt = await getItemFromStorage(JWT_TOKEN_STORAGE_KEY);
  const newJwt = response.headers?.jwttoken;
  if (jwt !== newJwt && newJwt && newJwt !== "") {
    await setItemToStorage(JWT_TOKEN_STORAGE_KEY, newJwt);
  }
  return response;
});

export default instance;
