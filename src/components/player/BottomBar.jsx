import React, { useContext } from "react";
import { FixedSizeList as List } from "react-window";
import AutoSizer from "react-virtualized-auto-sizer";

import { Box, ListItemIcon, ListItem, ListItemText } from "@material-ui/core";
import {
  ExpandLess,
  Repeat,
  Shuffle,
  LibraryMusic,
  MusicNote,
} from "@material-ui/icons";
import styles from "./bottomBar.module.css";
import { mainContext } from "../../Providers/MainProvider";

const Row = ({ index, style }) => {
  return (
    <ListItem button style={style}>
      <ListItemIcon>
        <MusicNote />
      </ListItemIcon>
      <ListItemText primary={index.toString()} />
    </ListItem>
  );
};

const BottomBar = () => {
  const { data } = useContext(mainContext);
  let suras;

  if (data !== []) {
    suras = data["2"].suras.split(",");
  }
  console.log(suras.length);
  return (
    <div className={styles.container}>
      <Box className={styles.inner_container} boxShadow={2}>
        <LibraryMusic fontSize="large" />
        <Repeat fontSize="large" />
        <Shuffle fontSize="large" />
        <ExpandLess fontSize="large" />
      </Box>
      <AutoSizer>
        {({ width }) => (
          <List
            height={408}
            itemCount={suras.length}
            itemSize={35}
            width={width}
          >
            {Row}
          </List>
        )}
      </AutoSizer>
    </div>
  );
};

export default BottomBar;
