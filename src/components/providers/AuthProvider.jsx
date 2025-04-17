import { useState } from "react";
import { AuthContext } from "../../context";

export default function AuthProvider({ children }) {
  const [isAuth, setIsAuth] = useState(false);

  return (
    <AuthContext.Provider value={{ isAuth, setIsAuth }}>
      {children}
    </AuthContext.Provider>
  );
}
