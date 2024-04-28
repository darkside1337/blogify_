import { useContext } from "react";
import { ThemeContext } from "src/context/ThemeContext";

const useThemeContext = () => {
  return useContext(ThemeContext);
};

export default useThemeContext;
