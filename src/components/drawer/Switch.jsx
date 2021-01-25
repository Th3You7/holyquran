import React, { useContext } from "react";
import { IconButton } from "@material-ui/core";
import { MuiThemeContext } from "../../Providers/ThemeProvider";
import { Brightness4Rounded, Brightness7Rounded } from "@material-ui/icons/";

export default function Switch() {
  const { theme, toggleTheme } = useContext(MuiThemeContext);
  const {
    palette: { type },
  } = theme;

  return (
    <IconButton onClick={toggleTheme}>
      {type === "light" ? <Brightness4Rounded /> : <Brightness7Rounded />}
    </IconButton>
  );
}
