import React, { useContext } from "react";
import { useHistory } from "react-router-dom";
import Controller from "./Controller";
import CurrReciter from "./CurrReciter";
import VolumeController from "./VolumeController";
import { Grid } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import TimelineController from "./TimelineController";
import { ControlContext } from "../../Providers/ControlProvider";

const useStyles = makeStyles((theme) => ({
  container: {
    padding: theme.spacing(1),
    backgroundColor: theme.palette.background.paper,
    boxShadow: theme.shadows[7],
    width: "100%",
    cursor: "pointer",
  },
}));

const MinimizedPlayer = () => {
  const { width } = useContext(ControlContext);
  const classes = useStyles();

  return (
    <Grid className={classes.container} container alignItems="center">
      <Grid item style={{ flexGrow: 2 }}>
        <CurrReciter minimized />
      </Grid>
      <Grid item style={{ flexGrow: 1 }}>
        {width <= 576 ? (
          <Controller minimized ultraMinimized />
        ) : (
          <Controller minimized />
        )}
      </Grid>
      {width >= 768 ? (
        <Grid item style={{ flexGrow: 3 }}>
          <TimelineController />
        </Grid>
      ) : null}

      <Grid item style={{ flexGrow: 1 }}>
        {width <= 576 ? (
          <VolumeController ultraMinimized />
        ) : (
          <VolumeController />
        )}
      </Grid>
    </Grid>
  );
};

export default MinimizedPlayer;
