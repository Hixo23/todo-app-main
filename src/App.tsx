import { useState } from "react";
import { ThemeContext } from "./contexts/themeContext";
import { todosContext } from "./contexts/todosContext";
import { Navbar } from "./components/navbar/Navbar";
import { List } from "./components/list/List";
import { useLocalStorage } from "./hooks/useLocalStorage";
import type { Todo } from "./types/types";
import { DragDropContext, DropResult, Droppable } from 'react-beautiful-dnd'

const reorder = (list: Todo[], startIndex: number, endIndex: number) => {
  const result = Array.from(list);
  const [removed] = result.splice(startIndex, 1);
  result.splice(endIndex, 0, removed);

  return result;
};

function App() {
  const [isDarkTheme, setIsDarkTheme] = useState(true);
  const [todos, setTodos] = useLocalStorage<Todo[]>("todos", []);

  const onDragEnd = (result: DropResult) => {
    if (!result.destination) {
      return;
    }

    if (result.destination.index === result.source.index) {
      return;
    }

    const items = reorder(
      todos,
      result.source.index,
      result.destination.index
    );

    setTodos(items)
  } 
  return (
    <ThemeContext.Provider value={isDarkTheme}>
      <todosContext.Provider
        value={{
          todos,
          setTodos,
        }}
      >
       <DragDropContext onDragEnd={onDragEnd}>
       <Droppable droppableId="sdasdasdasdas">
        {provided => (
          <main
          ref={provided.innerRef} {...provided.droppableProps}
          className={`'min-w-screen min-h-screen overflow-hidden ${
            isDarkTheme
              ? "bg-zinc-900 bg-[url(/bg-mobile-dark.jpg)] md:bg-[url(/bg-desktop-dark.jpg)]"
              : "bg-gray-200 bg-[url(/bg-mobile-light.jpg)] md:bg-[url(/bg-desktop-light.jpg)]"
          }  bg-[length:100vw_300px] bg-no-repeat`}
        >
          <Navbar setDarkTheme={setIsDarkTheme} />
         
          <List />
          {provided.placeholder}
        </main>
        )}
       </Droppable>
       </DragDropContext>
      </todosContext.Provider>
    </ThemeContext.Provider>
  );
}

export default App;
