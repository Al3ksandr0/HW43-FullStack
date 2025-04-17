import { useContext } from "react";
import { LanguageContext, LANGUAGES, ThemeContext, THEMES } from "../../context";
import styles from "./Button.module.css";

export default function Button() {
  const { theme } = useContext(ThemeContext);
  const { language } = useContext(LanguageContext);
console.log(theme)
  return (
    <button
      type="button"
      className={
        theme === THEMES.LIGHT ? styles.lightButton : styles.darkButton
      }
    >
      {language === LANGUAGES.EN.value ? "I am a button..." : "Я кнопка"}
    </button>
  );
}
