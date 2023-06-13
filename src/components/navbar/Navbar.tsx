import { useContext } from 'react'
import sunIcon from '../../assets/icon-sun.svg'
import moonIcon from '../../assets/icon-moon.svg'
import { ThemeContext } from '../../contexts/themeContext'


export const Navbar = ({ setDarkTheme }: any) => {
    const theme = useContext(ThemeContext)
    return (
        <nav className="h-24 md:h-48 flex items-center md:justify-evenly justify-between px-8">
            <h1 className="uppercase tracking-[0.5rem] font-semibold text-white text-4xl">Todo</h1>
            <button onClick={() => setDarkTheme(!theme)}><img src={theme ? sunIcon : moonIcon} alt="" /></button>
        </nav>
    )
}