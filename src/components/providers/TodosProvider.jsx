import { useEffect, useState } from "react";
import { TodosContext } from "../../context";

export default function TodosProvider({ children }) {
  const [todos, setTodos] = useState([]);

  useEffect(() => {
    const savedTodos = JSON.parse(localStorage.getItem('todos'));
    if (savedTodos) {
      setTodos(savedTodos);
    }
  }, [])

  // const addNewTodo = value => {
  //   const newTodos = [...todos, value];
  //   setTodos(newTodos);
  //   localStorage.setItem('todos', JSON.stringify(newTodos));
  // }

  const addNewTodo = (text, priority = "Medium") => {
    const newTodo = {
      text, //текст
      priority, // приоритет задачи
      status: "todo"  // по умолчанию задача новая, не выполнена
    };
    const newTodos = [...todos, newTodo];
    setTodos(newTodos);
    localStorage.setItem('todos', JSON.stringify(newTodos));
  };

  return (
    <TodosContext.Provider value={{ todos, addNewTodo, setTodos }}>
      {children}
    </TodosContext.Provider>
  )
}