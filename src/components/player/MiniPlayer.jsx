import React from "react";
import { Typography, IconButton } from "@material-ui/core";
import { Close, Pause, SkipNext } from "@material-ui/icons";
import classes from "./miniPlayer.module.css";

const MiniPlayer = () => {
  return (
    <div className={classes.container}>
      <div className={classes.inner_container}>
        <div>
          <Typography variant="h5">Surat Yusuf</Typography>
          <Typography variant="body1">Islam Sobhi</Typography>
        </div>

        <div>
          <IconButton aria-label="next">
            <SkipNext fontSize="large" />
          </IconButton>
          <IconButton aria-label="close">
            <Close fontSize="large" />
          </IconButton>
        </div>
      </div>
      <div className={classes.circle}>
        <IconButton aria-label="pause/play">
          <Pause fontSize="large" />
        </IconButton>
      </div>

      <div className={classes.timeline_bar_container}>
        <div className={classes.timeline_bar}></div>
      </div>
    </div>
  );
};

export default MiniPlayer;
