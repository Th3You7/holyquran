import React, { useContext } from "react";
import Card from "./Card";
import { Grid } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import { mainContext } from "../../Providers/MainProvider";

const useStyles = makeStyles((theme) => ({
  root: {
    margin: "80px auto 0",
    padding: "0 40px",
  },
}));

const Cards = () => {
  const { data } = useContext(mainContext);
  const classes = useStyles();

  return (
    <Grid container className={classes.root} spacing={2}>
      {data.map((item) => (
        <Grid item key={item.id} xs={6} sm={4} lg={2}>
          <Card reciter={item.name} rewaya={item.rewaya} count={item.count} />
        </Grid>
      ))}
    </Grid>
  );
};

export default Cards;
