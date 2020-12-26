import React, { useContext } from "react";
import Volume from "./Volume.jsx";
import { KeyboardArrowDown } from "@material-ui/icons";
import classes from "./upperBar.module.css";
import { ControlContext } from "../../Providers/ControlProvider.js";

const UpperBar = () => {
  const { dispatch } = useContext(ControlContext);
  const handleClick = () => {
    dispatch({ type: "SET_PLAYERSTATE", payload: "reduced" });
  };
  return (
    <div className={classes.container}>
      <Volume />
      <KeyboardArrowDown fontSize="large" onClick={handleClick} />
    </div>
  );
};

export default UpperBar;
