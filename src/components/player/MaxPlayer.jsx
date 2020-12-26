import React, { useContext } from "react";
import TimelineController from "./TimelineController";
import UpperBar from "./UpperBar";
import BottomBar from "./BottomBar";
import Infos from "./Info";
import { SkipNext, Pause, PlayArrow, SkipPrevious } from "@material-ui/icons";
import { IconButton } from "@material-ui/core";
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

const MaxPlayer = ({ currReciter, player, handleNextPrev }) => {
  const classes = useStyle();

  const {
    //player,
    dispatch,
    state: { isPlaying, playerState, isLoading, isSeeking, isLoaded, isSeeked },
  } = useContext(ControlContext);

  if (playerState === "playlist") {
    document.body.style.transform = "translateY(-72.5vh)";
    document.body.style.transition = "all .3s ease";
  } else {
    document.body.style.transform = "translateY(0)";
    //document.body.style.transition = "all .5s ease";
  }

  return (
    <div className={classes.container}>
      <UpperBar />
      <Infos reciter={currReciter.name} rewaya={currReciter.rewaya} />
      <TimelineController />
      <div className={classes.controls}>
        <IconButton aria-label="previous" onClick={() => handleNextPrev(-1)}>
          <SkipPrevious fontSize="large" />
        </IconButton>

        {player ? (
          isSeeking || isLoading ? (
            <IconButton>
              <PlayArrow className={classes.playIcon} />
            </IconButton>
          ) : isSeeked || isLoaded ? (
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
            <IconButton>
              <PlayArrow className={classes.playIcon} />
            </IconButton>
          )
        ) : (
          <IconButton>
            <PlayArrow className={classes.playIcon} />
          </IconButton>
        )}

        <IconButton aria-label="next" onClick={() => handleNextPrev(1)}>
          <SkipNext fontSize="large" />
        </IconButton>
      </div>
      <BottomBar suras={currReciter.suras} />
    </div>
  );
};

export default MaxPlayer;
