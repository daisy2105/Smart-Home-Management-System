import React,{useContext} from "react";
import { ThemeContext } from "../../context/ThemeContext";

const DarkModeButton = () => {
  {/* dark mode state from context*/}
  const { darkMode, setDarkMode } = useContext(ThemeContext);

  return (
    <div>
        <button
          onClick={() => setDarkMode((prev) => !prev)}
          className={`relative w-14 h-7 rounded-full transition ${darkMode ? "bg-green-500" : "bg-gray-400"}`}
        >
          <span
            className={`absolute top-1 left-1 w-5 h-5 bg-white rounded-full shadow-md transform transition ${darkMode ? "translate-x-7" : ""}`}
          ></span>
        </button>
    </div>
  );
};

export default DarkModeButton;
