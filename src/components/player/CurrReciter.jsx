import React from "react";
import ArtWork from "./ArtWork";
import { IconButton, Grid } from "@material-ui/core";

import { makeStyles } from "@material-ui/core/styles";
import { FavoriteRounded } from "@material-ui/icons";

const useStyles = makeStyles((theme) => ({}));

const CurrReciter = (props) => {
  const classes = useStyles(props);

  return (
    <Grid
      className={classes.root}
      container
      alignItems="center"
      justify="space-between"
    >
      <Grid item style={{ flexGrow: 2 }}>
        <ArtWork />
      </Grid>
      <Grid item>
        <IconButton>
          <FavoriteRounded />
        </IconButton>
      </Grid>
    </Grid>
  );
};

export default CurrReciter;
