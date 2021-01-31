import React from "react";
import { Button, Grid, Typography } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles((theme) => ({
  container: {
    width: "100%",
    height: "100vh",
    padding: theme.spacing(2),
  },
}));

export default function NetworkError({ data }) {
  const classes = useStyles();

  const networkError = () => (
    <>
      <Typography variant="subtitle1">
        There seems to be a problem with your connection
      </Typography>
    </>
  );

  const error = () => {
    return (
      <>
        <Typography variant="subtitle1">Something Went Wrong</Typography>{" "}
        <Button>Go home</Button>
      </>
    );
  };
  return (
    <Grid
      container
      justify="center"
      alignItems="center"
      className={classes.container}
    >
      <Grid item>
        <Typography variant="h2">Whooops</Typography>
        {data === "Network Error" ? networkError() : error()}
      </Grid>
    </Grid>
  );
}
