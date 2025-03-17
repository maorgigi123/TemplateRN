import api from "../helpers/instance";
import { getPredefinedValue, getIsServicePredefined } from "../helpers/handlePredefined";
import { timeout, apiErrorHandler } from "../../utils/helper"; 
import { BASE_URL } from "@env";
import { JWT_REFRESH_TOKEN_STORAGE_KEY, JWT_TOKEN_STORAGE_KEY, TIMEOUT_GENERAL } from "../../constants/keys";
import logger from "../../utils/logger";
import { IResponse } from "api/models/ResponseModels";
import { listingServiceResponse, loginServiceResponse, LogOutServiceResponse, RegisterServiceResponse } from "../../data"; 
import { removeItemFromStorage, setItemToStorage } from "../../utils/storage";

/**
 * שירות הרשמה
 */

export const RegisterService = async (username: string, email: string, password: string,phone: string , location:string)=> {
    logger("RegisterService");

    const isPredefinedService = await getIsServicePredefined("RegisterService");

    if (isPredefinedService) {
        const index = await getPredefinedValue("RegisterService");
        await timeout(TIMEOUT_GENERAL);
        return apiErrorHandler(RegisterServiceResponse[index]);
    } else {
        const result = await api.post<IResponse<null>>(
            BASE_URL + "api/auth/register",
            { username, email, password,phone,location },
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
        const result = await api.post<IResponse<{ 
            token: string; 
            refreshToken: string; 
            user: { id: string; username: string; email: string } 
        }>>(
            BASE_URL + "api/auth/login",
            { email, password },
            { timeout: TIMEOUT_GENERAL }
        );
         // Store the JWT token in storage after successful login
         const token = result?.data?.data?.token;
         const refreshToken = result?.data?.data?.refreshToken;

        // Store both tokens in local storage
        await setItemToStorage(JWT_REFRESH_TOKEN_STORAGE_KEY, refreshToken);
         await setItemToStorage(JWT_TOKEN_STORAGE_KEY, token); // Save token to storage
        return apiErrorHandler(result.data);
    }
};


export const LogOutService = async () => {
    logger("LogOutService");
    const isPredefinedService = await getIsServicePredefined("LogOutService");
    console.log(BASE_URL)
    if (isPredefinedService) {
        const index = await getPredefinedValue("LogOutService");
        await timeout(TIMEOUT_GENERAL);
        await removeItemFromStorage(JWT_REFRESH_TOKEN_STORAGE_KEY,);
        await removeItemFromStorage(JWT_TOKEN_STORAGE_KEY);
        return apiErrorHandler(LogOutServiceResponse[index]);
    } else {
        const result = await api.post<IResponse<null>>(
            BASE_URL + "api/logout",
            { timeout: TIMEOUT_GENERAL }
        );

        await removeItemFromStorage(JWT_REFRESH_TOKEN_STORAGE_KEY,);
        await removeItemFromStorage(JWT_TOKEN_STORAGE_KEY);

        return apiErrorHandler(result.data);
    }
};


/**
 * שירות לקבלת רשימת מודעות עם דפדוף (Pagination)
 */
export const getListingsService = async (page: number = 1, limit: number = 10) => {
    logger("getListingsService");

    const isPredefinedService = await getIsServicePredefined("getListingsService");

    if (isPredefinedService) {
        const index = await getPredefinedValue("getListingsService");
        await timeout(TIMEOUT_GENERAL);
        const listings = listingServiceResponse[index].data.listings;
        const start = (page - 1) * limit;
        const end = page * limit;

        // Paginate the listings by slicing the array
        const paginatedListings = listings.slice(start, end);
 
        return apiErrorHandler({
            ...listingServiceResponse[index],
            data: {
                listings: paginatedListings,
                total: listings.length, // Return the total number of listings
            },
        });
    } else {
    const result = await api.get<IResponse<{ listings: any[]; totalPages: number , currentPage:number}>>(
        `${BASE_URL}api/getPaginatedListings?page=${page}&limit=${limit}`,
        { timeout: TIMEOUT_GENERAL }
    );

    return apiErrorHandler(result.data);
    }
};

