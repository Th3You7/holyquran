import React, { useContext } from "react";
import TimelineController from "./TimelineController";
import { Typography, IconButton } from "@material-ui/core";
import { Close, Pause, PlayArrow, SkipNext } from "@material-ui/icons";
import { ControlContext } from "../../Providers/ControlProvider";
import classes from "./miniPlayer.module.css";

const MiniPlayer = ({ currReciter, handleNextPrev }) => {
  const {
    dispatch,
    state: { isPlaying, isLoading, isSeeking },
  } = useContext(ControlContext);

  const extendPlayer = () => {
    //e.stopPropagation();
    dispatch({ type: "SET_PLAYERSTATE", payload: "extended" });
  };

  const handlePLayPause = (e) => {
    e.stopPropagation();
    dispatch({ type: "SET_ISPLAYING", payload: !isPlaying });
  };

  return (
    <div
      className={classes.container}
      onClick={extendPlayer}
      style={{ cursor: "pointer" }}
    >
      <div className={classes.inner_container}>
        <div>
          <Typography variant="h5">Surat Yusuf</Typography>
          <Typography variant="body1">{currReciter.name}</Typography>
        </div>

        <div>
          <IconButton
            aria-label="next"
            onClick={(e) => {
              handleNextPrev(1);
              e.stopPropagation();
            }}
          >
            <SkipNext fontSize="large" />
          </IconButton>
          <IconButton aria-label="close">
            <Close fontSize="large" />
          </IconButton>
        </div>
      </div>
      <div className={classes.circle}>
        {isLoading || isSeeking ? (
          <IconButton>
            <PlayArrow fontSize="large" />
          </IconButton>
        ) : (
          <IconButton aria-label="pause/play" onClick={handlePLayPause}>
            {isPlaying ? (
              <Pause fontSize="large" />
            ) : (
              <PlayArrow fontSize="large" />
            )}
          </IconButton>
        )}
      </div>

      <TimelineController />
    </div>
  );
};

export default MiniPlayer;
