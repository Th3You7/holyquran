import React, { useContext, useReducer, useEffect, useCallback } from "react";
import { Slider, Typography, Box } from "@material-ui/core";
import { withStyles, makeStyles } from "@material-ui/styles";
import { ControlContext } from "../../Providers/ControlProvider";

//* Creating a slider for expanded player view
const MaxSlider = withStyles({
  root: {
    height: 6,
  },
  thumb: {
    height: 16,
    width: 16,
    marginTop: -5.3,
    marginLeft: -8,
    "&::before": {
      content: "''",
      height: "inherit",
      width: "inherit",
      position: "absolute",
      transform: "scale(1.6)",
      borderRadius: "50px",
      border: "1px solid",
    },
  },
  track: {
    height: 6,
    borderRadius: 4,
  },
  rail: {
    height: 6,
    borderRadius: 4,
  },
})(Slider);

//* Creating a slider for minimized player view
const MinSlider = withStyles({
  root: {
    height: 6,
  },
  thumb: {
    display: "none",
  },

  track: {
    height: 6,
    //borderRadius: 4,
  },
  rail: {
    height: 6,
    //borderRadius: 4
  },
})(Slider);

const useStyle = makeStyles((theme) => ({
  innerContainer: {
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
    marginBottom: 2,
  },
  container: {
    margin: "0 auto",
    width: "90%",
  },
}));

const TimelineController = () => {
  const classes = useStyle();

  const {
    player,
    state: { isPlaying, playerState },
  } = useContext(ControlContext);

  const initTimeState = {
    currTime: 0,
    duration: 0,
  };

  const timeReducer = (state, action) => {
    switch (action.type) {
      case "SET_CURRTIME":
        return {
          ...state,
          currTime: action.payload,
        };

      case "SET_DURATION":
        return {
          ...state,
          duration: action.payload,
        };

      default:
        return;
    }
  };

  const [timeState, timeDispatch] = useReducer(timeReducer, initTimeState);

  const { currTime } = timeState;

  //* updating current time of audio
  const handleTimeUpdate = useCallback(() => {
    const currentTime = Math.floor(player.currentTime);
    timeDispatch({ type: "SET_CURRTIME", payload: currentTime });
  }, [player, timeDispatch]);

  //* handling time value changing
  const handleTimeChange = (e, newValue) => {
    player.currentTime = newValue;
    timeDispatch({ type: "SET_CURRTIME", payload: newValue });
  };

  useEffect(() => {
    if (player) {
      //* this functionality is similar to updatetime event of HtmlMediaElement, it will update every 500ms
      let setTimeInterval;
      if (isPlaying) {
        setTimeInterval = setInterval(handleTimeUpdate, 500);
      } else {
        clearInterval(setTimeInterval);
      }
      return () => clearInterval(setTimeInterval);
    }
  }, [isPlaying, player, handleTimeUpdate]);

  //*formating time
  const setTimeFormat = (time) => {
    let secs = time % 60;
    let mins = ((time - secs) / 60) % 60;
    let hours = ((time - secs) / 60 - mins) / 60;

    if (secs < 10) {
      secs = `0${secs}`;
    }
    if (mins < 10) {
      mins = `0${mins}`;
    }

    if (hours >= 1) {
      return `0${hours}:${mins}:${secs}`;
    } else {
      return `${mins}:${secs}`;
    }
  };

  if (playerState === "reduced") {
    return (
      <MinSlider
        defaultValue={0}
        value={currTime}
        max={player ? player.duration : 0}
        onChange={handleTimeChange}
        onClick={(e) => e.stopPropagation()}
      />
    );
  }

  return (
    <Box className={classes.container}>
      <Box className={classes.innerContainer}>
        <Typography variant="body1">{setTimeFormat(currTime)}</Typography>
        <Typography variant="body1">
          {player
            ? player.duration
              ? setTimeFormat(Math.trunc(player.duration))
              : setTimeFormat(0)
            : setTimeFormat(0)}
        </Typography>
      </Box>
      <MaxSlider
        defaultValue={0}
        value={currTime}
        max={player ? player.duration : 0}
        onChange={handleTimeChange}
      />
    </Box>
  );
};

export default TimelineController;
