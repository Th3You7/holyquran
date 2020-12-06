import React from "react";
import {
  Box,
  ListItemIcon,
  List,
  ListItem,
  ListItemText,
} from "@material-ui/core";
import {
  ExpandLess,
  Repeat,
  Shuffle,
  LibraryMusic,
  MusicNote,
} from "@material-ui/icons";
import styles from "./bottomBar.module.css";

const BottomBar = () => {
  return (
    <div className={styles.container}>
      <Box className={styles.inner_container} boxShadow={2}>
        <LibraryMusic fontSize="large" />
        <Repeat fontSize="large" />
        <Shuffle fontSize="large" />
        <ExpandLess fontSize="large" />
      </Box>
      <List aria-label="tracks list">
        <ListItem button>
          <ListItemIcon>
            <MusicNote />
          </ListItemIcon>
          <ListItemText primary="Surat Yusuf" />
        </ListItem>
        <ListItem button>
          <ListItemIcon>
            <MusicNote />
          </ListItemIcon>
          <ListItemText primary="Surat Yusuf" />
        </ListItem>
        <ListItem button>
          <ListItemIcon>
            <MusicNote />
          </ListItemIcon>
          <ListItemText primary="Surat Yusuf" />
        </ListItem>
        <ListItem button>
          <ListItemIcon>
            <MusicNote />
          </ListItemIcon>
          <ListItemText primary="Surat Yusuf" />
        </ListItem>
        <ListItem button>
          <ListItemIcon>
            <MusicNote />
          </ListItemIcon>
          <ListItemText primary="Surat Yusuf" />
        </ListItem>
      </List>
    </div>
  );
};

export default BottomBar;
