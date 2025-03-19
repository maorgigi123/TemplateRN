import { CARD_BORDER, GREEN, GREY_TEXT, RED } from "../styles/universalColors";
import { IListingStatus } from "../types/response";
import { useTheme } from "../hooks/useTheme";

export const statusCalc = (status: IListingStatus): string => {
    const themeColor = useTheme()
    switch (status) {
      case "available":
        return GREEN;  // Define GREEN in your constants or theme
      case "sold":
        return GREY_TEXT;  // Define GREY_TEXT in your constants or theme
      case "pending":
        return CARD_BORDER;  // Define CARD_BORDER in your constants or theme
      case "expired":
        return RED;  // Define RED in your constants or theme
      default:
        return themeColor.TEXT;  // Default color if status is not found
    }
  };
  