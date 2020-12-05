import React from "react";
import Paper from "@material-ui/core/Paper";
import { makeStyles } from "@material-ui/core/styles";
import Typography from "@material-ui/core/Typography";
import Divider from "@material-ui/core/Divider";
import IconButton from "@material-ui/core/IconButton";
import FavoriteIcon from "@material-ui/icons/Favorite";

const useStyle = makeStyles((theme) => ({
  card: {
    textAlign: "center",
  },
  box: {
    padding: theme.spacing(2),
  },
}));

const Card = () => {
  const classes = useStyle();

  return (
    <Paper elevation={3} className={classes.card}>
      <div className={classes.box}>
        <Typography component={"h6"} style={{ fontWeight: 600 }}>
          {"ISLAM SOBHI"}
        </Typography>
        <Typography component={"p"}>{"116"}</Typography>
        <Typography component={"p"}>{"Riwaya"}</Typography>
      </div>
      <Divider />
      <div className={classes.box}>
        <IconButton aria-label="add to favorites">
          <FavoriteIcon />
        </IconButton>
      </div>
    </Paper>
  );
};

export default Card;
