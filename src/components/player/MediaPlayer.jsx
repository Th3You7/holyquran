import React, { useContext, useRef, useCallback, useEffect } from "react";
import { useLocation } from "react-router-dom";
import { mainContext } from "../../Providers/MainProvider";
import { ControlContext } from "../../Providers/ControlProvider";
import MaximizedPlayer from "./MaximizedPlayer";
import MinimizedPlayer from "./MinimizedPlayer";
import { Box } from "@material-ui/core";

export default function MediaPlayer() {
  const {
    setPlayer,
    dispatch,
    state: { playerState, isPlaying, isRepeated, isSeeking, isSeeked },
  } = useContext(ControlContext);

  const { currReciter, currSura, setCurrSura, surasNames } = useContext(
    mainContext
  );

  const location = useLocation();

  const { server, suras } = currReciter;
  const { number, index } = currSura;

  const audioPlayer = useRef();

  //TODO: formatting src of audio
  let src;
  if (Number(number) < 10) {
    src = `${server}/00${number}.mp3`;
  } else if (Number(number) >= 100) {
    src = `${server}/${number}.mp3`;
  } else {
    src = `${server}/0${number}.mp3`;
  }

  //* Handling Src changin
  const setSrc = useCallback(() => {
    if (number && server) {
      audioPlayer.current.src = src;
    }
  }, [src, number, server]);

  //*handling play/pause functionality
  const playPauseAudio = useCallback(() => {
    if (!isPlaying) {
      audioPlayer.current.pause();
    } else {
      audioPlayer.current.play();
    }
  }, [isPlaying]);

  //* handling audio player if ended
  const handleEnd = () => {
    const allSurasIndex = suras.split(",").map((n) => Number(n));

    //*NOTE: if repeated selected it will replay itself; else, it will end
    if (isRepeated) {
      audioPlayer.current.play();
      audioPlayer.current.currentTime = 0;
    } else if (!allSurasIndex[index + 1]) {
      dispatch({ type: "SET_ISPLAYING", payload: false });
    } else {
      const { number, transliteration_en } = surasNames.find(
        (x) => x.number === allSurasIndex[index + 1]
      );
      setCurrSura({
        index: index + 1,
        name: transliteration_en,
        number,
      });
    }
  };

  //*handling loading data
  const handleLoading = () => {
    dispatch({ type: "SET_ISLOADING" });
    //console.log(isLoaded, isLoading);
  };
  //*handling loaded data
  const handleLoaded = () => {
    dispatch({ type: "SET_ISLOADED" });

    dispatch({ type: "SET_ISPLAYING", payload: true });
  };
  //*handling seeking
  const handleSeeking = () => {
    dispatch({ type: "SET_ISSEEKING" });
    console.log(isSeeked, isSeeking);
  };
  //*handling seeked
  const handleSeeked = () => {
    dispatch({ type: "SET_ISSEEKED" });
    console.log(isSeeked, isSeeking);
  };

  //*Setting src of audio, and player
  useEffect(() => {
    setPlayer(audioPlayer.current);
    setSrc();
  }, [setSrc, setPlayer]);

  /*
   *play pause functionality
   */
  useEffect(() => {
    if (number && server) {
      playPauseAudio();
    }
  }, [number, server, playPauseAudio]);

  return (
    <Box
      style={{
        position: playerState === "reduced" ? "fixed" : "static",
        top: "auto",
        bottom: 0,
        width: "100%",
      }}
    >
      {playerState === "reduced" && location.pathname === "/home" ? (
        <MinimizedPlayer />
      ) : location.pathname === "/player" ? (
        <MaximizedPlayer />
      ) : null}

      <audio
        ref={audioPlayer}
        onEnded={handleEnd}
        onLoadStart={handleLoading}
        onLoadedData={handleLoaded}
        onSeeking={handleSeeking}
        onSeeked={handleSeeked}
      />
    </Box>
  );
}
