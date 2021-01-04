import { createMuiTheme } from "@material-ui/core";

const theme = createMuiTheme({
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
});

export default theme;
