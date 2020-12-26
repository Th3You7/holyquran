import React from "react";
import { Grid, Typography, Slider } from "@material-ui/core";
import { makeStyles, withStyles } from "@material-ui/core/styles";

const PrettoSlider = withStyles({
  root: {
    color: "#52af77",
    height: 8,
  },
  thumb: {
    height: 16,
    width: 16,
    backgroundColor: "#fff",
    border: "2px solid currentColor",
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

  return (
    <div className={classes.container}>
      <Grid container alignItems="center" justify="center">
        <Grid item style={{ marginRight: "10px" }}>
          <Typography>01:00:00</Typography>
        </Grid>
        <Grid item className={classes.slider}>
          <PrettoSlider />
        </Grid>
        <Grid item style={{ marginLeft: "10px" }}>
          <Typography>01:00:52</Typography>
        </Grid>
      </Grid>
    </div>
  );
};

export default TimelineController2;
