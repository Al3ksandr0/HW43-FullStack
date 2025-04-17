// import Button from "./Button/Button";
import { AuthContext } from "../context";
import { useContext } from "react";
import LoginForm from "./LoginForm/LoginForm";
import TodoApp from "./TodoApp/TodoApp";

export default function Content() {
  const {isAuth} = useContext(AuthContext);

  return (
    <div>
      {isAuth ? <TodoApp /> : <LoginForm />}
    </div>
  );
}
