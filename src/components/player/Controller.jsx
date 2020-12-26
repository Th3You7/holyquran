import React from "react";
import { Grid, IconButton } from "@material-ui/core";
import {
  PauseRounded,
  PlayArrowRounded,
  SkipNextRounded,
  SkipPreviousRounded,
} from "@material-ui/icons";
import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles((theme) => ({
  playPauseIcon: {
    fontSize: (props) =>
      props.ultraMinimized ? "24px" : props.minimized ? "40px" : "48px",
  },
  controlIcons: {
    fontSize: (props) => (props.minimized ? "24px" : "36px"),
  },
}));

const Controller = (props) => {
  const { minimized, ultraMinimized } = props;
  const classes = useStyles(props);

  const minimizedController = () => {
    return (
      <Grid item>
        <IconButton>
          <PauseRounded className={classes.playPauseIcon} />
        </IconButton>
      </Grid>
    );
  };

  const maximizedController = () => {
    return (
      <>
        <Grid item>
          <IconButton>
            <SkipPreviousRounded className={classes.controlIcons} />
          </IconButton>
        </Grid>
        <Grid item>
          <IconButton style={{ padding: minimized ? 0 : "auto" }}>
            <PlayArrowRounded className={classes.playPauseIcon} />
          </IconButton>
        </Grid>
        <Grid item>
          <IconButton>
            <SkipNextRounded className={classes.controlIcons} />
          </IconButton>
        </Grid>
      </>
    );
  };

  return (
    <Grid container alignItems="center" justify="center">
      {minimized && ultraMinimized
        ? minimizedController()
        : maximizedController()}
    </Grid>
  );
};

export default Controller;
