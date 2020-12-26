import React from "react";
import { Grid, IconButton } from "@material-ui/core";
import { VolumeUpRounded } from "@material-ui/icons";
import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles(() => ({
  container: {
    flex: "0 1 auto",
  },

  icon: {
    fontSize: (props) => (props.ultraMinimized ? "24px" : "32px"),
  },
}));

const VolumeController = (props) => {
  const { maximized } = props;
  const classes = useStyles(props);

  return (
    <Grid container alignItems="center" justify="center">
      <Grid item>
        <IconButton style={{ padding: maximized ? 0 : "auto" }}>
          <VolumeUpRounded className={classes.icon} />
        </IconButton>
      </Grid>
    </Grid>
  );
};

export default VolumeController;
