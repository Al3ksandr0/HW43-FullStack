import { Button, Input, Select } from "antd";
// import { Button, Input } from "antd";
import { useContext, useState } from "react";
import { TodosContext } from "../../../context";
import { validateText } from "../utils/validateText";
import { useTranslation } from "../../../hooks/useTranslation";
import "./NewTodo.css";



export default function NewTodo() {
  const [value, setValue] = useState('');
  const [priority, setPriority] = useState('Medium');

  const { addNewTodo } = useContext(TodosContext);

  const t = useTranslation();

  // const handleSaveValue = () => {
  //   addNewTodo(value);
  // }

  const handleSaveValue = () => {
    const validate = validateText(value);
    if (!validate) return;

    addNewTodo(validate, priority);
    setValue('');
    setPriority('Medium');
  };

  const priorityOptions = [
    { value: "Low", label: t.priority_low },
    { value: "Medium", label: t.priority_medium },
    { value: "High", label: t.priority_high }
  ];

  return (
    <div>
      <form>
        <Input
          className="form-input"
          placeholder={t.placeholder}
          value={value}
          onChange={(event) => setValue(event.target.value)}
        />

        <Select
          className="form-select"
          value={priority}
          onChange={setPriority}
          options={priorityOptions}
        />

        <Button style={{ marginBottom: "1rem" }}
          className="form-button"
          type="primary"
          onClick={handleSaveValue}
        >
          {t.save}
        </Button>
      </form>
    </div>
  )
}