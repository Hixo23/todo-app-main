import { useContext, useState } from "react";
import { ThemeContext } from "../../contexts/themeContext";
import { todosContext } from "../../contexts/todosContext";
import { Item } from "./Item";
import type { Todo } from '../../types/types';

export const List = () => {
  const [todoContent, setTodoContent] = useState("");
  const {todos, setTodos} = useContext(todosContext)
  const [displayedTodos, setDisplayedTodos] = useState<Todo[]>(todos)
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

  const filterByAll = () => {
    return setDisplayedTodos(todos);
  }

  const filterByCompleted = () => {
    return setDisplayedTodos(todos.filter(todo => todo.isCompleted))
  }
  const filterByActive = () => {
    return setDisplayedTodos(todos.filter(todo => !todo.isCompleted))
  }


  return (
     <div className="flex flex-col w-screen items-center font-josefin overflow-hidden">
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
        className={`md:w-[700px] min-w-[350px] max-h-[600px] mt-8 overflow-y-auto rounded-md ${
          theme
            ? "bg-slate-800 text-white"
            : "bg-gray-200 text-slate-800"
        }`}
      >
        {displayedTodos.map((todo: Todo, index: number) => {
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
      <div className="md:w-[700px] min-w-[350px] rounded-lg flex gap-3 mx-auto p-4 bg-slate-800 text-white text-left mb-24  mt-2">
        <button onClick={filterByAll}>All</button>
        <button onClick={filterByCompleted}>Completed</button>
        <button onClick={filterByActive}>Active</button>
      </div>
    </div>
  );
};
