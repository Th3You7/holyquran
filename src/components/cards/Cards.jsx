import React from "react";
import Card from "./Card";
import Grid from "@material-ui/core/Grid";
import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles((theme) => ({
  root: {
    margin: "80px auto 0",
    padding: "0 40px",
  },
}));

const Cards = () => {
  const classes = useStyles();

  return (
    <Grid container className={classes.root} spacing={2}>
      {[1, 2, 3, 4, 5, 6].map((item) => (
        <Grid item key={item} xs={6} sm={4} lg={2}>
          <Card />
        </Grid>
      ))}
    </Grid>
  );
};

export default Cards;
