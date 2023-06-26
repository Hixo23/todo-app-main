import { useContext, useState } from "react";
import { ThemeContext } from "../../contexts/themeContext";
import { todosContext } from "../../contexts/todosContext";
import { Item } from "./Item";
import type { Todo } from '../../types/types';

export const List = () => {
  const [todoContent, setTodoContent] = useState("");
  const {todos, setTodos} = useContext(todosContext)
  const theme = useContext(ThemeContext);

  const addTodo = () => {
    if (todoContent !== "") {
      const Todo: Todo = {
        name: todoContent,
        id: Math.random(),
        isCompleted: false,
      };
      setTodos([...todos, Todo]);
      setTodoContent("");
    }
  };

  const handleEnter = (e: React.KeyboardEvent) => {
    if (e.key == "Enter") {
      addTodo();
    }
  };

  const toggleCompleted = (id: number) => {
    setTodos(todos.map(todo => todo.id === id ? {...todo, isCompleted: !todo.isCompleted } : todo))
  }


  return (
     <div className="flex flex-col w-screen items-center font-josefin">
      <div className="">
        <input
          onKeyDown={(e) => handleEnter(e)}
          onChange={(e) => setTodoContent(e.target.value)}
          value={todoContent}
          id="createTodo"
          className={` md:w-[700px] min-w-[350px] h-16 p-6 rounded ${
            theme ? "bg-slate-800 text-white" : "bg-gray-200 text-slate-800"
          } md:outline-none "`}
          placeholder="Create a new todo"
          type="text"
        />
      </div>
      <ul
        className={`md:w-[700px] min-w-[350px] max-h-[600px] mt-16 overflow-y-auto rounded-md ${
          theme
            ? "bg-slate-800 text-white"
            : "bg-gray-200 text-slate-800"
        }`}
      >
        {todos.map((todo: Todo) => {
          return (
            <Item
              {...todo}
              toggleCompleted={toggleCompleted}
            />
          );
        })}
      </ul>
    </div>
  );
};
