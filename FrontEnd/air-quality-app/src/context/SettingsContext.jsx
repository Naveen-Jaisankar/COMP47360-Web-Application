import React, { createContext, useState, useMemo, useContext, useEffect } from 'react';
import { ThemeProvider , createTheme } from '@mui/material/styles';

export const SettingsContext = createContext();

export const ThemeContextProvider = ({children}) =>{

    //storing app theme in a state
    const [darkMode, setDarkMode] = useState( () =>{
        const savedTheme = localStorage.getItem('darkMode');
        return savedTheme === 'true' || false;
    });

    //storing font size in a state
    const[fontSize, setFontSize] = useState( () =>{
        const savedFontSize = localStorage.getItem('fontSize');
        return savedFontSize ? parseInt(savedFontSize, 10) : 16;
    });

    //useEffect hook here tracks user activity, and whenever user changes the theme or font size, this hook gets activated
    useEffect( ()=>{
        localStorage.setItem('darkMode', darkMode);
        localStorage.setItem('fontSize', fontSize);
    }, [darkMode, fontSize]);

    //useMemo hook will help us store the theme and font size, so that we are not rendering components again and again
    const theme = useMemo(() => createTheme({
        palette: {
          mode: darkMode ? 'dark' : 'light',
        },
        typography: {
          fontSize: fontSize,
        },
      }), [darkMode, fontSize]);

    
    const toggleDarkMode = () => {
        setDarkMode(!darkMode);
    };

    const changeFontSize = (size) => {
        setFontSize(size);
    };

    return (
        <SettingsContext.Provider value={{ darkMode, toggleDarkMode, fontSize, changeFontSize }}>
          <ThemeProvider theme={theme}>
            {children}
          </ThemeProvider>
        </SettingsContext.Provider>
    );
};