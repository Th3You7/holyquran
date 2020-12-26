import React, { useCallback, useContext, useEffect, useRef } from "react";
import MiniPlayer from "./MiniPlayer";
import MaxPlayer from "./MaxPlayer";
import { mainContext } from "../../Providers/MainProvider";
import { ControlContext } from "../../Providers/ControlProvider";
import MinimizedPlayer from "./MinimizedPlayer";
import Player from "./Player";

const MediaPlayer = () => {
  const { currReciter, currSura, setCurrSura, surasNames } = useContext(
    mainContext
  );

  const {
    setPlayer,
    dispatch,
    state: {
      playerState,
      isPlaying,
      isRepeated,
      isLoading,
      isLoaded,
      isSeeking,
      isSeeked,
    },
  } = useContext(ControlContext);

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

  //*handling next & prev functionality
  const handleNextPrev = (num) => {
    const allSurasIndex = suras.split(",").map((n) => Number(n));

    //*case of prev clicked and the current time of player is bigger than or equal to 5s, it will reset to 0;
    if (num === -1 && audioPlayer.current.currentTime >= 5) {
      audioPlayer.current.currentTime = 0;
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

  //* handling audio player if ended
  const handleEnd = () => {
    audioPlayer.current.currentTime = 0;

    //*NOTE: if reapted selected it will replay itself; else, it will end
    !isRepeated
      ? dispatch({ type: "SET_ISPLAYING", payload: false })
      : audioPlayer.current.play();
  };

  //*handling loading data
  const handleLoading = () => {
    dispatch({ type: "SET_ISLOADING" });
    //console.log(isLoaded, isLoading);
  };
  //*handling loaded data
  const handleLoaded = () => {
    dispatch({ type: "SET_ISLOADED" });
    console.log(isLoading);
    console.log(isLoaded);
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
  }, [number, server, playPauseAudio]);

  const returnedPlayerState = () => {
    if (playerState === "reduced") {
      return <MinimizedPlayer />;
    } else {
      return (
        <MaxPlayer
          currReciter={currReciter}
          player={audioPlayer.current}
          handleNextPrev={handleNextPrev}
        />
      );
    }
  };

  if (true) {
    return (
      <>
        {returnedPlayerState()}
        <audio
          ref={audioPlayer}
          onEnded={handleEnd}
          onLoadStart={handleLoading}
          onLoadedData={handleLoaded}
          onSeeking={handleSeeking}
          onSeeked={handleSeeked}
        />
      </>
    );
  }
  return <div>Loading...</div>;
};

export default MediaPlayer;
