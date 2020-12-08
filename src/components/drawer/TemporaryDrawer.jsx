import React from "react";
import Switch from "./Switch";
import { makeStyles } from "@material-ui/core/styles";
import {
  Drawer,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  Divider,
} from "@material-ui/core";
import { LocalLibrary, Favorite, Radio, GitHub } from "@material-ui/icons/";

const listItems = [
  {
    text: "All Readers",
    icon: <LocalLibrary />,
  },
  {
    text: "Favorite ",
    icon: <Favorite />,
  },
  {
    text: "Live Radio",
    icon: <Radio />,
  },
  {
    text: "Github",
    icon: <GitHub />,
  },
];
const useStyles = makeStyles({
  list: {
    width: 250,
  },

  container: {
    margin: "1.5rem 1rem",
  },
});

export default function TemporaryDrawer({ toggleDrawer, state }) {
  const classes = useStyles();

  const list = () => (
    <div className={classes.list} role="presentation">
      <List>
        <div className={classes.container}>
          <Switch />
        </div>
        <Divider />
        {listItems.map((item) => (
          <ListItem
            button
            key={item.text}
            onClick={(e) => toggleDrawer(e)}
            onKeyDown={(e) => toggleDrawer(e)}
          >
            <ListItemIcon>{item.icon}</ListItemIcon>
            <ListItemText primary={item.text} />
          </ListItem>
        ))}
      </List>
      <Divider />
    </div>
  );

  return (
    <div>
      <>
        <Drawer open={state} onClose={(e) => toggleDrawer(e)}>
          {list()}
        </Drawer>
      </>
    </div>
  );
}
