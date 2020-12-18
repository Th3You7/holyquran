import React from "react";
import Volume from "./Volume.jsx";
import { KeyboardArrowDown } from "@material-ui/icons";
import classes from "./upperBar.module.css";

const UpperBar = () => {
  return (
    <div className={classes.container}>
      <Volume />
      <KeyboardArrowDown fontSize="large" />
    </div>
  );
};

export default UpperBar;
