import React from "react";
import { KeyboardArrowUp, VolumeUp } from "@material-ui/icons";
import classes from "./upperBar.module.css";

const UpperBar = () => {
  return (
    <div className={classes.container}>
      <div className={classes.volume}>
        <VolumeUp fontSize="large" />
        <input
          type="range"
          min="0"
          max="100"
          className={classes.volume_control}
        />
      </div>
      <KeyboardArrowUp fontSize="large" />
    </div>
  );
};

export default UpperBar;
