import { createContext } from "react";
import type { Todo } from "../types/types";

type todosContext = {
  todos: Todo[],
  setTodos: (todos: Todo[]) => void
}


export const todosContext = createContext<todosContext>({ todos: [{name: "", id: 2, isCompleted: false}], setTodos: () => undefined });