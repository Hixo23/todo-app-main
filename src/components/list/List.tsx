import { useContext } from "react";
import { useLocalStorage } from "../../hooks/useLocalStorage";
import { ThemeContext } from "../../contexts/themeContext";

type Todo = {
  name: string;
  id: string;
  isCompleted: boolean;
};

export const List = () => {
  const [todos, setTodos] = useLocalStorage("todos", []);
  const theme = useContext(ThemeContext);

  return (
    <div className="flex justify-center font-josefin">
      <div className="h-full">
        <input
          id="createTodo"
          className={`"md:w-[700px] min-w-[400px] h-16 p-6 rounded ${
            theme ? "bg-slate-800 text-white" : "bg-gray-200 text-slate-800"
          } md:outline-none "`}
          placeholder="Create a new todo"
          type="text"
        />
      </div>
      <div className="mt-16">
        {todos.map((todo: Todo) => {
          return <>{todo.name}</>;
        })}
      </div>
    </div>
  );
};
