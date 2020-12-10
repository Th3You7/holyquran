import React, { useContext, useRef } from "react";
import TimelineController from "./TimelineController";
import UpperBar from "./UpperBar";
import BottomBar from "./BottomBar";
import Infos from "./Info";
import { SkipNext, PlayArrow, SkipPrevious } from "@material-ui/icons";
import { IconButton } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import { mainContext } from "../../Providers/MainProvider";

const useStyle = makeStyles((theme) => ({
  container: {
    display: "flex",
    flexDirection: "column",
    padding: theme.spacing(2),
    overflow: "hidden",
  },

  controls: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  },
  playIcon: {
    height: 68,
    width: 68,
  },
}));

const MediaPlayer = () => {
  const { currReciter, currSura } = useContext(mainContext);

  const { server } = currReciter;
  const { number } = currSura;

  let src;

  if (Number(number) < 10) {
    src = `${server}/00${number}.mp3`;
  } else if (Number(number) >= 100) {
    src = `${server}/0${number}.mp3`;
  } else {
    src = `${server}/0${number}.mp3`;
  }

  const audioPlayer = useRef();

  const playAudio = () => {
    audioPlayer.current.src = src;

    audioPlayer.current.play().then(console.log(src));
  };

  console.log(currReciter);

  const classes = useStyle();
  if (currReciter.id) {
    return (
      <div className={classes.container}>
        <UpperBar />
        <Infos reciter={currReciter.name} rewaya={currReciter.rewaya} />
        <TimelineController />
        <div className={classes.controls}>
          <IconButton aria-label="previous">
            <SkipPrevious fontSize="large" />
          </IconButton>
          <IconButton aria-label="play/pause" onClick={playAudio}>
            <PlayArrow className={classes.playIcon} />
          </IconButton>
          <IconButton aria-label="next">
            <SkipNext fontSize="large" />
          </IconButton>
        </div>
        <BottomBar suras={currReciter.suras} />
        <audio ref={audioPlayer} />
      </div>
    );
  }
  return <div>Loading...</div>;
};

export default MediaPlayer;
