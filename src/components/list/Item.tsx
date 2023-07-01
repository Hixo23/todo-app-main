import { useContext } from "react";
import { ThemeContext } from "../../contexts/themeContext";
import { todosContext } from "../../contexts/todosContext";

interface Todo {
  name: string;
  isCompleted: boolean;
  id: number;
  toggleCompleted: (id: number) => void
}

export const Item = (props: Todo) => {
  const { todos, setTodos } = useContext(todosContext);

  const handleDelete = (id: number) => {
        const newTodos = todos.filter((todo: { name: string, isCompleted: boolean, id: number }) => {
            return todo.id !== id
        })

        setTodos(newTodos)
  };

  const theme = useContext(ThemeContext);
  return (
    <li
      className={`border-2 flex items-center justify-between py-3 px-6  ${
        theme ? "border-slate-700" : "border-gray-300"
      }`}
    >
      <button onClick={() => props.toggleCompleted(props.id)} className={`${props.isCompleted && "line-through text-gray-400"}`}>
        {props.name}
      </button>
      <button onClick={() => handleDelete(props.id)}>
        <span className="text-red-500 text-2xl">x</span>
      </button>
    </li>
  );
};