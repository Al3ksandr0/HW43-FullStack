import { useEffect, useState } from "react";
import { ThemeContext, THEMES } from "../../context";

export default function ThemeProvider({ children }) {
  const [theme, setTheme] = useState(THEMES.LIGHT);

  useEffect(() => {
    const savedTheme = localStorage.getItem('theme');
    if (savedTheme) {
      setTheme(savedTheme);
    }
  }, []);

  const toggleTheme = value => {
    setTheme(value);
    localStorage.setItem('theme', value);
  }

  return (
    <ThemeContext.Provider value={{ theme, setTheme: toggleTheme }}>
      {children}
    </ThemeContext.Provider>
  );
}
