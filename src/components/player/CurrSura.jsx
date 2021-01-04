import React from "react";
import { Grid, Box, Typography, IconButton } from "@material-ui/core";
import { FavoriteRounded } from "@material-ui/icons";

import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles((theme) => ({
  root: {
    flex: "0 1 90%",
    padding: theme.spacing(1.5),
    backgroundColor: theme.palette.background.paper,
    borderRadius: "4px",
    [theme.breakpoints.up("md")]: {
      flex: "0 1 98%",
    },
  },

  title: { color: theme.palette.text.primary, fontWeight: 600 },

  subtitle: { color: "grey", textTransform: "uppercase" },

  index: {
    height: theme.spacing(4),
    width: theme.spacing(4),
    display: "flex",
    fontWeight: 600,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: theme.palette.primary.main,
    color: theme.palette.primary.contrastText,
    borderRadius: "50%",
  },

  favourite: {
    color: theme.palette.background.default,
  },
}));

function CurrSura({ index, translate, name, handleClick }) {
  const classes = useStyles();

  return (
    <Grid container alignItems="center" className={classes.root}>
      <Grid item style={{ marginRight: "24px", alignSelf: "flex-start" }}>
        <Box className={classes.index}>{index}</Box>
      </Grid>
      <Grid item style={{ flexGrow: 2 }}>
        <Typography variant="subtitle1" className={classes.title}>
          {name}
        </Typography>
        <Typography variant="subtitle2" className={classes.subtitle}>
          {translate}
        </Typography>
      </Grid>
      <Grid item>
        <IconButton onClick={handleClick}>
          <FavoriteRounded className={classes.favourite} />
        </IconButton>
      </Grid>
    </Grid>
  );
}

export default CurrSura;
