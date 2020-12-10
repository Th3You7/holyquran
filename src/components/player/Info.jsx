import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import { Avatar, Typography } from "@material-ui/core/";

const useStyles = makeStyles((theme) => ({
  shape: {
    width: theme.spacing(20),
    height: theme.spacing(20),
    margin: "0 auto 24px",
  },
  center: {
    textAlign: "center",
  },
}));

export default function Infos({ reciter, rewaya }) {
  const classes = useStyles();

  return (
    <>
      <Avatar alt="Islam Sobhi" className={classes.shape}>
        I
      </Avatar>
      <Typography variant="h4" className={classes.center}>
        Surat Yassine
      </Typography>
      <Typography variant="subtitle1" className={classes.center}>
        {reciter}
      </Typography>
    </>
  );
}
