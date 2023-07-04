import { useContext, useEffect, useState } from "react";
import { ThemeContext } from "../../contexts/themeContext";
import { todosContext } from "../../contexts/todosContext";
import { Item } from "./Item";
import type { Todo } from "../../types/types";

export const List = () => {
  const [todoContent, setTodoContent] = useState("");
  const { todos, setTodos } = useContext(todosContext);
  const [filterStatus, setFilterStatus] = useState("all");
  const [filteredTodos, setFilteredTodos] = useState<Todo[]>([
    { id: 0, isCompleted: false, name: "" },
  ]);
  const themeIsDark = useContext(ThemeContext);

  const addTodo = () => {
    if(todoContent.length > 40) return alert("Todo can't be longer than 40 characters");
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
    setTodos(
      todos.map((todo) =>
        todo.id === id ? { ...todo, isCompleted: !todo.isCompleted } : todo
      )
    );
  };

  const deleteCompleted = () => {
   return setTodos(todos.filter(todo => !todo.isCompleted));
  }

  useEffect(() => {
    const handleFilter = () => {
      switch (filterStatus) {
        case "active": {
          return setFilteredTodos(todos.filter((todo) => !todo.isCompleted));
        }
        case "completed": {
          return setFilteredTodos(todos.filter((todo) => todo.isCompleted));
        }
        default: {
          return setFilteredTodos(todos);
        }
      }
    };
    handleFilter();
  }, [todos, filterStatus]);

  return (
    <div className="flex flex-col w-screen items-center font-josefin">
      <div className="overflow-hidden">
        <input
          onKeyDown={(e) => handleEnter(e)}
          onChange={(e) => setTodoContent(e.target.value)}
          value={todoContent}
          id="createTodo"
          className={` md:w-[700px] min-w-[350px]  p-6 rounded ${
            themeIsDark ? "bg-slate-800 text-white" : "bg-gray-200 text-slate-800"
          } md:outline-none "`}
          placeholder="Create a new todo"
          type="text"
        />
      </div>
      <ul
        className={`md:w-[700px] min-w-[350px] mt-8 rounded-md ${
          themeIsDark ? "bg-slate-800 text-white" : "bg-gray-200 text-slate-800"
        }`}
      >
        {filteredTodos?.map((todo: Todo, index: number) => {
          return (
            <Item
              index={index}
              {...todo}
              key={todo.id}
              toggleCompleted={toggleCompleted}
            />
          );
        })}
      </ul>
      <div
        className={`md:w-[700px] min-w-[350px] rounded-b-lg flex justify-between mx-auto p-4 text-left mb-24 ${
          themeIsDark ? "bg-slate-800 text-white" : "bg-gray-200 text-slate-800"
        }`}
      >
        <div className="flex gap-4">
          <button className={`${filterStatus == "all" && "text-blue-400"}`} onClick={() => setFilterStatus("all")}>All</button>
          <button className={`${filterStatus == "completed" && "text-blue-400"}`} onClick={() => setFilterStatus("completed")}>
            Completed
          </button>
          <button className={`${filterStatus == "active" && "text-blue-400"}`} onClick={() => setFilterStatus("active")}>Active</button>
        </div>
        <div className={`flex gap-4 ${themeIsDark ? 'text-gray-500' : 'text-slate-800'}`}>
        <p>{todos.filter(todo => !todo.isCompleted).length} items left</p>
        <button className="hover:text-blue-500 transition-colors duration-150" onClick={deleteCompleted}>Clear completed</button>
        </div>
      </div>
    </div>
  );
};
