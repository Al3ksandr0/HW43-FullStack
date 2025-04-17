import { useContext } from "react";
import { LanguageContext, LANGUAGES } from "../context";
import { translations } from "../components/i18n";

export function useTranslation() {
    const { language } = useContext(LanguageContext);
    return translations[language] || translations[LANGUAGES.EN.value];
}
