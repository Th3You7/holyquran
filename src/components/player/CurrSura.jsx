import React, { useContext } from "react";
import { Grid, Box, Typography, IconButton } from "@material-ui/core";
import { PlayArrowRounded, StopRounded } from "@material-ui/icons";

import { makeStyles } from "@material-ui/core/styles";
import { mainContext } from "../../Providers/MainProvider";

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

  subtitle: {
    color: "grey",
    textTransform: "uppercase",
    fontSize: theme.spacing(1.5),
  },

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

  playPause: {
    color: theme.palette.text.primary,
    fontSize: 24,
  },
}));

function CurrSura({ index, translate, name, handleClick, allSurasIndex }) {
  const classes = useStyles();
  const {
    currSura: { number },
  } = useContext(mainContext);

  return (
    <Grid container alignItems="center" className={classes.root} wrap="nowrap">
      <Grid item style={{ marginRight: "12px", alignSelf: "flex-start" }}>
        <Box className={classes.index}>{index + 1}</Box>
      </Grid>
      <Grid item style={{ flexGrow: 2 }}>
        <Typography variant="subtitle1" className={classes.title}>
          {name}
        </Typography>
        <Typography noWrap variant="subtitle2" className={classes.subtitle}>
          {translate}
        </Typography>
      </Grid>
      <Grid item>
        <IconButton onClick={handleClick}>
          {Number(allSurasIndex[index]) === number ? (
            <PlayArrowRounded className={classes.playPause} />
          ) : (
            <StopRounded className={classes.playPause} />
          )}
        </IconButton>
      </Grid>
    </Grid>
  );
}

export default CurrSura;
