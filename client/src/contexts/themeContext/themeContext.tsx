import { useColorScheme } from "@mui/material";
import { createContext, useState } from "react";


export interface ThemeContextType {
    theme: "light"|"dark";
    toggleTheme: () => void;
}

export const ThemeContext = createContext<ThemeContextType>({
    theme: "light",
    toggleTheme: () => {},
});

const ThemeContextProvider = ({ children }: { children: React.ReactNode }) => {
    const [theme, setTheme] = useState<ThemeContextType["theme"]>("light");
    const {mode, setMode} = useColorScheme();

    const toggleTheme = () => {
        console.log("toggle theme",mode);
        setTheme(theme === "light" ? "dark" : "light");
        setMode(mode === "light" ? "dark" : "light");
    };

    const value = {
        theme,
        toggleTheme,
    };

    return (
        <ThemeContext.Provider value={value}>
            {children}
        </ThemeContext.Provider>
    );
};

export default ThemeContextProvider;