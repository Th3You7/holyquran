import React from "react";
import TimelineController from "./TimelineController";
import UpperBar from "./UpperBar";
import Infos from "./Info";
import { SkipNext, PlayArrow, SkipPrevious } from "@material-ui/icons";
import { IconButton } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import styles from "./mediaPlayer.module.css";

const useStyle = makeStyles((theme) => ({
  container: {
    display: "flex",
    flexDirection: "column",
    padding: theme.spacing(2),
  },

  controls: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  },
  playIcon: {
    height: 48,
    width: 48,
  },
}));

const MediaPlayer = ({ width }) => {
  const classes = useStyle();
  return (
    <div className={classes.container}>
      <UpperBar />
      <Infos />
      <TimelineController />
      <div className={classes.controls}>
        <IconButton aria-label="previous">
          <SkipPrevious />
        </IconButton>
        <IconButton aria-label="play/pause">
          <PlayArrow className={classes.playIcon} />
        </IconButton>
        <IconButton aria-label="next">
          <SkipNext />
        </IconButton>
      </div>
    </div>
  );
};

export default MediaPlayer;
