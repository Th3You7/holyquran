import React from "react";
import Volume from "./Volume";
import { Grid, IconButton, Menu, MenuItem } from "@material-ui/core";
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

  const [anchorEl, setAnchorEl] = React.useState(null);

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
    event.stopPropagation();
  };

  const handleClose = (e) => {
    setAnchorEl(null);
    e.stopPropagation();
  };

  return (
    <Grid container alignItems="center" justify="center">
      <Grid item>
        <IconButton
          aria-controls="simple-menu"
          aria-haspopup="true"
          style={{ padding: maximized ? 0 : "auto" }}
          onClick={handleClick}
        >
          <VolumeUpRounded className={classes.icon} />
        </IconButton>
      </Grid>
      <Menu
        id="simple-menu"
        anchorEl={anchorEl}
        keepMounted
        open={Boolean(anchorEl)}
        onClose={handleClose}
      >
        <MenuItem>
          <Volume />
        </MenuItem>
      </Menu>
    </Grid>
  );
};

export default VolumeController;
