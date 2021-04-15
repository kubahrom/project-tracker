import React, { useState, createContext } from 'react';

const ThemeContext = createContext({
  darkTheme: false,
  setDarkTheme: (boolean: boolean) => {},
});

const ThemeProvider: React.FC = children => {
  const [darkTheme, setDarkTheme] = useState<boolean>(true);
  return (
    <ThemeContext.Provider value={{ darkTheme, setDarkTheme }} {...children} />
  );
};

export { ThemeContext, ThemeProvider };
