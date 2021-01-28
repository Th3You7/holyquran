import React, { useContext } from "react";
import ArtWork from "./ArtWork";
import TimelineController from "./TimelineController";
import VolumeController from "./VolumeController";
import Controller from "./Controller";

import { Grid, IconButton } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import {
  KeyboardArrowDownOutlined,
  ListRounded,
  RepeatOneRounded,
  RepeatRounded,
} from "@material-ui/icons/";

import { ControlContext } from "../../Providers/ControlProvider";
import { useHistory } from "react-router-dom";

const useStyles = makeStyles((theme) => ({
  root: {
    backgroundColor: theme.palette.background.paper,
    color: theme.palette.text.primary,
    padding: `8px 24px`,
    height: "100%",
    borderRadius: "4px",
    boxShadow: theme.shadows[2],
  },

  icon: {
    fontSize: "32px",
  },
}));

const Player = () => {
  const classes = useStyles();

  const {
    dispatch,
    width,
    state: { isRepeated },
  } = useContext(ControlContext);

  const history = useHistory();

  const handleReduce = () => {
    dispatch({ type: "SET_PLAYERSTATE", payload: "reduced" });

    history.push({
      pathname: "/home",
      state: {
        from: {
          pathname: "/player",
        },
        to: {
          pathname: "/home",
        },
      },
    });
  };

  const handlePlaylist = () => {
    dispatch({ type: "SET_PLAYERSTATE", payload: "playlist" });
  };

  const handleRepeat = () => {
    dispatch({ type: "SET_REPEAT" });
  };

  return (
    <Grid container direction="column" className={classes.root}>
      <Grid
        item
        container
        justify="space-between"
        style={{ margin: "24px 0", flexGrow: 1 }}
        direction="row-reverse"
      >
        <Grid item>
          <IconButton style={{ padding: 0 }} onClick={handleReduce}>
            <KeyboardArrowDownOutlined className={classes.icon} />
          </IconButton>
        </Grid>
        {width < 768 ? (
          <Grid item>
            <IconButton style={{ padding: 0 }} onClick={handlePlaylist}>
              <ListRounded className={classes.icon} />
            </IconButton>
          </Grid>
        ) : null}
      </Grid>

      <Grid item style={{ flexGrow: 1.5 }}>
        <ArtWork maximized />
      </Grid>
      <Grid item style={{ flexGrow: 1 }}>
        <TimelineController />
      </Grid>
      <Grid
        item
        container
        alignItems="center"
        justify="space-around"
        style={{ flexGrow: 10 }}
      >
        <Grid item>
          <IconButton onClick={handleRepeat} style={{ padding: 0 }}>
            {isRepeated ? <RepeatOneRounded /> : <RepeatRounded />}
          </IconButton>
        </Grid>
        <Grid item>
          <Controller />
        </Grid>
        <Grid item>
          <VolumeController maximized />
        </Grid>
      </Grid>
    </Grid>
  );
};

export default Player;
