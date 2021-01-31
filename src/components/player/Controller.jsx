import React, { useContext } from "react";
import { Grid, IconButton } from "@material-ui/core";
import { mainContext } from "../../Providers/MainProvider";
import {
  PauseRounded,
  PlayArrowRounded,
  SkipNextRounded,
  SkipPreviousRounded,
} from "@material-ui/icons";
import { makeStyles } from "@material-ui/core/styles";
import { ControlContext } from "../../Providers/ControlProvider";

const useStyles = makeStyles((theme) => ({
  playPauseIcon: {
    fontSize: (props) =>
      props.ultraMinimized ? "24px" : props.minimized ? "40px" : "48px",
  },

  playPauseBtn: {
    border: "1px solid",
    borderColor: theme.palette.grey[700],
  },
  controlIcons: {
    fontSize: (props) => (props.minimized ? "24px" : "36px"),
  },
}));

const Controller = (props) => {
  const classes = useStyles(props);
  //
  const { minimized, ultraMinimized } = props;
  //
  const {
    player,
    dispatch,
    state: { isPlaying, isLoading, isLoaded, isSeeking, isSeeked },
  } = useContext(ControlContext);
  //
  const { currReciter, currSura, setCurrSura, surasNames } = useContext(
    mainContext
  );
  //
  const { suras } = currReciter;
  const { index } = currSura;

  //*handling next & prev functionality
  const handleNextPrev = (e, num) => {
    e.stopPropagation();
    const allSurasIndex = suras.split(",").map((n) => Number(n));

    //*case of prev clicked and the current time of player is bigger than or equal to 5s, it will reset to 0;
    if (num === -1 && player.currentTime >= 5) {
      player.currentTime = 0;
    } else if (!allSurasIndex[index + num]) {
      if (num === 1) {
        //* case of:  next clicked and the sura is the last; it will reset to the first available sura in the playlist
        const { transliteration_en } = surasNames.find(
          (x) => x.number === allSurasIndex[0]
        );
        setCurrSura({
          index: 0,
          name: transliteration_en,
          number: allSurasIndex[0],
        });
      } else {
        //* case of:  prev clicked and the sura is the first; it will reset to the last available sura in the playlist
        const { transliteration_en, number } = surasNames.find(
          (x) => x.number === allSurasIndex[allSurasIndex.length - 1]
        );
        setCurrSura({
          index: allSurasIndex.length - 1,
          name: transliteration_en,
          number,
        });
      }
    } else {
      const { number, transliteration_en } = surasNames.find(
        (x) => x.number === allSurasIndex[index + num]
      );
      setCurrSura({
        index: index + num,
        name: transliteration_en,
        number,
      });
    }
  };

  //*return play or pause according to the state
  const playPauseBtn = () => {
    return player ? (
      isSeeking || isLoading ? (
        <IconButton className={classes.playPauseBtn}>
          <PlayArrowRounded className={classes.playPauseIcon} />
        </IconButton>
      ) : isSeeked || isLoaded ? (
        <IconButton
          aria-label="play/pause"
          onClick={(e) => {
            e.stopPropagation();
            dispatch({ type: "SET_ISPLAYING", payload: !isPlaying });
          }}
          className={classes.playPauseBtn}
        >
          {isPlaying ? (
            <PauseRounded className={classes.playPauseIcon} />
          ) : (
            <PlayArrowRounded className={classes.playPauseIcon} />
          )}
        </IconButton>
      ) : (
        <IconButton className={classes.playPauseBtn}>
          <PlayArrowRounded className={classes.playPauseIcon} />
        </IconButton>
      )
    ) : (
      <IconButton className={classes.playPauseBtn}>
        <PlayArrowRounded className={classes.playPauseIcon} />
      </IconButton>
    );
  };

  const minimizedController = () => {
    return <Grid item>{playPauseBtn()}</Grid>;
  };

  const maximizedController = () => {
    if (isLoaded) {
      return (
        <>
          <Grid item>
            <IconButton onClick={(e) => handleNextPrev(e, -1)}>
              <SkipPreviousRounded className={classes.controlIcons} />
            </IconButton>
          </Grid>
          <Grid item>{playPauseBtn()}</Grid>
          <Grid item>
            <IconButton onClick={(e) => handleNextPrev(e, 1)}>
              <SkipNextRounded className={classes.controlIcons} />
            </IconButton>
          </Grid>
        </>
      );
    }

    //* return diasbled buttons to avoid aborting the fetching process of media resource
    return (
      <>
        <Grid item>
          <IconButton disabled>
            <SkipPreviousRounded className={classes.controlIcons} />
          </IconButton>
        </Grid>
        <Grid item>{playPauseBtn()}</Grid>
        <Grid item>
          <IconButton disabled>
            <SkipNextRounded className={classes.controlIcons} />
          </IconButton>
        </Grid>
      </>
    );
  };

  return (
    <Grid container alignItems="center" justify="center">
      {minimized && ultraMinimized
        ? minimizedController()
        : maximizedController()}
    </Grid>
  );
};

export default Controller;
