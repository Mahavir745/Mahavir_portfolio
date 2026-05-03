/**
 * ThemeContext — sets data-theme on <html>.
 * Usage: const { theme, toggle } = useTheme();
 */
import { createContext, useContext, useEffect, useState } from "react";
const Ctx = createContext(null);

export function ThemeProvider({ children }) {
  const [theme, set] = useState(() => localStorage.getItem("mkm-t") || "light");
  useEffect(() => {
    document.documentElement.setAttribute("data-theme", theme);
    localStorage.setItem("mkm-t", theme);
  }, [theme]);
  return (
    <Ctx.Provider value={{ theme, toggle: () => set(p => p === "dark" ? "light" : "dark") }}>
      {children}
    </Ctx.Provider>
  );
}
export const useTheme = () => useContext(Ctx);
