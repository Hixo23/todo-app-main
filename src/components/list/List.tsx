import { useContext, useEffect, useState } from "react";
import { ThemeContext } from "../../contexts/themeContext";
import { todosContext } from "../../contexts/todosContext";
import { Item } from "./Item";
import type { Todo } from "../../types/types";

export const List = () => {
  const [todoContent, setTodoContent] = useState("");
  const { todos, setTodos } = useContext(todosContext);
  const [filterStatus, setFilterStatus] = useState("all")
  const [filteredTodos, setFilteredTodos] = useState<Todo[] | null>(null)
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
    setTodos(todos.map(todo => todo.id === id ? {...todo, isCompleted: !todo.isCompleted} : todo))
  }
  
  useEffect(() => {
    const handleFilter = () => {
      switch(filterStatus) {
        case 'active': {
          return setFilteredTodos(todos.filter(todo => !todo.isCompleted))
        }
        case 'completed': {
          return setFilteredTodos(todos.filter(todo => todo.isCompleted))
        }
        default: {
          return setFilteredTodos(todos)
        }
      }
    }
    handleFilter()
  }, [todos, filterStatus])

  return (
    <div className="flex flex-col w-screen items-center font-josefin">
      <div className="overflow-hidden">
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
        className={`md:w-[700px] min-w-[350px]   rounded-md ${
          theme ? "bg-slate-800 text-white" : "bg-gray-200 text-slate-800"
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
        className={`md:w-[700px] min-w-[350px] rounded-lg flex gap-3 mx-auto p-4 text-left mb-24  mt-2 ${
          theme ? "bg-slate-800 text-white" : "bg-gray-200 text-slate-800"
        }`}
      >
        <button onClick={() => setFilterStatus('all')}>All</button>
        <button onClick={() => setFilterStatus('completed')}>Completed</button>
        <button onClick={() => setFilterStatus('active')}>Active</button>
      </div>
    </div>
  );
};
