import { useEffect } from "react";
import { useState } from "react";
import { createContext } from "react";

const ThemeContext = createContext("");
const ThemeProvider = ({ children }) => {
  const [currentTheme, setTheme] = useState(
    localStorage.getItem("theme") ? localStorage.getItem("theme") : "night"
  );

  useEffect(() => {
    localStorage.setItem("theme", currentTheme);
    const localTheme = localStorage.getItem("theme");
    document.querySelector("html").setAttribute("data-theme", localTheme);
  }, [currentTheme]);
  return (
    <ThemeContext.Provider value={{ currentTheme, setTheme }}>
      {children}
    </ThemeContext.Provider>
  );
};

export { ThemeProvider, ThemeContext };
