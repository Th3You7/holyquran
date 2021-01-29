import { useState } from "react";

const initTheme = {
  props: {
    MuiLink: {
      underline: "none",
      color: "textPrimary",
    },
  },
  breakpoints: {
    values: {
      xs: 0,
      sm: 576,
      md: 768,
      lg: 992,
      xl: 1200,
    },
  },

  palette: {
    type: "dark",
    primary: {
      main: "#005036",
      light: "#3b8360",
      dark: "#002c10",
    },
  },

  typography: {
    fontFamily: '"Quicksand", sans-serif',
  },
};

const useDarkTheme = () => {
  const [theme, setTheme] = useState(initTheme);
  const {
    palette: { type },
  } = theme;

  const toggleTheme = () => {
    const updatedTheme = {
      ...theme,
      palette: {
        ...theme.palette,
        type: type === "light" ? "dark" : "light",
      },
    };

    setTheme(updatedTheme);
  };

  return [theme, toggleTheme];
};

export default useDarkTheme;
