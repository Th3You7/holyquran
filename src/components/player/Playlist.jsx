import React, { useContext, memo } from "react";
import CurrSura from "./CurrSura";
import AutoSizer from "react-virtualized-auto-sizer";
import { FixedSizeList as List, areEqual } from "react-window";
import memoize from "memoize-one";

import { Box, IconButton } from "@material-ui/core";
import { ArrowBackRounded } from "@material-ui/icons";
import { makeStyles } from "@material-ui/core/styles";
import { ControlContext } from "../../Providers/ControlProvider";
import { mainContext } from "../../Providers/MainProvider";

const useStyles = makeStyles((theme) => ({
  row: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  },
  box: {
    //backgroundColor: "#ebeff1",
    height: "100%",
  },

  back: {
    display: "flex",
    alignItems: "center",
    padding: theme.spacing(0.5),
    borderRadius: 2,
  },

  list: {
    height: "100%",
  },
}));

//* the row of playlist
const Row = memo((props) => {
  const classes = useStyles();
  const { index, style, data } = props;
  const {
    state: { isLoading },
  } = useContext(ControlContext);

  const { allSurasIndex, surasNames, setCurrSura, currSura, dispatch } = data;

  if (surasNames) {
    const { number, transliteration_en, translation_en } = surasNames.find(
      (sura) => sura.number === Number(allSurasIndex[index])
    );

    //*handle clicking play btn
    const handleClick = () => {
      if (isLoading) return;

      setCurrSura({
        ...currSura,
        number,
        name: transliteration_en,
        translate: translation_en,
        index,
      });

      //TODO: even if payload is true , it will reverse to false, check the state
      dispatch({ type: "SET_ISLOADED", payload: true });
      dispatch({ type: "SET_ISSEEKED", payload: true });
    };

    return (
      <div style={style} className={classes.row}>
        <CurrSura
          index={index}
          handleClick={handleClick}
          name={transliteration_en}
          translate={translation_en}
          allSurasIndex={allSurasIndex}
        />
      </div>
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

//*Playlist Component
const Playlist = (props) => {
  const classes = useStyles(props);
  //
  const { dispatch } = useContext(ControlContext);
  //const deviceWidth = width;
  //
  const {
    surasNames,
    setCurrSura,
    currSura,
    currReciter: { suras },
  } = useContext(mainContext);
  //
  if (suras) {
    const allSurasIndex = suras.split(",");

    //
    const itemData = createItemData(
      allSurasIndex,
      surasNames,
      setCurrSura,
      currSura,
      dispatch
    );

    const handleBack = () => {
      dispatch({ type: "SET_PLAYERSTATE", payload: "expanded" });
    };
    return (
      <Box className={classes.box}>
        {/* {width < 768 ? (
          <Box className={classes.back}>
            <IconButton onClick={handleBack}>
              <ArrowBackRounded />
            </IconButton>
          </Box>
        ) : null} */}
        <Box className={classes.back}>
          <IconButton onClick={handleBack}>
            <ArrowBackRounded />
          </IconButton>
        </Box>
        <Box className={classes.list}>
          {
            //TODO: search about react-window's lazy loading
          }
          <AutoSizer>
            {({ width, height }) => (
              <List
                itemCount={allSurasIndex.length}
                height={height - 60}
                width={width}
                itemSize={80}
                itemData={itemData}
              >
                {Row}
              </List>
            )}
          </AutoSizer>
        </Box>
      </Box>
    );
  }
  return null;
};

export default Playlist;
