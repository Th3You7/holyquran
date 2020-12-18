import React, { useCallback, useContext, useEffect, useRef } from "react";
import MiniPlayer from "./MiniPlayer";
import MaxPlayer from "./MaxPlayer";
import { mainContext } from "../../Providers/MainProvider";
import { ControlContext } from "../../Providers/ControlProvider";

const MediaPlayer = () => {
  const { currReciter, currSura } = useContext(mainContext);

  const {
    setPlayer,
    dispatch,
    state: { isPlaying },
  } = useContext(ControlContext);

  const { server } = currReciter;
  const { number } = currSura;

  const audioPlayer = useRef();

  //TODO: formatting src of audio
  let src;
  if (Number(number) < 10) {
    src = `${server}/00${number}.mp3`;
  } else if (Number(number) >= 100) {
    src = `${server}/0${number}.mp3`;
  } else {
    src = `${server}/0${number}.mp3`;
  }

  const setSrc = useCallback(() => {
    if (number && server) {
      audioPlayer.current.src = src;
    }
  }, [src, number, server]);

  const playPauseAudio = useCallback(() => {
    if (!isPlaying) {
      audioPlayer.current.pause();
    } else {
      audioPlayer.current.play();
    }
  }, [isPlaying]);

  //*Setting src of audio
  useEffect(() => {
    setSrc();
    setPlayer(audioPlayer.current);
  }, [setSrc, setPlayer]);

  /*
   *play pause functionality
   */
  useEffect(() => {
    if (number && server) {
      playPauseAudio();
    }
  }, [number, server, playPauseAudio, dispatch]);

  //document.body.style.overflow = "hidden";

  if (currReciter.id) {
    return (
      <>
        <MaxPlayer currReciter={currReciter} player={audioPlayer.current} />
        <MiniPlayer currReciter={currReciter} player={audioPlayer.current} />
        <audio ref={audioPlayer} />
      </>
    );
  }
  return <div>Loading...</div>;
};

export default MediaPlayer;
