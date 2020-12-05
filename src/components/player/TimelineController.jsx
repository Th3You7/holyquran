import React from "react";
import { Slider, Typography, Box } from "@material-ui/core";
import { withStyles, makeStyles } from "@material-ui/styles";

const PrettoSlider = withStyles({
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

  return (
    <Box className={classes.container}>
      <Box className={classes.innerContainer}>
        <Typography variant="body1">00:00</Typography>
        <Typography variant="body1">03:45</Typography>
      </Box>
      <PrettoSlider />
    </Box>
  );
};

export default TimelineController;
