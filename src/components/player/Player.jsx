import React from "react";
import ArtWork from "./ArtWork";
import TimelineController2 from "./TimelineController2";
import VolumeController from "./VolumeController";

import Controller from "./Controller";
import { Grid, IconButton } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import { ListRounded } from "@material-ui/icons/";

const useStyles = makeStyles((theme) => ({
  root: {
    padding: `8px 24px`,

    height: "100vh",
  },

  icon: {
    fontSize: "32px",
  },
}));

const Player = () => {
  const classes = useStyles();

  return (
    <Grid container direction="column" className={classes.root}>
      <Grid
        item
        container
        justify="space-between"
        style={{ margin: "24px 0", flexGrow: 1 }}
      >
        <Grid item>
          <VolumeController maximized />
        </Grid>
        <Grid item>
          <IconButton style={{ padding: 0 }}>
            <ListRounded className={classes.icon} />
          </IconButton>
        </Grid>
      </Grid>

      <Grid item style={{ flexGrow: 1.5 }}>
        <ArtWork maximized />
      </Grid>
      <Grid item style={{ flexGrow: 1 }}>
        <TimelineController2 />
      </Grid>
      <Grid item style={{ flexGrow: 1.5 }}>
        <Controller />
      </Grid>
    </Grid>
  );
};

export default Player;
