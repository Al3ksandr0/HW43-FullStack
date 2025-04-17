import { Select, Switch } from "antd";
import { useContext, useEffect, useState } from "react";
import {
  AuthContext,
  LanguageContext,
  LANGUAGES,
  ThemeContext,
  THEMES,
} from "../../context";

import "./Navigation.css";

export default function Navigation() {
  const defaultClassName = "navigation";
  const [className, setClassName] = useState(defaultClassName);

  const { theme, setTheme } = useContext(ThemeContext);
  const { language, setLanguage } = useContext(LanguageContext);
  
  // it will not work coz Navigation is not rendered under the AuthProvider
  // const {isAuth} = useContext(AuthContext);
  // console.log(isAuth);
  
  
  const handleThemeChange = (checked) => {
    setTheme(checked ? THEMES.LIGHT : THEMES.DARK);
  };

  const handleLanguageChange = (value) => {
    setLanguage(value);
  };

  useEffect(() => {
    setClassName(`${defaultClassName} ${defaultClassName}-${theme}`);
  }, [theme]);

  return (
    <div className={className}>
      <div className="much-weight">
        <Select
          value={language}
          style={{ width: 120 }}
          onChange={handleLanguageChange}
          options={[
            { value: LANGUAGES.EN.value, label: LANGUAGES.EN.text },
            { value: LANGUAGES.UA.value, label: LANGUAGES.UA.text },
          ]}
        />
      </div>

      <div className="much-weight">
        <Switch
          checkedChildren={THEMES.LIGHT}
          unCheckedChildren={THEMES.DARK}
          onChange={handleThemeChange}
          checked={theme === THEMES.LIGHT}
        />
      </div>
    </div>
  );
}
