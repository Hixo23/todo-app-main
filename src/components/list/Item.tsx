import { useContext } from "react";
import { ThemeContext } from "../../contexts/themeContext";
import { todosContext } from "../../contexts/todosContext";
import { Draggable, DraggableProvided } from "react-beautiful-dnd";

interface Todo {
  name: string;
  isCompleted: boolean;
  id: number;
  toggleCompleted: (id: number) => void;
  index: number;
}

export const Item = (props: Todo) => {
  const { todos, setTodos } = useContext(todosContext);

  const handleDelete = (id: number) => {
    const newTodos = todos.filter(
      (todo: { name: string; isCompleted: boolean; id: number }) => {
        return todo.id !== id;
      }
    );
    setTodos(newTodos);
  };

  const theme = useContext(ThemeContext);
  return (
   <>
    <Draggable draggableId={props.id.toString()} index={props.index}>
     {(provided: DraggableProvided) => (
       <li ref={provided.innerRef} {...provided.dragHandleProps} {...provided.draggableProps} className={`border-b z-0 flex items-center justify-between py-3 px-6  ${
        theme ? "border-slate-700" : "border-gray-300"
      }`}>
        <span
          onClick={() => props.toggleCompleted(props.id)}
          className={`${props.isCompleted && "line-through text-gray-400 z-20"}`}
        >
          {props.index + 1}. {props.name}
        </span>
        <button onClick={() => handleDelete(props.id)}>
          <span className="text-red-500 text-2xl">x</span>
        </button>
      </li>
     )}
    </Draggable>

    </>
  );
};
