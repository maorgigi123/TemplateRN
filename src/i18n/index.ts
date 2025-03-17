import i18n from "i18next";
import { initReactI18next } from "react-i18next";
import he from "./he.json"; // Your nested JSON

const resources = {
  he: he,
};

i18n.use(initReactI18next).init({
  compatibilityJSON: "v4",
  resources,
  lng: "he",
  interpolation: {
    escapeValue: false,
  },
});

export const addTexts = (data: Object) => {
  console.log("data ",data)
  i18n.addResourceBundle("he", "translation", data, true, true);
};

export default { i18n };
