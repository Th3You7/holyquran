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

  link: {
    "&:hover": {
      textDecoration: "none",
    },

    "&:active": {
      color: theme.palette.warning.main,
    },
  },

  typography: {
    color: theme.palette.text.primary,

    "&:hover": {
      color: theme.palette.warning.main,
    },
  },
}));

export default function Card({ id, name, suras, server, rewaya, count }) {
  const { currReciter, setCurrReciter } = useContext(mainContext);
  const { dispatch } = useContext(ControlContext);
  const classes = useStyles();

  const handleClick = () => {
    setCurrReciter({
      ...currReciter,
      id,
      name,
      suras,
      server,
      rewaya,
      count,
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
      <Link
        component={RouterLink}
        to={link}
        className={classes.link}
        onClick={handleClick}
      >
        <Typography noWrap className={classes.typography}>
          {name.indexOf("(") > 0 ? name.slice(0, name.indexOf("(")) : name}
        </Typography>
      </Link>
    </Paper>
  );
}
