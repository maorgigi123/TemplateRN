import api from "../helpers/instance";
import { getPredefinedValue, getIsServicePredefined } from "../helpers/handlePredefined";
import { timeout, apiErrorHandler } from "../../utils/helper"; 
import { BASE_URL } from "@env";
import { JWT_TOKEN_STORAGE_KEY, TIMEOUT_GENERAL } from "../../constants/keys";
import logger from "../../utils/logger";
import { IResponse } from "api/models/ResponseModels";
import { loginServiceResponse, RegisterServiceResponse } from "../../data"; 
import { setItemToStorage } from "../../utils/storage";

/**
 * שירות הרשמה
 */
export const RegisterService = async (username: string, email: string, password: string) => {
    logger("RegisterService");

    const isPredefinedService = await getIsServicePredefined("RegisterService");

    if (isPredefinedService) {
        const index = await getPredefinedValue("RegisterService");
        await timeout(TIMEOUT_GENERAL);
        return apiErrorHandler(RegisterServiceResponse[index]);
    } else {
        const result = await api.post<IResponse<null>>(
            BASE_URL + "register",
            { username, email, password },
            { timeout: TIMEOUT_GENERAL }
        );

        return apiErrorHandler(result.data);
    }
};

/**
 * שירות התחברות
 */
export const LoginService = async (email: string, password: string) => {
    logger("LoginService");

    const isPredefinedService = await getIsServicePredefined("LoginService");
    console.log(BASE_URL)
    if (isPredefinedService) {
        const index = await getPredefinedValue("LoginService");
        await timeout(TIMEOUT_GENERAL);
        return apiErrorHandler(loginServiceResponse[index]);
    } else {
        const result = await api.post<IResponse<{ token: string; user: { id: string; username: string; email: string } }>>(
            BASE_URL + "login",
            { email, password },
            { timeout: TIMEOUT_GENERAL }
        );
         // Store the JWT token in storage after successful login
         const token = result?.data?.data?.token;
         await setItemToStorage(JWT_TOKEN_STORAGE_KEY, token); // Save token to storage
        return apiErrorHandler(result.data);
    }
};
