import React, { useContext, memo } from "react";
import { FixedSizeList as List, areEqual } from "react-window";
import AutoSizer from "react-virtualized-auto-sizer";
import { ListItemIcon, ListItem, ListItemText } from "@material-ui/core";
import { MusicNote } from "@material-ui/icons";
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
  const { dispatch } = useContext(ControlContext);
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

  return (
    <div className={styles.container}>
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
