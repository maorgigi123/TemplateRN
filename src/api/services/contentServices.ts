import api from "../helpers/instance";
import { getPredefinedValue, getIsServicePredefined } from "../helpers/handlePredefined";
import { timeout, apiErrorHandler} from "../../utils/helper"; // פונקציית timeout שנוספה מראש
import { BASE_URL } from "@env";
import { IS_PREDEFINED_STORAGE_KEY, PREDEFINED_RESPONSES_STORAGE_KEY, TIMEOUT_GENERAL } from "../../constants/keys";
import logger from '../../utils/logger';
import { IResponse } from "api/models/ResponseModels";
import {
    GetSiteContentServiceResponse,
  } from "../../data";
export const GetSiteContentService = async () => {
    logger("GetSiteContentService");

    // בדוק אם זה שירות מוגדר מראש
    const isPredefinedService = await getIsServicePredefined("GetSiteContentService");
    
    // אם השירות מוגדר מראש, קבל את התגובה המוגדרת
    if (isPredefinedService) {
      const index = await getPredefinedValue("GetSiteContentService");
      await timeout(TIMEOUT_GENERAL); // המתן לפי timeout הכללי
      // החזר את התשובה המוגדרת מראש
      return apiErrorHandler(GetSiteContentServiceResponse[index]);
    } else {
      // אם לא, בצע קריאה ל-API עם axios
      const result = await api.post<IResponse<{ content: string }>>(
        BASE_URL + "ContentManagement/GetSiteContent",
        {},
        { timeout: TIMEOUT_GENERAL } // זמן המתנה מוגדר לכל קריאה
      );

      // חזור עם התשובה של API אחרי טיפול בשגיאות
      return apiErrorHandler(result.data);
    }
};
