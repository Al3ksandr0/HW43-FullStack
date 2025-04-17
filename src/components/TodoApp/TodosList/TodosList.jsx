// import { useContext } from "react"
// import { TodosContext } from "../../../context"

// export default function TodosList() {
//   const {todos} = useContext(TodosContext);

//   return (
//     <ul>
//       {todos.map((todo, index) => <li key={index}>{todo}</li>)}  
//     </ul>
//   )
// }



import { useContext, useState } from "react";
import { TodosContext } from "../../../context";
import { List, Tag, Button, Space, Input, Empty } from "antd";
import "./TodosList.css";
import { validateText } from "../utils/validateText";
import { useTranslation } from "../../../hooks/useTranslation";


export default function TodosList() {
  const { todos, setTodos } = useContext(TodosContext);

  // инфа о том на какую кнопку навелись
  const [hoveredAction, setHoveredAction] = useState({ index: null, type: null });

  // индекс редакт задачи
  const [editingIndex, setEditingIndex] = useState(null);

  // значение редакт текста
  const [editingText, setEditingText] = useState("");

  const t = useTranslation();

  // удалить задачу по инд
  const handleDelete = (indexToDelete) => {
    const updatedTodos = todos.filter((todo, currentIndex) => currentIndex !== indexToDelete);
    setTodos(updatedTodos);
    localStorage.setItem("todos", JSON.stringify(updatedTodos));
  };

  // сменить статус todo / done
  const toggleStatus = (indexToUpdate) => {
    const updatedTodos = todos.map((todo, index) => {
      if (index !== indexToUpdate) return todo;
      const newStatus = todo.status === "todo" ? "done" : "todo";
      return { ...todo, status: newStatus };
    });
    setTodos(updatedTodos);
    localStorage.setItem("todos", JSON.stringify(updatedTodos));
  };

  // начать редакт задачи 
  // запомнить индекс и текст
  const startEditing = (index) => {
    setEditingIndex(index);
    setEditingText(todos[index].text);
  };

  // завершить редакт
  const finishEditing = () => {
    const validated = validateText(editingText);

    // если пусто или не изменилось то ничего не делаем
    if (!validated || validated === todos[editingIndex].text) {
      setEditingIndex(null);
      setEditingText("");
      return;
    }

    // обновляем задачу с новым текстом
    const updatedTodos = todos.map((todo, index) => {
      if (index !== editingIndex) return todo;
      return { ...todo, text: validated };
    });

    setTodos(updatedTodos);
    localStorage.setItem("todos", JSON.stringify(updatedTodos));
    setEditingIndex(null);
    setEditingText("");
  };

  // получаем css для фона задачи при наведени или статусе
  const getItemClass = (todo, index) => {
    if (hoveredAction.index === index) {
      if (hoveredAction.type === "done") return "item-hover-done";
      if (hoveredAction.type === "todo") return "item-hover-todo";
      if (hoveredAction.type === "delete") return "item-hover-delete";
    }
    if (todo.status === "done") return "item-done";
    if (todo.status === "todo") return "item-todo";
    return "";
  };

  // получаем локал название приоритета
  const getPriorityLabel = (priority) => {
    switch (priority) {
      case "High":
        return t.priority_high;
      case "Medium":
        return t.priority_medium;
      case "Low":
        return t.priority_low;
      default:
        return priority;
    }
  };

  return (
    <List
      bordered
      header={
        <h3 style={{ color: "#ccc", textAlign: "center" }}>
          {t.your_tasks}
        </h3>}

      // показываем если список пуст
      locale={{
        emptyText: (
          <Empty description={
            <span style={{ color: "#ccc" }}>{t.no_data}</span>
          } />
        )
      }}

      dataSource={todos} // список задач
      renderItem={(todo, index) => (
        <List.Item className={getItemClass(todo, index)}>
          <Space direction="horizontal" style={{ flexWrap: "wrap" }}>

            {/* статус задачи done или todo */}
            <Tag color={todo.status === "done" ? "green" : "orange"}>
              {todo.status === "done" ? t.status_done : t.status_todo}
            </Tag>

            {/* приоритет задачи */}
            <Tag color={getPriorityColor(todo.priority)}>
              {getPriorityLabel(todo.priority)}
            </Tag>

            {/* текст задачи или поле редакт */}
            {editingIndex === index ? (
              <Input
                size="small"
                value={editingText}
                onChange={(e) => setEditingText(e.target.value)}
                onPressEnter={finishEditing}
                onBlur={finishEditing}
                autoFocus
                style={{ minWidth: "200px" }}
              />
            ) : (
              <span>{todo.text}</span>
            )}
          </Space>

          {/* кнопки редачить, сменить статус, удалить */}
          <Space>
            <Button size="small" onClick={() => startEditing(index)}>
              {t.edit}
            </Button>

            <Button
              size="small"
              onMouseEnter={() =>
                setHoveredAction({
                  index,
                  type: todo.status === "done" ? "todo" : "done",
                })
              }
              onMouseLeave={() => setHoveredAction({ index: null, type: null })}
              onClick={() => toggleStatus(index)}
              type={todo.status === "done" ? "default" : "primary"}
            >
              {todo.status === "done" ? t.mark_todo : t.mark_done}
            </Button>

            <Button
              danger
              size="small"
              onMouseEnter={() => setHoveredAction({ index, type: "delete" })}
              onMouseLeave={() => setHoveredAction({ index: null, type: null })}
              onClick={() => handleDelete(index)}
            >
              {t.delete}
            </Button>
          </Space>
        </List.Item>
      )}
    />
  );
}

function getPriorityColor(priority) {
  if (priority === "High") return "red";
  if (priority === "Medium") return "gold";
  return "blue";
}