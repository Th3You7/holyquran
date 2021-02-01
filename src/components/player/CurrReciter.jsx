import React, { useContext } from "react";
import ArtWork from "./ArtWork";
import { useHistory } from "react-router-dom";
import { Grid } from "@material-ui/core";

import { makeStyles } from "@material-ui/core/styles";

import { ControlContext } from "../../Providers/ControlProvider";

//TODO: Add favourite reciter functionality later

const useStyles = makeStyles((theme) => ({
  root: {
    cursor: "pointer",
  },
}));

const CurrReciter = (props) => {
  const { dispatch } = useContext(ControlContext);
  const classes = useStyles(props);
  const history = useHistory();

  const handleClick = () => {
    dispatch({ type: "SET_PLAYERSTATE", payload: "expanded" });
    history.push({
      pathname: "/player",
    });
  };
  return (
    <Grid
      className={classes.root}
      container
      alignItems="center"
      justify="space-between"
      onClick={handleClick}
    >
      <Grid item style={{ flexGrow: 2 }}>
        <ArtWork minimized />
      </Grid>
    </Grid>
  );
};

export default CurrReciter;
