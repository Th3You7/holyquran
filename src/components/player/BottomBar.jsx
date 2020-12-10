import React, { useContext, useEffect, useState } from "react";
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

const BottomBar = ({ suras }) => {
  const { fetchAllSuras, currSura, setCurrSura } = useContext(mainContext);

  const allSurasIndex = suras.split(",");
  const [surasNames, setSurasNames] = useState();

  useEffect(() => {
    const fetching = async () => setSurasNames(await fetchAllSuras());
    fetching();
  }, [fetchAllSuras]);

  const Row = (props) => {
    const { style, index, data } = props;
    const { allSurasIndex, surasNames } = data;

    if (surasNames) {
      const { number, transliteration_en } = surasNames.find(
        (sura) => sura.number === Number(allSurasIndex[index])
      );
      console.log(currSura);

      return (
        <ListItem
          button
          style={style}
          onClick={() =>
            setCurrSura({ ...currSura, number, name: transliteration_en })
          }
        >
          <ListItemIcon>
            <MusicNote />
          </ListItemIcon>
          <ListItemText primary={transliteration_en} />
        </ListItem>
      );
    }
    return <div>Loading...</div>;
  };

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
            itemCount={allSurasIndex.length}
            itemSize={45}
            width={width}
            itemData={{ allSurasIndex, surasNames }}
          >
            {Row}
          </List>
        )}
      </AutoSizer>
    </div>
  );
};

export default BottomBar;
