import React, { useContext } from "react";
import TimelineController from "./TimelineController";
import { Typography, IconButton } from "@material-ui/core";
import { Close, Pause, PlayArrow, SkipNext } from "@material-ui/icons";
import { ControlContext } from "../../Providers/ControlProvider";
import classes from "./miniPlayer.module.css";

const MiniPlayer = ({ currReciter }) => {
  const {
    dispatch,
    state: { isPlaying, playerState },
  } = useContext(ControlContext);

  if (playerState === "reduced") {
    return (
      <div className={classes.container}>
        <div className={classes.inner_container}>
          <div>
            <Typography variant="h5">Surat Yusuf</Typography>
            <Typography variant="body1">{currReciter}</Typography>
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
          <IconButton
            aria-label="pause/play"
            onClick={() =>
              dispatch({ type: "SET_ISPLAYING", payload: !isPlaying })
            }
          >
            {isPlaying ? (
              <Pause fontSize="large" />
            ) : (
              <PlayArrow fontSize="large" />
            )}
          </IconButton>
        </div>

        <TimelineController />
      </div>
    );
  }

  return null;
};

export default MiniPlayer;
