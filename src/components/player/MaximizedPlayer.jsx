import React, { useContext } from "react";
import Player from "./Player";
import Playlist from "./Playlist";
import { Grid } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import { ControlContext } from "../../Providers/ControlProvider";

const useStyles = makeStyles((theme) => ({
  root: {
    padding: 0,
    height: "100vh",
    [theme.breakpoints.up("md")]: {
      padding: theme.spacing(2),
    },
    [theme.breakpoints.up("lg")]: {
      padding: theme.spacing(4),
    },
  },

  player: {
    height: "100%",
    flex: "0 1 100%",
    [theme.breakpoints.up("md")]: {
      flex: "0 1 40%",
    },
  },

  playlist: {
    height: "100%",
    flex: "0 1 100%",
    [theme.breakpoints.up("md")]: {
      flex: "0 1 45%",
    },
  },
}));

export default function MaximizedPlayer() {
  const classes = useStyles();
  const {
    state: { playerState },
  } = useContext(ControlContext);

  document.body.style.overflow = "hidden";

  if (playerState === "playlist") {
    document.body.style.transform = "translateY(-100vh)";
    document.body.style.transition = "all .3s ease";
  } else {
    document.body.style.transform = "translateY(0)";
    //document.body.style.transition = "all .5s ease";
  }

  return (
    <Grid
      container
      alignItems="center"
      justify="space-between"
      className={classes.root}
    >
      <Grid item className={classes.player}>
        <Player />
      </Grid>
      <Grid item className={classes.playlist}>
        <Playlist />
      </Grid>
    </Grid>
  );
}
