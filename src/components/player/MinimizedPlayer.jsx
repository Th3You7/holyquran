import React, { useContext } from "react";
import Controller from "./Controller";
import CurrReciter from "./CurrReciter";
import VolumeController from "./VolumeController";
import { Grid } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import TimelineController2 from "./TimelineController2";
import { ControlContext } from "../../Providers/ControlProvider";

const useStyles = makeStyles((theme) => ({
  container: {
    padding: theme.spacing(1),
  },
}));

const MinimizedPlayer = () => {
  const { width } = useContext(ControlContext);
  const classes = useStyles();

  return (
    <Grid className={classes.container} container alignItems="center">
      <Grid item style={{ flexGrow: 2 }}>
        <CurrReciter />
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
          <TimelineController2 />
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
