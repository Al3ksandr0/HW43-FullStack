import { Button, Input } from "antd";
import { useContext, useState } from "react";
import { AuthContext } from "../../context";
import { useTranslation } from "../../hooks/useTranslation";

export default function LoginForm() {
  const { setIsAuth } = useContext(AuthContext);

  const [login, setLogin] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const t = useTranslation();

  const handleLogin = () => {
    // TODO: do it smarter if you have more time :)
    if (login === 'admin' && password === 'admin') {
      setIsAuth(true);
    } else {
      setError(t.login_error);
    }
  }

  return (
    <form>
      {error && <span className="error">{error}</span>}

      <Input
        style={{ marginTop: "1rem" }}
        placeholder={t.login_placeholder}
        value={login}
        onChange={(event) => setLogin(event.target.value)}
      />

      <Input
        style={{ marginTop: "1rem" }}
        placeholder={t.password_placeholder}
        type="password"
        value={password}
        onChange={(event) => setPassword(event.target.value)}
      />

      <Button
        style={{ marginTop: "1rem" }}
        block
        onClick={handleLogin}>{t.sign_in}
      </Button>
    </form>
  );
}