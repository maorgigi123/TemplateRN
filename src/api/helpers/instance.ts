import axios, { AxiosError } from "axios";
import { JWT_REFRESH_TOKEN_STORAGE_KEY, JWT_TOKEN_STORAGE_KEY } from "../../constants/keys";
import { getItemFromStorage, setItemToStorage } from "../../utils/storage";
import { BASE_URL } from "@env";
import { Alert } from "react-native";

const instance = axios.create();

instance.interceptors.request.use(async (config) => {
  const jwt = await getItemFromStorage(JWT_TOKEN_STORAGE_KEY);
  if (jwt) {
    config.headers['Authorization'] = `Bearer ${jwt}`; // Set token in Authorization header
  }
  return config;
});

instance.interceptors.response.use(
  async (response) => {
    // Update token if backend sends a new one
    const authHeader = response.headers?.["authorization"];
    const newJwt = authHeader?.startsWith("Bearer ") ? authHeader.split(" ")[1] : null;
        if (newJwt && newJwt !== "") {
      await setItemToStorage(JWT_TOKEN_STORAGE_KEY, newJwt);
    }
    return response;
  },
  async (error: AxiosError) => {
    if (error.response?.status === 401) { // If token is expired
      console.warn("🔄 Access token expired, refreshing...");

      if (!error.config) {
        console.error("⚠️ No config available for retry. Rejecting request.");
        return Promise.reject(error);
      }

      // Get the refresh token
      const refreshToken = await getItemFromStorage(JWT_REFRESH_TOKEN_STORAGE_KEY);
      if (!refreshToken) {
        console.error("⚠️ No refresh token available. User must log in again.");
        return Promise.reject(error);
      }

      try {
        // Call refresh endpoint
        const refreshResponse = await axios.post(`${BASE_URL}refresh-token`, { refreshToken });
        const newToken = refreshResponse.data.data.token;
        const newRefreshToken = refreshResponse.data.data.refreshToken;
        // Store new tokens
        await setItemToStorage(JWT_TOKEN_STORAGE_KEY, newToken);
        await setItemToStorage(JWT_REFRESH_TOKEN_STORAGE_KEY, newRefreshToken);

        // Retry the original request with the new token
        error.config.headers["Authorization"] = `Bearer ${newToken}`;
        Alert.alert('set new accses and refresh tokencod')
        return axios(error.config);
      } catch (refreshError) {
        console.error("❌ Refresh token failed. Logging out...");
        await setItemToStorage(JWT_TOKEN_STORAGE_KEY, "");
        await setItemToStorage(JWT_REFRESH_TOKEN_STORAGE_KEY, "");
        return Promise.reject(refreshError);
      }
    }
    return Promise.reject(error);
  }
);

export default instance;
