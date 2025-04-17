import { createContext } from "react";

export const THEMES = {
  LIGHT: 'light',
  DARK: 'dark'
};

export const LANGUAGES = {
  UA: {
    value: 'UA',
    text: 'Украинский'
  },
  EN: {
    value: 'EN',
    text: 'English'
  },
};

export const ThemeContext = createContext(THEMES.LIGHT);

export const LanguageContext = createContext(LANGUAGES.EN.value);

export const AuthContext = createContext({});

export const TodosContext = createContext({});