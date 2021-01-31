import React, { createContext, useReducer, useState } from "react";
import useResize from "../hooks/useResize";

export const ControlContext = createContext();

const ControlProvider = ({ children }) => {
  //get the width & height of device
  const [width, height] = useResize();
  //initialize player using ref
  const [player, setPlayer] = useState(undefined);

  const initControlState = {
    //* there will be 3 states of playerState: playlist, reduced, expanded
    playerState: "expanded",
    isPlaying: false,
    isRepeated: false,
    isLoading: false,
    isLoaded: false,
    isSeeking: false,
    isSeeked: false,
    //isMinimized: false,
  };

  const controlReducer = (state, action) => {
    switch (action.type) {
      case "SET_PLAYERSTATE":
        return {
          ...state,
          playerState: action.payload,
        };

      case "SET_ISPLAYING":
        return {
          ...state,
          isPlaying: action.payload,
        };

      case "SET_REPEAT":
        return {
          ...state,
          isRepeated: !state.isRepeated,
        };
      case "SET_ISLOADING":
        return {
          ...state,
          isLoading: true,
          isLoaded: false,
        };

      case "SET_ISLOADED":
        return {
          ...state,
          isLoading: false,
          isLoaded: !(true && action.payload),
        };

      case "SET_ISSEEKING":
        return {
          ...state,
          isSeeking: true,
          isSeeked: false,
        };

      case "SET_ISSEEKED":
        return {
          ...state,
          isSeeking: false,
          isSeeked: !(true && action.payload),
        };
      default:
        return;
    }
  };

  const initVolState = {
    //* it will toggle between 2 states: false for muted & true for unmuted
    volState: true,
    currVol: 50,
  };

  const volReducer = (state, action) => {
    switch (action.type) {
      case "SET_VOLSTATE":
        return {
          ...state,
          volState: !state.volState,
        };

      case "SET_CURRVOL": {
        return {
          ...state,
          volState: true,
          currVol: action.payload,
        };
      }

      default:
        return;
    }
  };

  const [volume, volDispatch] = useReducer(volReducer, initVolState);
  const [state, dispatch] = useReducer(controlReducer, initControlState);

  return (
    <ControlContext.Provider
      value={{
        width,
        height,
        player,
        state,
        volume,
        setPlayer,
        dispatch,
        volDispatch,
      }}
    >
      {children}
    </ControlContext.Provider>
  );
};

export default ControlProvider;
