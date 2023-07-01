import { useContext } from "react";
import sunIcon from "../../assets/icon-sun.svg";
import moonIcon from "../../assets/icon-moon.svg";
import { ThemeContext } from "../../contexts/themeContext";

interface Props {
  setDarkTheme: (value: boolean) => void;
}

export const Navbar = ({ setDarkTheme }: Props) => {
  const theme = useContext(ThemeContext);
  return (
    <nav className="min-h-[80px] md:py-14 flex items-center justify-around px-8">
      <h1 className="uppercase tracking-[0.5rem] font-semibold text-white text-4xl">
        Todo
      </h1>
      <button onClick={() => setDarkTheme(!theme)}>
        <img src={theme ? sunIcon : moonIcon} alt="" />
      </button>
    </nav>
  );
};
