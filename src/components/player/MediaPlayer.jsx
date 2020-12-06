import React from "react";
import TimelineController from "./TimelineController";
import UpperBar from "./UpperBar";
import BottomBar from "./BottomBar";
import Infos from "./Info";
import MiniPlayer from "./MiniPlayer";
import { SkipNext, PlayArrow, SkipPrevious } from "@material-ui/icons";
import { IconButton } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";

const useStyle = makeStyles((theme) => ({
  container: {
    display: "flex",
    flexDirection: "column",
    padding: theme.spacing(2),
    overflow: "hidden",
  },

  controls: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  },
  playIcon: {
    height: 68,
    width: 68,
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
          <SkipPrevious fontSize="large" />
        </IconButton>
        <IconButton aria-label="play/pause">
          <PlayArrow className={classes.playIcon} />
        </IconButton>
        <IconButton aria-label="next">
          <SkipNext fontSize="large" />
        </IconButton>
      </div>
      {/*<BottomBar />*/}
      <MiniPlayer />
    </div>
  );
};

export default MediaPlayer;
