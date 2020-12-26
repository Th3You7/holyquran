import React, { useContext, memo } from "react";
import { FixedSizeList as List, areEqual } from "react-window";
import AutoSizer from "react-virtualized-auto-sizer";
import { Box, ListItemIcon, ListItem, ListItemText } from "@material-ui/core";
import {
  ExpandLess,
  ExpandMore,
  Repeat,
  //Shuffle,
  LibraryMusic,
  MusicNote,
  RepeatOne,
} from "@material-ui/icons";
import styles from "./bottomBar.module.css";
import { mainContext } from "../../Providers/MainProvider";
import { ControlContext } from "../../Providers/ControlProvider";
import memoize from "memoize-one";

const Row = memo((props) => {
  const { style, index, data } = props;
  const { allSurasIndex, surasNames, setCurrSura, currSura, dispatch } = data;

  if (surasNames) {
    const { number, transliteration_en } = surasNames.find(
      (sura) => sura.number === Number(allSurasIndex[index])
    );

    const handleClick = () => {
      setCurrSura({
        ...currSura,
        number,
        name: transliteration_en,
        index,
      });

      //TODO: even if payload is true , it will reverse to false, see the state
      dispatch({ type: "SET_ISLOADED", payload: true });
      dispatch({ type: "SET_ISSEEKED", payload: true });
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
  const {
    dispatch,
    state: { playerState, isRepeated },
  } = useContext(ControlContext);
  //
  const allSurasIndex = suras.split(",");
  //
  const itemData = createItemData(
    allSurasIndex,
    surasNames,
    setCurrSura,
    currSura,
    dispatch
  );

  //* handle toggling between playlist and expanded states
  const handleClick = () => {
    dispatch({
      type: "SET_PLAYERSTATE",
      payload: playerState === "expanded" ? "playlist" : "expanded",
    });
  };

  //* handle repeat one sura

  const handleRepeat = () => {
    dispatch({
      type: "SET_REPEAT",
    });
  };

  return (
    <div className={styles.container}>
      <Box className={styles.inner_container} boxShadow={2}>
        <LibraryMusic fontSize="large" />
        {!isRepeated ? (
          <Repeat fontSize="large" onClick={handleRepeat} />
        ) : (
          <RepeatOne fontSize="large" onClick={handleRepeat} />
        )}
        {/* <Shuffle fontSize="large" />*/}
        {playerState === "playlist" ? (
          <ExpandMore fontSize="large" onClick={handleClick} />
        ) : (
          <ExpandLess fontSize="large" onClick={handleClick} />
        )}
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
