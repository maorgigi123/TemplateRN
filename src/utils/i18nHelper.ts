import { TextStyle } from "react-native";
import i18n from "../i18n/index";

export const isRTL = () => i18n.i18n.language === "he"; // Add more RTL languages if needed

export const getTextDirection = (): TextStyle => ({
    textAlign: isRTL() ? "right" : "left" as "right" | "left",
    writingDirection: isRTL() ? "rtl" : "ltr" as "rtl" | "ltr",
});
