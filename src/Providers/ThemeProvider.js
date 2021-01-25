import React, { createContext } from "react";
import { createMuiTheme, ThemeProvider, CssBaseline } from "@material-ui/core";
import useDarkTheme from "../hooks/useDarkTheme";

export const MuiThemeContext = createContext();

const MuiThemeProvider = ({ children }) => {
  const [theme, toggleTheme] = useDarkTheme();

  const currTheme = createMuiTheme(theme);

  return (
    <MuiThemeContext.Provider value={{ theme, toggleTheme }}>
      <ThemeProvider theme={currTheme}>
        <CssBaseline />
        {children}
      </ThemeProvider>
    </MuiThemeContext.Provider>
  );
};

export default MuiThemeProvider;
