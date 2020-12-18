import React, { useContext, useReducer, useEffect } from "react";
import { makeStyles } from "@material-ui/core/styles";
import { Grid, Slider, IconButton } from "@material-ui/core/";
import { VolumeDown, VolumeOff, VolumeUp } from "@material-ui/icons/";
import { ControlContext } from "../../Providers/ControlProvider";

const useStyles = makeStyles({
  root: {
    width: 150,
  },
});

export default function ContinuousSlider() {
  const { player } = useContext(ControlContext);

  const initVolState = {
    //* it will toggle between 2 states: false for muted & true for unmuted
    volState: true,
    currVol: 50,
  };

  const volReducer = (state, action) => {
    switch (action.type) {
      case "SET_VOLSTATE":
        return {
          ...state,
          volState: !state.volState,
        };

      case "SET_CURRVOL": {
        return {
          ...state,
          volState: true,
          currVol: action.payload,
        };
      }

      default:
        return;
    }
  };

  const [volume, volDispatch] = useReducer(volReducer, initVolState);
  const { volState, currVol } = volume;

  useEffect(() => {
    if (player) {
      !volState ? (player.muted = true) : (player.muted = false);
    }
  }, [player, volState]);

  //* handling volume's slider change
  const handleChange = (e, newValue) => {
    volDispatch({ type: "SET_CURRVOL", payload: newValue });
    player.volume = currVol / 100;
  };

  const classes = useStyles();

  return (
    <div className={classes.root}>
      <Grid container justify="center" alignItems="center">
        <Grid item>
          <IconButton onClick={() => volDispatch({ type: "SET_VOLSTATE" })}>
            {!volState || currVol === 0 ? (
              <VolumeOff fontSize="large" />
            ) : currVol > 50 ? (
              <VolumeUp fontSize="large" />
            ) : (
              <VolumeDown fontSize="large" />
            )}
          </IconButton>
        </Grid>
        <Grid item xs>
          <Slider
            value={currVol}
            onChange={handleChange}
            aria-labelledby="continuous-slider"
          />
        </Grid>
      </Grid>
    </div>
  );
}
