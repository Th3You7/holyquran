import React, { useContext } from "react";
import Card from "./Card";
import { Grid } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import { mainContext } from "../../Providers/MainProvider";

const useStyles = makeStyles((theme) => ({
  root: {
    padding: "60px 40px ",
    [theme.breakpoints.up("sm")]: {
      padding: "80px 40px ",
    },
  },
}));

const Cards = ({ input }) => {
  const { data } = useContext(mainContext);
  const classes = useStyles();

  if (input) {
    return (
      <Grid container className={classes.root} spacing={2}>
        {data
          .filter((reciter) =>
            reciter.name.toLowerCase().includes(input.toLowerCase())
          )
          .map((filteredReciter) => (
            <Grid item key={filteredReciter.id} xs={12} sm={6} md={3}>
              <Card
                id={filteredReciter.id}
                name={filteredReciter.name}
                suras={filteredReciter.suras}
                server={filteredReciter.Server}
                rewaya={filteredReciter.rewaya}
                count={filteredReciter.count}
              />
            </Grid>
          ))}
      </Grid>
    );
  }

  return (
    <Grid container className={classes.root} spacing={2}>
      {data.map((item) => (
        <Grid item key={item.id} xs={12} sm={6} md={3}>
          <Card
            id={item.id}
            name={item.name}
            suras={item.suras}
            server={item.Server}
            rewaya={item.rewaya}
            count={item.count}
          />
        </Grid>
      ))}
    </Grid>
  );
};

export default Cards;
