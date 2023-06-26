import { useState } from "react";
import { ThemeContext } from "./contexts/themeContext";
import { todosContext } from "./contexts/todosContext";
import { Navbar } from "./components/navbar/Navbar";
import { List } from "./components/list/List";
import { useLocalStorage } from "./hooks/useLocalStorage";
import type { Todo } from "./types/types";

function App() {
  const [isDarkTheme, setIsDarkTheme] = useState(true);
  const [todos, setTodos] = useLocalStorage<Todo[]>("todos", []);
  return (
    <ThemeContext.Provider value={isDarkTheme}>
      <todosContext.Provider
        value={{
          todos,
          setTodos,
        }}
      >
        <main
          className={`'w-screen h-screen ${
            isDarkTheme
              ? "bg-zinc-900 bg-[url(/bg-mobile-dark.jpg)] md:bg-[url(/bg-desktop-dark.jpg)]"
              : "bg-gray-200 bg-[url(/bg-mobile-light.jpg)] md:bg-[url(/bg-desktop-light.jpg)]"
          }  bg-[length:100vw_300px] bg-no-repeat`}
        >
          <Navbar setDarkTheme={setIsDarkTheme} />
         
          <List />
        </main>
      </todosContext.Provider>
    </ThemeContext.Provider>
  );
}

export default App;
