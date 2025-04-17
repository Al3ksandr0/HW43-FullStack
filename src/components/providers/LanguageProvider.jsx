import { useEffect, useState } from "react";
import { LanguageContext, LANGUAGES } from "../../context";

export default function LanguageProvider({ children }) {
  const [language, setLanguage] = useState(LANGUAGES.EN.value);

  useEffect(() => {
    const savedLanguage = localStorage.getItem('language');
    if (savedLanguage) {
      setLanguage(savedLanguage);
    }
  }, []);

  const changeLanguage = value => {
    setLanguage(value);
    localStorage.setItem('language', value);
  }

  return (
    <LanguageContext.Provider value={{ language, setLanguage: changeLanguage }}>
      {children}
    </LanguageContext.Provider>
  );
}
