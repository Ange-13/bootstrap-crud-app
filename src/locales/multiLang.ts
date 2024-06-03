import i18n from "i18next";
import { initReactI18next } from "react-i18next";
import  translation_en  from "./en/translation.json";
import  translation_mk from "./mk/translation.json";
import translation_de from "./de/translation.json";

const resources = {
    en: {
        translation: translation_en,
    },
    mk: {
        translation: translation_mk,
    },
    de:
        {translation : translation_de,
        
    }
}

i18n.use(initReactI18next).init({
    resources,
    lng: "en",
    fallbackLng: "en",
    interpolation: {
        escapeValue: false
    }
});