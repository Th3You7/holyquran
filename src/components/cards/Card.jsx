import React from "react";
import {
  Paper,
  Typography,
  Divider,
  IconButton,
  Link,
} from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import FavoriteIcon from "@material-ui/icons/Favorite";
import { Link as RouterLink } from "react-router-dom";

const useStyle = makeStyles((theme) => ({
  card: {
    textAlign: "center",
  },
  box: {
    padding: theme.spacing(1),
  },
}));

const Card = ({ reciter, count, rewaya }) => {
  const classes = useStyle();

  return (
    <Paper elevation={3} className={classes.card}>
      <div className={classes.box}>
        <Link to="/player" component={RouterLink} color="inherit">
          <Typography variant="h6" style={{ fontWeight: 600 }}>
            {reciter}
          </Typography>
          <Typography variant="subtitle1">{rewaya}</Typography>
          <Typography variant="subtitle2">{count}</Typography>
        </Link>
      </div>
      <Divider />
      <div className={classes.box}>
        <IconButton aria-label="Add to favorites">
          <FavoriteIcon />
        </IconButton>
      </div>
    </Paper>
  );
};

export default Card;
