import { useContext, useState } from "react";
import { ThemeContext } from "../../contexts/themeContext";
import { todosContext } from "../../contexts/todosContext";
import { Draggable, DraggableProvided } from "react-beautiful-dnd";
import { EditModal } from "../Modal/EditModal";

interface Todo {
  name: string;
  isCompleted: boolean;
  id: number;
  toggleCompleted: (id: number) => void;
  index: number;
}

export const Item = (props: Todo) => {
  const { todos, setTodos } = useContext(todosContext);
  const [modalIsOpen, setModalIsOpen] = useState(false)
  const [error, setError] = useState("");

  const handleDelete = (id: number) => {
    const newTodos = todos.filter(
      (todo: { name: string; isCompleted: boolean; id: number }) => {
        return todo.id !== id;
      }
    );
    setTodos(newTodos);
  };

  const handleEdit = (id: number, todoContent: string) => {
    if(todoContent.length < 1) return setError("Input can't be null")
    setModalIsOpen(false);
    setError("")
    return setTodos(todos.map(todo => todo.id === id ? {...todo, name: todoContent } : todo))
}

  const theme = useContext(ThemeContext);
  return (
    <>
    {modalIsOpen &&  <EditModal handleEdit={handleEdit} id={props.id} name={props.name} error={error} />}
    <Draggable draggableId={props.id.toString()} index={props.index}>
     {(provided: DraggableProvided) => (
       <li ref={provided.innerRef} {...provided.dragHandleProps} {...provided.draggableProps} className={`border-b z-0 flex items-center justify-between py-3 px-6  ${
        theme ? "border-slate-700" : "border-gray-300"
      }`}>
        <button onClick={() => props.toggleCompleted(props.id)} className={`h-8 w-8 rounded-full border border-indigo-500 ${props.isCompleted && "bg-blue-500 relative after:w-3 after:h-1 after:rotate-45 after:content-[''] after:bg-white after:absolute after:top-15 after:left-1 before:w-4 before:h-1 before:-rotate-45 before:content-[''] before:bg-white before:absolute before:top-[0.8rem] before:left-[0.6rem]"}`}>

        </button>
        <span
          className={`${props.isCompleted && "line-through text-gray-400 z-20"}`}
        >
          {props.index + 1}. {props.name}
        </span>
        <div className="flex gap-2 items-center">
        <button onClick={() => handleDelete(props.id)}>
          <span className="text-red-500 text-2xl">x</span>
        </button>
        <button onClick={() => {
          if(props.isCompleted) return;
          setModalIsOpen(true)}}>
        <i className="fa-solid fa-pen-to-square w-4 h-4"></i>
        </button>
        </div>
      </li>
     )}
    </Draggable>
    </>
  );
};
