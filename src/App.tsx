import { useState } from 'react'
import { ThemeContext } from './contexts/themeContext';
import { Navbar } from './components/navbar/Navbar';
import { List } from './components/list/List';

function App() {
  const [isDarkTheme, setIsDarkTheme] = useState(false);

  return (
    <ThemeContext.Provider value={isDarkTheme}>
      <main className={`'w-screen h-screen ${isDarkTheme ? 'bg-zinc-900 bg-[url(../public/bg-mobile-dark.jpg)] md:bg-[url(../public/bg-desktop-dark.jpg)]' : 'bg-gray-200 bg-[url(../public/bg-mobile-light.jpg)] md:bg-[url(../public/bg-desktop-light.jpg)]'}  bg-contain bg-no-repeat`}>
        <Navbar setDarkTheme={setIsDarkTheme} />
        <List />
      </main>
    </ThemeContext.Provider>
  )
}

export default App
