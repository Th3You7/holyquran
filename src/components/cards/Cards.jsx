import React, { useContext } from "react";
import { Link as RouterLink } from "react-router-dom";
import { Grid, Typography, Paper, Link } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import { mainContext } from "../../Providers/MainProvider";

const useStyles = makeStyles((theme) => ({
  root: {
    margin: "80px auto 0",
    padding: "0 40px",
  },

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
    color: theme.palette.primary.contrastText,

    "&:hover": {
      color: theme.palette.warning.main,
    },
  },
}));

const Cards = () => {
  const { data } = useContext(mainContext);
  const classes = useStyles();

  return (
    <Grid container className={classes.root} spacing={2}>
      {data.map((item) => (
        <Grid item key={item.id} xs={12} sm={6} md={3}>
          <Paper className={classes.paper} variant="outlined">
            <Link component={RouterLink} to="/player" className={classes.link}>
              <Typography noWrap className={classes.typography}>
                {item.name.indexOf("(") > 0
                  ? item.name.slice(0, item.name.indexOf("("))
                  : item.name}
              </Typography>
            </Link>
          </Paper>
        </Grid>
      ))}
    </Grid>
  );
};

export default Cards;
