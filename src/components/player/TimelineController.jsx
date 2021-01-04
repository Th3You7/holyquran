import React, { useContext, useReducer, useEffect, useCallback } from "react";
import { Grid, Typography, Slider } from "@material-ui/core";
import { makeStyles, withStyles } from "@material-ui/core/styles";
import theme from "../../Providers/ThemeProvider";
import { ControlContext } from "../../Providers/ControlProvider";

const PrettoSlider = withStyles({
  root: {
    color: theme.palette.primary.main,
  },
  thumb: {
    height: 16,
    width: 16,
    backgroundColor: "#fff",
    border: "4px solid currentColor",

    marginTop: -4,
    marginLeft: -8,
    "&:focus, &:hover, &$active": {
      boxShadow: "inherit",
    },
  },
  active: {},

  track: {
    height: 8,
    borderRadius: 4,
  },
  rail: {
    height: 8,
    borderRadius: 4,
  },
})(Slider);

const useStyles = makeStyles(() => ({
  container: {
    flex: "0 1 45%",
  },

  slider: {
    flexGrow: 2,
  },
}));

const TimelineController2 = () => {
  const classes = useStyles();

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

  return (
    <div className={classes.container}>
      <Grid container alignItems="center" justify="center">
        <Grid item style={{ marginRight: "10px" }}>
          <Typography>{setTimeFormat(currTime)}</Typography>
        </Grid>
        <Grid item className={classes.slider}>
          <PrettoSlider
            defaultValue={0}
            value={currTime}
            max={player ? player.duration : 0}
            onChange={handleTimeChange}
            onClick={(e) => e.stopPropagation()}
          />
        </Grid>
        <Grid item style={{ marginLeft: "10px" }}>
          <Typography>
            {player && player.duration
              ? setTimeFormat(Math.trunc(player.duration))
              : setTimeFormat(0)}
          </Typography>
        </Grid>
      </Grid>
    </div>
  );
};

export default TimelineController2;
