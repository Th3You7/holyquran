import React, { useContext } from "react";
import TimelineController from "./TimelineController";
import UpperBar from "./UpperBar";
import BottomBar from "./BottomBar";
import Infos from "./Info";
import { SkipNext, Pause, PlayArrow, SkipPrevious } from "@material-ui/icons";
import { CircularProgress, IconButton } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import { ControlContext } from "../../Providers/ControlProvider";

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

const MaxPlayer = ({ currReciter, player }) => {
  const classes = useStyle();

  const {
    //player,
    dispatch,
    state: { isPlaying, playerState },
  } = useContext(ControlContext);

  if (playerState === "expanded") {
    return (
      <div className={classes.container}>
        <UpperBar />
        <Infos reciter={currReciter.name} rewaya={currReciter.rewaya} />
        <TimelineController />
        <div className={classes.controls}>
          <IconButton aria-label="previous">
            <SkipPrevious fontSize="large" />
          </IconButton>

          {player ? (
            !(player.readyState <= 2) ? (
              <IconButton
                aria-label="play/pause"
                onClick={() => {
                  dispatch({ type: "SET_ISPLAYING", payload: !isPlaying });
                }}
              >
                {isPlaying ? (
                  <Pause className={classes.playIcon} />
                ) : (
                  <PlayArrow className={classes.playIcon} />
                )}
              </IconButton>
            ) : (
              <CircularProgress />
            )
          ) : (
            <CircularProgress />
          )}

          <IconButton aria-label="next">
            <SkipNext fontSize="large" />
          </IconButton>
        </div>
        <BottomBar suras={currReciter.suras} />
      </div>
    );
  }

  return null;
};

export default MaxPlayer;
