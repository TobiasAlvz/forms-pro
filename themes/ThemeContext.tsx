import { createContext, useContext, useState } from "react";
import darkTheme from "./dark-theme";
import lightTheme from "./light-theme";

export type Theme = typeof lightTheme;

interface ThemeContextProps {
  theme: Theme;
  switchTheme: () => void;
}

const ThemeContext = createContext<ThemeContextProps | null>(null);

interface ThemeProviderProps {
  children: React.ReactNode;
}

export const ThemeProvider: React.FC<ThemeProviderProps> = ({ children }) => {
  const [currentTheme, setCurrentTheme] = useState<"light" | "dark">("light");

  const themes = {
    light: lightTheme,
    dark: darkTheme,
  };

  const theme = themes[currentTheme];
  const switchTheme = () => {
    setCurrentTheme((current) => (current === "light" ? "dark" : "light"));
  };

  return (
    <ThemeContext.Provider value={{ theme, switchTheme }}>
      {children}
    </ThemeContext.Provider>
  );
};

export const useTheme = () => {
  const context = useContext(ThemeContext);
  if (!context) {
    throw new Error("useTheme must be used whitin a ThemeProvider");
  }
  return context;
};
