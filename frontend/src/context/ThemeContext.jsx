import React, { createContext, useState} from "react";

export const ThemeContext = createContext();

export const ThemeProvider =  ({children}) => {
    const saved_theme= localStorage.getItem('theme') ===undefined ? localStorage.setItem('theme','light') : localStorage.getItem('theme'); 
    const [theme, setTheme] = useState(saved_theme);
    const toggleTheme = () => {
        //setTheme(theme ==='light' ? 'dark': 'light');
        if(saved_theme==='light'){
            localStorage.setItem('theme','dark')
            setTheme('dark')
        }else if (saved_theme==='dark'){
            localStorage.setItem('theme','light');
            setTheme("light")
        }
    }
    return(
        <ThemeContext.Provider value={{theme, toggleTheme}}>
            {children}
        </ThemeContext.Provider>
    )
}