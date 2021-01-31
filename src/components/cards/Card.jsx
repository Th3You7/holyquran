import React, { useContext } from "react";
import { Paper, Link, Typography } from "@material-ui/core";
import { Link as RouterLink } from "react-router-dom";
import { makeStyles } from "@material-ui/core/styles";
import { mainContext } from "../../Providers/MainProvider";
import { ControlContext } from "../../Providers/ControlProvider";

const useStyles = makeStyles((theme) => ({
  paper: {
    padding: theme.spacing(1),
  },

  typography: {
    color: theme.palette.text.primary,

    "&:hover": {
      color: theme.palette.warning.main,
    },
  },
}));

export default function Card({ id, name, suras, server, rewaya, count }) {
  const { surasNames, setCurrSura, currReciter, setCurrReciter } = useContext(
    mainContext
  );
  const { dispatch } = useContext(ControlContext);
  const classes = useStyles();

  const handleClick = () => {
    //* Defining the selected reciter
    setCurrReciter({
      ...currReciter,
      id,
      name,
      suras,
      server,
      rewaya,
      count,
    });

    //* setting the first available sura in the selected reciter's list of suras

    const allSurasIndex = suras.split(",");
    const { number, transliteration_en, translation_en } = surasNames.find(
      (sura) => sura.number === Number(allSurasIndex[0])
    );

    setCurrSura({
      number,
      name: transliteration_en,
      translate: translation_en,
      index: 0,
    });

    dispatch({ type: "SET_PLAYERSTATE", payload: "expanded" });
  };

  const link = {
    pathname: "/player",
    state: {
      from: {
        pathname: "/home",
      },
      to: {
        pathname: "/player",
      },
    },
  };

  return (
    <Paper className={classes.paper} variant="outlined">
      <Link component={RouterLink} to={link} onClick={handleClick}>
        <Typography noWrap className={classes.typography}>
          {name.indexOf("(") > 0 ? name.slice(0, name.indexOf("(")) : name}
        </Typography>
      </Link>
    </Paper>
  );
}
