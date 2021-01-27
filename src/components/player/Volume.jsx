import React, { useContext, useReducer, useEffect } from "react";
import { makeStyles, withStyles } from "@material-ui/core/styles";
import { Grid, Slider, IconButton } from "@material-ui/core/";
import { VolumeDown, VolumeOff, VolumeUp } from "@material-ui/icons/";
import { ControlContext } from "../../Providers/ControlProvider";

const PrettoSlider = withStyles({
  root: {
    color: "#005036",
  },
  thumb: {
    height: 16,
    width: 16,
    backgroundColor: "#fff",
    border: "4px solid currentColor",

    marginTop: -6,
    marginLeft: -8,
    "&:focus, &:hover, &$active": {
      boxShadow: "inherit",
    },
  },
  active: {},

  track: {
    height: 4,
    borderRadius: 4,
  },
  rail: {
    height: 4,
    borderRadius: 4,
  },
})(Slider);

const useStyles = makeStyles({
  root: {
    width: 120,
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

    player.volume = currVol / 100;
  }, [player, volState, currVol]);

  //* handling volume's slider change
  const handleChange = (e, newValue) => {
    volDispatch({ type: "SET_CURRVOL", payload: newValue });
  };

  const classes = useStyles();

  return (
    <div className={classes.root}>
      <Grid container justify="center" alignItems="center">
        <Grid item>
          <IconButton onClick={() => volDispatch({ type: "SET_VOLSTATE" })}>
            {!volState || currVol === 0 ? (
              <VolumeOff />
            ) : currVol > 50 ? (
              <VolumeUp />
            ) : (
              <VolumeDown />
            )}
          </IconButton>
        </Grid>
        <Grid item xs container>
          <PrettoSlider value={currVol} onChange={handleChange} />
        </Grid>
      </Grid>
    </div>
  );
}
