import React from "react";
import { Grid, Avatar, Typography } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import img from "../../imgs/quran.jpg";

const useStyles = makeStyles((theme) => ({
  avatar: {
    width: (props) => (props.maximized ? theme.spacing(30) : theme.spacing(6)),
    height: (props) => (props.maximized ? theme.spacing(26) : theme.spacing(6)),
    marginRight: (props) => (!props.maximized ? theme.spacing(1.5) : 0),
    marginBottom: (props) => (props.maximized ? theme.spacing(3) : 0),
  },

  title: {
    fontSize: (props) =>
      props.maximized ? theme.spacing(3) : theme.spacing(2),
    fontWeight: 600,
    lineHeight: 1.25,
  },

  subTitle: {
    fontSize: (props) =>
      props.maximized ? theme.spacing(2) : theme.spacing(1.65),
    fontWeight: 400,
  },
}));

const ArtWork = (props) => {
  const { maximized } = props;
  const classes = useStyles(props);

  return (
    <Grid
      alignItems="center"
      container
      wrap="nowrap"
      direction={maximized ? "column" : "row"}
    >
      <Grid item style={{ flexGrow: 1 }}>
        <Avatar
          variant={maximized ? "rounded" : "circular"}
          className={classes.avatar}
          src={img}
        />
      </Grid>
      <Grid
        item
        container
        direction="column"
        style={{ textAlign: maximized ? "center" : "left" }}
      >
        <Grid item>
          <Typography variant="subtitle1" className={classes.title}>
            Islam Sobhi
          </Typography>
        </Grid>
        <Grid item>
          <Typography variant="subtitle2" className={classes.subTitle}>
            Al-Fatiha
          </Typography>
        </Grid>
      </Grid>
    </Grid>
  );
};

export default ArtWork;
