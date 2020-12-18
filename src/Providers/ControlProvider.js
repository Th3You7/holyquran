import React, { createContext, useReducer, useState } from "react";

export const ControlContext = createContext();

const ControlProvider = ({ children }) => {
  //initialize player
  const [player, setPlayer] = useState(undefined);

  const initControlState = {
    //* there will be 3 states of playerState: playlist, reduced, expanded
    playerState: "expanded",
    isPlaying: false,

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
      default:
        return;
    }
  };

  const [state, dispatch] = useReducer(controlReducer, initControlState);

  return (
    <ControlContext.Provider
      value={{
        player,
        state,
        setPlayer,
        dispatch,
      }}
    >
      {children}
    </ControlContext.Provider>
  );
};

export default ControlProvider;
