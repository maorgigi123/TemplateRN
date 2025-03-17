import { AxiosError } from "axios";
import { IResponse } from "../api/models/ResponseModels";

export const timeout = async (ms: number) => {
    return new Promise((resolve) => setTimeout(resolve, ms));
  };
  
  export const apiErrorHandler = <T>(response: IResponse<T>) => {
    if (response.isError || response.messageCode !== 0) {
      throw new AxiosError(
        JSON.stringify(response.data),
        response.messageCode.toString()
      );
    } else {
      return response.data as T;
    }
  };