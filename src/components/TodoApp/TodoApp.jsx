import TodosProvider from "../providers/TodosProvider";
import NewTodo from "./NewTodo/NewTodo";
import TodosList from "./TodosList/TodosList";
import { useTranslation } from "../../hooks/useTranslation";

export default function TodoApp() {
  const t = useTranslation();

  return (
    <div>
      <h3>{t.todo_Application}</h3>
      <TodosProvider>
        <NewTodo />
        <TodosList />
      </TodosProvider>
      {/* 1) todo input + button save */}
      {/* 2) show todos with buttons (done, remove) */}
    </div>
  )
}