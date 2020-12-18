import React, { useContext, memo } from "react";
import { FixedSizeList as List, areEqual } from "react-window";
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
import { ControlContext } from "../../Providers/ControlProvider";
import memoize from "memoize-one";

const Row = memo((props) => {
  const { style, index, data } = props;
  const { allSurasIndex, surasNames, setCurrSura, currSura, dispatch } = data;
  const { player } = useContext(ControlContext);

  if (surasNames) {
    const { number, transliteration_en } = surasNames.find(
      (sura) => sura.number === Number(allSurasIndex[index])
    );

    const handleClick = () => {
      setCurrSura({
        ...currSura,
        number,
        name: transliteration_en,
      });

      dispatch({ type: "SET_ISPLAYING", payload: true });
    };
    return (
      <ListItem button style={style} onClick={handleClick}>
        <ListItemIcon>
          <MusicNote />
        </ListItemIcon>
        <ListItemText primary={transliteration_en} />
      </ListItem>
    );
  }
  return <div>Loading...</div>;
}, areEqual);

//*Memoized fn
const createItemData = memoize(
  (allSurasIndex, surasNames, setCurrSura, currSura, dispatch) => ({
    allSurasIndex,
    surasNames,
    setCurrSura,
    currSura,
    dispatch,
  })
);

//*Bottom Bar
const BottomBar = ({ suras }) => {
  const { surasNames, setCurrSura, currSura } = useContext(mainContext);
  //
  const { dispatch } = useContext(ControlContext);
  //
  const allSurasIndex = suras.split(",");
  const itemData = createItemData(
    allSurasIndex,
    surasNames,
    setCurrSura,
    currSura,
    dispatch
  );

  return (
    <div className={styles.container}>
      <Box className={styles.inner_container} boxShadow={2}>
        <LibraryMusic fontSize="large" />
        <Repeat fontSize="large" />
        <Shuffle fontSize="large" />
        <ExpandLess fontSize="large" />
      </Box>
      {
        //TODO: search about react-window's lazy loading
      }
      <AutoSizer>
        {({ width }) => (
          <List
            height={408}
            itemCount={allSurasIndex.length}
            itemSize={45}
            width={width}
            itemData={itemData}
          >
            {Row}
          </List>
        )}
      </AutoSizer>
    </div>
  );
};

export default BottomBar;
