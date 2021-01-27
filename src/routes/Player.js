import React from "react";
import { Box } from "@material-ui/core";

import { MediaPlayer } from "../components";

const Player = () => {
  document.body.style.overflow = "hidden";

  return (
    <Box>
      <MediaPlayer />
    </Box>
  );
};

export default Player;
